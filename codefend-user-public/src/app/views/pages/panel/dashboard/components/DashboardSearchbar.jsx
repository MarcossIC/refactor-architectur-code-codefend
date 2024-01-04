import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../../components";

const DashboardSearchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchClass, setSearchClass] = useState("");

  return (
    <div className="searchs-bar">
      <div className="search-items">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const navigate = useNavigate();
            navigate("/sns?search=" + searchValue + "&class=" + searchClass);
          }}
        >
          <input
            id="search-bar"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="sns"
            required
          />

          <label name="states" className="sr-only">
            class
          </label>
          <select
            id="states"
            name="states"
            onChange={(e) => {
              setSearchClass(e.target.value);
            }}
            value={searchClass}
          >
            <option value="" disabled>
              Choose a class
            </option>
            <option value="email">email</option>
            <option value="username">username</option>
            <option value="password">password</option>
            <option value="name">full name</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary no-border-height search-button"
          >
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardSearchbar;
