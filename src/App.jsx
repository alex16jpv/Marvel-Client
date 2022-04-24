import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Character from "./pages/Character";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/characters/:id" element={<Character />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
