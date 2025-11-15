import React from "react";
import { motion } from "framer-motion";
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Card, 
    CardContent, 
    Avatar, 
    Stack, 
    Chip, 
    alpha, // utility for darkening/lightening colors
    Divider // New: Used for visual separation
} from "@mui/material";

// Replaced react-icons/fa with standard Material UI Icons
import { 
    LightbulbOutlined, 
    ArticleOutlined, 
    GavelOutlined, 
    TrendingUpOutlined, 
    SupervisorAccountOutlined, 
    SchoolOutlined, 
    PeopleOutline, 
    EmojiEventsOutlined,
    ArrowRightAlt
} from "@mui/icons-material";

// --- BRAND COLOR PALETTE (Extracted from Logo) ---
const BRAND = {
    // Primary Deep Blue (for text, main buttons)
    primary: "#121490", 
    // Primary Accent Red/Orange (for highlights)
    accent: "#fd3007", 
    // Secondary Light Blue (for backgrounds, subtle elements)
    lightBg: "#eef5ff", 
    // A brighter blue derived from the logo's graphic trail
    secondaryAccent: "#007bff", 
    // New: Darker text color for high contrast and professionalism
    textPrimaryDark: "#1a1a1a", 
};

// --- CATEGORY COLOR MAPPING for Chips ---
const categoryColors = {
    Strategy: { color: BRAND.secondaryAccent },
    Legal: { color: BRAND.accent },
    Growth: { color: BRAND.primary },
    Support: { color: BRAND.primary },
};

// --- SERVICE DATA ---
const servicesData = [
    {
        icon: <LightbulbOutlined />,
        title: "Startup Consulting",
        description: "Strategic guidance on idea validation, business modeling and go-to-market strategy.",
        category: "Strategy"
    },
    {
        icon: <ArticleOutlined />,
        title: "Company Registration",
        description: "End-to-end support for OPC, LLP, Pvt Ltd & Section 8 registrations.",
        category: "Legal"
    },
    {
        icon: <GavelOutlined />,
        title: "IPR & Compliance",
        description: "IPR filing, trademark protection and statutory compliance guidance.",
        category: "Legal"
    },
    {
        icon: <TrendingUpOutlined />,
        title: "Business Growth",
        description: "Growth strategy, proposal writing and investor readiness programs.",
        category: "Growth"
    },
    {
        icon: <SupervisorAccountOutlined />,
        title: "Mentorship",
        description: "Connect with experienced mentors for hands-on startup guidance.",
        category: "Support"
    },
    {
        icon: <PeopleOutline />,
        title: "Networking & Partnerships",
        description: "Access to investors, partners and curated networking opportunities.",
        category: "Growth"
    },
    {
        icon: <SchoolOutlined />,
        title: "Training Programs",
        description: "Practical workshops and skill development for startup teams.",
        category: "Support"
    },
    {
        icon: <EmojiEventsOutlined />,
        title: "Hackathons & Events",
        description: "Showcase solutions and gain traction through curated events.",
        category: "Growth"
    },
];

// --- CARD COMPONENT ---
const ServiceCard = ({ service, idx }) => {
    const chipProps = categoryColors[service.category] || { color: BRAND.primary };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
            <Card
                elevation={10} 
                sx={{
                    // Keeping original height behavior
                    height: '80%', 
                    background: 'white',
                    borderRadius: 3,
                    p: { xs: 2.5, sm: 4 },
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    border: `1px solid ${alpha(BRAND.primary, 0.05)}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 18px 50px ${alpha(BRAND.primary, 0.15)}`, 
                    },
                }}
            >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, flexGrow: 1 }}>
                    <Stack spacing={2.5}>
                        {/* Chip & Icon */}
                        <Stack 
                            direction="row" 
                            alignItems="center" 
                            justifyContent="space-between"
                        >
                            <Avatar
                                sx={{
                                    width: 64, 
                                    height: 64,
                                    bgcolor: alpha(BRAND.primary, 0.08),
                                    color: BRAND.primary,
                                    fontSize: '2rem', 
                                    transition: 'all 0.3s',
                                    '&:hover, .MuiCard-root:hover &': {
                                        bgcolor: BRAND.primary,
                                        color: 'white',
                                    }
                                }}
                            >
                                {service.icon}
                            </Avatar>
                            <Chip
                                label={service.category}
                                size="small"
                                sx={{
                                    bgcolor: alpha(chipProps.color, 0.1),
                                    color: chipProps.color,
                                    fontWeight: 700, 
                                    fontSize: '0.8rem',
                                    borderRadius: 1.5,
                                    px: 1.5,
                                }}
                            />
                        </Stack>

                        {/* Title & Description */}
                        <Box mt={3} flexGrow={1}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: BRAND.textPrimaryDark, 
                                }}
                            >
                                {service.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                    color: 'text.secondary',
                                    lineHeight: 1.6,
                                }}
                            >
                                {service.description}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                
                {/* Action Button */}
                <Button
                    endIcon={<ArrowRightAlt />}
                    sx={{
                        mt: 3,
                        alignSelf: 'flex-start',
                        color: BRAND.primary,
                        py: 0.5,
                        px: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: alpha(BRAND.primary, 0.05),
                        }
                    }}
                >
                    Explore Details
                </Button>
            </Card>
        </motion.div>
    );
};

// --- MAIN SERVICES COMPONENT ---
const Services = () => {

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, sm: 12, md: 15 }, 
                background: '#f7f9fc', 
            }}
        >
            {/* FIX 1: Increased max width to 1500px to give more space for the 4 columns */}
            <Container sx={{ maxWidth: '1500px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    {/* Header */}
                    <Box 
                        sx={{ 
                            textAlign: 'center',
                            mx: 'auto',
                            maxWidth: '700px' 
                        }}
                    >
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                fontWeight: 900,
                                color: BRAND.primary,
                                mb: 2,
                                lineHeight: 1.1,
                                '& > span': {
                                    color: BRAND.accent
                                }
                            }}
                        >
                            Our Core <span>Services</span>
                        </Typography>
                        <Typography 
                            sx={{ 
                                fontSize: { xs: '1.1rem', sm: '1.35rem' },
                                color: BRAND.textPrimaryDark, 
                                maxWidth: '700px',
                                mx: 'auto'
                            }}
                        >
                            We provide comprehensive support for startups at every critical stage, from inception to accelerated growth.
                        </Typography>
                    </Box>
                    
                    {/* Visual Separator (Gap between header and grid) */}
                    <Box sx={{ 
                        maxWidth: '120px', 
                        mx: 'auto', 
                        mt: { xs: 4, md: 5 }, 
                        mb: { xs: 6, md: 8 }  
                    }}>
                        <Divider sx={{ 
                            bgcolor: BRAND.accent, 
                            height: 5, 
                            borderRadius: 2, 
                            width: '100%', 
                            mx: 'auto' 
                        }} />
                    </Box>

                    {/* Services Grid - Maintaining 4 columns and reducing the gap for wider cards */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '2fr',
                                sm: 'repeat(2, 1fr)',
                                // Maintaining 4 columns
                                lg: 'repeat(4, 1fr)', 
                            },
                            // FIX 2: Reduced gap on large screens (lg: 10 -> lg: 6)
                            gap: { xs: 1, sm: 1, lg: 2 }, 
                            mx: 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {servicesData.map((service, idx) => (
                            <ServiceCard key={service.title} service={service} idx={idx} />
                        ))}
                    </Box>
                </motion.div>
                
                {/* Call to Action at the bottom */}
                
            </Container>
        </Box>
    );
};

export default Services;