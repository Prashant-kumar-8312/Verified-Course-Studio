
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// POST /api/ai/generate-course
router.post("/generate-course", requireAuth, async (req, res) => {
  try {
    const { generateCourse } = await import("../Services/aiServices.js");

    const {
      topic,
      student_level = "Beginner",
      duration_minutes = 60,
      language = "English"
    } = req.body;

    // Validate inputs
    if (
      typeof topic !== "string" ||
      !topic.trim() ||
      topic.trim().length > 200
    ) {
      return res.status(400).json({
        error: "Topic is required and must be at most 200 characters"
      });
    }

    const allowedLevels = [
      "Beginner",
      "Intermediate",
      "Advanced"
    ];

    if (!allowedLevels.includes(student_level)) {
      return res.status(400).json({
        error: "Level must be Beginner, Intermediate, or Advanced"
      });
    }

    if (
      !Number.isInteger(duration_minutes) ||
      duration_minutes < 15 ||
      duration_minutes > 600
    ) {
      return res.status(400).json({
        error: "Duration must be between 15 and 600 minutes"
      });
    }

    if (
      typeof language !== "string" ||
      !language.trim() ||
      language.length > 50
    ) {
      return res.status(400).json({
        error: "Please provide a valid language"
      });
    }

    // Generate course with OpenAI
    const generatedCourse = await generateCourse({
      topic: topic.trim(),
      studentLevel: student_level,
      durationMinutes: duration_minutes,
      language: language.trim()
    });

    // Save the generated course for the logged-in user
    const { data, error } = await supabase
      .from("courses")
      .insert({
        user_id: req.user.id,
        title: generatedCourse.title,
        topic: topic.trim(),
        student_level,
        duration_minutes,
        language: language.trim(),
        content: generatedCourse
      })
      .select()
      .single();

    if (error) {
      console.error("Save generated course failed:", error.message);

      return res.status(500).json({
        error: "Course was generated but could not be saved"
      });
    }

    return res.status(201).json({
      message: "Course generated and saved successfully",
      course: data
    });
  } catch (error) {
    console.error("Course generation failed:", error.message);

    return res.status(500).json({
      error: "Course generation failed. Check the backend logs."
    });
  }
});

export default router;
