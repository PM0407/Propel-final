import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Stack,
    useMediaQuery,
    Chip,
    alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// IMPORTANT: Replace these with your actual image paths
import mentoringImg from "../assets/mentoring.png"; // Placeholder path
import networkingImg from "../assets/networking.png"; // Placeholder path

// Define the custom color palette
const CUSTOM_COLORS = {
    deepBlue: "#120f8f",    // Primary
    actionRed: "#fd3007",   // Used in CTA Gradient start
    ethicsOrange: "#fe883f", // Highlight for Titles/Chip/Accents
    lightGray: "#f8fafd",   // Outer section background
    cardBg: "#ffffff",      // Inner card background
    darkText: "#212121",    // Primary text color
    subtleText: "#606060",  // Muted text color
};

const CommunitySection = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));
    const isMd = useMediaQuery(theme.breakpoints.down("lg"));
    const isSm = useMediaQuery(theme.breakpoints.down("md"));

    // Map custom colors
    const primary = CUSTOM_COLORS.deepBlue;
    const accent = CUSTOM_COLORS.actionRed;
    const highlight = CUSTOM_COLORS.ethicsOrange;
    const sectionBg = CUSTOM_COLORS.lightGray;
    const cardBg = CUSTOM_COLORS.cardBg;
    const darkText = CUSTOM_COLORS.darkText;
    const subtleText = CUSTOM_COLORS.subtleText;
    const white = theme.palette.common.white;

    return (
        <Box
            component="section"
            aria-labelledby="community-heading"
            sx={{
                width: "100%",
                background: sectionBg,
                py: { xs: 8, md: 12 },
                overflow: "hidden",
            }}
        >
            <Container maxWidth="xl" sx={{ overflow: "visible" }}>
                <Box
                    sx={{
                        width: { xs: "96%", sm: "90%", md: "90%" },
                        mx: "auto",
                        borderRadius: 4,
                        px: { xs: 3, sm: 4, md: 8 },
                        py: { xs: 6, md: 8 },
                        background: cardBg,
                        boxShadow: `0 24px 60px ${alpha(primary, 0.15)}`,
                        position: "relative",
                        overflow: "visible",
                        border: `1px solid ${alpha(primary, 0.08)}`,
                    }}
                >
                    <Grid 
                        container 
                        spacing={{ xs: 5, md: 10 }} 
                        alignItems="center"
                    >
                        {/* 1. Content and CTA Column */}
                        <Grid item xs={12} lg={6}>
                            <motion.div
                                initial={{ opacity: 0, x: isLg ? -50 : 0, y: isLg ? 0 : 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7 }}
                            >
                                <Typography
                                    id="community-heading"
                                    variant={isSm ? "h5" : "h3"}
                                    sx={{ 
                                        fontWeight: 900, 
                                        color: darkText,
                                        lineHeight: 1.1,
                                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                                    }}
                                >
                                    Join Our Thriving{" "}
                                    <Box component="span" sx={{ color: highlight }}>
                                        Tech Community
                                    </Box>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        mt: 1.5,
                                        color: subtleText,
                                        maxWidth: 700,
                                        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                                        lineHeight: 1.6,
                                        mb: 3, // Added margin bottom for spacing before CTAs
                                    }}
                                >
                                    Connect with innovative founders, expert mentors, and skilled builders. Engage in curated events, dynamic peer circles, and hands‑on workshops designed to accelerate your startup journey and foster meaningful collaborations.
                                </Typography>

                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2.5}
                                    sx={{ mt: 2, alignItems: { xs: "stretch", sm: "center" } }}
                                >
                                    <Button
                                        onClick={() => navigate("/community")}
                                        aria-label="Join the community"
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            borderRadius: "999px",
                                            px: { xs: 4, sm: 3.5 },
                                            py: { xs: 1.5, sm: 1.25 },
                                            textTransform: "uppercase",
                                            fontWeight: 800,
                                            minWidth: 200,
                                            // Gradient consistent with the image look
                                            background: `#fd3007`, 
                                            color: white,
                                            boxShadow: `0 12px 30px ${alpha(accent, 0.4)}`,
                                            transition: "all 0.3s ease-out",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: `0 18px 45px ${alpha(accent, 0.6)}`,
                                                background: `linear-gradient(90deg, ${highlight}, ${primary}, ${accent})`,
                                            },
                                        }}
                                    >
                                        Join the Community
                                    </Button>

                                    <Button
                                        onClick={() => navigate("/community#events")}
                                        aria-label="Explore Events"
                                        variant="outlined"
                                        sx={{
                                            borderRadius: "999px",
                                            px: { xs: 4, sm: 3 },
                                            py: { xs: 1.5, sm: 1.15 },
                                            textTransform: "uppercase",
                                            fontWeight: 700,
                                            borderColor: alpha(primary, 0.3),
                                            color: primary,
                                            minWidth: 160,
                                            transition: "all 0.3s ease-out",
                                            "&:hover": {
                                                borderColor: primary,
                                                background: alpha(primary, 0.05),
                                                transform: "translateY(-2px)",
                                                color: primary,
                                            },
                                        }}
                                    >
                                        Explore Events
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Grid>

                        {/* 2. Image Cluster Column */}
                        <Grid item xs={12} lg={6}>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: { xs: 280, sm: 350, md: 450, lg: 420 }, // Ensures images have enough space
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "visible",
                                    // Removed horizontal padding here to allow full utilization of the grid space
                                }}
                                aria-hidden
                            >
                                {/* soft gradient blob background */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: { xs: 200, sm: 300, md: 400, lg: 450 },
                                        height: { xs: 200, sm: 300, md: 400, lg: 450 },
                                        borderRadius: "50%",
                                        // Colors consistent with the image style
                                        background: `radial-gradient(circle at 30% 30%, ${alpha(primary, 0.3)} 0%, transparent 45%), radial-gradient(circle at 70% 70%, ${alpha(highlight, 0.4)} 0%, transparent 45%)`,
                                        filter: "blur(35px) saturate(120%)",
                                        transform: "translateY(-10px) scale(0.98)",
                                        zIndex: 1,
                                        opacity: 0.9,
                                    }}
                                />

                                {/* Container for image positioning */}
                                <Box
                                    sx={{
                                        position: "absolute", // Use absolute positioning relative to parent Box
                                        width: "100%",
                                        height: "100%",
                                        top: 0,
                                        left: 0,
                                        zIndex: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {/* left image: Mentoring */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 15, rotate: -8 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -6 }}
                                        whileHover={{ scale: 1.05, y: -10, rotate: -8 }}
                                        viewport={{ once: true, amount: 0.4 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            position: "absolute",
                                            left: isSm ? 50 : (isMd ? 30 : -40), // Adjusted positioning for better centering
                                            top: isSm ? 10 : (isMd ? 10 : 10),
                                            zIndex: 2,
                                            pointerEvents: "auto",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={mentoringImg} // Replace with actual component or image URL
                                            alt="Mentoring sessions"
                                            sx={{
                                                width: { xs: 160, sm: 220, md: 260, lg: 300 },
                                                height: { xs: 110, sm: 140, md: 170, lg: 200 },
                                                objectFit: "cover",
                                                borderRadius: 2.5,
                                                boxShadow: `0 24px 50px ${alpha(primary, 0.2)}`,
                                                border: `10px solid ${cardBg}`,
                                            }}
                                        />
                                    </motion.div>

                                    {/* right image: Networking */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10, rotate: 8 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
                                        whileHover={{ scale: 1.06, y: -12, rotate: 8 }}
                                        viewport={{ once: true, amount: 0.4 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        style={{
                                            position: "absolute",
                               bottom: isSm ? 10 : (isMd ? 20 : 30),
                                            left: isSm ? 5 : (isMd ? 10 : 20),
                                            zIndex: 3,
                                            pointerEvents: "auto",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={networkingImg} // Replace with actual component or image URL
                                            alt="Networking event"
                                            sx={{
                                                width: { xs: 180, sm: 250, md: 300, lg: 340 },
                                                height: { xs: 120, sm: 160, md: 190, lg: 220 },
                                                objectFit: "cover",
                                                borderRadius: 2.5,
                                                boxShadow: `0 30px 65px ${alpha(accent, 0.25)}`,
                                                border: `10px solid ${cardBg}`,
                                            }}
                                        />
                                    </motion.div>
                                </Box>

                                {/* Floating Tiny CTA (positioned relative to the Grid item, not the image box) */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        // Positioned at the bottom center of the column area for balance
                                        left: '50%',
                                        bottom: { xs: -16, sm: -24, md: -30, lg: -40 }, 
                                        transform: 'translateX(-50%)', // Center horizontally
                                        zIndex: 4,
                                        pointerEvents: "none",
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        style={{ pointerEvents: "auto" }}
                                    >
                                        <Chip
                                            label="2,500+ Active Members"
                                            onClick={() => navigate("/community")}
                                            icon={<GroupsIcon />}
                                            clickable
                                            sx={{
                                                fontWeight: 800,
                                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                                bgcolor: highlight, // Chip background in Ethics Orange
                                                color: white,
                                                py: { xs: 1, sm: 1.5 },
                                                px: { xs: 1.5, sm: 2 },
                                                borderRadius: "999px",
                                                boxShadow: `0 8px 25px ${alpha(highlight, 0.3)}`,
                                                border: `2px solid ${highlight}`,
                                                transition: 'transform 0.3s ease-out',
                                                "&:hover": {
                                                    bgcolor: primary, // Deep Blue hover
                                                    transform: "translateY(-4px) rotate(-1deg)",
                                                    color: white,
                                                    '& .MuiChip-icon': {
                                                        color: `${white} !important`,
                                                    }
                                                },
                                                '& .MuiChip-icon': {
                                                    fontSize: { xs: 20, md: 24 },
                                                    mr: { xs: 0.5, sm: 1 },
                                                    color: `${white} !important`, // White icons on orange chip
                                                }
                                            }}
                                        />
                                    </motion.div>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default CommunitySection;