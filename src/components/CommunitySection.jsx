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
    deepBlue: "#120f8f",    // Primary
    actionRed: "#fd3007",   // Used in CTA Gradient start
    ethicsOrange: "#fe883f", // Highlight for Titles/Chip/Accents
    lightGray: "#f8fafd",   // Outer section background
    cardBg: "#ffffff",      // Inner card background
    darkText: "#212121",    // Primary text color
    subtleText: "#606060",  // Muted text color
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
                // FIX 1: Reduced vertical padding on the main section
                py: { xs: 6, md: 10 }, 
                overflow: "hidden",
            }}
        >
            {/* FIX 2: Reduced max width of the primary container */}
            <Container maxWidth="l" sx={{ overflow: "visible" }}>
                <Box
                    sx={{
                        // FIX 3: Reduced width of the inner white card/box
                        width: { xs: "96%", sm: "90%", md: "85%" }, 
                        mx: "auto",
                        borderRadius: 4,
                        // FIX 4: Reduced padding inside the white box
                        px: { xs: 3, sm: 4, md: 6 }, 
                        py: { xs: 5, md: 7 },
                        background: cardBg,
                        boxShadow: `0 24px 60px ${alpha(primary, 0.15)}`,
                        position: "relative",
                        overflow: "visible",
                        border: `1px solid ${alpha(primary, 0.08)}`,
                    }}
                >
                    <Grid 
                        container 
                        // Reduced spacing
                        spacing={{ xs: 4, md: 8 }} 
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
                                        // Slight reduction in font size for a smaller overall feel
                                        fontSize: { xs: '1.7rem', sm: '2.3rem', md: '2.8rem' } 
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
                                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" }, // Slight reduction
                                        lineHeight: 1.6,
                                        mb: 3, 
                                    }}
                                >
                                    Connect with innovative founders, expert mentors, and skilled builders. Engage in curated events, dynamic peer circles, and hands‑on workshops designed to accelerate your startup journey and foster meaningful collaborations.
                                </Typography>

                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2} // Slight reduction in spacing
                                    sx={{ mt: 2, alignItems: { xs: "stretch", sm: "center" } }}
                                >
                                    <Button
                                        onClick={() => navigate("/community")}
                                        aria-label="Join the community"
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            borderRadius: "999px",
                                            px: { xs: 3.5, sm: 3 },
                                            py: { xs: 1.25, sm: 1.15 }, // Slight reduction in button height
                                            textTransform: "uppercase",
                                            fontWeight: 800,
                                            minWidth: 20,
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
                                            px: { xs: 3, sm: 2.5 },
                                            py: { xs: 1.25, sm: 1.15 }, // Slight reduction in button height
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
                                    // FIX 5: Reduced max height of the image cluster container
                                    height: { xs: 260, sm: 320, md: 400, lg: 380 }, 
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "visible",
                                }}
                                aria-hidden
                            >
                                {/* soft gradient blob background */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        // Reduced blob size
                                        width: { xs: 180, sm: 280, md: 350, lg: 400 },
                                        height: { xs: 180, sm: 280, md: 350, lg: 400 },
                                        borderRadius: "50%",
                                        background: `radial-gradient(circle at 30% 30%, ${alpha(primary, 0.3)} 0%, transparent 45%), radial-gradient(circle at 70% 70%, ${alpha(highlight, 0.4)} 0%, transparent 45%)`,
                                        filter: "blur(30px) saturate(120%)", // Slight reduction in blur
                                        transform: "translateY(-10px) scale(0.98)",
                                        zIndex: 1,
                                        opacity: 0.9,
                                    }}
                                />

                                {/* Container for image positioning */}
                                <Box
                                    sx={{
                                        position: "absolute", 
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
                                            // Adjusted position
                                            left: isSm ? 40 : (isMd ? 10 : -30), 
                                            top: isSm ? 5 : (isMd ? 5 : 5),
                                            zIndex: 2,
                                            pointerEvents: "auto",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={mentoringImg} 
                                            alt="Mentoring sessions"
                                            sx={{
                                                // Reduced image size
                                                width: { xs: 150, sm: 200, md: 240, lg: 280 },
                                                height: { xs: 100, sm: 130, md: 160, lg: 180 },
                                                objectFit: "cover",
                                                borderRadius: 2.5,
                                                boxShadow: `0 24px 50px ${alpha(primary, 0.2)}`,
                                                border: `8px solid ${cardBg}`, // Reduced border size
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
                                            bottom: isSm ? 5 : (isMd ? 15 : 20),
                                            left: isSm ? 5 : (isMd ? 10 : 20),
                                            zIndex: 3,
                                            pointerEvents: "auto",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={networkingImg} 
                                            alt="Networking event"
                                            sx={{
                                                // Reduced image size
                                                width: { xs: 170, sm: 230, md: 280, lg: 320 },
                                                height: { xs: 110, sm: 150, md: 180, lg: 200 },
                                                objectFit: "cover",
                                                borderRadius: 2.5,
                                                boxShadow: `0 30px 65px ${alpha(accent, 0.25)}`,
                                                border: `8px solid ${cardBg}`, // Reduced border size
                                            }}
                                        />
                                    </motion.div>
                                </Box>

                                {/* Floating Tiny CTA (Chip) */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: '50%',
                                        // Adjusted bottom position relative to the smaller box height
                                        bottom: { xs: -12, sm: -18, md: -25, lg: -30 }, 
                                        transform: 'translateX(-50%)', 
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
                                                // Reduced font size
                                                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' },
                                                bgcolor: highlight, 
                                                color: white,
                                                py: { xs: 0.75, sm: 1 }, // Reduced padding
                                                px: { xs: 1.5, sm: 2 },
                                                borderRadius: "999px",
                                                boxShadow: `0 8px 25px ${alpha(highlight, 0.3)}`,
                                                border: `2px solid ${highlight}`,
                                                transition: 'transform 0.3s ease-out',
                                                "&:hover": {
                                                    bgcolor: primary, 
                                                    transform: "translateY(-4px) rotate(-1deg)",
                                                    color: white,
                                                    '& .MuiChip-icon': {
                                                        color: `${white} !important`,
                                                    }
                                                },
                                                '& .MuiChip-icon': {
                                                    fontSize: { xs: 18, md: 20 },
                                                    mr: { xs: 0.5, sm: 1 },
                                                    color: `${white} !important`,
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