import React from "react";
import { Helmet } from "react-helmet-async";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <Helmet>
        <title>Propel Foundry | Connect & Explore</title>
        <meta
          name="description"
          content="Propel Foundry: Connect with startups, mentors, and resources. Explore our platform, guides, events, and support for growth and innovation."
        />
      </Helmet>

      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo">
            <h3>PropelFoundry</h3>
            <p>Empowering startups with mentorship, funding & global connections.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/propelfoundry"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/propelfoundry"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h4>Platform</h4>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#tools">Tools</a></li>
                <li><a href="#plans">Plans</a></li>
                <li><a href="#faq">Help</a></li>
                <li><a href="#contact">Connect</a></li>
              </ul>
            </div>

            <div>
              <h4>Resources</h4>
              <ul>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#guides">Guides</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>

            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
                <li><a href="#cookies">Cookies</a></li>
                <li><a href="#access-policy">Access Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Propel Foundry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
