
import express from "express";
import { supabase } from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { generateCoursePpt } from "../Services/pptServices.js";

const router = express.Router();

// GET /api/export/courses/:id/pptx
router.get("/courses/:id/pptx", requireAuth, async (req, res) => {
  try {
    const courseId = req.params.id;

    // Retrieve only a course belonging to the logged-in user
    const { data: course, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .eq("user_id", req.user.id)
      .maybeSingle();

    if (error) {
      console.error("Course lookup failed:", error.message);

      return res.status(500).json({
        error: "Could not retrieve course"
      });
    }

    if (!course) {
      return res.status(404).json({
        error: "Course not found"
      });
    }

    // Generate the PowerPoint file
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

    return res.status(500).json({
      error: "Could not generate PowerPoint"
    });
  }
});

export default router;
