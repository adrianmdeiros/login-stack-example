import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    avatarUrl: varchar(),
    ...timestamps
})