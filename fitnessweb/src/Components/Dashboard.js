import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createWorkouts } from "../features/workoutsSlice";
import { createRecord } from "../features/recordSlice";

const Dashboard = () => {

  //dispatch For Workout
  const dispatch = useDispatch();

  // Workout State
  const [name, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [notes, setNotes] = useState("");

  // Record State
  const [exerciseType, setExerciseType] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [maxReps, setMaxReps] = useState("");
  const [recordDate, setRecordDate] = useState("");

  // Handlers for Workout State
  const handleWorkoutChange = (e) => setWorkoutName(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleIntensityChange = (e) => setIntensity(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

  // Handlers for Record State
  const handleExerciseTypeChange = (e) => setExerciseType(e.target.value);
  const handleMaxWeightChange = (e) => setMaxWeight(e.target.value);
  const handleMaxRepsChange = (e) => setMaxReps(e.target.value);
  const handleRecordDateChange = (e) => setRecordDate(e.target.value);

  //API Handle For Creation 
  const handleWorkoutCreation = async ()=>
  {
      try 
      {
        const workout = await axios.post("http://localhost:3000/create", {
          name,
          duration,
          intensity,
          notes
      }, {
          withCredentials: true
      });      

      dispatch(createWorkouts(workout.data));
        console.log(workout.data);
        
      } catch (error) 
      {

        alert(error.message);
      }
  }
  const handleRecordCreation = async ()=>
    {
        try 
        {
          const workout =await axios.post("http://localhost:3000/record/create",{
            exerciseType,
            maxWeight,
            maxReps,
            recordDate
          },
          {withCredentials:true}
        )
  
          dispatch(createRecord(workout.data));

        } catch (error) 
        {
  
          alert(error.message);
        }
    }

  return (
    <div>
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 p-6 bg-gray-900 min-h-screen">
        <main className="flex-1 space-y-8">
          {/* Workouts Section */}
          <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Add Workout</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-1">Workout Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., Yoga Session"
                  value={name}
                  onChange={handleWorkoutChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Duration (mins)</label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., 30"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Intensity</label>
                <select
                  className="input input-bordered w-full bg-gray-700 text-white"
                  value={intensity}
                  onChange={handleIntensityChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Notes</label>
                <textarea
                  className="textarea textarea-bordered w-full bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., Relaxed and stretched well."
                  value={notes}
                  onChange={handleNotesChange}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                onClick={handleWorkoutCreation}
              >
                Add Workout
              </button>
            </form>
          </section>

          {/* Fitness Records Section */}
          <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Add Fitness Record</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-1">Exercise Type</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., Bench Press"
                  value={exerciseType}
                  onChange={handleExerciseTypeChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Max Weight (kg)</label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., 100"
                  value={maxWeight}
                  onChange={handleMaxWeightChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Max Reps</label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400"
                  placeholder="e.g., 12"
                  value={maxReps}
                  onChange={handleMaxRepsChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full bg-gray-700 text-white"
                  value={recordDate}
                  onChange={handleRecordDateChange}
                />
              </div>
              <button
                type="button"
                className="btn w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                onClick={handleRecordCreation}
              >
                Add Record
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
