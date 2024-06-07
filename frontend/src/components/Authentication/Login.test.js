// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios'; // Import axios for mocking

import Login from './Login'; // Import the Login component

// Mock axios to prevent actual HTTP requests during tests
jest.mock('axios');

test('renders email and password input fields', () => {
  render(<Login />);
  
  const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
  expect(emailInput).toBeInTheDocument();
  
  const passwordInput = screen.getByPlaceholderText('Enter password');
  expect(passwordInput).toBeInTheDocument();
});

test('toggles password visibility', () => {
  render(<Login />);
  
  const passwordInput = screen.getByPlaceholderText('Enter password');
  const toggleButton = screen.getByText('Show');
  
  expect(passwordInput).toHaveAttribute('type', 'password');
  
  fireEvent.click(toggleButton);
  expect(passwordInput).toHaveAttribute('type', 'text');
});

test('submits form with valid data', async () => {
  render(<Login />);
  
  const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
  const passwordInput = screen.getByPlaceholderText('Enter password');
  const loginButton = screen.getByText('Login');
  
  // Mock user input
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  // Mock axios post request
  axios.post.mockResolvedValueOnce({ data: { /* Mock user data */ } });
  
  // Trigger form submission
  fireEvent.click(loginButton);
  
  // Expect loading state
  expect(loginButton).toBeDisabled();
  
  // Wait for async operations to complete
  await screen.findByText('Login Successful');
  
  // Expect login success message
  expect(screen.getByText('Login Successful')).toBeInTheDocument();
});

// Add more test cases for edge cases, error handling, etc.
