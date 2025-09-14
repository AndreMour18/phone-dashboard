import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "contexts/Auth";
import SignIn from "Pages/Unlogged/SignIn";
import Dashboard from "Pages/Logged/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
