import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.jsx"; 
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./Login.jsx";
import Register from "./register.jsx"; 

function AppLayout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 16 }}>
        <Outlet />
      </div>
    </>
  );
}

function ProtectedRoute({ children }) {
  const loggedIn = !!localStorage.getItem("token");
  return loggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" replace />} />

      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      
      <Route element={<AppLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Route>

      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
