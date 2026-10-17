
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in Backend/.env");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateCourse({
  topic,
  studentLevel,
  durationMinutes,
  language
}) {
  const prompt = `
Create a complete educational course.

Topic: ${topic}
Student level: ${studentLevel}
Duration: ${durationMinutes} minutes
Language: ${language}

Create a useful, accurate course with:
- A descriptive course title
- A short course description
- Logical learning modules
- Lessons with explanations and practical examples
- A quiz for each module with four options per question
- The correct answer and an explanation for each quiz question

Adjust the amount of content to the requested duration.

Return data matching this JSON structure:
{
  "title": "Course title",
  "description": "Course description",
  "modules": [
    {
      "title": "Module title",
      "lessons": [
        {
          "title": "Lesson title",
          "explanation": "Lesson notes",
          "example": "Practical example"
        }
      ],
      "quiz": [
        {
          "question": "Question",
          "options": ["A", "B", "C", "D"],
          "answer": "Correct option text",
          "explanation": "Explanation of the answer"
        }
      ]
    }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            description: { type: "STRING" },
            modules: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  title: { type: "STRING" },
                  lessons: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        title: { type: "STRING" },
                        explanation: { type: "STRING" },
                        example: { type: "STRING" }
                      },
                      required: ["title", "explanation", "example"]
                    }
                  },
                  quiz: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        question: { type: "STRING" },
                        options: {
                          type: "ARRAY",
                          items: { type: "STRING" }
                        },
                        answer: { type: "STRING" },
                        explanation: { type: "STRING" }
                      },
                      required: [
                        "question",
                        "options",
                        "answer",
                        "explanation"
                      ]
                    }
                  }
                },
                required: ["title", "lessons", "quiz"]
              }
            }
          },
          required: ["title", "description", "modules"]
        }
      }
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response");
    }

    const course = JSON.parse(response.text);

    if (
      typeof course.title !== "string" ||
      typeof course.description !== "string" ||
      !Array.isArray(course.modules) ||
      course.modules.length === 0
    ) {
      throw new Error("Gemini returned an invalid course structure");
    }

    for (const module of course.modules) {
      if (
        typeof module.title !== "string" ||
        !Array.isArray(module.lessons) ||
        !Array.isArray(module.quiz)
      ) {
        throw new Error("Gemini returned an invalid module");
      }

      for (const question of module.quiz) {
        if (
          typeof question.question !== "string" ||
          !Array.isArray(question.options) ||
          question.options.length !== 4 ||
          !question.options.every(
            option => typeof option === "string"
          ) ||
          !question.options.includes(question.answer)
        ) {
          throw new Error("Gemini returned an invalid quiz question");
        }
      }
    }

    return course;
  } catch (error) {
    console.error("Gemini course generation error:", error.message);
    throw new Error("Gemini could not generate a valid course");
  }
}
