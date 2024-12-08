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
  onDelete,
  onEdit
}) => {


  return (
    <div className="bg-gray-900 rounded-2xl border-2 border-blue-700 bg-clip-padding p-5 w-80 relative shadow-custom  hover:scale-95 hover:shadow-custom-lg">
      

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

      

      <div className='flex items-center justify-between mt-4'>
        {/* Custom Button */}
        <button
         data-testid="delete-button-1"
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
        <button className="cursor-pointer inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-mono font-semibold text-rose-600 hover:text-white border-2 border-rose-600 hover:bg-rose-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75 hover:bg-rose-600 duration-300 focus:bg-transparent"
        onClick={()=>onEdit(_id,name,duration,intensity,notes)}
        >
          EDIT
        </button>
      </div>
    </div>
  );
};

export default Card;
