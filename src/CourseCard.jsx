import "./CourseCard.css";
import { memo } from "react";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h2>Course Name: {course.name}</h2>
      <p>Category: {course.category}</p>
      <p>Level: {course.level}</p>
      <p>Duration: {course.duration}</p>
      <p>Rating: {course.rating}</p>
      <p>Enrolled Students count: {course.students}</p>
    </div>
  );
}

export default memo(CourseCard);
