import React from "react";
import "./Project.css"; // Ensure this file exists with proper styles

const projectData = [
  {
    title: "Fast-Easy-App",
    description:
      "A responsive e-commerce frontend built with React. Includes product listings, cart, and modern UI.",
    link: "https://exquisite-peony-2a7ab0.netlify.app/",
    image: "/images/ProjectSS.png", // Place this in public/images/
  },
];
export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">My Projects</h2>
      <div className="project-grid">
        {projectData.map((proj, idx) => (
          <div key={idx} className="project-card">
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-description">{proj.description}</p>
            <img src={proj.image} alt={proj.title} className="project-image" />
            <a
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              🔗 Live Demo
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
