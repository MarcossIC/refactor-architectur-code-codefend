import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardSearchbar = () => {
  const [searchValue, setSearchValue] = createSignal("");
  const [searchClass, setSearchClass] = createSignal("");

  return (
    <div className="searchs-bar">
      <form
        className="flex flex-row h-9 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          const navigate = useNavigate();
          navigate("/sns?search=" + searchValue + "&class=" + searchClass);
        }}
      >
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="sns"
          className="px-6 w-full h-full"
          required
        />

        <label for="states" class="sr-only">
          class
        </label>
        <select
          id="states"
          class="text-sm block w-2xl p-2.5"
          onChange={(e) => setSearchClass(e.target.value)}
        >
          <option selected>Choose a class</option>
          <option value="email">email</option>
          <option value="username">username</option>
          <option value="password">password</option>
          <option value="name">full name</option>
        </select>

        <button
          type="submit"
          class="btn btn-primary no-border-height w-14 items-center justify-center"
        >
          * Magnifying Glass *
        </button>
      </form>
    </div>
  );
};

export default DashboardSearchbar;
