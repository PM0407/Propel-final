import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Training from "./components/Training";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Community from "./components/Community";
import Opportunities from "./components/Opportunities";
import EventDetail from "./components/EventDetail";
import NotFound from "./components/404pagenotfount";
import CommunitySection from "./components/CommunitySection"; 

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {/* FIX 1: Map the home page content only to the root path (/) */}
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <Training />
                            <CommunitySection /> 
                            <CTA />
                            <FAQ />
                        </>
                    }
                />

                {/* FIX 2: Remove the separate /home route. 
                          If any legacy links point to /home, redirect them explicitly to /
                          This ensures the URL bar always shows the clean root path.
                */}
                <Route path="/home" element={<Navigate to="/" replace />} />


                {/* Other Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/community" element={<Community />} />
                <Route path="/opportunities" element={<Opportunities />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;