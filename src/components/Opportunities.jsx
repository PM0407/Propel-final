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
    Grid, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, // Used for the table container
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
    LiveTv, 
    TimerOutlined, 
} from "@mui/icons-material";

// --- BRAND COLOR PALETTE ---
const BRAND = {
    primary: "#121490", 
    accent: "#fd3007", 
    lightBg: "#eef5ff", 
    secondaryAccent: "#007bff", 
    textPrimaryDark: "#1a1a1a", 
    success: "#10b981", 
};
import log1 from "../assets/business-growth.jpg";
import log2 from "../assets/dpiit registration.png";
import log3 from "../assets/event1.jpg";
import log4 from "../assets/mentoring.png";
import log5 from "../assets/networking.png";
// --- DATA ADJUSTMENT for Table Format ---
// To align research data with the table structure: Event, Date, Location, Sponsorship, Format
const opportunitiesData = {
    funding: [
        // Funding data remains the same
        { id: 1, title: "SeedSpark 2025", 
            image:log1,
            organisedBy: "Propel Foundry Labs", deadline: "November 30, 2025",
            description: "Get your startup off the ground with SeedSpark’s seed funding round.",
            details: ["Up to ₹50 Lakhs in seed capital.", "3-month mentorship cohort.", "Open to tech startups in AI/SaaS."],
            icon: <FlareOutlined />,   url: "https://example.com/seedspark"
        },
        { id: 2, title: "Blue Ocean VC Challenge", 
            image: log2,
            organisedBy: "Blue Ocean Ventures", deadline: "December 10, 2025",
            description: "Pitch your scalable business idea to global investors.",
            details: ["Funding up to $250,000.", "Global exposure to Silicon Valley VCs.", "Focus on sustainable and disruptive technology."],
            icon: <FlareOutlined />, url: "https://example.com/blueocean"
        },
        { id: 3, title: "Ignite Founders Grant", 
            image:log3,
            organisedBy: "Ignite India Foundation", deadline: "January 5, 2026",
            description: "Aimed at supporting women-led startups and social entrepreneurs.",
            details: ["Grants up to ₹15 lakhs (non-dilutive).", "Specifically for women-led and social impact ventures.", "Includes 6 months of tailored business coaching."],
            icon: <FlareOutlined />,   url: "https://example.com/ignite"
        },
        { id: 4, title: "TechElevate Innovation Drive", 
            image:log4,
            organisedBy: "Propel Foundry Innovation Cell", deadline: "December 22, 2025",
            description: "For tech startups building AI or IoT-based solutions.",
            details: ["Seed capital + 1-year free incubation.", "Focus on deep tech: AI/IoT solutions.", "Access to university R&D labs."],
            icon: <FlareOutlined />, url: "https://example.com/techelevate"
        },
    ],
    hackathon: [
        // Hackathon data remains the same
        { id: 5, title: "InnovateX Global Hack 2025", 
            image: log4,
            organisedBy: "TechVerse", deadline: "November 20, 2025",
            description: "A 48-hour coding challenge for developers and designers to build AI-powered sustainable solutions.",
            details: ["48-hour non-stop challenge.", "Total prize pool of $10,000 USD.", "Theme: AI for Sustainable Development."],
            icon: <CodeOutlined />, url: "https://example.com/innovatex"
        },
        { id: 6, title: "SmartCity Challenge", 
            image:log3,
            organisedBy: "TechNext Coimbatore", deadline: "December 8, 2025",
            description: "Join developers worldwide to create smart urban innovations. Theme: Smart Mobility and Energy.",
            details: ["Focus on Smart Mobility and Energy.", "Direct access to city planners for pilots.", "Winners get ₹5 lakhs for proof-of-concept."],
            icon: <CodeOutlined />,   url: "https://example.com/smartcity"
        },
        { id: 7, title: "CodeSprint 2.0", 
            image: log2,
            organisedBy: "National Coding Network", deadline: "January 15, 2026",
            description: "National-level hackathon for students to showcase coding, design, and AI creativity.",
            details: ["Prizes up to ₹2 lakhs.", "Exclusive for student participants.", "Internship opportunities with corporate sponsors."],
            icon: <CodeOutlined />,   url: "https://example.com/codesprint"
        },
        { id: 8, title: "EcoTech HackFest", 
            image: log1,
            organisedBy: "Green Tech Association", deadline: "February 1, 2026",
            description: "Focuses on environmental sustainability through technology.",
            details: ["Dedicated track for environmental tech.", "Includes mentorship from leading environmental scientists.", "Pilot partnership opportunities."],
            icon: <CodeOutlined />, url: "https://example.com/ecotech"
        },
    ],
    research: [
        // Research data adapted for the table format
        { id: 9, event: "AI Research Fellowship 2025", date: "Nov 25 - Dec 15", location: "Online / Flexible", sponsorship: "Propel Labs", format: "Remote" },
        { id: 10, event: "GreenTech Paper Submission", date: "Dec 18 - Dec 22", location: "Global", sponsorship: "Int. GreenTech Conf.", format: "Virtual" },
        { id: 11, event: "NextGen Innovation Symposium", date: "Jan 30 - Feb 02", location: "Bangalore, India", sponsorship: "NextGen Hub", format: "In Person" },
        { id: 12, event: "QuantumTech Scholars Program", date: "Feb 15 - Feb 28", location: "Zurich, Switzerland", sponsorship: "QuantumTech Labs", format: "Hybrid" },
    ],
};

