
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { supabase, isLocalMode } from "../config/supabase.js";

const router = express.Router();

// POST /api/ai/generate-course
router.post("/generate-course", requireAuth, async (req, res) => {
  try {
    const { generateCourse } = await import("../Services/aiServices.js");

    const topic = req.body.topic;
    const student_level = req.body.student_level || req.body.studentLevel || "Beginner";
    const duration_minutes = Number(req.body.duration_minutes || req.body.durationMinutes) || 60;
    const number_of_lectures = Number(req.body.number_of_lectures || req.body.numberOfLectures) || 4;
    const learning_objectives = (req.body.learning_objectives || req.body.learningObjectives || "").trim();
    const language = req.body.language || "English";

    // ── Validate inputs ────────────────────────────────────────────────────────
    if (typeof topic !== "string" || !topic.trim() || topic.trim().length > 2000) {
      return res.status(400).json({ error: "Topic is required and must be at most 2000 characters" });
    }

    const allowedLevels = ["Beginner", "Intermediate", "Advanced"];
    if (!allowedLevels.includes(student_level)) {
      return res.status(400).json({ error: "Level must be Beginner, Intermediate, or Advanced" });
    }

    if (!Number.isInteger(duration_minutes) || duration_minutes < 15 || duration_minutes > 600) {
      return res.status(400).json({ error: "Duration must be between 15 and 600 minutes" });
    }

    if (!Number.isInteger(number_of_lectures) || number_of_lectures < 1 || number_of_lectures > 30) {
      return res.status(400).json({ error: "Number of lectures must be between 1 and 30" });
    }

    // ── Generate course content via Gemini / Dynamic Synthesizer ───────────────
    const generatedCourse = await generateCourse({
      topic: topic.trim(),
      studentLevel: student_level,
      durationMinutes: duration_minutes,
      numberOfLectures: number_of_lectures,
      learningObjectives: learning_objectives,
      language: language.trim()
    });

    if (isLocalMode) {
      console.warn(
        "\n⚠️  LOCAL STORE MODE: Course will be saved to ./data/courses.json (not Supabase).\n" +
        "   Set SUPABASE_URL + SUPABASE_SECRET_KEY + SUPABASE_PUBLISHABLE_KEY in .env to use the real database.\n"
      );
    }

    // ── Persist to Supabase (or local fallback) ────────────────────────────────
    const insertPayload = {
      user_id: req.user.id,
      title: generatedCourse.title,
      topic: topic.trim(),
      student_level,
      duration_minutes,
      language: language.trim(),
      content: generatedCourse
    };

    let { data, error } = await supabase
      .from("courses")
      .insert(insertPayload)
      .select()
      .single();

    // If foreign key constraint violation (23503), retry with user_id: null to prevent data loss
    if (error && error.code === "23503") {
      console.warn(
        `\n⚠️  [aiRoutes] Foreign-key violation on user_id (${insertPayload.user_id}).\n` +
        "   Retrying insert with user_id: null so the generated course is preserved...\n"
      );
      const retryResult = await supabase
        .from("courses")
        .insert({ ...insertPayload, user_id: null })
        .select()
        .single();

      if (!retryResult.error) {
        data = retryResult.data;
        error = null;
      }
    }

    if (error) {
      // ── Log the FULL error so the developer can diagnose immediately ─────────
      console.error(
        "\n❌ [aiRoutes] Save generated course FAILED:\n" +
        `   message : ${error.message}\n` +
        `   code    : ${error.code}\n` +
        `   details : ${error.details}\n` +
        `   hint    : ${error.hint}\n`
      );

      // Provide a safe, actionable message to the UI plus the draft so the
      // user does not have to pay for another Gemini generation.
      const safeReason = sanitizeErrorMessage(error);
      return res.status(500).json({
        error: `Course was generated but saving failed: ${safeReason}`,
        draft: generatedCourse   // ← frontend can retry POST /api/courses with this
      });
    }

    return res.status(201).json({
      message: "Course generated and saved successfully",
      course: data,
      storage: isLocalMode ? "local" : "supabase"
    });
  } catch (err) {
    console.error("\n❌ [aiRoutes] Course generation exception:", err.message, "\n", err.stack);
    return res.status(500).json({
      error: "Course generation failed. Check the backend logs for details."
    });
  }
});

/**
 * Returns a short, safe error reason suitable for display in the UI.
 * Never leaks raw SQL, table names, or keys.
 */
function sanitizeErrorMessage(error) {
  const code = error.code || "";
  const msg  = (error.message || "").toLowerCase();

  if (code === "23503") {
    return "user account not found in the database (foreign-key violation — run the SQL migration)";
  }
  if (code === "42P01") {
    return "the 'courses' table does not exist yet — run the SQL migration in Supabase";
  }
  if (code === "42501" || msg.includes("row-level security") || msg.includes("policy")) {
    return "permission denied by row-level security — check RLS policies in Supabase";
  }
  if (code === "PGRST204" || msg.includes("could not find the") || msg.includes("column")) {
    return "table schema mismatch — a required column is missing, run the SQL migration";
  }
  if (code === "22P02") {
    return "data type mismatch (e.g. user_id format is wrong)";
  }
  if (msg.includes("jwt") || msg.includes("token") || code === "PGRST301") {
    return "authentication token rejected by Supabase";
  }
  return `database error (code: ${code || "unknown"})`;
}

export default router;
