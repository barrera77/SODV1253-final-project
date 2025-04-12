import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import * as hooks from "../hooks"; // 👈 import for mocking
import "@testing-library/jest-dom";

vi.mock("../hooks", async () => {
  const actual = await vi.importActual<typeof import("../hooks")>("../hooks");
  return {
    ...actual,
    useSignUpForm: vi.fn(() => ({
      email: "",
      setEmail: vi.fn(),
      password: "",
      setPassword: vi.fn(),
      name: "",
      setName: vi.fn(),
      passwordConfirmation: "",
      setPasswordConfirmation: vi.fn(),
      errors: {},
      handleSignUp: vi.fn((e) => e.preventDefault()), // Ensure the form is prevented from submitting
    })),
  };
});

const renderSignUp = () =>
  render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );

describe("SignUpPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form and fields correctly", () => {
    renderSignUp();

    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByText("Sign up with Google")).toBeInTheDocument();
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
  });

  it("calls handleSignUp when form is submitted", () => {
    const handleSubmitMock = vi.fn((e) => e.preventDefault());

    vi.mocked(hooks).useSignUpForm.mockReturnValue({
      email: "",
      setEmail: vi.fn(),
      password: "",
      setPassword: vi.fn(),
      name: "",
      setName: vi.fn(),
      passwordConfirmation: "",
      setPasswordConfirmation: vi.fn(),
      errors: {},
      handleSignUp: handleSubmitMock,
    });

    renderSignUp();

    const submitButton = screen.getByText("Create an account");

    // Simulate form submission
    fireEvent.submit(submitButton); // Use submit event to trigger form submission

    expect(handleSubmitMock).toHaveBeenCalledTimes(1); // Ensure it's called once
  });

  it("displays password errors if present", () => {
    vi.mocked(hooks).useSignUpForm.mockReturnValue({
      email: "",
      setEmail: vi.fn(),
      password: "",
      setPassword: vi.fn(),
      name: "",
      setName: vi.fn(),
      passwordConfirmation: "",
      setPasswordConfirmation: vi.fn(),
      errors: {
        passwordError: "Password too weak",
        passwordConfirmationError: "Passwords do not match",
      },
      handleSignUp: vi.fn((e) => e.preventDefault()),
    });

    renderSignUp();

    expect(screen.getByText("Password too weak")).toBeInTheDocument();
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });
});
