import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import {
    Container,
    Box,
    Typography,
    Button,
    IconButton,
    useMediaQuery,
    useTheme,
    Stack,
    alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RocketLaunchOutlined from "@mui/icons-material/RocketLaunchOutlined";
import log1 from "./assets/"
// Placeholder assets for local imports
const images = [
    "https://placehold.co/800x450/121490/ffffff?text=Strategy+%26+Compliance",
    "https://placehold.co/800x450/fd3007/ffffff?text=Mentorship+Network",
    "https://placehold.co/800x450/007bff/ffffff?text=Growth+Training",
    "https://placehold.co/800x450/121490/ffffff?text=Funding+Access",
    "https://placehold.co/800x450/fd3007/ffffff?text=Global+Reach",
];

// --- BRAND COLOR PALETTE (Copied for consistency) ---
const BRAND = {
    primary: "#121490", 
    accent: "#fd3007", 
    lightBg: "#f7f9fc", 
    secondaryAccent: "#007bff", 
    textPrimaryDark: "#1a1a1a", 
};

// --- ROTATING TEXT EFFECT REPLACEMENT ---
const rotatingTexts = ["Launch", "Grow", "Scale", "Succeed", "Impact"]; // 5 words for 5 images
const SLIDE_DURATION = 2000; // 2 seconds per slide

const RotatingText = ({ currentTextIndex }) => {
    const textIndex = currentTextIndex % rotatingTexts.length; 
    const textTransition = { duration: 0.6, ease: "easeInOut" }; 
    
    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={textIndex}
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={textTransition}
                style={{ 
                    display: 'inline-block', 
                    color: BRAND.accent, 
                    fontWeight: 900,
                }}
            >
                {rotatingTexts[textIndex]}
            </motion.span>
        </AnimatePresence>
    );
};


