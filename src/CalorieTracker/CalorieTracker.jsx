// src/CalorieTracker/CalorieTracker.jsx

import React, { useState } from 'react';

function CalorieTracker() { 
  // State Management
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [results, setResults] = useState(null); 
  const [error, setError] = useState('');

  // Event Handler Function
  const handleCalculate = () => {
    setError('');

    const goal = parseFloat(dailyGoal);
    const bCal = Number(breakfast) || 0;
    const lCal = Number(lunch) || 0;
    const dCal = Number(dinner) || 0;
    const sCal = Number(snacks) || 0;

    // Validation
    if (!name.trim() || isNaN(goal) || goal <= 0) {
      setError("Please enter your Name and a positive Daily Calorie Goal.");
      setResults(null);
      return;
    }
    if (bCal < 0 || lCal < 0 || dCal < 0 || sCal < 0) {
      setError("Calorie inputs cannot be negative.");
      setResults(null);
      return;
    }
    
    // Calculation
    const totalConsumed = bCal + lCal + dCal + sCal;
    const remainingCalories = goal - totalConsumed;
    setResults({ totalConsumed, remainingCalories });
  };

  const isExceeded = results && results.remainingCalories < 0;
  
  return (
    // Centering the content horizontally and vertically
    <div className="container d-flex align-items-center justify-content-center min-vh-100"> 
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="card-title text-center text-primary mb-4">
          <span role="img" aria-label="apple">🍎</span> Calorie Tracker App
        </h2>

        {/* --- Input Form (Using Hooks & Input Handling) --- */}
        <form>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
          </div>

          <div className="mb-4">
            <label className="form-label">Daily Calorie Goal (kcal):</label>
            <input type="number" className="form-control" value={dailyGoal} onChange={(e) => setDailyGoal(e.target.value)} min="1" placeholder="e.g., 2000"/>
          </div>

          <h5 className="text-secondary mb-3">Meal Calories Consumed</h5>
          
          <div className="row g-2 mb-3">
            <div className="col-md-6"><input type="number" className="form-control" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} placeholder="Breakfast kcal" min="0"/></div>
            <div className="col-md-6"><input type="number" className="form-control" value={lunch} onChange={(e) => setLunch(e.target.value)} placeholder="Lunch kcal" min="0"/></div>
          </div>
          <div className="row g-2 mb-4">
            <div className="col-md-6"><input type="number" className="form-control" value={dinner} onChange={(e) => setDinner(e.target.value)} placeholder="Dinner kcal" min="0"/></div>
            <div className="col-md-6"><input type="number" className="form-control" value={snacks} onChange={(e) => setSnacks(e.target.value)} placeholder="Snacks kcal" min="0"/></div>
          </div>
        </form>

        {/* Error Message Display */}
        {error && (<div className="alert alert-danger" role="alert">{error}</div>)}

        {/* --- Calculate Button (Event Handling) --- */}
        <button onClick={handleCalculate} className="btn btn-success w-100 mb-3">
          **Calculate Calories**
        </button>

        {/* --- Results Display (Conditional Rendering) --- */}
        {results !== null && (
          <div className="card mt-3 border-success">
            <div className="card-body">
              <h5 className="card-title">Summary for {name}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  **Total Consumed:**
                  <span className="badge bg-warning text-dark">{results.totalConsumed} kcal</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  **Remaining Calories:**
                  <span className={`badge ${isExceeded ? 'bg-danger' : 'bg-success'} fs-5`}>
                    {results.remainingCalories} kcal
                  </span>
                </li>
              </ul>
              
              <p className={`mt-3 text-center fw-bold ${isExceeded ? 'text-danger' : 'text-success'}`}>
                {isExceeded 
                  ? "⚠️ GOAL EXCEEDED! (Negative Remaining Calories)"
                  : "✅ You are within your daily goal!"
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalorieTracker;