import "./App.css";

import { Provider } from "react-redux";

import AppRoutes from "./router";
import store from "./redux/Store";

import { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./common/NavBar/NavBar";

export type ThemeContextProps = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

function App() {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    if (theme === "dark") {
      document
        .getElementById("nav123logo")!
        .setAttribute("src", "./images/logo.png");
    } else {
      document
        .getElementById("nav123logo")!
        .setAttribute("src", "./images/logoDark.png");
    }
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <Provider store={store}>
        <Router>
          <div className="App" id={theme}>
            <NavBar />
            <AppRoutes />
          </div>
        </Router>
      </Provider>
    </ThemeContext.Provider>
  );
}

export default App;
