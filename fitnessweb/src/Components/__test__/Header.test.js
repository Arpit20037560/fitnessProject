import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { logOutUser } from "../../features/userSlice";
import axios from "axios";

// Mock Axios
jest.mock("axios");

// Mock useNavigate hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate; // Get the mock function for navigation

describe("Header Page Test Cases", () => {
  it("should load HeaderComponent", () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: null, // no user logged in
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText("FitnessApp");
    expect(title).toBeInTheDocument();
  });

  it("should display user's name when logged in", () => {
    const storeWithUser = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: { name: "Amrit Beuria" }, // Mock logged-in user state
      },
    });

    render(
      <Provider store={storeWithUser}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const userName = screen.getByText("Amrit Beuria");
    expect(userName).toBeInTheDocument();
  });

  it("should call the logout API, dispatch the logout action, and navigate to the Home Page", async () => {
    // Mock the axios POST request
    axios.post.mockResolvedValue({});

    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: { name: "Amrit Beuria" }, 
      },
    });

    // Mock dispatch function
    const dispatch = jest.fn();
    // Override store's dispatch 
    store.dispatch = dispatch; 

     // Create a mock function for useNavigate
    const mockNavigate = jest.fn();
    // Mock the useNavigate hook to use our mock function
    useNavigate.mockReturnValue(mockNavigate); 

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Find the dropdown button by user name text
    const dropdownButton = screen.getByText("Amrit Beuria");
    fireEvent.click(dropdownButton);

    // Find the logout button and click on it
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    // Wait for axios.post to be called with the correct URL
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/auth/logout");
    });

    // Check that the logOutUser action was dispatched
    expect(dispatch).toHaveBeenCalledWith(logOutUser());

    // Verify that the navigate function was called to redirect to the Home page
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
