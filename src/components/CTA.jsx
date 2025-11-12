import React from "react";
import { motion } from "framer-motion";
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Stack, 
    alpha,
    useMediaQuery,
    useTheme,
    IconButton,
    Card, 
} from "@mui/material";
import { RocketLaunchOutlined, ArrowForward } 
    from "@mui/icons-material"; 
import img from "../assets/q.png";
import StarBorder from './StarBorder'
// --- BRAND COLOR PALETTE (Copied for consistency) ---
const BRAND = {
    primary: "#121490", // Deep Blue
    accent: "#fd3007", // Primary Accent Red/Orange
    lightBg: "#f7f9fc", // Soft background for the main page section
    textPrimaryDark: "#1a1a1a", 
};

// --- LOGO PLACEHOLDER URL ---
// Using a generic placeholder URL for the logo image
const LOGO_URL = {img}; 


const CTA = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));

    const primary = BRAND.primary;
    const accent = BRAND.accent;
    const white = theme.palette.common.white;
    const lightBg = BRAND.lightBg;

    // Simulated Navigation functions
    const goToContact = () => console.log("Navigating to /contact");
    const goToServices = () => console.log("Navigating to /services");

    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                background: lightBg, 
                py: { xs: 10, md: 15 }, 
                overflow: "hidden",
            }}
        >
            <Container maxWidth="xl">
                <motion.div
                    initial={{ opacity: 0, y: 60 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Outer Frame: Deep Blue Anchor */}
                    <Box
                        sx={{
                            background: primary, 
                            borderRadius: 4,
                            boxShadow: `0 20px 60px ${alpha(primary, 0.4)}`,
                            position: "relative",
                            minHeight: { md: 350 },
                            p: { xs: 0, md: 0 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Inner Floating Panel: White Content Area */}
                        <Card
                            sx={{
                                width: { xs: '100%', md: '90%' },
                                background: white,
                                borderRadius: 4,
                                p: { xs: 4, md: 6, lg: 8 },
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: { xs: 'column', lg: 'row' },
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: `0 10px 30px ${alpha(BRAND.textPrimaryDark, 0.1)}`,
                                // Decorative vertical accent line
                                borderLeft: { xs: 'none', md: `6px solid ${accent}` }
                            }}
                        >
                            {/* Content Block (Left) */}
                            <Stack 
                                direction={{ xs: 'column', md: 'row' }} 
                                spacing={{ xs: 2, md: 4 }} 
                                alignItems="center"
                                sx={{ flex: 1, pr: { lg: 6 } }}
                            >
                                {/* 🚀 LOGO FRAME REPLACEMENT 🚀 */}
                                <Box
                                    sx={{ 
                                        flexShrink: 0,
                                      
                                        color: accent, 
                                        p: 2, 
                                        borderRadius: 2, 
                                
                                    }}
                                >
                            <Box
                                        component="img"
                                        src={img} // Using imported local image
                                        alt="Propel Foundry Logo"
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            display: 'block',
                                            objectFit: 'contain',
                                        transform: 'scale(2)', // The image is 5x larger than its 40x40 container
           // transformOrigin: 'top left', // Ensure it scales from a predictable point (optional, but good practice)
                                        }}
                                        onError={(e) => { e.target.onerror = null; e.target.src=FALLBACK_LOGO_URL; }}
                                    />
                                </Box>
                                {/* 🚀 END LOGO FRAME REPLACEMENT 🚀 */}

                                {/* Text */}
                                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <Typography
                                        component="h2"
                                        variant={isMd ? "h3" : "h4"}
                                        sx={{ 
                                            fontWeight: 900, 
                                            color: BRAND.textPrimaryDark, 
                                            lineHeight: 1.1,
                                            mb: 1,
                                            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
                                        }}
                                    >
                                        Ready to <span style={{ color:accent }}>Propel</span> Your Vision?
                                    </Typography>

                                    <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                                        Book a focused consultation to transform your startup idea into a structured, investor-ready plan.
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* Buttons (Right Side) */}
                            <Stack 
                                direction={{ xs: "column", sm: "row" }} 
                                spacing={2} 
                                justifyContent="center"
                                sx={{ flexShrink: 0, width: { xs: '100%', sm: 'auto' }, mt: { xs: 4, lg: 0 } }}
                            >
                                {/* Primary CTA: Accent Red */}
                                <Button
                                    onClick={goToContact}
                                    aria-label="Book consultation"
                                    component={motion.button}
                                    whileHover={{ translateY: -3 }}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        borderRadius: "999px",
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 800,
                                        minWidth: 200,
                                        bgcolor: accent, 
                                        color: white,
                                        boxShadow: `0 12px 36px ${alpha(accent, 0.4)}`,
                                        textTransform: "uppercase",
                                        '&:hover': {
                                            bgcolor: primary, // Deep Blue hover
                                            boxShadow: `0 18px 50px ${alpha(primary, 0.6)}`,
                                        }
                                    }}
                                >
                                    Book Free Consultation
                                </Button>

                                {/* Secondary CTA: Primary Blue Outline */}
                                <Button
                                    onClick={goToServices}
                                    aria-label="Explore services"
                                    component={motion.button}
                                    whileHover={{ translateY: -1 }}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "999px",
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 700,
                                        color: primary,
                                        borderColor: alpha(primary, 0.4),
                                        textTransform: "uppercase",
                                        minWidth: 200,
                                        '&:hover': {
                                            borderColor: primary,
                                            bgcolor: alpha(primary, 0.05),
                                        }
                                    }}
                                >
                                    
                                    Explore Services
                                </Button>
                            </Stack>
                        </Card>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default CTA;