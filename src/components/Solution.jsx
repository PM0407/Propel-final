import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaChalkboardTeacher, FaUsers, FaTrophy } from "react-icons/fa";


const solutions = [
  {
    title: "Startup Consulting",
    description: "We provide end-to-end guidance for registering and growing your startup efficiently.",
    icon: <FaBriefcase />,
  },
  {
    title: "Mentorship",
    description: "Connect with experienced mentors who guide you through business growth strategies.",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Business Networking",
    description: "Gain access to investors, partners, and networking events tailored for startups.",
    icon: <FaUsers />,
  },
  {
    title: "Hackathon Participation",
    description: "We help startups showcase solutions and participate in hackathons for real-world impact.",
    icon: <FaTrophy />,
  },
];

const Solution = () => {
  return (
    <section className="solution-section" id="solution">
      <h2 className="solution-heading">Our Solution</h2>
      <p className="solution-subheading">
        We solve the challenges startups face, from registration to growth and networking.
      </p>
      <div className="solution-cards">
        {solutions.map((item, index) => (
          <motion.div
            key={index}
            className="solution-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="solution-icon">{item.icon}</div>
            <h3 className="solution-title">{item.title}</h3>
            <p className="solution-description">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Solution;
