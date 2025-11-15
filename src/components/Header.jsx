import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    IconButton,
    Drawer,
    useMediaQuery,
    useTheme,
    Divider,
    Typography,
    Stack,
    Button,
    alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png"; // Local logo import (will be replaced with URL)
// --- BRAND COLOR PALETTE (Defined to ensure consistency across all files) ---
const BRAND = {
    primary: "#121490", // Deep Blue
    accent: "#fd3007", // Primary Accent Red/Orange
    textPrimaryDark: "#1a1a1a",
};

// URL for the uploaded logo image (replaces local import)

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        )
            return;
        setMobileOpen(open);
    };

    const navItems = [
        { label: "Home", path: "/home" },
        { label: "Services", path: "/services" },
        { label: "Community", path: "/community" },
        { label: "Opportunities", path: "/opportunities" },
        { label: "Contact", path: "/contact" },
        { label: "About", path: "/about" },
    ];

    const NavLinks = ({ vertical = false }) => (
        <Stack
            direction={vertical ? "column" : "row"}
            spacing={vertical ? 2 : 3}
            alignItems={vertical ? "flex-start" : "center"}
        >
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    style={{ textDecoration: "none" }}
                >
                    {({ isActive }) => (
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: "1rem", md: "1.05rem" },
                                // Use dark text for general links
                                color: isActive
                                    ? BRAND.primary
                                    : BRAND.textPrimaryDark,
                                opacity: isActive ? 1 : 0.8,
                                position: "relative",
                                transition: 'all 0.2s ease',
                                
                                "&:hover": {
                                    color: BRAND.primary,
                                    opacity: 1
                                },
                                
                                // Animated Underline for active/hover state
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -4,
                                    left: 0,
                                    width: isActive ? "100%" : 0,
                                    height: 2.5,
                                    background: BRAND.primary,
                                    borderRadius: 2,
                                    transition: "width 0.3s ease",
                                },
                                "&:hover::after": { width: "100%" },
                            }}
                        >
                            {item.label}
                        </Typography>
                    )}
                </NavLink>
            ))}
        </Stack>
    );

    return (
        <AppBar
            position="fixed"
            elevation={scrolled ? 6 : 0}
            sx={{
                // Enhanced background for a "frosted glass" effect when scrolled
                background: scrolled
                    ? alpha(theme.palette.background.paper, 0.95)
                    : "rgba(255,255,255,0.9)",
                borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "none",
                backdropFilter: "blur(8px)", 
                transition: "all 300ms ease",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: "space-between",
                        py: { xs: 0.5, md: 1 },
                    }}
                >
                    {/* Logo (Image) */}
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <Box
                            component="img"
                            src={logo}
                            alt="Propel Foundry Logo"
                            sx={{
                                width: { xs: 130, md: 180 }, // Adjust size for visibility
                                height: "auto",
                                cursor: "pointer",
                                transition: "transform 0.25s ease",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <NavLinks />
                     
                        </Box>
                    )}

                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon sx={{ color: BRAND.primary }} />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                anchor="top"
                open={mobileOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        background: theme.palette.background.default,
                        pt: 2,
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        {/* Mobile Drawer Logo */}
                        <Box
                            component="img"
                            src={logo}
                            alt="Propel Foundry Logo"
                            sx={{ width: 150 }}
                        />
                        <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <NavLinks vertical />
                    <Button
                        variant="contained"
                        href="/contact"
                        sx={{
                            mt: 4,
                            mb: 2,
                            width: "100%",
                            borderRadius: "999px",
                            py: 1.5,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            bgcolor: BRAND.accent,
                            boxShadow: `0 8px 25px ${alpha(BRAND.accent, 0.4)}`,
                            '&:hover': {
                                bgcolor: alpha(BRAND.accent, 0.9),
                            }
                        }}
                    >
                        Get Started
                    </Button>
                </Container>
            </Drawer>
        </AppBar>
    );
};

export default Header;