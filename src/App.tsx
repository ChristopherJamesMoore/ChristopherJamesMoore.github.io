// App.tsx

// import React from 'react'; // uncomment if need
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // Adjust the import path if necessary
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You can add more routes here for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
