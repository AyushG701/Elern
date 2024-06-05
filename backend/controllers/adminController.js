import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/coursesModel.js";
import { Lecture } from "../models/lectureModel.js";

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;
  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image: image?.path,
    duration,
    price,
  });

  res.status(201).json({
    message: "Course has been successfully created",
  });
});

export const addLectures = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      message: "No courses with this id",
    });
  }

  const { title, description } = req.body;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(200).json({
    message: "lecture added successfully",
    lecture,
  });
});
