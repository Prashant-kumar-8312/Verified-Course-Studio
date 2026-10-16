
import pptxgen from "pptxgenjs";

export async function generateCoursePpt(course) {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Verified Course Studio";
  pptx.subject = course.topic;
  pptx.title = course.title;
  pptx.company = "Verified Course Studio";
  pptx.lang = "en-US";

  pptx.theme = {
    headFontFace: "Aptos Display",
    bodyFontFace: "Aptos",
    lang: "en-US"
  };

  const navy = "17324D";
  const blue = "2878B5";
  const light = "F2F6FA";
  const dark = "263445";
  const white = "FFFFFF";

  function addFooter(slide, number) {
    slide.addText("Verified Course Studio", {
      x: 0.55,
      y: 7.12,
      w: 5,
      h: 0.2,
      fontSize: 9,
      color: "64748B",
      margin: 0
    });

    slide.addText(String(number), {
      x: 12.1,
      y: 7.12,
      w: 0.6,
      h: 0.2,
      fontSize: 9,
      color: "64748B",
      align: "right",
      margin: 0
    });
  }

  function addHeading(slide, heading, number) {
    slide.background = { color: light };

    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.333,
      h: 0.18,
      line: { color: blue, transparency: 100 },
      fill: { color: blue }
    });

    slide.addText(heading || "Course Lesson", {
      x: 0.65,
      y: 0.45,
      w: 12,
      h: 0.7,
      fontFace: "Aptos Display",
      fontSize: 27,
      bold: true,
      color: navy,
      breakLine: false,
      margin: 0.02,
      valign: "mid",
      fit: "shrink"
    });

    addFooter(slide, number);
  }

  // 1. Title slide
  {
    const slide = pptx.addSlide();
    slide.background = { color: navy };

    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 0.25,
      h: 7.5,
      line: { color: blue, transparency: 100 },
      fill: { color: blue }
    });

    slide.addText(course.title || "Untitled Course", {
      x: 0.9,
      y: 1.7,
      w: 11.2,
      h: 1.5,
      fontFace: "Aptos Display",
      fontSize: 34,
      bold: true,
      color: white,
      breakLine: false,
      valign: "mid",
      fit: "shrink",
      margin: 0.05
    });

    slide.addText(course.topic || "", {
      x: 0.95,
      y: 3.35,
      w: 10.8,
      h: 0.65,
      fontSize: 22,
      color: "B9DDF5",
      fit: "shrink",
      margin: 0.02
    });

    slide.addText(
      `Level: ${course.student_level || "All levels"}\n` +
      `Duration: ${course.duration_minutes || "Not specified"} minutes\n` +
      `Language: ${course.language || "English"}`,
      {
        x: 0.98,
        y: 4.3,
        w: 8.5,
        h: 1.15,
        fontSize: 16,
        color: white,
        breakLine: false,
        lineSpacingMultiple: 1.15,
        margin: 0.04
      }
    );

    slide.addText("Created with Verified Course Studio", {
      x: 0.98,
      y: 6.7,
      w: 8,
      h: 0.3,
      fontSize: 11,
      color: "B9DDF5",
      margin: 0
    });
  }

  // 2. Course overview
  {
    const slide = pptx.addSlide();
    addHeading(slide, "Course Overview", 2);

    slide.addText(course.content?.description || "Course learning objectives and overview.", {
      x: 0.8,
      y: 1.5,
      w: 11.7,
      h: 1.3,
      fontSize: 19,
      color: dark,
      breakLine: false,
      valign: "top",
      fit: "shrink",
      margin: 0.1
    });

    const modules = Array.isArray(course.content?.modules)
      ? course.content.modules
      : [];

    slide.addText(
      modules.length
        ? modules.map((module, index) => `${index + 1}. ${module.title || "Module"}`).join("\n")
        : "No modules are available for this course.",
      {
        x: 1,
        y: 3.1,
        w: 11,
        h: 3.2,
        fontSize: 19,
        color: navy,
        breakLine: false,
        valign: "top",
        fit: "shrink",
        paraSpaceAfterPt: 12,
        margin: 0.1
      }
    );

    addFooter(slide, 2);
  }

  let pageNumber = 3;
  const modules = Array.isArray(course.content?.modules)
    ? course.content.modules
    : [];

  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
    const module = modules[moduleIndex];

    // Module introduction
    {
      const slide = pptx.addSlide();
      addHeading(
        slide,
        `Module ${moduleIndex + 1}: ${module.title || "Learning Module"}`,
        pageNumber
      );

      slide.addText(
        `In this module, you will study ${module.title || "the main topic"} and practice the concepts through lessons and examples.`,
        {
          x: 0.9,
          y: 1.7,
          w: 11.4,
          h: 1.4,
          fontSize: 22,
          color: dark,
          valign: "top",
          fit: "shrink",
          margin: 0.1
        }
      );

      const lessonCount = Array.isArray(module.lessons)
        ? module.lessons.length
        : 0;

      slide.addText(`Lessons in this module: ${lessonCount}`, {
        x: 0.9,
        y: 3.6,
        w: 10.5,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: blue,
        margin: 0.05
      });

      pageNumber++;
    }

    // Lesson slides
    const lessons = Array.isArray(module.lessons)
      ? module.lessons
      : [];

    for (const lesson of lessons) {
      const slide = pptx.addSlide();

      addHeading(
        slide,
        lesson.title || "Lesson",
        pageNumber
      );

      slide.addText(lesson.explanation || "No explanation provided.", {
        x: 0.8,
        y: 1.45,
        w: 11.7,
        h: 2.3,
        fontSize: 19,
        color: dark,
        valign: "top",
        breakLine: false,
        fit: "shrink",
        margin: 0.12
      });

      if (lesson.example) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.8,
          y: 4.1,
          w: 11.7,
          h: 1.8,
          rectRadius: 0.1,
          line: { color: "C8DEEF", width: 1 },
          fill: { color: white }
        });

        slide.addText("PRACTICAL EXAMPLE", {
          x: 1.05,
          y: 4.32,
          w: 10.9,
          h: 0.3,
          fontSize: 12,
          bold: true,
          color: blue,
          margin: 0
        });

        slide.addText(lesson.example, {
          x: 1.05,
          y: 4.75,
          w: 10.9,
          h: 0.9,
          fontSize: 16,
          color: dark,
          valign: "top",
          fit: "shrink",
          margin: 0.03
        });
      }

      pageNumber++;
    }

    // Quiz slides
    const quizzes = Array.isArray(module.quiz)
      ? module.quiz
      : [];

    for (const quiz of quizzes) {
      const slide = pptx.addSlide();

      addHeading(slide, "Knowledge Check", pageNumber);

      slide.addText(quiz.question || "Review the lesson concepts.", {
        x: 0.8,
        y: 1.4,
        w: 11.7,
        h: 1,
        fontSize: 22,
        bold: true,
        color: navy,
        valign: "top",
        fit: "shrink",
        margin: 0.08
      });

      const options = Array.isArray(quiz.options)
        ? quiz.options
        : [];

      slide.addText(
        options.length
          ? options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join("\n")
          : "Review the lesson and explain the key concept.",
        {
          x: 1,
          y: 2.7,
          w: 11,
          h: 2.2,
          fontSize: 19,
          color: dark,
          valign: "top",
          fit: "shrink",
          paraSpaceAfterPt: 12,
          margin: 0.08
        }
      );

      if (quiz.answer) {
        slide.addText(`Answer: ${quiz.answer}`, {
          x: 1,
          y: 5.2,
          w: 11,
          h: 0.55,
          fontSize: 17,
          bold: true,
          color: "217346",
          fit: "shrink",
          margin: 0.05
        });
      }

      if (quiz.explanation) {
        slide.addText(quiz.explanation, {
          x: 1,
          y: 5.85,
          w: 11,
          h: 0.75,
          fontSize: 14,
          color: dark,
          fit: "shrink",
          margin: 0.05
        });
      }

      pageNumber++;
    }
  }

  // Write presentation to a buffer for the HTTP response
  const buffer = await pptx.write({
    outputType: "nodebuffer"
  });

  return buffer;
}
