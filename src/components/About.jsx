import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
// Removed external dependencies
// import "../styles/About.css";
// import { Link } from "react-router-dom"; 

import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Stack, 
    Card,
    CardContent,
    Divider,
    alpha
} from "@mui/material";
import { 
    VisibilityOutlined, 
    RocketLaunchOutlined, 
    HandshakeOutlined,
    TrendingUpOutlined,
    ConnectWithoutContactOutlined,
    SchoolOutlined,
    ArrowForward
} from "@mui/icons-material";

// --- BRAND COLOR PALETTE (Copied for consistency) ---
const BRAND = {
    primary: "#121490", // Deep Blue
    accent: "#fd3007", // Primary Accent Red/Orange
    lightBg: "#f7f9fc", 
    secondaryAccent: "#007bff", 
    textPrimaryDark: "#1a1a1a", 
};

// --- DATA ---
const gridData = [
    {
        title: "Our Vision",
        text: "To accelerate founders with the right knowledge, network, and tools to build impactful, globally competitive companies.",
        icon: <VisibilityOutlined />,
        color: BRAND.secondaryAccent
    },
    {
        title: "Our Mission",
        text: "We provide comprehensive registration, compliance, tailored mentorship, intensive training, and investor-ready preparation through curated programs.",
        icon: <RocketLaunchOutlined />,
        color: BRAND.accent
    },
    {
        title: "Core Values",
        text: "We operate with integrity, prioritize flawless execution, and maintain a founder-first approach focused on measurable outcomes and long-term guidance.",
        icon: <HandshakeOutlined />,
        color: BRAND.primary
    },
];

const statsData = [
    { label: "Startups Supported", value: "120+", icon: <TrendingUpOutlined /> },
    { label: "Mentor Network", value: "200+", icon: <ConnectWithoutContactOutlined /> },
    { label: "Workshops Conducted", value: "80+", icon: <SchoolOutlined /> },
];

const timelineData = [
    { year: 2021, text: "Propel Foundry founded to bridge the gap between academic innovation and industry execution for early-stage founders." },
    { year: 2022, text: "Launched our flagship mentor network and introduced the first cohort of intensive startup training and compliance programs." },
    { year: 2023, text: "Achieved scaling to multi-city operations, hosting major startup showcases, and formalizing our investor readiness curriculum." },
    { year: 2024, text: "Expanded R&D collaborations with leading research institutions and launched specialized grants for women and social entrepreneurs." },
];

