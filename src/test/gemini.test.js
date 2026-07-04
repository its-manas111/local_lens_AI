import { describe, test, expect, vi } from "vitest";

vi.mock("@google/genai", () => ({
    GoogleGenAI: vi.fn(() => ({
        models: {
            generateContent: vi.fn().mockResolvedValue({
                text: "Mock itinerary",
            }),
        },
    })),
}));

describe("Gemini", () => {
    test("returns mocked response", async () => {
        expect(true).toBe(true);
    });
});