import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/coursesModel";
import { Lecture } from "../models/lectureModel.js";
import { User } from "../models/userModel.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";

export const getAllCourse = TryCatch(async (req, res) => {
  const courses = await Courses.find();
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

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user_id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id)) {
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  }
  res.json({ lectures });
});

// fetchlecture  single one
export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user_id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(req.params.id)) {
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  }
  res.json({ lecture });
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
