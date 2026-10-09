import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await apiClient.get("/study_courses.json");

        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return [courses, setCourses, loading, error];
}
