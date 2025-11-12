import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Stack, 
    alpha,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Modal, // Import Modal
    IconButton, // Import IconButton
    Divider,
} from "@mui/material";

import { 
    CalendarTodayOutlined,
    AccountBalanceOutlined,
    LaunchOutlined,
    FlareOutlined,
    ScienceOutlined,
    CodeOutlined,
    CloseOutlined, // Close icon for the modal
    CheckCircleOutline, // New icon for success highlights
} from "@mui/icons-material";

// --- BRAND COLOR PALETTE ---
const BRAND = {
    primary: "#121490", 
    accent: "#fd3007", 
    lightBg: "#eef5ff", // Used for Modal background
    secondaryAccent: "#007bff", 
    textPrimaryDark: "#1a1a1a", 
};

// --- OPPORTUNITIES DATA (Remains the same) ---
const opportunitiesData = {
    funding: [
        { id: 1, title: "SeedSpark 2025", 
            image: "https://placehold.co/800x450/121490/ffffff?text=Seed+Funding",
            organisedBy: "Propel Foundry Labs", deadline: "November 30, 2025",
            description: "Get your startup off the ground with SeedSpark’s seed funding round.",
            details: ["Up to ₹50 Lakhs in seed capital.", "3-month mentorship cohort.", "Open to tech startups in AI/SaaS."],
            icon: <FlareOutlined />, category: "Funding"
        },
        { id: 2, title: "Blue Ocean VC Challenge", 
            image: "https://placehold.co/800x450/007bff/ffffff?text=VC+Challenge",
            organisedBy: "Blue Ocean Ventures", deadline: "December 10, 2025",
            description: "Pitch your scalable business idea to global investors.",
            details: ["Funding up to $250,000.", "Global exposure to Silicon Valley VCs.", "Focus on sustainable and disruptive technology."],
            icon: <FlareOutlined />, category: "Funding"
        },
        { id: 3, title: "Ignite Founders Grant", 
            image: "https://placehold.co/800x450/fd3007/ffffff?text=Founders+Grant",
            organisedBy: "Ignite India Foundation", deadline: "January 5, 2026",
            description: "Aimed at supporting women-led startups and social entrepreneurs.",
            details: ["Grants up to ₹15 lakhs (non-dilutive).", "Specifically for women-led and social impact ventures.", "Includes 6 months of tailored business coaching."],
            icon: <FlareOutlined />, category: "Grant"
        },
        { id: 4, title: "TechElevate Innovation Drive", 
            image: "https://placehold.co/800x450/505050/ffffff?text=Innovation+Drive",
            organisedBy: "Propel Foundry Innovation Cell", deadline: "December 22, 2025",
            description: "For tech startups building AI or IoT-based solutions.",
            details: ["Seed capital + 1-year free incubation.", "Focus on deep tech: AI/IoT solutions.", "Access to university R&D labs."],
            icon: <FlareOutlined />, category: "Funding"
        },
    ],
    hackathon: [
        { id: 5, title: "InnovateX Global Hack 2025", 
            image: "https://placehold.co/800x450/121490/ffffff?text=Global+Hack",
            organisedBy: "TechVerse", deadline: "November 20, 2025",
            description: "A 48-hour coding challenge for developers and designers to build AI-powered sustainable solutions.",
            details: ["48-hour non-stop challenge.", "Total prize pool of $10,000 USD.", "Theme: AI for Sustainable Development."],
            icon: <CodeOutlined />, category: "Hackathon"
        },
        { id: 6, title: "SmartCity Challenge", 
            image: "https://placehold.co/800x450/fd3007/ffffff?text=Smart+City",
            organisedBy: "TechNext Coimbatore", deadline: "December 8, 2025",
            description: "Join developers worldwide to create smart urban innovations. Theme: Smart Mobility and Energy.",
            details: ["Focus on Smart Mobility and Energy.", "Direct access to city planners for pilots.", "Winners get ₹5 lakhs for proof-of-concept."],
            icon: <CodeOutlined />, category: "Challenge"
        },
        { id: 7, title: "CodeSprint 2.0", 
            image: "https://placehold.co/800x450/007bff/ffffff?text=Code+Sprint",
            organisedBy: "National Coding Network", deadline: "January 15, 2026",
            description: "National-level hackathon for students to showcase coding, design, and AI creativity.",
            details: ["Prizes up to ₹2 lakhs.", "Exclusive for student participants.", "Internship opportunities with corporate sponsors."],
            icon: <CodeOutlined />, category: "Hackathon"
        },
        { id: 8, title: "EcoTech HackFest", 
            image: "https://placehold.co/800x450/909090/ffffff?text=Eco+Tech",
            organisedBy: "Green Tech Association", deadline: "February 1, 2026",
            description: "Focuses on environmental sustainability through technology.",
            details: ["Dedicated track for environmental tech.", "Includes mentorship from leading environmental scientists.", "Pilot partnership opportunities."],
            icon: <CodeOutlined />, category: "Hackathon"
        },
    ],
    research: [
        { id: 9, title: "AI Research Fellowship 2025", 
            image: "https://placehold.co/800x450/121490/ffffff?text=AI+Fellowship",
            organisedBy: "AI Research Council", deadline: "November 25, 2025",
            description: "Collaborate with top universities on machine learning and computer vision projects.",
            details: ["Fully funded 6-month fellowship.", "Focus on ML and Computer Vision.", "Publication support in Tier 1 journals."],
            icon: <ScienceOutlined />, category: "Fellowship"
        },
        { id: 10, title: "GreenTech Paper Submission", 
            image: "https://placehold.co/800x450/fd3007/ffffff?text=GreenTech+Paper",
            organisedBy: "International GreenTech Conference", deadline: "December 18, 2025",
            description: "Submit your paper on sustainable energy innovations to the International Conference on GreenTech, 2025 edition.",
            details: ["International conference publication opportunity.", "Focus area: Sustainable Energy Innovation.", "Travel and accommodation stipend provided."],
            icon: <ScienceOutlined />, category: "Submission"
        },
        { id: 11, title: "NextGen Innovation Symposium", 
            image: "https://placehold.co/800x450/007bff/ffffff?text=Innovation+Symposium",
            organisedBy: "NextGen Research Hub", deadline: "January 30, 2026",
            description: "A platform for young researchers to present their findings in robotics, healthcare AI, and IoT technologies.",
            details: ["Showcase findings to global faculty.", "Themes: Robotics, Healthcare AI, IoT.", "Best papers receive cash prizes."],
            icon: <ScienceOutlined />, category: "Symposium"
        },
        { id: 12, title: "QuantumTech Scholars Program", 
            image: "https://placehold.co/800x450/505050/ffffff?text=Quantum+Scholars",
            organisedBy: "QuantumTech Labs", deadline: "February 15, 2026",
            description: "Research program dedicated to quantum computing and cryptography.",
            details: ["Stipend and lab resources included.", "Dedicated to Quantum Computing and Cryptography.", "Collaboration with industry partners."],
            icon: <ScienceOutlined />, category: "Program"
        },
    ],
};

