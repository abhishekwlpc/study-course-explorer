import { useState, useEffect } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/study_cours.json")
      .then((data) => data.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h3>Loading</h3>
        ) : error ? (
          <h3>Failed to load courses!</h3>
        ) : (
          <>
            {courses.map((course) => (
              <div key={course.id}>
                <h2>{course.name}</h2>
                <p>{course.category}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
