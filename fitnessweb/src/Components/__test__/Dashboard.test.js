import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor, act,debug } from "@testing-library/react";
import axios from "axios";
import workoutReducer from "../../features/workoutsSlice";
import { Provider } from "react-redux";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom";

jest.mock("axios");

jest.mock("../Header", () => () => <div>Mocked Header</div>);

const mockWorkouts = [
  { _id: "1", name: "Push-ups", duration: "15", intensity: "high", notes: "Quick workout" },
  { _id: "2", name: "Jogging", duration: "30", intensity: "moderate", notes: "Morning run" },
];

describe("Fetch All API Test", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        workout: workoutReducer,
      },
      preloadedState: {
        workout: mockWorkouts,
      },
    });

    // Mock API responses
    axios.get.mockResolvedValue({
      data: { workouts: mockWorkouts },
    });

  });

  // Test for GET API
  it("fetches and displays workouts from the API", async () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      mockWorkouts.forEach((workout) => {
        expect(screen.getByText(new RegExp(workout.name, "i"))).toBeInTheDocument();
      });
    });

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/", {
      withCredentials: true,
    });
  });




  
});

describe('Create Workout API Test', () => {
    let store;

    store = configureStore({
        reducer: {
          workout: workoutReducer,
        },
      });
  
      test('should create a new workout', async () => {
        // Mock the axios POST request with the response data
        axios.post.mockResolvedValue({
          data: {
            _id: '3',
            name: 'Running',
            duration: '30 minutes',
            intensity: 'high',
            notes: '5 sets of 5 minutes',
          },
        });
      
        // Render the component with the store and router
        render(
          <Provider store={store}>
            <Dashboard />
          </Provider>
        );
      
        // Simulate user input to fill out the workout form
        fireEvent.change(screen.getByPlaceholderText('Workout Name'), { target: { value: 'Running' } });
        fireEvent.change(screen.getByPlaceholderText('Duration (e.g., 30 minutes)'), { target: { value: '30 minutes' } });
        fireEvent.change(screen.getByPlaceholderText('Notes'), { target: { value: '5 sets of 5 minutes' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'high' } });
      
        // Click the "Add Workout" button to submit the form
        fireEvent.click(screen.getByRole('button', { name: /Add Workout/i }));
      
        // Wait for the axios POST request to be made and validate the API call
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/create', 
            {
              name: 'Running',
              duration: '30 minutes',
              intensity: 'high',
              notes: '5 sets of 5 minutes',
            },
            expect.objectContaining({ withCredentials: true })
          );
        });
      });
      
  });



  