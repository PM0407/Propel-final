import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
    useTheme,
    useMediaQuery,
    List,
    ListItem,
    ListItemText,
    alpha,
    Card,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img from "../assets/mentoring.png";
// --- BRAND COLOR PALETTE (Copied for consistency) ---
const BRAND = {
    primary: "#121490", // Deep Blue
    accent: "#fd3007", // Primary Accent Red/Orange
    lightBg: "#f7f9fc", 
    secondaryAccent: "#007bff", 
    textPrimaryDark: "#1a1a1a", 
};

const Training = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Placeholder URL for image since local asset imports are not supported
    const growthImage = "https://www.propelfoundry.com/assets/growth-CRs3Obmy.jpg";

    return (
        <Box
            component="section"
            id="training"
            sx={{
                py: { xs: 10, md: 15 },
                background: BRAND.lightBg, // Use light background for this section
            }}
            aria-labelledby="training-heading"
        >
            <Helmet>
                <title>Training Sessions | Propel Foundry</title>
                <meta
                    name="description"
                    content="Join Propel Foundry's professional training sessions for startups. Gain investment readiness, operational skills, and mentorship to scale effectively."
                />
                <meta
                    name="keywords"
                    content="Propel Foundry training, startup training programs, investment readiness, business growth training, startup mentorship"
                />
            </Helmet>

            <Container maxWidth="xl">
                <Stack spacing={4} alignItems="center">
                    {/* HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ width: "100%", textAlign: "center", maxWidth: 'lg' }}
                    >
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                fontWeight: 900,
                                color: BRAND.primary,
                                mb: 2,
                                lineHeight: 1.1,
                                '& > span': { color: BRAND.accent }
                            }}
                        >
                            Professional Training <span>Sessions</span>
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                color: BRAND.textPrimaryDark,
                                maxWidth: 780,
                                mx: "auto",
                                fontSize: { xs: '1.1rem', sm: '1.35rem' },
                            }}
                            variant="body1"
                        >
                            Practical, hands-on sessions tailored for startup founders — focusing on investor readiness, operational excellence, and accelerated growth.
                        </Typography>
                    </motion.div>

                    {/* CONTENT: IMAGE + LIST */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={5}
                        alignItems="center"
                        sx={{ width: "100%", mt: { xs: 5, md: 8 } }}
                    >
                        {/* LEFT COLUMN: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ flex: 1, width: "100%", maxWidth: { xs: '100%', md: '50%' } }}
                        >
                            <Card
                                elevation={10}
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow: `0 20px 50px ${alpha(BRAND.primary, 0.25)}`,
                                    border: `4px solid ${BRAND.primary}`
                                }}
                            >
                                <Box>
                                    <img
                                        src={growthImage}
                                        alt="Business Growth Training"
                                        style={{
                                            width: "100%",
                                            height: isMobile ? 260 : 450,
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                        onerror="this.onerror=null;this.src='https://placehold.co/800x450/121490/ffffff?text=Image+Unavailable';"
                                    />
                                </Box>
                            </Card>
                        </motion.div>

                        {/* RIGHT COLUMN: List + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ flex: 1, width: "100%", maxWidth: { xs: '100%', md: '50%' } }}
                        >
                            <Box
                                sx={{
                                    p: { xs: 3, md: 5 },
                                    borderRadius: 3,
                                    background: 'white',
                                    height: "100%",
                                    boxShadow: `0 10px 40px ${alpha(BRAND.primary, 0.1)}`,
                                    border: `1px solid ${alpha(BRAND.primary, 0.1)}`
                                }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: BRAND.accent }}>
                                    Curriculum Highlights
                                </Typography>

                                <List disablePadding sx={{ mb: 4 }}>
                                    {[
                                        "Technology readiness programs for new ventures",
                                        "Investment pitch deck preparation and fundraising guidance",
                                        "Employee skill development and leadership training",
                                        "Talent acquisition, retention, and scaling strategies",
                                        "Advanced business modeling and financial planning workshops",
                                    ].map((text) => (
                                        <ListItem key={text} disableGutters sx={{ py: 1 }}>
                                            <CheckCircleOutlineIcon 
                                                sx={{ color: BRAND.primary, mr: 1.5 }} 
                                                fontSize="medium" 
                                            />
                                            <ListItemText
                                                primary={text}
                                                primaryTypographyProps={{ 
                                                    variant: "body1", 
                                                    color: BRAND.textPrimaryDark,
                                                    fontWeight: 500,
                                                    fontSize: '1.05rem'
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                {/* Buttons */}
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            bgcolor: BRAND.primary,
                                            color: 'white',
                                            fontWeight: 700,
                                            px: 4,
                                            py: 1.2,
                                            borderRadius: "999px",
                                            textTransform: "uppercase",
                                            boxShadow: `0 10px 30px ${alpha(BRAND.primary, 0.4)}`,
                                            width: isMobile ? "100%" : "auto",
                                            '&:hover': {
                                                bgcolor: alpha(BRAND.primary, 0.9),
                                            }
                                        }}
                                    >
                                        Explore Programs
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: BRAND.primary,
                                            borderColor: alpha(BRAND.primary, 0.4),
                                            fontWeight: 700,
                                            px: 4,
                                            py: 1.2,
                                            borderRadius: "999px",
                                            textTransform: "uppercase",
                                            width: isMobile ? "100%" : "auto",
                                            '&:hover': {
                                                borderColor: BRAND.primary,
                                                bgcolor: alpha(BRAND.primary, 0.05),
                                            }
                                        }}
                                    >
                                        Contact Us
                                    </Button>
                                </Stack>
                            </Box>
                        </motion.div>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Training;