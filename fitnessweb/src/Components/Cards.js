import React from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkoutDetailsById } from '../features/workoutsSlice';


const Card = ({ 
  _id,
  name, 
  duration, 
  intensity, 
  notes, 
  exerciseType, 
  maxWeight, 
  maxReps, 
  recordDate,
  onDelete
}) => {


  return (
    <div className="bg-gray-900 rounded-2xl border-2 border-transparent bg-clip-padding p-5 w-80 relative shadow-custom transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-custom-lg">
      {/* Heart Icon */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-transparent p-2 rounded-full flex justify-center items-center text-pink-400 shadow-lg">
        <svg
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path d="M12 21C10.28 19.67 1.32 13.45 3.2 8.2c1.5-4.12 5.5-4.12 7.8-1.47C13.3 4.08 17.3 4.08 18.8 8.2c1.88 5.25-7.08 11.47-6.8 12.8z" />
        </svg>
      </div>

      {/* Content Section */}
      <div className="flex flex-col text-white">
        {name && (
          <>
            <p className="text-sm font-normal opacity-80">Exercise: {name}</p>
            <p className="text-2xl font-bold opacity-90">Duration: {duration} mins</p>
            <p className="text-sm opacity-80">Intensity: {intensity}</p>
            <p className="text-sm opacity-80">Notes: {notes}</p>
          </>
        )}
        {exerciseType && (
          <>
            <p className="text-sm font-normal opacity-80">Type: {exerciseType}</p>
            <p className="text-sm opacity-80">Max Weight: {maxWeight} kg</p>
            <p className="text-sm opacity-80">Max Reps: {maxReps}</p>
            <p className="text-sm opacity-80">Date: {recordDate}</p>
          </>
        )}
      </div>

      {/* Graph */}
      <div className="mt-5">
        <svg viewBox="0 0 400 100" className="w-full h-24">
          <path
            className="line line1"
            d="M0,50 Q50,30 100,40 T200,60 T300,50 T400,80"
          />
          <path
            className="line line2"
            d="M0,60 Q50,40 100,50 T200,70 T300,60 T400,90"
          />
        </svg>
        <div className="flex justify-between mt-2 text-gray-400 text-xs">
          <span>8am</span>
          <span>10am</span>
          <span>12pm</span>
          <span>2pm</span>
          <span>4pm</span>
          <span>6pm</span>
        </div>
      </div>

      <div className='flex items-center justify-between mt-4'>
        {/* Custom Button */}
        <button
          className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
          onClick={()=>onDelete(_id)}
        >
          <svg
            viewBox="0 0 1.625 1.625"
            className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
            height="15"
            width="15"
          >
            <path
              d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
            ></path>
            <path
              d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
            ></path>
            <path
              d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
            ></path>
          </svg>
          <svg
            width="16"
            fill="none"
            viewBox="0 0 39 7"
            className="origin-right duration-500 group-hover:rotate-90"
          >
            <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
            <line
              strokeWidth="3"
              stroke="white"
              y2="1.5"
              x2="26.0357"
              y1="1.5"
              x1="12"
            ></line>
          </svg>
          <svg width="16" fill="none" viewBox="0 0 33 39" className="">
            <mask fill="white" id="path-1-inside-1_8_19">
              <path
                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
              ></path>
            </mask>
            <path
              mask="url(#path-1-inside-1_8_19)"
              fill="white"
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
            ></path>
            <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
            <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
          </svg>
         
        </button>

        {/* Edited Button */}
        <button className="cursor-pointer inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-mono font-semibold text-rose-600 hover:text-white border-2 border-rose-600 hover:bg-rose-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-rose-600 duration-300 focus:bg-transparent">
          EDIT
        </button>
      </div>
    </div>
  );
};

export default Card;
