-- DropForeignKey
ALTER TABLE "event_registrations" DROP CONSTRAINT "event_registrations_eventId_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "htmlContent" TEXT,
    "templateId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "recipientCount" INTEGER NOT NULL DEFAULT 0,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "openCount" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "unsubscribeCount" INTEGER NOT NULL DEFAULT 0,
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_history" (
    "id" TEXT NOT NULL,
    "newsletterId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "newsletter_history_newsletterId_idx" ON "newsletter_history"("newsletterId");

-- CreateIndex
CREATE INDEX "newsletter_history_email_idx" ON "newsletter_history"("email");

-- CreateIndex
CREATE INDEX "newsletter_history_status_idx" ON "newsletter_history"("status");

-- AddForeignKey
ALTER TABLE "newsletter_history" ADD CONSTRAINT "newsletter_history_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

