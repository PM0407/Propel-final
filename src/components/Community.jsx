import React from "react";
import { motion } from "framer-motion";
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Stack, 
    alpha,
    Grid, 
    useTheme 
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

// --- BRAND COLOR PALETTE (Copied for consistency) ---
const BRAND = {
    // Primary Deep Blue (for text, main buttons)
    primary: "#121490", 
    // Primary Accent Red/Orange (for highlights, CTAs)
    accent: "#fd3007", 
    // Secondary Light Blue (for section background, image framing)
    lightBg: "#eef5ff", 
    // A brighter blue derived from the logo's graphic trail (Used for subtle borders)
    secondaryAccent: "#007bff", 
    // Darker text color for high contrast and professionalism (Header/Title)
    textPrimaryDark: "#1a1a1a", 
    // NEW: Softer Body Text Color for neatness
    textBodyGray: "#4a4a4a",
};
import img from "../assets/networking.png"
import img1 from "../assets/startup-team.jpg"
// --- COMMUNITY DATA (Using high-quality placeholders for images) ---
const communityData = [
    {
        title: "Startup Community",
        description: "Join a vibrant community of startups, share ideas, get mentorship, and collaborate on innovative projects. This is where innovation sparks and lasting partnerships are forged.",
        image: img, 
    },
    {
        title: "Mentor Network",
        description: "Connect with experienced mentors who provide tailored guidance, strategic insights, and essential support to help you navigate growth challenges and accelerate your startup's success.",
          image: img1, 
    },
    {
        title: "Student Innovator Hub",
        description: "A platform for aspiring student entrepreneurs to engage with real startups, learn industry skills through workshops, participate in events, and gain invaluable real-world exposure.",
        image: img, 
    },
    {
        title: "Research Faculty Collaboration",
        description: "Collaborate directly with leading research faculty to explore innovative solutions, join cutting-edge R&D projects, and effectively bridge academic theory with industrial application.",
       image: img1, 
    },
];

// --- INDIVIDUAL COMMUNITY ITEM COMPONENT (Spotlight Design) ---
const CommunityItem = ({ item, index }) => {
    const isReverse = index % 2 !== 0;

    // Motion parameters for image offset and hover effect
    const imageOffset = isReverse ? -20 : 20;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ marginBottom: '80px' }} // Spacing between the large cards
        >
            {/* The Main Container Card */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: isReverse ? 'row-reverse' : 'row' },
                    alignItems: 'stretch',
                    borderRadius: 4,
                    bgcolor: 'white',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)', // Stronger shadow for floating effect
                    overflow: 'hidden',
                    p: { xs: 0, md: 4 }, // Internal padding to frame the content/image blocks
                }}
            >
                {/* 1. Image Wrapper with Framing */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '55%' },
                        // Use lightBg as the visual frame/anchor for the image
                  
                        p: { xs: 3, md: 0 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: { xs: 300, md: 500 } // Fixed height for visual consistency
                    }}
                >
                    <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                            width: { xs: '100%', md: '90%' }, // Image takes up 90% of the framed area
                            height: { xs: '100%', md: '90%' }, 
                            objectFit: 'cover',
                            borderRadius: 3,
                            // Image is visually lifted within the lightBg frame
                            boxShadow: `0 15px 40px ${alpha(BRAND.textPrimaryDark, 0.2)}`,
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                                transform: 'scale(1.02)', // Subtle zoom on hover
                            }
                        }}
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/121490/ffffff?text=Image+Unavailable'; }}
                    />
                </Box>

                {/* 2. Content */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '45%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: { xs: 4, md: 6, lg: 8 }, 
                    }}
                >
                    {/* Title */}
                    <Typography
                        component="h3"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: 900,
                            color: BRAND.textPrimaryDark,
                            mb: 2,
                            lineHeight: 1.1,
                            // Accent color for the highlight
                            '& span': {
                                color: BRAND.accent,
                            }
                        }}
                    >
                        {/* Highlights the first word/key concept */}
                        {item.title.split(' ').map((word, i, arr) => (
                            <React.Fragment key={i}>
                                {i === 0 ? <Box component="span" sx={{ color: BRAND.accent }}>{word}</Box> : word}
                                {i < arr.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </Typography>
                    
                    {/* Description (Text Color Change Applied Here) */}
                    <Typography
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.15rem' },
                            color: BRAND.textBodyGray, // *** CHANGED: Using softer gray for neatness ***
                            lineHeight: 1.6,
                            mb: 4,
                        }}
                    >
                        {item.description}
                    </Typography>
                    
                    {/* CTA Button */}
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            bgcolor: BRAND.primary, // Primary Blue Button
                            color: 'white',
                            py: 1.2,
                            px: 4,
                            borderRadius: 999,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            alignSelf: 'flex-start',
                            boxShadow: `0 8px 25px ${alpha(BRAND.primary, 0.4)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: BRAND.accent,
                                boxShadow: `0 12px 35px ${alpha(BRAND.accent, 0.6)}`,
                                transform: 'translateY(-3px)'
                            }
                        }}
                    >
                        Explore Opportunities
                    </Button>
                </Box>
            </Box>
        </motion.div>
    );
};

// --- MAIN COMMUNITY COMPONENT ---
const Community = () => {
    return (
        <Box
            component="section"
            id="community"
            sx={{
                py: { xs: 10, sm: 12, md: 15 }, 
                background: BRAND.lightBg, // Light Blue background for section visual anchor
            }}
        >
            <Container maxWidth="xl">
                {/* Header */}
                <Box 
                    sx={{ 
                        textAlign: 'center',
                        mx: 'auto',
                        maxWidth: 'lg',
                        mb: { xs: 8, md: 10 }
                    }}
                >
                    <Typography
                        component="h2"
                        sx={{
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                            fontWeight: 900,
                            color: BRAND.textPrimaryDark,
                            mb: 2,
                            lineHeight: 1.1,
                           
                        }}
                    >
                        Discover Our Global <Box component="span" sx={{ color: BRAND.accent }}>Ecosystem</Box>
                    </Typography>
                    <Typography 
                        sx={{ 
                            fontSize: { xs: '1.1rem', sm: '1.35rem' },
                            color: BRAND.primary, 
                            maxWidth: '900px',
                            mx: 'auto'
                        }}
                    >
                        Access exclusive programs, collaborate with key leaders, and accelerate growth within our curated network of innovators and mentors.
                    </Typography>
                </Box>

                {/* Community Items Wrapper (Renders the layered cards) */}
                <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
                    {communityData.map((item, index) => (
                        <CommunityItem key={index} item={item} index={index} />
                    ))}
                </Box>
                
                {/* Footer CTA */}
                <Stack direction="row" justifyContent="center" sx={{ mt: { xs: 8, md: 12 } }}>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            bgcolor: BRAND.accent, // Use Accent Red for the final primary CTA
                            color: 'white',
                            py: 1.5,
                            px: 5,
                            borderRadius: 999,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            boxShadow: `0 8px 25px ${alpha(BRAND.accent, 0.4)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: BRAND.primary,
                                boxShadow: `0 12px 30px ${alpha(BRAND.primary, 0.6)}`,
                                transform: 'translateY(-2px)'
                            }
                        }}
                        onClick={() => console.log("Navigating to full Community Directory")}
                    >
                        View All Programs & Partners
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Community;