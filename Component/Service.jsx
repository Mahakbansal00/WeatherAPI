import React from "react";
import { motion } from "framer-motion";
import "./Service.css";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const services = [
  {
    icon: "fas fa-code",
    title: "Web Development",
    description:
      "I build full-stack web applications using React, Angular, Node.js, and Spring Boot.",
  },
  {
    icon: "fas fa-laptop-code",
    title: "Programming Expertise",
    description:
      "Solved over 1000 coding problems across platforms like LeetCode, CodeStudio, and GFG.",
  },
  {
    icon: "fas fa-database",
    title: "Backend & Databases",
    description:
      "Experience with REST APIs, MySQL, MongoDB, and Spring Data JPA.",
  },
];

export default function Service() {
  return (
    <section className="services section dark" id="services">
      <h2 className="section-title">My Skills & Services</h2>

      <div className="services-container">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <i className={service.icon + " service-icon"}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