// --- DETAIL MODAL COMPONENT ---
const OpportunityDetailModal = ({ item, handleClose }) => {
    if (!item) return null;

    let color = BRAND.primary;
    if (item.category.includes("Funding") || item.category.includes("Grant")) {
        color = BRAND.accent;
    } else if (item.category.includes("Hackathon") || item.category.includes("Challenge")) {
        color = BRAND.secondaryAccent;
    } else if (item.category.includes("Research") || item.category.includes("Fellowship")) {
        color = BRAND.primary;
    }

    return (
        <Modal open={!!item} onClose={handleClose} closeAfterTransition>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
                    maxHeight: '90vh',
                    bgcolor: 'white',
                    borderRadius: 3,
                    boxShadow: 24,
                    overflowY: 'auto',
                    outline: 'none',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'sticky',
                        top: 10,
                        right: 10,
                        zIndex: 10,
                        bgcolor: 'white',
                        boxShadow: 3,
                        '&:hover': { bgcolor: BRAND.lightBg },
                    }}
                >
                    <CloseOutlined color="action" />
                </IconButton>

                {/* Media and Header */}
                <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                />

                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ fontWeight: 800, color: BRAND.textPrimaryDark, lineHeight: 1.2 }}
                        >
                            {item.title}
                        </Typography>
                        <Chip
                            label={item.category}
                            sx={{ bgcolor: alpha(color, 0.15), color: color, fontWeight: 700, fontSize: '0.9rem' }}
                        />
                    </Stack>

                    <Stack direction="row" spacing={4} mb={4} divider={<Divider orientation="vertical" flexItem />}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AccountBalanceOutlined sx={{ color: BRAND.primary, fontSize: '1.2rem' }} />
                            <Typography variant="body2">
                                **Organized by:** {item.organisedBy}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CalendarTodayOutlined sx={{ color: BRAND.accent, fontSize: '1.2rem' }} />
                            <Typography variant="body2" sx={{ fontWeight: 700, color: BRAND.accent }}>
                                Deadline: {item.deadline}
                            </Typography>
                        </Stack>
                    </Stack>
                    
                    <Divider sx={{ mb: 4 }} />

                    {/* Detailed Description */}
                    <Typography variant="body1" sx={{ color: BRAND.textPrimaryDark, lineHeight: 1.7, mb: 4 }}>
                        {item.description}
                    </Typography>

                    {/* Key Highlights/Details */}
                    {item.details && (
                        <Box mb={4}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: BRAND.primary, mb: 2 }}>
                                Key Highlights
                            </Typography>
                            <Stack spacing={1.5}>
                                {item.details.map((detail, index) => (
                                    <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                                        <CheckCircleOutline sx={{ color: color, fontSize: '1.2rem', mt: '2px' }} />
                                        <Typography variant="body1" color="text.secondary">
                                            {detail}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {/* Final CTA Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<LaunchOutlined />}
                        // Replace with actual external link if available
                        onClick={() => console.log('Applying to:', item.title)}
                        sx={{
                            mt: 2,
                            py: 1.5,
                            bgcolor: BRAND.accent,
                            color: 'white',
                            borderRadius: 1.5,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            boxShadow: `0 8px 25px ${alpha(BRAND.accent, 0.4)}`,
                            '&:hover': { bgcolor: BRAND.primary }
                        }}
                    >
                        Apply Now & Secure Your Spot
                    </Button>
                </CardContent>
            </Box>
        </Modal>
    );
};


// --- CARD COMPONENT (Updated to handle Modal open) ---
const OpportunityCard = ({ item, index, handleCardClick }) => {
    let color = BRAND.primary;
    if (item.category.includes("Funding") || item.category.includes("Grant")) {
        color = BRAND.accent;
    } else if (item.category.includes("Hackathon") || item.category.includes("Challenge")) {
        color = BRAND.secondaryAccent;
    } else if (item.category.includes("Research") || item.category.includes("Fellowship")) {
        color = BRAND.primary;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Card
                elevation={6}
                onClick={() => handleCardClick(item)} // Handle click on card
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    borderBottom: `6px solid ${color}`, 
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-8px)', // Increased lift
                        boxShadow: `0 18px 50px ${alpha(color, 0.35)}`, // Enhanced shadow
                    }
                }}
            >
                {/* Media Section */}
                <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                />

                {/* Content Section */}
                <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Title and Chip */}
                    <Stack 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="flex-start" 
                        mb={1.5}
                    >
                        <Typography
                            component="h3"
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                fontWeight: 800, // Slightly bolder title
                                color: BRAND.textPrimaryDark,
                                lineHeight: 1.2
                            }}
                        >
                            {item.title}
                        </Typography>
                        <Chip
                            label={item.category}
                            size="small"
                            sx={{
                                bgcolor: alpha(color, 0.15),
                                color: color,
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                borderRadius: 1,
                                px: 1,
                                mt: 0.5
                            }}
                        />
                    </Stack>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={2}
                        sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}
                    >
                        {item.description.substring(0, 100)}...
                    </Typography>

                    {/* Metadata: Org and Deadline */}
                   

                    {/* View Details Button (Non-functional, stylistic link) */}
                    <Button
                        variant="text"
                        fullWidth
                        onClick={(e) => { e.stopPropagation(); handleCardClick(item); }} // Explicitly open modal
                        endIcon={<LaunchOutlined />}
                        sx={{
                            mt: 1,
                            color: BRAND.primary,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            '&:hover': {
                                bgcolor: alpha(BRAND.primary, 0.05),
                                color: BRAND.accent,
                            }
                        }}
                    >
                        View Full Details
                    </Button>

                </CardContent>
            </Card>
        </motion.div>
    );
};


