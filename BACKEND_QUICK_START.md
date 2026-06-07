# Event Registration - Quick Start Guide for Developers

## What's Ready Now 🚀

Your **frontend event registration system is 100% complete**:
- Users can register for events via modal
- Form validation works perfectly
- Admin can view all registrations
- CSV export is ready to use

## What You Need To Do 🛠️

### Step 1: Database Setup (30 mins)
Create a Prisma migration to store registrations.

**Create file**: `apps/server/prisma/migrations/[timestamp]_add_event_registrations/migration.sql`

```sql
-- Create event_registrations table
CREATE TABLE "event_registrations" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "eventId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "registrationType" TEXT NOT NULL,
  "organizationName" TEXT,
  "companyName" TEXT,
  "position" TEXT,
  "industry" TEXT,
  "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key
  CONSTRAINT "event_registrations_eventId_fkey" 
    FOREIGN KEY ("eventId") REFERENCES "content_cards"("id") ON DELETE CASCADE,
  
  -- Unique constraint to prevent duplicate registrations
  UNIQUE("eventId", "email")
);

-- Create indexes for performance
CREATE INDEX "event_registrations_eventId_idx" ON "event_registrations"("eventId");
CREATE INDEX "event_registrations_email_idx" ON "event_registrations"("email");
```

**Update Prisma schema**: Add to `apps/server/prisma/schema.prisma`:

```prisma
model EventRegistration {
  id                String   @id @default(cuid())
  eventId           String
  event             ContentCard @relation(fields: [eventId], references: [id], onDelete: Cascade)
  fullName          String
  email             String
  phone             String
  registrationType  String   // 'individual' | 'organization' | 'company'
  organizationName  String?
  companyName       String?
  position          String?
  industry          String?
  registeredAt      DateTime @default(now())

  @@unique([eventId, email])
  @@index([eventId])
  @@index([email])
}
```

**Run migration**:
```bash
cd apps/server
npx prisma migrate deploy
npx prisma generate
```

---

### Step 2: API Endpoint (45 mins)

**File**: `apps/server/src/events/events.service.ts`

```typescript
// Add this method to EventsService

async registerForEvent(
  eventId: string,
  registrationData: {
    fullName: string;
    email: string;
    phone: string;
    registrationType: 'individual' | 'organization' | 'company';
    organizationName?: string;
    companyName?: string;
    position?: string;
    industry?: string;
  }
) {
  // 1. Validate required fields
  if (!registrationData.fullName?.trim() || !registrationData.email?.trim() || !registrationData.phone?.trim()) {
    throw new BadRequestException('Full name, email, and phone are required');
  }

  // 2. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registrationData.email)) {
    throw new BadRequestException('Invalid email format');
  }

  // 3. Check if event exists
  const event = await this.prisma.contentCard.findUnique({
    where: { id: eventId },
  });
  if (!event) {
    throw new NotFoundException('Event not found');
  }

  // 4. Check for duplicate registration
  const existingRegistration = await this.prisma.eventRegistration.findUnique({
    where: {
      eventId_email: {
        eventId,
        email: registrationData.email.toLowerCase().trim(),
      },
    },
  });
  if (existingRegistration) {
    throw new ConflictException('This email is already registered for this event');
  }

  // 5. Create registration
  const registration = await this.prisma.eventRegistration.create({
    data: {
      eventId,
      fullName: registrationData.fullName.trim(),
      email: registrationData.email.toLowerCase().trim(),
      phone: registrationData.phone.trim(),
      registrationType: registrationData.registrationType,
      organizationName: registrationData.organizationName?.trim(),
      companyName: registrationData.companyName?.trim(),
      position: registrationData.position?.trim(),
      industry: registrationData.industry?.trim(),
    },
  });

  // 6. Send confirmation email (see Step 3)
  await this.emailService.sendRegistrationConfirmation(
    registration.email,
    registration.fullName,
    event,
    registration
  );

  return {
    success: true,
    message: 'Registration successful',
    registrationId: registration.id,
    email: registration.email,
  };
}
```

**File**: `apps/server/src/events/events.controller.ts`

```typescript
// Add this endpoint to EventsController

@Post('register')
async registerForEvent(@Body() body: any) {
  return this.eventsService.registerForEvent(body.eventId, {
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    registrationType: body.registrationType,
    organizationName: body.organizationName,
    companyName: body.companyName,
    position: body.position,
    industry: body.industry,
  });
}
```

---

### Step 3: Email Confirmation (30 mins)

**File**: `apps/server/src/communications/email.service.ts`

Add this method:

