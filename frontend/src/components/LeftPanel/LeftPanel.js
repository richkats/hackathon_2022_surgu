import "./LeftPanel.css";

import { ReactComponent as IconEvents } from "./icoEvents.svg";
import { ReactComponent as IconSettings } from "./icoSettings.svg";
import { ReactComponent as IconLogOut } from "./icoLogOut.svg";

import { useState } from "react";

function LeftPanel({ onChange }) {
  const [page, setpage] = useState("Main");

  return (
    <div className="LeftPanel">
      <div
        className={`menuBtn ${page === "Main" ? "selected" : ""}`}
        onClick={() => {
          setpage("Main");
          if (onChange != null) onChange("Main");
        }}
      >
        <IconEvents />
      </div>
      <div
        className={`menuBtn ${page === "Settings" ? "selected" : ""}`}
        onClick={() => {
          setpage("Settings");
          if (onChange != null) onChange("Settings");
        }}
      >
        <IconSettings />
      </div>
      <div
        className={`menuBtn ${page === "Logout" ? "selected" : ""}`}
        onClick={() => {
          setpage("Logout");
          if (onChange != null) onChange("Logout");
        }}
      >
        <IconLogOut />
      </div>
    </div>
  );
}

export default LeftPanel;
