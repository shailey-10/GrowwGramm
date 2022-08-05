import { useState, useCallback, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { FaHome, FaHeart, FaUserCircle, FaSearch } from "react-icons/fa";
import ReactSwitch from "react-switch";

import { fetchSearch } from "../../redux/Search/SearchAction";
import { ThemeContext, ThemeContextProps } from "../../App";

import "./navBar.css";

function NavBar({ fetchSearch }: { fetchSearch: any }) {
  const [searchBar, setSearchbar] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextProps;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchbar(true);
    } else {
      setSearchbar(false);
    }
  }, [location]);

  const debounce = (func: { (event: any): void; apply?: any }) => {
    let timer: string | number | NodeJS.Timeout | null | undefined;
    return function (this: unknown, ...args: any) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  function search(event: { target: { value: any } }) {
    fetchSearch(event.target.value);
  }

  const optimizedVersion = useCallback(debounce(search), []);

  return (
    <>
      <div className="nav123Bar">
        <div className="nav123Logo">
          <Link to="/">
            {" "}
            <img src="./images/logo.png" id="nav123logo" alt="" />{" "}
          </Link>
        </div>
        <div className="nav123SearchContainer">
          <Link className="nav123SearchBar" to="/search">
            {" "}
            <input
              type="text"
              placeholder="search"
              onChange={optimizedVersion}
            />{" "}
          </Link>
        </div>
        <div className="nav123ActionsContainer">
          <Link to="/">
            {" "}
            <FaHome />{" "}
          </Link>
          <Link to="/saved">
            <FaHeart />{" "}
          </Link>
          <Link to="/recentUser">
            {" "}
            <FaUserCircle />{" "}
          </Link>
          <Link to="/search">
            {" "}
            <FaSearch />{" "}
          </Link>
          <ReactSwitch
            onChange={toggleTheme}
            checked={theme === "dark"}
            height={18}
            width={36}
          />
        </div>
      </div>
      {searchBar ? (
        <div className="nav123SearchMobile">
          <Link className="nav123SearchBarMobile" to="/search">
            {" "}
            <input
              type="text"
              placeholder="search"
              onChange={optimizedVersion}
            />{" "}
          </Link>
        </div>
      ) : null}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    searchData: state,
  };
};

const mapDispatchtoProps = (dispatch: any) => {
  return {
    fetchSearch: (value: any) => dispatch(fetchSearch(value)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(NavBar);