```typescript
async sendRegistrationConfirmation(
  email: string,
  fullName: string,
  event: any,
  registration: any
) {
  try {
    // Format event date and time
    const eventDateTime = `${event.metadata?.date} at ${event.metadata?.time}`;
    
    // Prepare template parameters
    const templateParams = {
      fullName,
      eventTitle: event.title,
      eventDate: event.metadata?.date,
      eventTime: event.metadata?.time,
      eventLocation: event.metadata?.location || 'Online',
      registrationType: registration.registrationType.charAt(0).toUpperCase() + 
                        registration.registrationType.slice(1),
      organizationName: registration.organizationName || '',
      companyName: registration.companyName || '',
      position: registration.position || '',
      industry: registration.industry || '',
    };

    // Send using Brevo
    const response = await this.brevoClient.sendTransacEmail({
      to: [{ email, name: fullName }],
      templateId: 1, // Replace with actual Brevo template ID
      params: templateParams,
    });

    console.log('Confirmation email sent:', response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw - registration already saved
    // Email failure shouldn't prevent registration success
  }
}
```

---

### Step 4: Get Registrations Endpoint (20 mins)

**File**: `apps/server/src/events/events.service.ts`

```typescript
async getEventRegistrations(eventId: string) {
  const event = await this.prisma.contentCard.findUnique({
    where: { id: eventId },
    include: {
      registrations: {
        orderBy: { registeredAt: 'desc' },
      },
    },
  });

  if (!event) {
    throw new NotFoundException('Event not found');
  }

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.metadata?.date,
    time: event.metadata?.time,
    location: event.metadata?.location,
    totalRegistrations: event.registrations.length,
    registrations: event.registrations.map(reg => ({
      id: reg.id,
      fullName: reg.fullName,
      email: reg.email,
      phone: reg.phone,
      registrationType: reg.registrationType,
      organizationName: reg.organizationName,
      companyName: reg.companyName,
      position: reg.position,
      industry: reg.industry,
      registeredAt: reg.registeredAt.toISOString(),
    })),
  };
}
```

**File**: `apps/server/src/events/events.controller.ts`

```typescript
@Get(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
async getEvent(@Param('id') id: string, @Query('includeRegistrations') includeReg: string) {
  if (includeReg === 'true') {
    return this.eventsService.getEventRegistrations(id);
  }
  return this.eventsService.getEvent(id);
}
```

---

### Step 5: Test Everything ✅

```bash
# 1. Register as Individual
curl -X POST http://localhost:5000/events/register \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+260965638175",
    "registrationType": "individual"
  }'

# Expected: { success: true, registrationId: "...", email: "..." }

# 2. Try duplicate registration
curl -X POST http://localhost:5000/events/register \
  -H "Content-Type: application/json" \
  -d '{...same as above...}'

# Expected: { error: "Already registered for this event" }

# 3. Get registrations (as admin)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5000/admin/events/event-123?includeRegistrations=true

# Expected: { id: "...", title: "...", registrations: [...] }
```

---

## Implementation Checklist

- [ ] Create Prisma migration
- [ ] Run `prisma migrate deploy`
- [ ] Add EventRegistration model to schema
- [ ] Implement `registerForEvent()` method
- [ ] Add `/events/register` POST endpoint
- [ ] Implement email sending
- [ ] Implement `getEventRegistrations()` method
- [ ] Add `/admin/events/:id` GET endpoint with registrations
- [ ] Test individual registration
- [ ] Test organization registration
- [ ] Test company registration
- [ ] Test duplicate prevention
- [ ] Verify email is sent
- [ ] Test admin view loads registrations
- [ ] Test CSV export on frontend
- [ ] Deploy and test in production

---

## Troubleshooting

**Frontend modal not opening?**
- Check `apps/web/app/components/events/EventRegistrationModal.tsx` exists
- Verify import in `UpcomingEventsSection.tsx`

**API returning 404?**
- Ensure `/events/register` endpoint exists in NestJS controller
- Check that endpoint is not protected (no JWT guard needed)

**Emails not sending?**
- Verify Brevo API key is configured
- Check template ID is correct
- Look at service logs for email errors

**Admin registration view empty?**
- Verify `includeRegistrations=true` query parameter
- Check that registrations are being saved to database
- Ensure admin has correct role

---

## Files to Reference

📄 **BACKEND_REGISTRATION_REQUIREMENTS.md** - Complete API specs
📄 **EVENT_REGISTRATION_IMPLEMENTATION.md** - Implementation overview
📄 **EVENT_REGISTRATION_VISUAL_GUIDE.md** - User flow diagrams

---

**Total Backend Development Time**: ~2 hours
**Difficulty**: Medium
**Status**: Ready to start! ✨
