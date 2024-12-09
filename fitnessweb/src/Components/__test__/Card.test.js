import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cards from "../Cards";
import '@testing-library/jest-dom';


describe("Cards Component", () => {
  const mockWorkout = {
    _id: "1",
    name: "Morning Run",
    duration: "30",
    intensity: "moderate",
    notes: "Felt good!",
  };

  
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  test("renders workout details correctly", () => {
    render(
      <Cards
        {...mockWorkout}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    // Use a partial text match for the rendered content
    expect(screen.getByText(/Exercise: Morning Run/i)).toBeInTheDocument();
    expect(screen.getByText(/Duration: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/Intensity: moderate/i)).toBeInTheDocument();
    expect(screen.getByText(/Notes: Felt good!/i)).toBeInTheDocument();
  });
//Edit API Function
  it("should call edit function when edit button is clicked",async() =>
  {
    const mockEdit = jest.fn();

    render(
      <Cards
      _id="1"
      name="Push-up"
      duration="15"
      intensity="high"
      notes="Good workout"
      onDelete={() => {}}
      onEdit={mockEdit}
      />
    );


    fireEvent.click(screen.getByText("EDIT"));

    expect(mockEdit).toHaveBeenCalledWith("1","Push-up", "15", "high", "Good workout");
  })
//Delete API Function
it("Should delete", async()=>
{
  

  render(
    
      <Cards
        _id="1"
        name="Push-up"
        duration="15"
        intensity="high"
        notes="Good workout"
        onDelete={mockOnDelete}
        onEdit={() => {}}
      />
  );

 fireEvent.click(screen.getByTestId("delete-button-1"));

 expect(mockOnDelete).toHaveBeenCalledWith("1");


})



});
