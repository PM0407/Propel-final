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
    Modal, 
    IconButton, 
    Divider,
    Grid, // Used for the new 2-column modal layout
} from "@mui/material";

import { 
    CalendarTodayOutlined,
    AccountBalanceOutlined,
    LaunchOutlined,
    FlareOutlined,
    ScienceOutlined,
    CodeOutlined,
    CloseOutlined, 
    CheckCircleOutline, 
    LiveTv, // Icon for Live status
    TimerOutlined, // Icon for Upcoming status
} from "@mui/icons-material";

// --- BRAND COLOR PALETTE ---
const BRAND = {
    primary: "#121490", 
    accent: "#fd3007", 
    lightBg: "#eef5ff", 
    secondaryAccent: "#007bff", 
    textPrimaryDark: "#1a1a1a", 
    success: "#10b981", // Added for live status
};

// --- OPPORTUNITIES DATA (Data remains the same) ---
const opportunitiesData = {
    funding: [
        { id: 1, title: "SeedSpark 2025", 
            image: "https://placehold.co/800x450/121490/ffffff?text=Seed+Funding",
            organisedBy: "Propel Foundry Labs", deadline: "November 30, 2025",
            description: "Get your startup off the ground with SeedSpark’s seed funding round.",
            details: ["Up to ₹50 Lakhs in seed capital.", "3-month mentorship cohort.", "Open to tech startups in AI/SaaS."],
            icon: <FlareOutlined />, category: "Funding", url: "https://example.com/seedspark"
        },
        { id: 2, title: "Blue Ocean VC Challenge", 
            image: "https://placehold.co/800x450/007bff/ffffff?text=VC+Challenge",
            organisedBy: "Blue Ocean Ventures", deadline: "December 10, 2025",
            description: "Pitch your scalable business idea to global investors.",
            details: ["Funding up to $250,000.", "Global exposure to Silicon Valley VCs.", "Focus on sustainable and disruptive technology."],
            icon: <FlareOutlined />, category: "Funding", url: "https://example.com/blueocean"
        },
        { id: 3, title: "Ignite Founders Grant", 
            image: "https://placehold.co/800x450/fd3007/ffffff?text=Founders+Grant",
            organisedBy: "Ignite India Foundation", deadline: "January 5, 2026",
            description: "Aimed at supporting women-led startups and social entrepreneurs.",
            details: ["Grants up to ₹15 lakhs (non-dilutive).", "Specifically for women-led and social impact ventures.", "Includes 6 months of tailored business coaching."],
            icon: <FlareOutlined />, category: "Grant", url: "https://example.com/ignite"
        },
        { id: 4, title: "TechElevate Innovation Drive", 
            image: "https://placehold.co/800x450/505050/ffffff?text=Innovation+Drive",
            organisedBy: "Propel Foundry Innovation Cell", deadline: "December 22, 2025",
            description: "For tech startups building AI or IoT-based solutions.",
            details: ["Seed capital + 1-year free incubation.", "Focus on deep tech: AI/IoT solutions.", "Access to university R&D labs."],
            icon: <FlareOutlined />, category: "Funding", url: "https://example.com/techelevate"
        },
    ],
    hackathon: [
        { id: 5, title: "InnovateX Global Hack 2025", 
            image: "https://placehold.co/800x450/121490/ffffff?text=Global+Hack",
            organisedBy: "TechVerse", deadline: "November 20, 2025",
            description: "A 48-hour coding challenge for developers and designers to build AI-powered sustainable solutions.",
            details: ["48-hour non-stop challenge.", "Total prize pool of $10,000 USD.", "Theme: AI for Sustainable Development."],
            icon: <CodeOutlined />, category: "Hackathon", url: "https://example.com/innovatex"
        },
        { id: 6, title: "SmartCity Challenge", 
            image: "https://placehold.co/800x450/fd3007/ffffff?text=Smart+City",
            organisedBy: "TechNext Coimbatore", deadline: "December 8, 2025",
            description: "Join developers worldwide to create smart urban innovations. Theme: Smart Mobility and Energy.",
            details: ["Focus on Smart Mobility and Energy.", "Direct access to city planners for pilots.", "Winners get ₹5 lakhs for proof-of-concept."],
            icon: <CodeOutlined />, category: "Challenge", url: "https://example.com/smartcity"
        },
        { id: 7, title: "CodeSprint 2.0", 
            image: "https://placehold.co/800x450/007bff/ffffff?text=Code+Sprint",
            organisedBy: "National Coding Network", deadline: "January 15, 2026",
            description: "National-level hackathon for students to showcase coding, design, and AI creativity.",
            details: ["Prizes up to ₹2 lakhs.", "Exclusive for student participants.", "Internship opportunities with corporate sponsors."],
            icon: <CodeOutlined />, category: "Hackathon", url: "https://example.com/codesprint"
        },
        { id: 8, title: "EcoTech HackFest", 
            image: "https://placehold.co/800x450/909090/ffffff?text=Eco+Tech",
            organisedBy: "Green Tech Association", deadline: "February 1, 2026",
            description: "Focuses on environmental sustainability through technology.",
            details: ["Dedicated track for environmental tech.", "Includes mentorship from leading environmental scientists.", "Pilot partnership opportunities."],
            icon: <CodeOutlined />, category: "Hackathon", url: "https://example.com/ecotech"
        },
    ],
    research: [
        { id: 9, title: "AI Research Fellowship 2025", 
            image: "https://placehold.co/800x450/121490/ffffff?text=AI+Fellowship",
            organisedBy: "AI Research Council", deadline: "November 25, 2025",
            description: "Collaborate with top universities on machine learning and computer vision projects.",
            details: ["Fully funded 6-month fellowship.", "Focus on ML and Computer Vision.", "Publication support in Tier 1 journals."],
            icon: <ScienceOutlined />, category: "Fellowship", url: "https://example.com/airesearch"
        },
        { id: 10, title: "GreenTech Paper Submission", 
            image: "https://placehold.co/800x450/fd3007/ffffff?text=GreenTech+Paper",
            organisedBy: "International GreenTech Conference", deadline: "December 18, 2025",
            description: "Submit your paper on sustainable energy innovations to the International Conference on GreenTech, 2025 edition.",
            details: ["International conference publication opportunity.", "Focus area: Sustainable Energy Innovation.", "Travel and accommodation stipend provided."],
            icon: <ScienceOutlined />, category: "Submission", url: "https://example.com/greentechpaper"
        },
        { id: 11, title: "NextGen Innovation Symposium", 
            image: "https://placehold.co/800x450/007bff/ffffff?text=Innovation+Symposium",
            organisedBy: "NextGen Research Hub", deadline: "January 30, 2026",
            description: "A platform for young researchers to present their findings in robotics, healthcare AI, and IoT technologies.",
            details: ["Showcase findings to global faculty.", "Themes: Robotics, Healthcare AI, IoT.", "Best papers receive cash prizes."],
            icon: <ScienceOutlined />, category: "Symposium", url: "https://example.com/nextgen"
        },
        { id: 12, title: "QuantumTech Scholars Program", 
            image: "https://placehold.co/800x450/505050/ffffff?text=Quantum+Scholars",
            organisedBy: "QuantumTech Labs", deadline: "February 15, 2026",
            description: "Research program dedicated to quantum computing and cryptography.",
            details: ["Stipend and lab resources included.", "Dedicated to Quantum Computing and Cryptography.", "Collaboration with industry partners."],
            icon: <ScienceOutlined />, category: "Program", url: "https://example.com/quantumtech"
        },
    ],
};


