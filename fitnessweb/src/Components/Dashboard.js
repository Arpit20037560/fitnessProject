import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createWorkouts, getWorkoutDetails, deleteWorkoutDetailsById, editWorkoutById, deleteWorkoutDetails } from "../features/workoutsSlice";
import Cards from "./Cards";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch workouts from the backend
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/", {
        withCredentials: true,
      });
      if (response != null) {
        setIsEditable(false);
      }
      dispatch(getWorkoutDetails(response.data.workouts));
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const workoutSelector = useSelector((store) => store.workout);

  // Workout Form State
  const [name, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("low");
  const [notes, setNotes] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [workoutsToDisplay, setWorkoutsToDisplay] = useState(workoutSelector);
  const [sortOrder, setSortOrder] = useState(null);

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Sort workouts in ascending order
  const sortedWorkoutsAsc = () => {
    const sorted = [...workoutsToDisplay].sort((a, b) => {
      const durationA = parseInt(a.duration, 10);
      const durationB = parseInt(b.duration, 10);
      return durationA - durationB;
    });
    setWorkoutsToDisplay(sorted);
  };

  // Sort workouts in descending order
  const sortedWorkoutsDesc = () => {
    const sorted = [...workoutsToDisplay].sort((a, b) => {
      const durationA = parseInt(a.duration, 10);
      const durationB = parseInt(b.duration, 10);
      return durationB - durationA;
    });
    setWorkoutsToDisplay(sorted);
  };

  // Update workouts after filtering or sorting
  const filterAndSortWorkouts = () => {
    let filtered = workoutSelector.filter((workout) =>
      workout.name.toLowerCase().includes(search.toLowerCase())
    );

    // Apply sorting after filtering
    if (sortOrder === "asc") {
      filtered = filtered.sort((a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10));
    } else if (sortOrder === "desc") {
      filtered = filtered.sort((a, b) => parseInt(b.duration, 10) - parseInt(a.duration, 10));
    }

    setWorkoutsToDisplay(filtered);
  };

  useEffect(() => {
    filterAndSortWorkouts();
  }, [search, sortOrder, workoutSelector]);

  const intensityOptions = ["low", "moderate", "high"];

  // Handlers for workout actions
  const handleWorkoutCreation = async (e) => {
    e.preventDefault();
    if (isEditable) {
      // Edit existing workout
      try {
        const response = await axios.patch(
          `http://localhost:3000/update/${editId}`,
          { name, duration, intensity, notes },
          { withCredentials: true }
        );
        dispatch(editWorkoutById(response.data));
        setWorkoutName("");
        setDuration("");
        setIntensity("low"); // Reset to default
        setNotes("");
        setIsEditable(false);
        setEditId(null);
        await fetchWorkouts(); // Re-fetch updated workouts
      } catch (error) {
        console.error("Error updating workout:", error.message);
        alert("Failed to update workout.");
      }
    } else {
      // Create new workout
      try {
        const response = await axios.post(
          "http://localhost:3000/create",
          { name, duration, intensity, notes },
          { withCredentials: true }
        );
        dispatch(createWorkouts(response.data));
        setWorkoutName("");
        setDuration("");
        setIntensity("low"); // Reset to default
        setNotes("");
        await fetchWorkouts(); // Re-fetch updated workouts
      } catch (error) {
        console.error("Error creating workout:", error.message);
        alert("Failed to create workout.");
      }
    }
  };

  const handleWorkoutDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteWorkoutDetailsById(id));
      await fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error.message);
      alert("Failed to delete workout.");
    }
  };

  const handleWorkoutEdit = (id, name, duration, intensity, notes) => {
    setWorkoutName(name);
    setDuration(duration);
    setIntensity(intensity);
    setNotes(notes);
    setIsEditable(true);
    setEditId(id);
  };

  const handleDeleteAllOperations = async () => {
    try {
      await axios.delete(`http://localhost:3000/deleteAll`, {
        withCredentials: true,
      });
      dispatch(deleteWorkoutDetails());
      setIsEditable(false); // Reset editable state after deleting all
      await fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workouts:", error.message);
      alert("Failed to delete All workouts.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col p-6 bg-gray-900 min-h-screen">
        {/* Workout Form Section */}
        <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{isEditable ? "Update Workout" : "Add Workout"}</h2>
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
            {/* Dropdown for Intensity */}
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="input w-full"
            >
              {intensityOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input w-full"
            />
            <button type="submit" className="btn w-full bg-blue-600">
              {isEditable ? "Update Workout" : "Add Workout"}
            </button>
          </form>
        </div>

        {/* Controls Section */}
        <div className="flex px-2">
          <input
            className="rounded-full bg-violet-100 text-xl border-2 border-purple-500 p-4 placeholder-purple-400 focus:text-violet-950 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Exercise Name..."
            value={search}
            onChange={handleSearch}
          />
          <button
            className="btn btn-outline btn-success px-3 m-2"
            onClick={() => {
              setSortOrder("asc");
              sortedWorkoutsAsc();
            }}
          >
            Ascending duration
          </button>
          <button
            className="btn btn-outline btn-warning px-3 m-2"
            onClick={() => {
              setSortOrder("desc");
              sortedWorkoutsDesc();
            }}
          >
            Descending duration
          </button>
          <button className="btn btn-outline btn-error px-3 m-2" onClick={handleDeleteAllOperations}>
            Delete All
          </button>
        </div>

        {/* Workout Cards */}
        <div className="workouts">
          {workoutsToDisplay.length === 0 ? (
            <p>No workouts to display</p>
          ) : (
            <div className="carousel carousel-center rounded-box mt-8 space-x-4 flex-nowrap">
              {workoutsToDisplay.map((workout) => (
                <Cards
                  key={workout._id}
                  {...workout}
                  onDelete={handleWorkoutDelete}
                  onEdit={handleWorkoutEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
