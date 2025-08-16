import React, { useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fmkmbre", // e.g., service_xxxx
        "template_87es6ye", // e.g., template_xxxx
        form.current,
        "mCs54LcKjTmP-4G_2" // e.g., wP5Yz_xxxxx
      )
      .then(
        (result) => {
          alert("Message sent successfully! ✅");
          form.current.reset();
        },
        (error) => {
          console.error("EmailJS error:", error.text);
          console.log("Sending form data:", form.current);

          alert("Failed to send message ❌. Try again.");
        }
      );
  };
  console.log("Sending form data:", form.current);

  return (
    <section className="contact section" id="contact">
      <h2 className="section-title">Contact Me</h2>

      <div className="contact-container">
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Mahak Bansal" required />
          <input type="email" name="email" placeholder="Mahakbansal58@gmail.com" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Get in touch</h3>
          <p>
            <i className="fas fa-envelope"></i> Mahakbansal58@gmail.com
          </p>
          <p>
            <i className="fas fa-phone"></i> 9354885420
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> Gurgaon, India
          </p>
        </div>
      </div>
    </section>
  );
}
