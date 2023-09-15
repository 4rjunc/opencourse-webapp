import "./index.css";
//import Navbar from './pages/Navbar'
import Course from "./components/Course";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Administrator from "./components/Administrator";
import { motion } from "framer-motion";

function App() {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/course"
            element={
              <PrivateRoute>
                <motion.div
                  initial={{ opacity: 0, y: -20 }} // Initial state
                  animate={{ opacity: 1, y: 0 }} // Animate to this state
                  exit={{ opacity: 0, y: -20 }} // Exit animation
                  transition={{ duration: 0.5 }} // Animation duration
                >
                  <Course />
                </motion.div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/administrator"
            element={
              <PrivateRoute>
                <Administrator />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
