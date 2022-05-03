import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Navbar from "./layers/Navbar";
import Character from "./pages/Characters/Character";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Comic from "./pages/Comics/Comic";

const App = () => {
  return (
    <Router>
      <Navbar>
        <Switch>
          <Route path="/" element={<Characters />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:id" element={<Comic />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Switch>
      </Navbar>
    </Router>
  );
};

export default App;