const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false); 
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Autoplay logic (2000ms sync)
    useEffect(() => {
        if (paused) return; 
        const timer = setInterval(() => {
            setCurrent((s) => (s + 1) % images.length);
        }, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [paused]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Manual navigation pauses autoplay
    const next = () => {
        setPaused(true);
        setCurrent((s) => (s + 1) % images.length);
    };
    const prev = () => {
        setPaused(true);
        setCurrent((s) => (s - 1 + images.length) % images.length);
    };

    // Navigation functions (Simulated)
    const goToServices = () => console.log("Navigating to /services");
    const goToContact = () => console.log("Navigating to /contact");

    return (
        <Box
            component="section"
            // No longer uses ref/inView, animation is forced
            sx={{
                background: BRAND.lightBg,
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                pt: { xs: 12, md: 8 },
                pb: { xs: 4, md: 6 },
                overflow: "hidden",
            }}
            aria-labelledby="hero-heading"
        >
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: "column-reverse", md: "row" }}
                    spacing={{ xs: 5, md: 8 }}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ maxWidth: '1400px', mx: 'auto' }}
                >
                    {/* Left: text + actions */}
                    <motion.div
                        style={{ flex: 1, width: "100%" }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <Box sx={{ maxWidth: 650 }}>
                            {/* <Typography
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    color: BRAND.primary,
                                    fontSize: { xs: "1rem", sm: "1.2rem" },
                                    textTransform: 'uppercase',
                                    letterSpacing: 2,
                                    mb: 1.5
                                }}
                            >
                                Propel Foundry
                            </Typography> */}
                            
                            {/* Main Headline (FIXED: Fixed Width applied to Rotating Text container) */}
                            <Typography
                                id="hero-heading"
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 900,
                                    lineHeight: 1.15,
                                    color: BRAND.textPrimaryDark,
                                    mb: 3,
                                    fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem", lg: "4.5rem" },
                                }}
                            >
                                Your Trusted Navigator to{" "}
                                {/* Rotating Text Container - FIXED WIDTH & HEIGHT */}
                                <Box component="span" sx={{ 
                                    display: 'inline-block', 
                                    // FIX: Give max width needed for the longest word ("Succeed") + padding
                                    width: { xs: '1500px', sm: '2000px', md: '2000px', lg: '3000px' }, 
                                    // Robust fixed height for clipping fix
                                    height: { xs: '35px', sm: '45px', md: '55px', lg: '79px' }, 
                                    overflowY: 'hidden' 
                                }}>
                                    <RotatingText currentTextIndex={current} />
                                </Box>
                                {" "} Startup Journey {/* "with Confidence" is fixed */}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "1.05rem", md: "1.25rem" },
                                    color: theme.palette.text.secondary,
                                    mb: 4,
                                    lineHeight: 1.6,
                                }}
                            >
                                Propel Foundry partners with ambitious founders to transform bold ideas into thriving ventures.
                                From **strategy and compliance** to **funding and mentorship** — we're with you at every step of your entrepreneurial journey.
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ mt: 3 }}>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} style={{ flex: isMobile ? 1 : "auto" }}>
                                    <Button
                                        variant="contained"
                                        onClick={goToServices}
                                        endIcon={<RocketLaunchOutlined />}
                                        sx={{
                                            bgcolor: BRAND.accent,
                                            color: 'white',
                                            fontWeight: 700,
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: "999px",
                                            boxShadow: `0 12px 35px ${alpha(BRAND.accent, 0.45)}`,
                                            width: isMobile ? "100%" : "auto",
                                            textTransform: "uppercase",
                                            fontSize: '1rem',
                                            '&:hover': { bgcolor: alpha(BRAND.accent, 0.9) }
                                        }}
                                    >
                                        Explore Our Services
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} style={{ flex: isMobile ? 1 : "auto" }}>
                                    <Button
                                        onClick={goToContact}
                                        variant="outlined"
                                        sx={{
                                            color: BRAND.primary,
                                            fontWeight: 700,
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: "999px",
                                            borderColor: alpha(BRAND.primary, 0.4),
                                            width: isMobile ? "100%" : "auto",
                                            textTransform: "uppercase",
                                            fontSize: '1rem',
                                            '&:hover': {
                                                borderColor: BRAND.primary,
                                                bgcolor: alpha(BRAND.primary, 0.05),
                                            }
                                        }}
                                    >
                                        Book a Consultation
                                    </Button>
                                </motion.div>
                            </Stack>
                        </Box>
                    </motion.div>

                    {/* Right: carousel (Image slider) */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: { xs: 300, md: 500 },
                            width: "100%",
                        }}
                        tabIndex={-1}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: 580,
                                position: "relative",
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: `0 10px 40px ${alpha(BRAND.primary, 0.15)}`, 
                                background: 'white',
                                height: isMobile ? 280 : 450, // Fixed height for absolute context
                            }}
                        >
                            <AnimatePresence initial={false} mode="wait">
                                {images.map((src, i) =>
                                    i === current ? (
                                        <motion.img
                                            key={src + i}
                                            src={src}
                                            alt={`Slide ${i + 1}`}
                                            // Slide animation implemented
                                            initial={{ x: 300, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -300, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }} 
                                            draggable={false}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                                position: 'absolute', 
                                                top: 0,
                                                left: 0,
                                            }}
                                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x450/121490/ffffff?text=Image+Unavailable'; }}
                                        />
                                    ) : null
                                )}
                            </AnimatePresence>
                            
                            {/* Control Bar (Bottom Overlay) */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 2,
                                   
                                    color: 'white',
                                    zIndex: 10,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                    <Typography sx={{ 
                                        fontSize: 16, 
                                        fontWeight: 700, 
                                        color: BRAND.accent, 
                                        textTransform: 'uppercase',
                                        flexShrink: 1,
                                        minWidth: { xs: 80, sm: 100 }
                                    }}>
                                        {/* Dynamic Label for current slide content */}
                                        {["Strategy", "Mentorship", "Training", "Funding", "Network"][current % images.length]}
                                    </Typography>
                                </Box>

                                {/* Navigation Buttons */}
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <IconButton
                                        onClick={prev}
                                        aria-label="Previous slide"
                                        size="medium"
                                        sx={{
                                            bgcolor: 'white',
                                            color: BRAND.primary,
                                            boxShadow: `0 4px 12px ${alpha(BRAND.primary, 0.3)}`,
                                          //  '&:hover': { bgcolor: alpha('white', 0.9) },
                                        }}
                                    >
                                        <ChevronLeftIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={next}
                                        aria-label="Next slide"
                                        size="medium"
                                        sx={{
                                            bgcolor: 'white',
                                            color: BRAND.primary,
                                            boxShadow: `0 4px 12px ${alpha(BRAND.primary, 0.3)}`,
                                            //'&:hover': { bgcolor: alpha('white', 0.9) },
                                        }}
                                    >
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Hero;