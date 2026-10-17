import express from "express";
import { supabase } from "../config/supabase.js";
import { generateCoursePpt } from "../Services/pptServices.js";

const router = express.Router();

/**
 * POST /api/export/pptx
 * Directly export any course JSON (from client draft, state, or guest mode) as PPTX.
 */
router.post("/pptx", async (req, res) => {
  try {
    const course = req.body?.course || req.body;
    if (!course || typeof course !== "object") {
      return res.status(400).json({ error: "Course payload is required" });
    }

    const fileBuffer = await generateCoursePpt(course);
    const safeName = (course.title || "course")
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .slice(0, 80);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeName}.pptx"`
    );
    res.setHeader("Content-Length", fileBuffer.length);

    return res.status(200).send(fileBuffer);
  } catch (error) {
    console.error("Direct PowerPoint export failed:", error.message);
    return res.status(500).json({ error: "Could not generate PowerPoint" });
  }
});

/**
 * GET /api/export/courses/:id/pptx
 * Export course by ID. Works with or without auth.
 */
router.get("/courses/:id/pptx", async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!supabase) {
      return res.status(503).json({ error: "Database not connected" });
    }

    let query = supabase.from("courses").select("*").eq("id", courseId);

    // If auth token provided, verify ownership or match
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      try {
        const token = authHeader.slice(7);
        const { data: userData } = await supabase.auth.getUser(token);
        if (userData?.user) {
          query = query.eq("user_id", userData.user.id);
        }
      } catch {
        // Continue query without strict filter
      }
    }

    const { data: course, error } = await query.maybeSingle();

    if (error) {
      console.error("Course lookup failed:", error.message);
      return res.status(500).json({ error: "Could not retrieve course" });
    }

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const fileBuffer = await generateCoursePpt(course);
    const safeName = (course.title || "course")
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .slice(0, 80);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeName}.pptx"`
    );
    res.setHeader("Content-Length", fileBuffer.length);

    return res.status(200).send(fileBuffer);
  } catch (error) {
    console.error("PowerPoint export failed:", error.message);
    return res.status(500).json({ error: "Could not generate PowerPoint" });
  }
});

export default router;
