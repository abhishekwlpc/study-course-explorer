import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";

describe("CourseCard", () => {
  it("renders the course name and category", () => {
    const course = {
      id: 1,
      name: "React Fundamentals",
      category: "Web Development",
      level: "Beginner",
      duration: 12,
      rating: 4.7,
      students: 980,
    };

    render(<CourseCard course={course} />);

    expect(
      screen.getByRole("heading", {
        name: "Course Name: React Fundamentals",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Category: Web Development")).toBeInTheDocument();
  });
});
