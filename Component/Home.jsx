import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="name">Mahak Bansal</h1>
        <p className="role">
          I'm a{" "}
          <span className="highlight">passionate Full Stack Developer</span>{" "}
          <br />
          skilled in React, Node.js, Spring Boot, MySQL, Angular <br />
          and solved <strong>1000+ coding problems</strong>.
        </p>
        <a href="/final%20me%20resume.pdf" download className="btn">
          Download Resume
        </a>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/mahak-bansal-66896233a/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/Mahakbansal00" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-code"></i>
          </a>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-laptop-code"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
