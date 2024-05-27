import React from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import "./styles.css";

const MernStackIcons = () => {
  return (
    <div className="main-mern-stack-icons-container">
      <div className="mern-stack-icons-container">
        <div className="icon-item">
          <SiMongodb className="icon mongodb" />
          <p>M</p>
        </div>
        <div className="icon-item">
          <SiExpress className="icon express" />
          <p>E</p>
        </div>
        <div className="icon-item">
          <FaReact className="icon react" />
          <p>R</p>
        </div>
        <div className="icon-item">
          <FaNodeJs className="icon nodejs" />
          <p>N</p>
        </div>
      </div>
    </div>
  );
};

export default MernStackIcons;
