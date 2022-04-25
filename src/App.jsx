import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Character from "./pages/Character";
import Characters from "./pages/Characters";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/characters" element={<Characters />} />
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
