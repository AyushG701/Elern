import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/coursesModel";

export const getAllCourse = TryCatch(async (req, res) => {
  const course = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const courseId = parseInt(req.params.id); // Extracting course ID from request params
  try {
    const course = await Courses.findById(courseId); // Finding course by ID
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ course }); // Sending course data in response
  } catch (error) {
    // Handle any errors that occur during course retrieval
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const fetchLectures = TryCatch(async (req, res) => {});