// --- DETAIL MODAL COMPONENT (REFINED) ---
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

    // --- LIVE/UPCOMING STATUS LOGIC ---
    const deadlineDate = new Date(item.deadline);
    const now = new Date();
    // Consider "Live" if deadline is within the next 30 days AND not passed
    const isLive = deadlineDate > now && (deadlineDate.getTime() - now.getTime() < (30 * 24 * 60 * 60 * 1000)); 
    const isPastDeadline = now > deadlineDate;

    let statusLabel = 'UPCOMING';
    let statusColor = BRAND.secondaryAccent;
    let statusIcon = <TimerOutlined sx={{ color: 'white', fontSize: 20 }} />;

    if (isPastDeadline) {
        statusLabel = 'CLOSED';
        statusColor = BRAND.textPrimaryDark; // Darker color for closed
        statusIcon = <CloseOutlined sx={{ color: 'white', fontSize: 20 }} />;
    } else if (isLive) {
        statusLabel = 'LIVE NOW';
        statusColor = BRAND.success; // Green for live
        statusIcon = <LiveTv sx={{ color: 'white', fontSize: 20 }} />;
    }
    
    const daysRemaining = isPastDeadline ? 0 : Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));


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
                    display: 'flex', // Use flex for column layout on mobile, row on desktop
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {/* Close Button - positioned outside the grid for better flexibility */}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: { xs: 10, md: 16 },
                        right: { xs: 10, md: 16 },
                        zIndex: 10,
                        bgcolor: 'white',
                        boxShadow: 3,
                        '&:hover': { bgcolor: BRAND.lightBg },
                        border: `1px solid ${alpha(BRAND.textPrimaryDark, 0.1)}`
                    }}
                >
                    <CloseOutlined color="action" />
                </IconButton>

                {/* Left Column: Image/Media */}
                <Box sx={{ 
                    flex: { xs: '0 0 100%', md: '0 0 50%' }, // 100% width on mobile, 50% on desktop
                    position: 'relative',
                    minHeight: { xs: 200, md: 'auto' }, // Min height for image on small screens
                    borderRadius: { xs: '12px 12px 0 0', md: '12px 0 0 12px' }, // Rounded corners
                    overflow: 'hidden', // Ensure image respects border radius
                }}>
                    <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{ 
                            objectFit: 'cover', 
                            height: '100%', // Take full height of parent box
                            width: '100%',
                            display: 'block', // Ensure no extra space below image
                        }}
                    />
                </Box>

                {/* Right Column: Details */}
                <Box sx={{ 
                    flex: { xs: '0 0 100%', md: '0 0 50%' }, // 100% width on mobile, 50% on desktop
                    p: { xs: 3, md: 5 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', // Vertically center content if space allows
                    textAlign: { xs: 'center', md: 'left' } // Center text on mobile
                }}>
                            
                    {/* Status Indicator */}
                    <Chip
                        icon={statusIcon}
                        label={statusLabel}
                        sx={{ 
                            bgcolor: statusColor, 
                            color: 'white', 
                            fontWeight: 700, 
                            mb: 2, 
                            fontSize: '0.85rem',
                            alignSelf: { xs: 'center', md: 'flex-start' } // Center on mobile, left on desktop
                        }}
                    />

                    {/* Event Title */}
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 900, color: BRAND.textPrimaryDark, mb: 1.5, lineHeight: 1.2 }}
                    >
                        {item.title}
                    </Typography>
                    
                    {/* Category Chip */}
                    <Chip
                        label={item.category}
                        sx={{ 
                            bgcolor: alpha(color, 0.15), 
                            color: color, 
                            fontWeight: 700, 
                            fontSize: '0.8rem',
                            mb: 3,
                            alignSelf: { xs: 'center', md: 'flex-start' } // Center on mobile, left on desktop
                        }}
                    />

                    <Divider sx={{ mb: 3 }} />

                    {/* Organized By */}
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        alignItems={{ xs: 'center', sm: 'flex-start' }} 
                        spacing={{ xs: 0.5, sm: 1 }} 
                        mb={1.5}
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AccountBalanceOutlined sx={{ color: BRAND.primary, fontSize: '1.2rem' }} />
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Organized by:
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary">
                            {item.organisedBy}
                        </Typography>
                    </Stack>
                    
                    {/* Deadline */}
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        alignItems={{ xs: 'center', sm: 'flex-start' }} 
                        spacing={{ xs: 0.5, sm: 1 }} 
                        mb={3}
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CalendarTodayOutlined sx={{ color: BRAND.accent, fontSize: '1.2rem' }} />
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Deadline:
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: BRAND.accent }}>
                                {item.deadline}
                            </Typography>
                            {daysRemaining > 0 && 
                                <Chip 
                                    label={`${daysRemaining} Days Left`} 
                                    size="small" 
                                    color="warning" 
                                    sx={{ ml: 1, height: 20, fontWeight: 700 }}
                                />
                            }
                        </Stack>
                    </Stack>
                    
                    <Divider sx={{ mb: 3 }} />

                    {/* Description - Simplified and optional */}
                    {item.description && (
                        <Box mb={3}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: BRAND.primary, mb: 1.5 }}>
                                About the Opportunity
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {item.description}
                            </Typography>
                        </Box>
                    )}


                    {/* Final CTA Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<LaunchOutlined />}
                        onClick={() => window.open(item.url || '#', '_blank')}
                        sx={{
                            mt: 'auto', // Push to bottom of available space
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
                        Apply Now
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};


// --- CARD COMPONENT (Streamlined) ---
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
                onClick={() => handleCardClick(item)} 
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    borderBottom: `6px solid ${color}`, 
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-8px)', 
                        boxShadow: `0 18px 50px ${alpha(color, 0.35)}`,
                    }
                }}
            >
                {/* Media Section (Image Only) */}
                <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                />

                {/* Content Section (Title and Category Only) */}
                <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    
                    <Typography
                        component="h3"
                        sx={{
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                            fontWeight: 800,
                            color: BRAND.textPrimaryDark,
                            lineHeight: 1.2,
                            textAlign: 'center', 
                            mb: 1
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
                        }}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
};


// --- MAIN OPPORTUNITIES COMPONENT ---
const Opportunities = () => {
    const [activeTab, setActiveTab] = useState("funding");
    const [selectedOpportunity, setSelectedOpportunity] = useState(null); 

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