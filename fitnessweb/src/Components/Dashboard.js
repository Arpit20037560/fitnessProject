import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createWorkouts, getWorkoutDetails } from "../features/workoutsSlice";
import Cards from "./Cards";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch workouts from the backend
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/", {
        withCredentials: true,
      });
      dispatch(getWorkoutDetails(response.data.workouts));
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [dispatch]);

  const workoutSelector = useSelector((store) => store.workout);

  // Workout Form State
  const [name, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [notes, setNotes] = useState("");

  // Handlers
  const handleWorkoutCreation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/create",
        { name, duration, intensity, notes },
        { withCredentials: true }
      );
      dispatch(createWorkouts(response.data)); // Update Redux directly
      setWorkoutName("");
      setDuration("");
      setIntensity("");
      setNotes("");
      await fetchWorkouts(); // Re-fetch updated workouts
    } catch (error) {
      console.error("Error creating workout:", error.message);
      alert("Failed to create workout.");
    }
  };

  const handleWorkoutDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        withCredentials: true,
      });
      await fetchWorkouts(); // Re-fetch updated workouts after deletion
    } catch (error) {
      console.error("Error deleting workout:", error.message);
      alert("Failed to delete workout.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col p-6 bg-gray-900 min-h-screen">
        {/* Workout Form Section */}
        <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Add Workout</h2>
          <form className="space-y-6" onSubmit={handleWorkoutCreation}>
            <input
              type="text"
              placeholder="Workout Name"
              value={name}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="input w-full"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 30 minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input w-full"
            />
            <input
              type="text"
              placeholder="Intensity (e.g., High, Moderate)"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="input w-full"
            />
            <input
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input w-full"
            />
            <button type="submit" className="btn w-full bg-blue-600">
              Add Workout
            </button>
          </form>
        </div>

        {/* Controls Section */}
        <div className="flex px-2">
          <SearchBar />
          <button className="btn btn-outline btn-info px-3 m-2">
            Recent Add
          </button>
          <button className="btn btn-outline btn-success px-3 m-2">
            Ascending duration
          </button>
          <button className="btn btn-outline btn-warning px-3 m-2">
            Descending duration
          </button>
          <button className="btn btn-outline btn-error px-3 m-2">Oldest</button>
        </div>

        {/* Scrollable Cards Section */}
        <main className="flex-1 space-y-8 overflow-x-auto">
          <div className="carousel carousel-center rounded-box mt-8 space-x-4 flex-nowrap">
            {workoutSelector.length > 0 ? (
              workoutSelector.map((workout) => (
                <div className="carousel-item" key={workout._id}>
                  <Cards {...workout} onDelete={handleWorkoutDelete} />
                </div>
              ))
            ) : (
              <div className="text-white">No workouts available.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
