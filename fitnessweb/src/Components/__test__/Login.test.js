import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from "../Login";
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../../features/appStore'; 
import { BrowserRouter as Router } from 'react-router-dom';
import userReducer from "../../features/userSlice"
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// Mock axios
jest.mock('axios');

const mockStore = configureStore({
    reducer:{
        user: userReducer
    }
})

// Helper function to render component with the Redux store and router
const renderWithProviders = (ui) => {
  return render(
    <Provider store={mockStore}>
      <Router>{ui}</Router>
    </Provider>
  );
};
//render test
describe('Login Component', () => {
  test('renders login form by default', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  //login test
  test('handles login correctly', async () => {
    // Mock successful login API response
    axios.post.mockResolvedValueOnce({
        data: { token: 'fake-token', user: { email: 'test@example.com' } }
      });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
        target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
        target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:3000/auth/login',
          { email: 'test@example.com', password: 'password123' },
          expect.objectContaining({ withCredentials: true }) // Check for withCredentials in the third argument
        );
      });
});

//logout Component
test('renders signup form when "Sign up" button is clicked', async () => {
    renderWithProviders(<Login />);

    // Click on the "Sign up" button
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    // After clicking, ensure that the signup form is displayed
    await waitFor(() => {
      expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  //logout API Axios
  test('handles signup correctly', async () => {

    axios.post.mockResolvedValueOnce({
        data: { token: 'fake-signup-token', user: { email: 'test@example.com' } }
    })

    renderWithProviders(<Login/>);

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
        target: { value: 'Arpit Beuria' }
      });


    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i),{
        target:{ value : 'test@example.com'}
    });

  
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
        target: { value: 'password123' }
      });

      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      await waitFor(()=>{
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/auth/register',
            { email: 'test@example.com',name:'Arpit Beuria', password: 'password123' },
            expect.objectContaining({ withCredentials: true })
        )
      })

  })

});
