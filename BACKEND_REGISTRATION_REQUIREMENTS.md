# Event Registration System - Backend Requirements

## Overview
The frontend event registration modal and admin attendance tracking system requires the backend to:
1. Accept event registrations with enhanced user data
2. Store registrations with support for individual, organization, and company types
3. Send email confirmations to registered users
4. Provide endpoints for retrieving registrations (admin only)

## API Endpoints Required

### 1. POST `/events/register`
**Purpose**: Register a user/organization/company for an event

**Request Body**:
```json
{
  "eventId": "string",
  "fullName": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "registrationType": "individual|organization|company (required)",
  "organizationName": "string (optional, required if type=organization)",
  "companyName": "string (optional, required if type=company)",
  "position": "string (optional)",
  "industry": "string (optional, for company type)"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Successfully registered for event",
  "registrationId": "string",
  "email": "string"
}
```

**Response (Error - 400/500)**:
```json
{
  "error": "Descriptive error message"
}
```

**Behavior**:
- Validate all required fields
- Check for duplicate registrations (same email + event)
- Create registration record in database
- **Send confirmation email to user** with event details
- Return success response

---

### 2. GET `/admin/events/:eventId?includeRegistrations=true`
**Purpose**: Get event details with all registrations (admin only)

**Authentication**: Required (Admin/Super Admin role)

**Response (Success - 200)**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "date": "string (ISO format)",
  "time": "string",
  "location": "string",
  "totalRegistrations": "number",
  "registrations": [
    {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "registrationType": "individual|organization|company",
      "organizationName": "string|null",
      "companyName": "string|null",
      "position": "string|null",
      "industry": "string|null",
      "registeredAt": "string (ISO timestamp)"
    }
  ]
}
```

---

## Database Schema

### `event_registrations` table
```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  registration_type ENUM('individual', 'organization', 'company') NOT NULL,
  organization_name VARCHAR(255),
  company_name VARCHAR(255),
  position VARCHAR(255),
  industry VARCHAR(255),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, email),
  INDEX(event_id),
  INDEX(email)
);
```

---

## Email Notification

### Confirmation Email
**When**: After successful registration
**To**: Registered email address
**Subject**: "Confirm Your Registration - [Event Title]"
**Template Variables**:
- `fullName`: User's full name
- `eventTitle`: Event title
- `eventDate`: Event date
- `eventTime`: Event time
- `eventLocation`: Event location
- `registrationType`: Registration type (Individual/Organization/Company)
- `registrationDetails`: Optional org/company info

**Email Content Sample**:
```
Dear [fullName],

Thank you for registering for [eventTitle]!

Event Details:
- Date: [eventDate]
- Time: [eventTime]
- Location: [eventLocation]

Your Registration Type: [registrationType]

[If Organization]:
Organization: [organizationName]
Position: [position]

[If Company]:
Company: [companyName]
Position: [position]
Industry: [industry]

We look forward to seeing you at the event.

Best regards,
Care for Nature Zambia
```

---

## Error Handling

### Common Error Scenarios

1. **Missing Required Fields** (400)
   ```json
   {
     "error": "Full name, email, and phone are required"
   }
   ```

2. **Invalid Email Format** (400)
   ```json
   {
     "error": "Please provide a valid email address"
   }
   ```

3. **Duplicate Registration** (409)
   ```json
   {
     "error": "This email is already registered for this event"
   }
   ```

4. **Event Not Found** (404)
   ```json
   {
     "error": "Event not found"
   }
   ```

5. **Email Sending Failed** (500)
   ```json
   {
     "error": "Registration successful but confirmation email could not be sent. Please contact support."
   }
   ```

---

## Implementation Notes

1. **Email Service**: Use existing Brevo/SendGrid integration
2. **Duplicate Prevention**: Enforce unique constraint on (event_id, email)
3. **Data Validation**: Validate email format and required fields on backend
4. **Timestamps**: Store registration timestamp for audit trail
5. **Admin Access**: Only authenticated admins can view registrations
6. **CSV Export**: Frontend expects registrations array to support client-side CSV generation

---

## Testing Checklist

- [ ] Register as Individual
- [ ] Register as Organization with position
- [ ] Register as Company with position and industry
- [ ] Duplicate registration returns appropriate error
- [ ] Email confirmation sent successfully
- [ ] Admin can view all registrations for an event
- [ ] Filter registrations by type works
- [ ] CSV export contains all necessary fields
- [ ] Invalid emails are rejected
- [ ] Missing required fields return errors
