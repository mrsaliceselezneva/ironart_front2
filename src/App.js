import "./App.css";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Moder from "./pages/moder";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/context";

export default function App() {
  const [nextQuestion, setNextQuestion] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/next_questions`)
      .then((response) => {
        setNextQuestion(response.data);
      });
  }, []);

  if (!nextQuestion) return null;

  const value = nextQuestion[0].number;

  return (
    <ThemeContext.Provider value={value}>
      <Router>
        <Routes>
          <Route
            exact
            path="/user"
            element={<User id={nextQuestion[0].number} />}
          />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/moder" element={<Moder />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}