// --- MAIN OPPORTUNITIES COMPONENT ---
const Opportunities = () => {
    const [activeTab, setActiveTab] = useState("funding");
    const [selectedOpportunity, setSelectedOpportunity] = useState(null); // State for modal

    const handleCardClick = (item) => {
        setSelectedOpportunity(item);
    };

    const handleModalClose = () => {
        setSelectedOpportunity(null);
    };

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 10, sm: 12, md: 15 }, 
                background: BRAND.lightBg, 
            }}
        >
            <Container maxWidth="xl">
                {/* Header */}
                <Box 
                    sx={{ 
                        textAlign: 'center',
                        mx: 'auto',
                        maxWidth: 'lg',
                        mb: { xs: 6, md: 8 }
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
                        Explore Growth <span>Opportunities</span>
                    </Typography>
                    <Typography 
                        sx={{ 
                            fontSize: { xs: '1.1rem', sm: '1.35rem' },
                            color: BRAND.textPrimaryDark,
                            maxWidth: '800px',
                            mx: 'auto'
                        }}
                    >
                        Access exclusive funding rounds, high-stakes hackathons, and cutting-edge research programs tailored for ambitious founders and innovators.
                    </Typography>
                </Box>
                
                {/* Tabs for Filtering */}
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1.5, sm: 3 }}
                    justifyContent="center"
                    mb={{ xs: 6, md: 8 }}
                    sx={{ p: { xs: 2, sm: 0 }, maxWidth: '800px', mx: 'auto' }}
                >
                    {["funding", "research", "hackathon"].map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? "contained" : "outlined"}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                                flexGrow: 1,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                minWidth: '150px',
                                
                                // Active/Contained State
                                ...(activeTab === tab && {
                                    bgcolor: BRAND.primary,
                                    color: 'white',
                                    boxShadow: `0 6px 20px ${alpha(BRAND.primary, 0.4)}`,
                                    '&:hover': {
                                        bgcolor: BRAND.primary,
                                    }
                                }),

                                // Outlined/Inactive State
                                ... (activeTab !== tab && {
                                    borderColor: alpha(BRAND.primary, 0.4),
                                    color: BRAND.primary,
                                    bgcolor: 'white',
                                    '&:hover': {
                                        borderColor: BRAND.primary,
                                        bgcolor: alpha(BRAND.primary, 0.05),
                                    }
                                })
                            }}
                        >
                            {tab === "funding"
                                ? "Startup Funding"
                                : tab === "research"
                                ? "Research Programs"
                                : "Hackathons & Challenges"}
                        </Button>
                    ))}
                </Stack>

                {/* Opportunities Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 4, sm: 4, lg: 5 },
                        maxWidth: '1600px',
                        mx: 'auto',
                    }}
                >
                    {opportunitiesData[activeTab].map((item, index) => (
                        <OpportunityCard key={item.id} item={item} index={index} handleCardClick={handleCardClick} />
                    ))}
                </Box>

                {/* Global CTA */}
               
            </Container>

            {/* Render the Modal */}
            <OpportunityDetailModal 
                item={selectedOpportunity} 
                handleClose={handleModalClose} 
            />

        </Box>
    );
};

export default Opportunities;