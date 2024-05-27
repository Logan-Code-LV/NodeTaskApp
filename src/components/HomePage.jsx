import React from "react";
import "./HomePage.css";
import Lottie from "react-lottie";
import taskLottie from "../taskLottie.json";
import MernStackIcons from "./MERN";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: taskLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="intro">
        <br />
        <h1>Logi's Task App</h1>
        <p>
          Your personal assistant to manage tasks efficiently and effectively
        </p>
        <p style={{ fontSize: "15px" }}>
          A <strong>M</strong>ongoDB <strong>E</strong>xpress <strong>R</strong>
          eact <strong>N</strong>ode.js stack application
        </p>
        <MernStackIcons />
      </div>
      <div className="features">
        <div className="feature">
          <h2>Organize</h2>
          <p>Keep all your tasks in one place and stay organized.</p>
        </div>
        <div className="feature">
          <h2>Prioritize</h2>
          <p>
            Set priorities and deadlines to keep track of what matters most.
          </p>
        </div>
        <div className="feature">
          <h2>Track</h2>
          <p>Monitor your progress and complete tasks on time.</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default HomePage;
