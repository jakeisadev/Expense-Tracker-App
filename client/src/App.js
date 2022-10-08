import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Utilizing BrowserRouter to make navigation simple between pages */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* ProtectedRoute function makes the route accessible only to those with an account in localstorage */}
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
                <Login />
            }
          />
          <Route
            path="/register"
            element={
                <Register />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRoute(props) {
  // Make sure the Routes are accessible to those who have registered
  if (localStorage.getItem("cash-watch-user")) {
    {
      // If they have registered, return the pages of the app
    return props.children;
    }
  } else {
    // If they aren't registered, return to Login so they have the opportunity to navigate themselves to register if needed
    return <Navigate to="/login" />;
  }
}

export default App;
