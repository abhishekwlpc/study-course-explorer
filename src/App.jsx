import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchedText, setSearchedText] = useState("");

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

  const filteredCourses = courses.filter((course) =>
    course.name.toLocaleLowerCase().includes(searchedText.toLocaleLowerCase()),
  );

  return (
    <>
      <div>
        <input
          placeholder="Search"
          value={searchedText}
          onChange={setTextToSearch}
        />
      </div>
      <div>
        {loading ? (
          <h3>Loading</h3>
        ) : error ? (
          <h3>Failed to load courses!</h3>
        ) : (
          <>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
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
