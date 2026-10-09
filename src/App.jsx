import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [rating, setRating] = useState(0.0);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/study_courses.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

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

export default App;
