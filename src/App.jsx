import { useState } from "react";
import CourseCard from "./CourseCard";
import useCourses from "./hooks/useCourses";
import { Link, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import LogoutPage from "./LogoutPage";

function CoursesPage() {
  const [courses, setCourses, loading, error] = useCourses();
  const [searchedText, setSearchedText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [rating, setRating] = useState(0.0);
  const [newCourse, setNewCourse] = useState({
    name: "",
    category: "",
    level: "Beginner",
    duration: "",
    rating: "",
    students: "",
  });

  function setTextToSearch(e) {
    setSearchedText(e.target.value);
  }

  const lowercaseSearchedText = searchedText.toLocaleLowerCase();
  const filteredCourses = courses.filter(
    (course) =>
      (course.name.toLocaleLowerCase().includes(lowercaseSearchedText) ||
        course.category.toLocaleLowerCase().includes(lowercaseSearchedText)) &&
      course.level.includes(selectedLevel) &&
      course.rating >= rating,
  );

  function filterRating(e) {
    setRating(Number(e.target.value));
  }

  function clearFilters() {
    setSearchedText("");
    setSelectedLevel("");
    setRating(0.0);
  }

  function createNewCourse(e) {
    const { name, value } = e.target;

    setNewCourse((perviousCourse) => ({
      ...perviousCourse,
      [name]: value,
    }));
  }

  function handleAddCourse(e) {
    e.preventDefault();

    if (!newCourse.name.trim() || !newCourse.category.trim()) {
      alert("Course name and category required!");
      return;
    }

    const courseToAdd = {
      id: Date.now(),
      name: newCourse.name.trim(),
      category: newCourse.category.trim(),
      level: newCourse.level,
      duration: Number(newCourse.duration),
      rating: Number(newCourse.rating),
      students: Number(newCourse.students),
    };

    setCourses((perviousCourse) => [...perviousCourse, courseToAdd]);

    setNewCourse({
      name: "",
      category: "",
      level: "Beginner",
      duration: "",
      rating: "",
      students: "",
    });
  }

  return (
    <>
      <div>
        <input
          placeholder="Search"
          value={searchedText}
          onChange={setTextToSearch}
        />
        <br />
        <label>Beginner</label>
        <input
          type="radio"
          name="level"
          value="Beginner"
          checked={selectedLevel === "Beginner"}
          onChange={() => setSelectedLevel("Beginner")}
          className="radiobutton-levels"
        />
        <label>Intermediate</label>
        <input
          type="radio"
          name="level"
          value="Intermediate"
          checked={selectedLevel === "Intermediate"}
          onChange={() => setSelectedLevel("Intermediate")}
          className="radiobutton-levels"
        />
        <label>Advanced</label>
        <input
          type="radio"
          name="level"
          value="Advanced"
          checked={selectedLevel === "Advanced"}
          onChange={() => setSelectedLevel("Advanced")}
          className="radiobutton-levels"
        />
        <label>All Levels</label>
        <input
          type="radio"
          name="level"
          value=""
          checked={selectedLevel === ""}
          onChange={() => setSelectedLevel("")}
          className="radiobutton-levels"
        />
      </div>
      <br />
      <div style={{ display: "inline-block" }}>
        <label>Rating</label>
        <input
          type="range"
          min={0.0}
          max={5.0}
          step="0.1"
          value={rating}
          onChange={filterRating}
        />
        <p>{rating}+</p>
      </div>
      <div>
        <button onClick={clearFilters}>Clear Filter</button>
      </div>
      <div>
        <form onSubmit={handleAddCourse}>
          <label>Course Name: </label>
          <input
            type="text"
            name="name"
            value={newCourse.name}
            onChange={createNewCourse}
          />
          <br />
          <label>Course Category: </label>
          <input
            type="text"
            name="category"
            value={newCourse.category}
            onChange={createNewCourse}
          />
          <br />
          <label>Level: </label>
          <select
            value={newCourse.level}
            name="level"
            onChange={createNewCourse}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <br />
          <label>Duration: </label>
          <input
            type="number"
            name="duration"
            value={newCourse.duration}
            onChange={createNewCourse}
          />
          <br />
          <label>Rating: </label>
          <input
            type="number"
            name="rating"
            value={newCourse.rating}
            min={0.0}
            max={5.0}
            onChange={createNewCourse}
            required
          />
          <br />
          <label>Student Count: </label>
          <input
            type="number"
            name="students"
            value={newCourse.students}
            min={0}
            onChange={createNewCourse}
          />
          <br />
          <button type="submit">Add Course</button>
        </form>
      </div>
      <div>
        {loading ? (
          <h3>Loading</h3>
        ) : error ? (
          <h3>Failed to load courses!</h3>
        ) : (
          <>
            {filteredCourses.length > 0 ? (
              <>
                <h3>{filteredCourses.length} courses found</h3>
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </>
            ) : (
              <h3>No courses Found</h3>
            )}
          </>
        )}
      </div>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("demoAuthenticated") === "true",
  );

  function handleLogin() {
    localStorage.setItem("demoAuthenticated", "true");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("demoAuthenticated");
    setIsAuthenticated(false);
  }

  return (
    <>
      <nav>
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/courses">Courses</Link>
        {" | "}
        <Link to="/about">About</Link>
        {" | "}
        <Link to="/logout">Logout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to Study Course Explorer!</h1>} />

        <Route
          path="/courses"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<h1>About our project</h1>} />
        <Route
          path="/logout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LogoutPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
