import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./utils/PrivateRoute";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <AuthProvider> */}
        <Routes>
          {/* <Route element={<PrivateRoutes />}> */}
          <Route>
            <Route element={<HomePage />} path="/" exact />
          </Route>
          <Route element={<LoginPage />} path="/login" />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
