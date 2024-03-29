import React, { useContext, useState } from "react";
import { context, datacontext } from "../App";
import { Link } from "react-router-dom";

import { provider, auth } from "./Config";
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = () => {
  const [country, setcountry] = useContext(context);
  const [filterList, setFilteredList] = useState([]);
  const [data, setdata] = useContext(datacontext);

  const [userName, setuserName] = useState("");

  const [isLoggedIn, setLoggedIn] = useState(false);

  const filterSearch = (event) => {
    setFilteredList(
      data.filter(
        (f) => f.author && f.author.toLowerCase().includes(event.target.value)
      )
    );
    filterList.map((element) => {
      console.log(element.author);
    });
  };

  const handleClick = (event) => {
    signInWithPopup(auth, provider).then((data) => {
      setuserName(data.user.displayName);
      setLoggedIn(true);
    });
  };

  const logoutHandler = () => {
    signOut(auth).then(() => {
      console.log("SignOut successfully");
      setuserName("");
      setLoggedIn(false);
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Inshorts
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Search
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        setcountry("in");
                      }}
                    >
                      India
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        setcountry("cn");
                      }}
                    >
                      China
                    </a>
                  </li>

                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        setcountry("sa");
                      }}
                    >
                      Spain
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        setcountry("us");
                      }}
                    >
                      USA
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {isLoggedIn ? (  <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={filterSearch}
              />
            </form>):<span>For Search Feature Login First</span>}
          
            <span>
              {isLoggedIn ? (
                <div>
                  <span>Hey,{userName} </span>
                  <button onClick={logoutHandler}>LogOut</button>
                </div>
              ) : (
                <button style={{marginLeft:"10px"}} onClick={handleClick}>Sign In</button>
              )}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
