import React from "react";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="about-container">
        <div className="about-left" data-aos="fade-right">
<img src="/images/me.jpg" alt="Mahak Bansal" />
        </div>

        <div className="about-right" data-aos="fade-left">
          <h2 className="section-title">About Me</h2>
          <p>
            👋 Hello! I'm <strong>Mahak Bansal</strong>, a{" "}
            <strong>Full Stack Developer</strong> with a deep passion for
            building clean, responsive, and impactful web applications.
          </p>
          <p>
            I specialize in{" "}
            <strong>
              Java, Spring Boot, Node.js, React, Angular, and MySQL
            </strong>
            . I love turning ideas into real-world projects and solving coding
            problems.
          </p>
          <p>
            With over <strong>1000+ coding questions</strong> solved on
            platforms like LeetCode and GFG, I have a strong foundation in{" "}
            <strong>Data Structures & Algorithms</strong>.
          </p>
          <p>
            I aim to work on scalable products, learn continuously, and
            contribute to amazing teams.
          </p>
        </div>
      </div>
    </section>
  );
}
