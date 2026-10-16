


import express from "express";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import {
  evaluateQuiz,
  getLessons,
  getQuiz
} from "../controllers/courseContentController.js";

const router = express.Router();

// POST /api/courses
// Create a course for the authenticated user
router.post("/", requireAuth, async (req, res) => {
  try {
    const {
      title,
      topic,
      student_level,
      duration_minutes,
      language,
      content
    } = req.body;

    // Validate required fields
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof topic !== "string" ||
      !topic.trim()
    ) {
      return res.status(400).json({
        error: "Title and topic are required"
      });
    }

    // Validate optional fields
    if (
      duration_minutes !== undefined &&
      duration_minutes !== null &&
      (!Number.isInteger(duration_minutes) || duration_minutes <= 0)
    ) {
      return res.status(400).json({
        error: "Duration must be a positive integer"
      });
    }

    if (
      content !== undefined &&
      (content === null ||
        typeof content !== "object" ||
        Array.isArray(content))
    ) {
      return res.status(400).json({
        error: "Content must be a JSON object"
      });
    }

    // Insert course into Supabase
    const { data, error } = await supabase
      .from("courses")
      .insert({
        user_id: req.user.id,
        title: title.trim(),
        topic: topic.trim(),
        student_level: student_level ?? null,
        duration_minutes: duration_minutes ?? null,
        language: language ?? null,
        content: content ?? {}
      })
      .select()
      .single();

    if (error) {
      console.error("Create course error:", error.message);

      return res.status(500).json({
        error: "Could not save course"
      });
    }

    return res.status(201).json({
      message: "Course created successfully",
      course: data
    });
  } catch (error) {
    console.error("Create course exception:", error.message);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// GET /api/courses
// Get only the authenticated user's courses
router.get("/", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch courses error:", error.message);

      return res.status(500).json({
        error: "Could not fetch courses"
      });
    }

    return res.status(200).json({
      count: data.length,
      courses: data
    });
  } catch (error) {
    console.error("Fetch courses exception:", error.message);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// GET /api/courses/:courseId/lessons
router.get("/:courseId/lessons", requireAuth, getLessons);

// GET /api/courses/:courseId/quiz
router.get("/:courseId/quiz", requireAuth, getQuiz);

// POST /api/courses/:courseId/quiz/evaluate
router.post("/:courseId/quiz/evaluate", requireAuth, evaluateQuiz);

export default router;
