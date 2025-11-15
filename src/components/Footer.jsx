import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Stack,
    Link,
    TextField,
    Button,
    useTheme,
    useMediaQuery,
    Divider,
    alpha,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import RocketLaunchOutlined from "@mui/icons-material/RocketLaunchOutlined";
import LOGO_IMAGE_URL from "../assets/img2.png"; // URL for the logo image
import logo from "../assets/logo.png"; // Local logo import (will be replaced with URL)
// --- BRAND COLOR PALETTE (Clean Neutral Theme) ---
const BRAND = {
    primary: "#121490",        // Deep Blue (Main Text/Links)
    accent: "#fd3007",         // Primary Red (CTA Highlight)
    softBg: "#f7f9fc",         // Soft Light Gray (Section Background)
    white: "#ffffff",          // Pure White (Inner Content/Card)
    textDark: "#1a1a1a",       // Dark text for contrast
    textSubtle: "#6c757d",     // Subtle gray for body/links
};

const Footer = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Simulated action for environment stability
    const handleSubscribe = (e) => {
        e?.preventDefault();
        if (!email || !/.+@.+\..+/.test(email)) {
            console.log("Invalid email format entered.");
            return;
        }
        console.log(`Subscribed email: ${email}`);
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 3000);
    };

    const primary = BRAND.primary;
    const accent = BRAND.accent;
    const white = BRAND.white;
    const softBg = BRAND.softBg;
    const textDark = BRAND.textDark;
    const textSubtle = BRAND.textSubtle;
    
    // NOTE: This version uses a fixed inner white box against a soft gray section background.

    return (
        <Box
            component="footer"
            sx={{
                // Overall Section Background (Soft Neutral Anchor)
                background: softBg, 
                py: { xs: 8, md: 10 }, 
                position: "relative",
            }}
        >
            <Helmet>
                <title>Propel Foundry | Connect & Support</title>
            </Helmet>

            <Container maxWidth="xl">
                {/* Inner Floating/Anchored Card (Pure White for Clarity) */}
                <Box
                    sx={{
                        background: white,
                        borderRadius: 3,
                        boxShadow: `0 15px 40px ${alpha(primary, 0.1)}`,
                        p: { xs: 4, md: 6 },
                        borderBottom: `4px solid ${accent}`, // Primary accent border
                    }}
                >
                    
                    {/* 1. Logo & Top CTA Row */}
                    <Grid
                        container
                        spacing={3}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: { xs: 5, md: 6 } }}
                    >
                        <Grid item xs={12} md={6}>
                            <Stack direction="row" spacing={2} alignItems="center">
                             
                                <Box>
                                   <Box>
                               <Box
                                        component="img"
                                        src={logo} 
                                        alt="Propel Foundry Logo"
                                        sx={{ 
                                            // FIX: Increased height for more visual prominence
                                            height: { xs: 50, md: 70 }, 
                                            width: 'auto',
                                            display: 'block',
                                            // Adjusted margin top to keep it aligned with the icon
                                            mt: { xs: 0, md: -0.5 }
                                        }}
                                        onError={(e) => { e.target.onerror = null; e.target.src=LOGO_FALLBACK_URL; }}
                                    />
                             
                            </Box>
                               
                                </Box>
                            </Stack>
                        </Grid>

                        {/* Top Right CTA Button */}
                        <Grid item xs={12} md="auto">
                            <Button
                                onClick={() => console.log("Navigating to /contact for consultation")}
                                sx={{
                                    borderRadius: "999px",
                                    px: 4,
                                    py: 1.2,
                                    bgcolor: primary, // Deep Blue CTA
                                    color: white,
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    boxShadow: `0 8px 20px ${alpha(primary, 0.4)}`,
                                    "&:hover": {
                                        bgcolor: accent, // Accent Red hover
                                        boxShadow: `0 12px 30px ${alpha(accent, 0.6)}`,
                                    },
                                    width: { xs: '100%', sm: 'auto' }
                                }}
                            >
                                Book a Consultation
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mb: { xs: 4, md: 6 }, bgcolor: alpha(textSubtle, 0.4) }} />

                    {/* 2. Footer Body (Links, Subscribe) */}
                    <Grid container spacing={{ xs: 5, md: 8 }} justifyContent="space-between">
                        {/* Quick Links & Legal Links */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ fontWeight: 800, mb: 2, color: primary }}
                                    >
                                        Quick Links
                                    </Typography>
                                    <Stack spacing={1}>
                                        {["Home", "Services", "Community", "Opportunities", "About"].map((label, idx) => (
                                            <Link
                                                key={idx}
                                                href={["#hero", "#services", "#community", "#opportunities", "#about"][idx]}
                                                underline="none"
                                                sx={{
                                                    color: textSubtle,
                                                    fontSize: '1rem',
                                                    "&:hover": { color: primary, textDecoration: 'underline' },
                                                }}
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ fontWeight: 800, mb: 2, color: primary }}
                                    >
                                        Legal & Support
                                    </Typography>
                                    <Stack spacing={1}>
                                        {["Contact", "FAQs", "Privacy Policy", "Terms of Use"].map((label, idx) => (
                                            <Link
                                                key={idx}
                                                href={["#contact", "#faq", "#privacy", "#terms"][idx]}
                                                underline="none"
                                                sx={{
                                                    color: textSubtle,
                                                    fontSize: '1rem',
                                                    "&:hover": { color: primary, textDecoration: 'underline' },
                                                }}
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Subscribe & Social */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: primary }}>
                                Global Insights
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: textSubtle, mb: 2, fontSize: '1rem' }}
                            >
                                Subscribe for exclusive governance reports and premium market insights.
                            </Typography>

                            <Box component="form" onSubmit={handleSubscribe} sx={{ display: "flex", gap: 1 }}>
                                <TextField
                                    size="small"
                                    placeholder="Your business email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        flex: 1,
                                        // Input box is lightBg for subtle difference from white card background
                                        bgcolor: softBg, 
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            '& fieldset': { borderColor: 'transparent !important' },
                                        },
                                    }}
                                    // Input text is dark for readability on the light field
                                    InputProps={{ style: { color: textDark, fontWeight: 500 } }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={subscribed}
                                    sx={{
                                        borderRadius: 1,
                                        px: 3,
                                        fontWeight: 700,
                                        bgcolor: primary, // Deep Blue Button
                                        textTransform: "uppercase",
                                        color: white,
                                        "&:hover": {
                                            bgcolor: accent, // Accent Red hover
                                            color: white,
                                        }
                                    }}
                                >
                                    {subscribed ? "Subscribed!" : "Subscribe"}
                                </Button>
                            </Box>
                            
                            {/* Social Icons Stack */}
                            <Stack direction="row" spacing={2} sx={{ mt: 4 }} alignItems="center">
                                <Typography variant="body2" sx={{ color: textSubtle, fontWeight: 700 }}>
                                    CONNECT:
                                </Typography>
                                {[ 
                                    { icon: <LinkedInIcon />, link: "https://linkedin.com/company/propelfoundry" },
                                    { icon: <InstagramIcon />, link: "https://instagram.com/propelfoundry" },
                                    { icon: <TwitterIcon />, link: "https://twitter.com/propelfoundry" },
                                    { icon: <FacebookIcon />, link: "https://facebook.com/propelfoundry" },
                                ].map((social, i) => (
                                    <IconButton
                                        key={i}
                                        component="a"
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener"
                                        size="small"
                                        sx={{
                                            color: primary, // Deep Blue icons
                                            bgcolor: alpha(primary, 0.1),
                                            border: `1px solid ${alpha(primary, 0.4)}`,
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                background: primary,
                                                color: white, // White fill on hover
                                                transform: "scale(1.1)",
                                            },
                                        }}
                                    >
                                        {social.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Layer 2: COPYRIGHT BAR (Anchored bottom bar) */}
                <Box sx={{ 
                    bgcolor: primary, // Deep Blue background for this bottom bar
                    py: 3, 
                    mt: { xs: 4, md: 6 },
                    borderRadius: 4, // Match inner card radius
                }}>
                    <Container maxWidth="xl">
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="caption" sx={{ color: alpha(white, 0.6) }}>
                                © {new Date().getFullYear()} Propel Foundry. All rights reserved.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Link href="#privacy" underline="hover" color={alpha(white, 0.8)} variant="caption">
                                    Privacy Policy
                                </Link>
                                <Link href="#terms" underline="hover" color={alpha(white, 0.8)} variant="caption">
                                    Terms of Use
                                </Link>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;