// --- ANIMATION KEYFRAMES for Blinking Dot ---
const blink = {
    opacity: [0, 1, 0.5, 1],
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
    }
};

// --- RESEARCH TABLE COMPONENT ---
const ResearchTable = ({ data }) => {
    return (
        <TableContainer 
            component={Paper} 
            sx={{ 
                borderRadius: 2, 
                boxShadow: 6,
                border: `1px solid ${alpha(BRAND.primary, 0.1)}`
            }}
        >
            <Table aria-label="research programs table">
                <TableHead sx={{ bgcolor: alpha(BRAND.primary, 0.1) }}>
                    <TableRow>
                        {["Event", "Date", "Location", "Sponsorship", "Format"].map((header) => (
                            <TableCell 
                                key={header} 
                                sx={{ 
                                    fontWeight: 700, 
                                    color: BRAND.primary, 
                                    fontSize: '1rem',
                                    borderBottom: `2px solid ${BRAND.primary}`
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow 
                            key={row.id} 
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: 'white' }}
                        >
                            <TableCell component="th" scope="row" sx={{ color: BRAND.textPrimaryDark, fontWeight: 600 }}>
                                <Typography 
                                    sx={{ 
                                        color: BRAND.primary, 
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        '&:hover': { textDecoration: 'underline', cursor: 'pointer' } 
                                    }}
                                    // Simulated link click (as full link structure isn't in this data)
                                    onClick={() => console.log(`Navigating to ${row.event} details`)}
                                >
                                    {row.event}
                                </Typography>
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>{row.sponsorship}</TableCell>
                            <TableCell>
                                <Chip 
                                    label={row.format} 
                                    size="small" 
                                    sx={{ 
                                        bgcolor: row.format === 'In Person' ? alpha(BRAND.accent, 0.1) : alpha(BRAND.primary, 0.1),
                                        color: row.format === 'In Person' ? BRAND.accent : BRAND.primary,
                                        fontWeight: 700
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


// --- DETAIL MODAL COMPONENT (REFINED) ---
const OpportunityDetailModal = ({ item, handleClose }) => {
    if (!item) return null;

    let color = BRAND.primary;
    if (item.category && (item.category.includes("Funding") || item.category.includes("Grant"))) {
        color = BRAND.accent;
    } else if (item.category && (item.category.includes("Hackathon") || item.category.includes("Challenge"))) {
        color = BRAND.secondaryAccent;
    } else if (item.category && (item.category.includes("Research") || item.category.includes("Fellowship"))) {
        color = BRAND.primary;
    }

    // --- LIVE/UPCOMING STATUS LOGIC ---
    const deadlineDate = new Date(item.deadline);
    const now = new Date();
    const isLive = deadlineDate > now && (deadlineDate.getTime() - now.getTime() < (30 * 24 * 60 * 60 * 1000)); 
    const isPastDeadline = now > deadlineDate;

    let statusLabel = 'UPCOMING';
    let statusColor = BRAND.secondaryAccent;
    let statusIcon = <TimerOutlined sx={{ color: 'white', fontSize: 20 }} />;

    if (isPastDeadline) {
        statusLabel = 'CLOSED';
        statusColor = BRAND.textPrimaryDark;
        statusIcon = <CloseOutlined sx={{ color: 'white', fontSize: 20 }} />;
    } else if (isLive) {
        statusLabel = ''; // Set label to empty string
        statusColor = BRAND.success; // Green for live
    }
    
    // Custom Dot Component (replacing the LiveTv icon when live)
    const BlinkingDot = (
        <motion.div animate={blink}>
            <Box 
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    display: 'inline-block',
                }}
            />
        </motion.div>
    );
    
    // Determine if we should show the blinking dot (if live)
    const chipIcon = isLive ? BlinkingDot : statusIcon;
    const isBlinkingDot = isLive;

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
                    // FIX 1: Reduced maximum height of the modal box (90vh -> 75vh)
                    maxHeight: '75vh', 
                    overflowY: 'auto', 
                    overflowX: 'hidden',
                    bgcolor: 'white',
                    borderRadius: 3,
                    boxShadow: 24,
                    outline: 'none',
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {/* Close Button */}
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

                {/* Left Column: Image/Media (50% width on desktop) */}
               <Box sx={{ 
                    // Keeping the minHeight setting here for the image column ensures the height remains substantial
                    minHeight: { xs: 200, md: 450 }, // Reduced this slightly from 500 to 450 to accommodate 75vh
                    flex: { xs: '0 0 100%', md: '0 0 50%' }, 
                    position: 'relative',
                    borderRadius: { xs: '12px 12px 0 0', md: '12px 0 0 12px' }, 
                    overflow: 'hidden', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{ 
                            // FIX 2: Changed to 'contain' so the full image is always visible (fits)
                            objectFit: 'contain', 
                            height: '100%', 
                            width: '100%',
                            display: 'block', 
                            // Removed minHeight which can cause overflow
                        }}
                    />
                </Box>

                {/* Right Column: Details (50% width on desktop) */}
               <Box sx={{ 
                    flex: { xs: '0 0 100%', md: '0 0 50%' }, 
                    p: { xs: 3, md: 5 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-start',
                    // FIX 2: Align text center on mobile, but align everything to the start (left) on desktop
                    textAlign: { xs: 'center', md: 'left' },
                    minWidth: 0, 
                }}>
                    
                    {/* Status Indicator (with Blinking Dot for LIVE NOW) */}
                    <Chip
                        icon={chipIcon} 
                        label={statusLabel}
                        sx={{ 
                            bgcolor: statusColor, 
                            color: 'white', 
                            fontWeight: 700, 
                            mb: 2, 
                            fontSize: '0.85rem',
                            alignSelf: { xs: 'center', md: 'flex-start' },
                            ...(isBlinkingDot && { 
                                height: 30, 
                                px: 1.5, 
                                '& .MuiChip-icon': { 
                                    color: 'white', 
                                    fontSize: '1rem',
                                    mx: 0, 
                                }
                            }) 
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
                    
                    {/* Final CTA Button - Pushed to the bottom */}
                   <Button
                        variant="contained"
                        // Removed fullWidth earlier
                        endIcon={<LaunchOutlined />}
                        onClick={() => window.open(item.url || '#', '_blank')}
                        disabled={isPastDeadline}
                        sx={{
                            mt: 'auto', 
                            py: 1.5,
                            bgcolor: BRAND.accent,
                            color: 'white',
                            borderRadius: 2.5,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            boxShadow: `0 8px 25px ${alpha(BRAND.accent, 0.4)}`,
                            '&:hover': { bgcolor: BRAND.primary },
                            
                            // FIX 2: Set width explicitly and center button horizontally
                            width: { xs: '100%', sm: 300 }, 
                            mx: { xs: 0, md: 'auto' }, // Center button horizontally
                            alignSelf: 'center', // Center self within the flex column
                        }}
                    >
                        {isPastDeadline ? 'Closed for Applications' : 'Apply Now'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

// --- CARD COMPONENT (Streamlined) ---
const OpportunityCard = ({ item, index, handleCardClick }) => { 
    let color = BRAND.primary;
    if (item.category && (item.category.includes("Funding") || item.category.includes("Grant"))) {
        color = BRAND.accent;
    } else if (item.category && (item.category.includes("Hackathon") || item.category.includes("Challenge"))) {
        color = BRAND.secondaryAccent;
    } else if (item.category && (item.category.includes("Research") || item.category.includes("Fellowship"))) {
        color = BRAND.primary;
    } else if (item.category === undefined && item.event) { // Handle Research Table data preview (which lacks category/image/etc.)
          color = BRAND.primary;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Disabled card clicks for table data as it's not structured for the modal */}
            <Card
                elevation={6}
                onClick={item.deadline ? () => handleCardClick(item) : undefined} 
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    borderBottom: `6px solid ${color}`, 
                    cursor: item.deadline ? 'pointer' : 'default', // Only clickable if it has a deadline (i.e. is not research table data preview)
                    '&:hover': {
                        transform: item.deadline ? 'translateY(-8px)' : 'none', 
                        boxShadow: item.deadline ? `0 18px 50px ${alpha(color, 0.35)}` : 'initial',
                    }
                }}
            >
                {/* Media Section (Image Only) */}
                <CardMedia
                    component="img"
                    height="180"
                    image={item.image || 'https://placehold.co/800x450/121490/ffffff?text=Opportunity'} // Fallback for table items lacking image
                    alt={item.title || item.event}
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
                        {item.title || item.event}
                    </Typography>
                    {item.category && ( // Only show category chip if category exists
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
                    )}
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
        // Only allow modal for data structured for it (funding/hackathon)
        if (item.deadline) {
            setSelectedOpportunity(item);
        }
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
                    {["funding", "hackathon", "research"].map((tab) => (
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

                {/* Content Area */}
                <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
                    {activeTab === 'research' ? (
                        /* Research Table View */
                        <motion.div
                            key="research-table"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResearchTable data={opportunitiesData.research} />
                        </motion.div>
                    ) : (
                        /* Grid Card View (Funding/Hackathon) */
                        <Box
                            key="card-grid"
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    lg: 'repeat(4, 1fr)',
                                },
                                gap: { xs: 4, sm: 4, lg: 5 },
                            }}
                        >
                            {opportunitiesData[activeTab].map((item, index) => (
                                <OpportunityCard key={item.id} item={item} index={index} handleCardClick={handleCardClick} />
                            ))}
                        </Box>
                    )}
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