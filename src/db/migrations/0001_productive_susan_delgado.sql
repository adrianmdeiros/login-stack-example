ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatarUrl" varchar;