# Event Registration System - Visual Summary

## User Flow Diagram

### 1. Homepage - Join Event
```
┌─────────────────────────────────────────┐
│   Upcoming Events Section (Homepage)    │
├─────────────────────────────────────────┤
│                                         │
│  [Featured Event Card]                  │
│  • Title: Care for Nature Webinar       │
│  • Date: 2024-12-15 2:00 PM             │
│  • Location: Online                     │
│  • Status: Ends in 2 hours              │
│                                         │
│  ┌─────────────────┐                    │
│  │  💚 Join Event  │  ← CLICK            │
│  └─────────────────┘                    │
│   ❤️  Share                              │
└─────────────────────────────────────────┘
```

**Result**: Modal opens with event context

---

### 2. Registration Modal
```
┌──────────────────────────────────────────┐
│  ✕  Register for Event                   │
│     Care for Nature Webinar              │
│     2024-12-15                           │
├──────────────────────────────────────────┤
│                                          │
│ Registering as: [Individual ▼]           │
│                                          │
│ Full Name * [                          ] │
│ Email *     [user@example.com         ] │
│ Phone *     [+260 965 638 175         ] │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │  💚 Register for Event              │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ✓ Successfully registered!               │
│   Confirmation sent to user@example.com  │
│                                          │
└──────────────────────────────────────────┘
```

**Dynamic fields based on registration type:**
- **Individual**: Full Name, Email, Phone
- **Organization**: +Organization Name, Position
- **Company**: +Company Name, Position, Industry

---

### 3. Admin Events - View Registrations Link
```
┌────────────────────────────────────────────┐
│     Recent Events                          │
├────────────────────────────────────────────┤
│                                            │
│  [Event Image]  Care for Nature Webinar   │
│                 Published • 2024-12-15     │
│                                            │
│  [View Registrations]  [Edit]              │ ← NEW
│                                            │
└────────────────────────────────────────────┘
```

---

### 4. Admin Attendance Dashboard
```
┌─────────────────────────────────────────────────────┐
│  ← Back                                             │
│  Care for Nature Webinar                            │
│  2024-12-15 at 2:00 PM • Online                     │
│  📊 12 registrations                                │
├─────────────────────────────────────────────────────┤
│  Filters:  [All] [Individual] [Organization] [Co.] │
│  [📥 Export CSV]                                     │
├─────────────────────────────────────────────────────┤
│ Name      │ Email            │ Phone        │ Type │
├───────────┼──────────────────┼──────────────┼──────┤
│ John Doe  │ john@example.com │ +260965...   │ Ind. │
│ Care Org  │ org@carenat.org  │ +260976...   │ Org  │
│ Tech Corp │ hr@techcorp.com  │ +260977...   │ Co.  │
│ ...       │ ...              │ ...          │ ...  │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Filter by registration type
- Click email to compose message
- Click phone to call
- Export all data to CSV

---

## Technical Architecture

### Frontend Component Flow
```
App
├── Homepage
│   └── UpcomingEventsSection
│       ├── Event Cards List
│       └── EventRegistrationModal
│           ├── Form with validation
│           ├── Status messaging
│           └── API call to /api/events/register
│
├── Admin
│   ├── Events Page
│   │   └── "View Registrations" Link
│   │
│   └── Attendance Page
│       ├── Event Details
│       ├── Filters
│       └── Registration Table
│           └── CSV Export
```

### API Request/Response

**Frontend → Backend**
```
POST /api/events/register
├── eventId: "event-123"
├── fullName: "John Doe"
├── email: "john@example.com"
├── phone: "+260965638175"
├── registrationType: "individual"
└── [org/company fields if applicable]
```

**Backend Response**
```
200 OK
├── success: true
├── registrationId: "reg-abc123"
└── email: "john@example.com"

OR

409 Conflict
└── error: "Already registered for this event"
```

---

## Database Schema (Backend)

```
event_registrations
├── id (UUID, primary key)
├── event_id (UUID, foreign key → events)
├── full_name (varchar)
├── email (varchar, indexed)
├── phone (varchar)
├── registration_type (enum: individual|organization|company)
├── organization_name (varchar, nullable)
├── company_name (varchar, nullable)
├── position (varchar, nullable)
├── industry (varchar, nullable)
├── registered_at (timestamp)
└── UNIQUE constraint: (event_id, email)
```

---

## Implementation Status

### Frontend ✅
- [x] Registration modal with form validation
- [x] Dynamic fields based on registration type
- [x] Success/error messaging
- [x] Admin attendance dashboard
- [x] Filter and export functionality
- [x] API integration ready
- [x] No TypeScript errors

### Backend ⏳
- [ ] Database migration (Prisma)
- [ ] POST `/events/register` endpoint
- [ ] GET `/admin/events/:eventId` endpoint
- [ ] Email confirmation service
- [ ] Validation and error handling
- [ ] Testing and deployment

---

## Key Features Implemented

### Modal Registration
✅ Three registration types (Individual, Organization, Company)
✅ Client-side form validation
✅ Email format validation with regex
✅ Required field checking
✅ Loading state during submission
✅ Success confirmation with email address
✅ Error messages with troubleshooting hints
✅ Auto-close after 3 seconds on success
✅ Clean, professional UI with Tailwind CSS

### Admin Dashboard
✅ Event details display (date, time, location)
✅ Registration count by type
✅ Filterable registration list
✅ Email and phone quick links
✅ CSV export with all fields
✅ Responsive table design
✅ Back navigation

### Data Validation
✅ Email regex validation
✅ Required field enforcement
✅ Organization/company name validation
✅ Form error messaging

---

## File Structure

```
apps/web/
├── app/
│   ├── components/
│   │   ├── events/
│   │   │   └── EventRegistrationModal.tsx ✨ NEW
│   │   └── home/
│   │       └── UpcomingEventsSection.tsx ✏️ UPDATED
│   └── admin/
│       └── events/
│           ├── page.tsx ✏️ UPDATED
│           └── attendance/
│               └── page.tsx ✨ NEW

Root/
├── EVENT_REGISTRATION_IMPLEMENTATION.md ✨ NEW
└── BACKEND_REGISTRATION_REQUIREMENTS.md ✨ NEW
```

---

## Next Actions

### Immediate (Backend Development)
1. Review `BACKEND_REGISTRATION_REQUIREMENTS.md`
2. Create Prisma migration for `event_registrations`
3. Implement POST endpoint with validation
4. Add email sending logic

### Testing (QA)
1. Register as Individual
2. Register as Organization
3. Register as Company
4. Test duplicate prevention
5. Verify emails received
6. Test admin attendance view
7. Test CSV export

### Deployment
1. Run database migration
2. Deploy backend code
3. Test end-to-end flow
4. Monitor for errors
5. Gather user feedback

---

## Summary

The event registration system is **fully functional on the frontend** and ready for backend integration. Users can:
1. Click "Join Event" on any event
2. Fill registration form with appropriate fields
3. Receive confirmation email
4. See their registration in admin dashboard

Admins can:
1. View all registrations for an event
2. Filter by registration type
3. Export registrations to CSV
4. Contact registrants via email/phone

**Status**: 🟢 Frontend Ready | 🟡 Backend Pending
