import React from "react";
import ReactDOM from "react-dom/client";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { listen } from "@tauri-apps/api/event";
import App from "./app/App";
import "./index.css";

// Tauri
const RUNNING_IN_TAURI = window.__TAURI__ !== undefined;
const startInstall = () => {
  //installUpdate().then(relaunch);
};

if (RUNNING_IN_TAURI) {
  try {
    listen("tauri://update-available", (res) => {
      console.log("New version available: ", res);
    });

    const { shouldUpdate, manifest } = await checkUpdate();
    console.log(shouldUpdate);
    if (shouldUpdate) {
      await installUpdate();
      await relaunch();
    }
  } catch (e) {
    alert(e);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
