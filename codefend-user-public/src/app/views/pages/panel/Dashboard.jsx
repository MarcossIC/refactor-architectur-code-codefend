import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => setTimeout(() => setShowScreen(true), 50));

  return (
    <main className={` dashboard ${showScreen ? "actived" : ""}`}>
      <section className="left">
        <div className="searchs-bar">
          <form
            className="flex flex-row h-9 mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              const history = useHistory();
              history.push(
                "/sns?search=" + searchValue() + "&class=" + searchClass()
              );
            }}
          >
            <input
              type="text"
              placeholder="sns"
              className="px-6 w-full h-full"
              required
            ></input>
          </form>
        </div>
      </section>

      <section className="right"></section>
    </main>
  );
};

export default Home;
