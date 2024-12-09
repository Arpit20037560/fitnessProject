import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import userReducer from "../../features/userSlice";
import api from "../../API/AxiosSetup";
import "@testing-library/jest-dom";

// Mock the API instance
jest.mock("../../API/AxiosSetup");


// Create a mock Redux store
const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Helper function to render components with Redux store and Router
const renderWithProviders = (ui) => {
  return render(
    <Provider store={mockStore}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders login form by default", () => {
    renderWithProviders(<Login />);

    // Check if login form elements are displayed
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("handles login correctly", async () => {
    // Mock API response for login
    api.post.mockResolvedValueOnce({
      data: { token: "fake-token", user: { email: "test@example.com" } },
    });

    renderWithProviders(<Login />);

    // Fill out and submit the login form
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Assert API call and parameters
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/auth/login",
        { email: "test@example.com", password: "password123" },
        expect.objectContaining({ withCredentials: true })
      );
    });
  });

  test("renders signup form when 'Sign up' button is clicked", async () => {
    renderWithProviders(<Login />);

    // Switch to signup form
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    // Assert signup form elements are displayed
    await waitFor(() => {
      expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("handles signup correctly", async () => {
    // Mock API response for signup
    api.post.mockResolvedValueOnce({
      data: { token: "fake-signup-token", user: { email: "test@example.com" } },
    });

    renderWithProviders(<Login />);

    // Switch to signup form and fill it out
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: "Arpit Beuria" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });

    // Submit the signup form
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Assert API call and parameters
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/auth/register",
        { email: "test@example.com", name: "Arpit Beuria", password: "password123" },
        expect.objectContaining({ withCredentials: true })
      );
    });
  });
});
