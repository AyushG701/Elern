import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/coursesModel.js";
import { Lecture } from "../models/lectureModel.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/userModel.js";

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

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  rm(lecture.video, () => {
    console.log("video deleted");
  });

  await lecture.deleteOne();
  res.json({ message: "lecture deleted" });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  const lectures = await Lecture.findById({ course: course._id });
  // deleting all the lectures
  await Promise.all(
    lectures.map(async (lecture) => {
      //deleting lecture from the database
      await unlinkAsync(lecture.video);
      console.log("video deleted");
    }),
  );
  //deleting the course thumnail
  rm(course.image, () => {
    console.log("image deleted");
  });
  //course deleteed
  await Lecture.find({ course: req.params.id }).deleteMany();
  await course.deleteOne();
  //   then removing the ocurse from subscription module of user
  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({ message: "lecture deleted" });
});

// get all stats
export const getAllStats = TryCatch(async (req, res) => {
  const totalCourse = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourse,
    totalLectures,
    totalUsers,
  };
  res.json({
    stats,
  });
});
