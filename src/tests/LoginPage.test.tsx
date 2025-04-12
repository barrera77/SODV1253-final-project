import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import LoginPage from "../pages/LoginPage";
import { useLogin } from "../hooks";
import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the useLogin hook
vi.mock("../hooks", () => ({
  useLogin: vi.fn(),
}));

const mockUseLoginReturn = (overrides = {}) => {
  const defaults = {
    login: false,
    setLogin: vi.fn(),
    signInWithGoogle: vi.fn(),
    handleLogin: vi.fn(),
    navigate: vi.fn(),
  };

  const useLoginMock = vi.mocked(useLogin, true);
  useLoginMock.mockReturnValue({ ...defaults, ...overrides });

  return useLoginMock;
};

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login page and form", () => {
    mockUseLoginReturn();

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign-in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in with Google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/name@company.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*******")).toBeInTheDocument();
  });

  it("displays error when email is invalid", async () => {
    mockUseLoginReturn();

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("name@company.com");
    const submitButton = screen.getByRole("button", { name: /Sign-in/i });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(/Please enter a valid email/i)
      ).toBeInTheDocument()
    );
  });

  it("calls handleLogin with email and password", async () => {
    const mockHandleLogin = vi.fn();
    mockUseLoginReturn({ handleLogin: mockHandleLogin });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("name@company.com"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("*******"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign-in/i }));

    await waitFor(() =>
      expect(mockHandleLogin).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      )
    );
  });

  it("navigates to sign-up page when clicking 'Sign up now'", () => {
    const navigate = vi.fn();
    mockUseLoginReturn({ navigate });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /Sign up now/i }));
    expect(navigate).toHaveBeenCalledWith("/signup");
  });

  it("calls signInWithGoogle on Google button click", () => {
    const signInWithGoogle = vi.fn();
    mockUseLoginReturn({ signInWithGoogle });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Sign in with Google/i })
    );
    expect(signInWithGoogle).toHaveBeenCalled();
  });
});
