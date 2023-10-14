DO $$ BEGIN
 CREATE TYPE "user_system_enum" AS ENUM('system', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"pdf-name" text NOT NULL,
	"pdf-url" text NOT NULL,
	"created-at" timestamp DEFAULT now() NOT NULL,
	"user-id" varchar(256) NOT NULL,
	"file-key" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat-id" integer NOT NULL,
	"content" text NOT NULL,
	"created-at" timestamp DEFAULT now() NOT NULL,
	"role" "user_system_enum" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chat-id_chats_id_fk" FOREIGN KEY ("chat-id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
