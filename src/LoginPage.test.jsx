import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  it("calls onLogin when the form is submitted", async () => {
    // Arrange: prepare a fake onLogin function
    const mockLogin = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage onLogin={mockLogin} />
      </MemoryRouter>,
    );

    // Act: simulate the user entering credentials
    await user.type(screen.getByLabelText(/email/i), "abhi@example.com");

    await user.type(screen.getByLabelText(/password/i), "test123");

    await user.click(screen.getByRole("button", { name: /login/i }));

    // Assert: check whether onLogin was called
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it("does not call onLogin when required fields are empty", async () => {
    const mockLogin = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage onLogin={mockLogin} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).not.toHaveBeenCalled();
  });
});
