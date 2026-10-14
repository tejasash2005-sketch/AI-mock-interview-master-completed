import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull()
});


export const UserAnswer=pgTable('useAnswer',{
   id:serial('id').primaryKey(),
   mockIdRef:varchar("mockId").notNull(),
   question:varchar('question').notNull(),
   correctAns:text('correctAns'),
   userAns:text('userAns'),
   feedback:text('feedback'),
   rating:varchar('rating'),
   userEmail:varchar('userEmail'),
   createdAt:varchar('createdAt')
})

export const AdminUsers = pgTable('adminUsers', {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  name: varchar("name"),
  role: varchar("role").default('admin'), // 'super_admin', 'observer'
  createdAt: varchar("createdAt")
});

export const FeedbackCorrections = pgTable('feedbackCorrections', {
  id: serial("id").primaryKey(),
  userAnswerId: integer("userAnswerId"),
  correctedFeedback: text("correctedFeedback"),
  correctedRating: varchar("correctedRating"),
  adminEmail: varchar("adminEmail"),
  createdAt: varchar("createdAt")
});

export const AISuggestions = pgTable('aiSuggestions', {
  id: serial("id").primaryKey(),
  category: varchar("category").notNull(), // 'technical', 'behavioral', 'communication'
  suggestionText: text("suggestionText").notNull(),
  addedBy: varchar("addedBy"),
  isActive: varchar("isActive").default('true')
});