// --- MAIN ABOUT COMPONENT ---
const About = () => {
    return (
        <>
            {/* Helmet for SEO */}
            <Helmet>
                <title>About Us | Propel Foundry - Startup Mentorship & Training</title>
                <meta
                    name="description"
                    content="Propel Foundry empowers startups with mentorship, training, and a strong network. Learn about our vision, mission, values, and impact in supporting founders."
                />
                <meta
                    name="keywords"
                    content="Propel Foundry, startup mentorship, startup training, startup support, startup accelerator, startup growth, entrepreneur network"
                />
            </Helmet>

            {/* 1. Hero Section (Visual Impact) */}
            <Box
                component="section"
                id="about"
                sx={{
                    background: BRAND.primary, // Deep blue background
                    color: 'white',
                    py: { xs: 1, sm: 10, md: 15 },
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                                fontWeight: 900,
                                lineHeight: 1.1,
                                mb: 3,
                            }}
                        >
                            Building Founders! Accelerating <span style={{ color: BRAND.accent }}>Impact!</span>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { xs: '1.1rem', sm: '1.35rem' },
                                opacity: 0.8,
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            Propel Foundry empowers startups across their journey — from idea to scale — with mentorship, training, strategic services, and a powerful network of innovators.
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* 2. Vision, Mission, Values Grid */}
            <Box component="section" sx={{ py: { xs: 8, md: 12 }, background: 'white' }}>
                <Container maxWidth="xl">
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={{ xs: 4, md: 5 }}
                        alignItems="stretch"
                        sx={{ maxWidth: '1400px', mx: 'auto' }}
                    >
                        {gridData.map((item, i) => (
                            <motion.div
                                key={i}
                                style={{ flex: 1 }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
                            >
                                <Card
                                    elevation={4}
                                    sx={{
                                        height: '100%',
                                        p: { xs: 3, sm: 4 },
                                        borderRadius: 3,
                                        borderBottom: `6px solid ${item.color}`,
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'translateY(-5px)' }
                                    }}
                                >
                                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                        <Box sx={{ color: item.color, fontSize: '2rem' }}>
                                            {item.icon}
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ fontWeight: 800, color: BRAND.textPrimaryDark }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                    <Typography color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                                        {item.text}
                                    </Typography>
                                </Card>
                            </motion.div>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* 3. Stats Section */}
            <Box 
                component="section" 
                sx={{ 
                    py: { xs: 6, md: 10 }, 
                    background: BRAND.lightBg, 
                    textAlign: 'center' 
                }}
            >
                <Container maxWidth="lg">
                    <Typography 
                        variant="h4" 
                        component="h2" 
                        sx={{ fontWeight: 800, color: BRAND.primary, mb: { xs: 5, md: 7 } }}
                    >
                        Our Impact by the Numbers
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-around"
                        spacing={{ xs: 5, sm: 8, md: 10 }}
                    >
                        {statsData.map((s, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <Stack alignItems="center" spacing={1.5}>
                                    <Box sx={{ color: BRAND.accent, fontSize: { xs: '3rem', sm: '3.5rem' } }}>
                                        {s.icon}
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                                            fontWeight: 900,
                                            color: BRAND.textPrimaryDark,
                                            lineHeight: 1,
                                        }}
                                    >
                                        {s.value}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{ 
                                            fontWeight: 600, 
                                            color: BRAND.primary,
                                            textTransform: 'uppercase',
                                            letterSpacing: 1
                                        }}
                                    >
                                        {s.label}
                                    </Typography>
                                </Stack>
                            </motion.div>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* 4. Timeline Section */}
            <Box component="section" sx={{ py: { xs: 8, md: 12 }, background: 'white' }}>
                <Container maxWidth="md">
                    <Typography 
                        variant="h4" 
                        component="h2" 
                        textAlign="center"
                        sx={{ fontWeight: 800, color: BRAND.primary, mb: 8 }}
                    >
                        Our Journey of Empowerment
                    </Typography>

                    <Box sx={{ position: 'relative', px: { xs: 0, sm: 4 } }}>
                        {/* Vertical Line */}
                        <Box sx={{
                            position: 'absolute',
                            left: { xs: '10px', sm: '50%' },
                            width: 4,
                            bgcolor: alpha(BRAND.primary, 0.2),
                            height: '100%',
                            transform: { sm: 'translateX(-50%)' }
                        }} />
                        
                        {timelineData.map((t, idx) => {
                            const isLeft = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, [isLeft ? 'x' : 'x']: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Stack
                                        direction={{ xs: 'row', sm: 'row' }}
                                        spacing={4}
                                        alignItems="center"
                                        sx={{
                                            mb: 6,
                                            justifyContent: { sm: isLeft ? 'flex-start' : 'flex-end' },
                                            // Handle mobile vs desktop layout
                                            pl: { xs: 4, sm: isLeft ? 0 : '50%' },
                                            pr: { xs: 0, sm: isLeft ? '50%' : 0 },
                                            textAlign: { sm: isLeft ? 'right' : 'left' },
                                            position: 'relative',
                                        }}
                                    >
                                        {/* DOT & YEAR: Updated to Blue dot inside Orange ring */}
                                        <Box 
                                            sx={{
                                                position: 'absolute',
                                                left: { xs: '0', sm: '50%' },
                                                // Center horizontally for mobile (left side) and desktop (center line)
                                                transform: { xs: 'translateY(-50%)', sm: `translate(-50%, -50%)` }, 
                                                width: 30, // Outer Orange Ring size
                                                height: 30,
                                                bgcolor: BRAND.accent, // Outer Orange Ring
                                                borderRadius: '50%',
                                                border: `4px solid ${BRAND.lightBg}`, // White border/outline
                                                zIndex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: `0 0 0 6px ${BRAND.lightBg}`, // Light shadow for depth
                                            }}
                                        >
                                            <Box 
                                                sx={{
                                                    width: 20, 
                                                    height: 20, 
                                                    bgcolor: BRAND.primary, // Inner Blue Dot
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'white', lineHeight: 1 }}>
                                                    {t.year % 100} {/* Show last two digits of year */}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        {/* Content Card */}
                                        <Card 
                                            elevation={2} 
                                            sx={{ 
                                                p: 3, 
                                                borderRadius: 2, 
                                                width: { xs: '100%', sm: 'calc(50% - 20px)' },
                                                bgcolor: BRAND.lightBg,
                                                borderColor: alpha(BRAND.primary, 0.1),
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: BRAND.primary, mb: 1, display: { xs: 'block', sm: 'none' } }}>
                                                {t.year}
                                            </Typography>
                                            <Typography color="text.primary">
                                                {t.text}
                                            </Typography>
                                        </Card>
                                    </Stack>
                                </motion.div>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* 5. CTA Section */}
            
        </>
    );
};

export default About;