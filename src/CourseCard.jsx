function CourseCard({ course }) {
  return (
    <div
      style={{
        width: "450px",
        borderRadius: "10%",
        border: "2px solid black",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <h2>Course Name: {course.name}</h2>
      <h3>Category: {course.category}</h3>
      <h4>Level: {course.level}</h4>
      <h5>Duration: {course.duration}</h5>
      <h5>Rating: {course.rating}</h5>
      <h5>Enrolled Students count: {course.students}</h5>
    </div>
  );
}

export default CourseCard;
