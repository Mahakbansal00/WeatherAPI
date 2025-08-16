import React from "react";
import "./InternshipExperience.css"; // Import the CSS file

const internships = [
  {
    company: "Central Raiway of Information System,Delhi",
    role: "FullStack Developer Intern",
    duration: "Aug 2024 - Nov 2024",
    description:
      "Contributed to the Signal Maintenance and Management System project, developing and optimizing full-stack features using Angular, Node.js and postgreSql. Focused on building responsive UI dashboards, integrating backend APIs, and improving data flow for real-time signal tracking. Gained hands-on experience in version control, RESTful APIs, and agile development practices.",
  },
];

export default function InternshipExperience() {
  return (
    <section id="experience" className="internship-section">
      <h2 className="section-title">Internship Experience</h2>
      <div className="internship-list">
        {internships.map((intern, index) => (
          <div className="internship-card" key={index}>
            <h3>{intern.role}</h3>
            <h4>{intern.company}</h4>
            <p className="duration">{intern.duration}</p>
            <p>{intern.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
