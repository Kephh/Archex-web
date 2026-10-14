import { describe, expect, it } from "vitest";
import { leadSchema } from "@/features/leads/schema";

const validLead = {
  name: "Avery Stone",
  email: "avery@example.com",
  company: "Example Co",
  projectType: "ai-integration",
  message: "We need help evaluating an AI workflow for document intake and review.",
  privacy: true,
  website: ""
};

describe("leadSchema", () => {
  it("accepts a valid lead", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("rejects short messages", () => {
    expect(leadSchema.safeParse({ ...validLead, message: "Too short", privacy: true }).success).toBe(false);
  });
});
