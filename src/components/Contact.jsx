import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    alpha,
    TextField,
    MenuItem,
    CircularProgress,
    Alert,
    Card,
    useMediaQuery,
    useTheme
} from "@mui/material";

import {
    Public,
    LinkedIn,
    Instagram,
    WhatsApp,
    PersonOutline,
    PhoneOutlined,
    EmailOutlined,
    CategoryOutlined,
    MessageOutlined,
    LocationOnOutlined,
} from "@mui/icons-material";

// --- BRAND COLOR PALETTE (Copied for consistency) ---
const BRAND = {
    primary: "#121490", // Deep Blue
    accent: "#fd3007", // Primary Accent Red/Orange
    lightBg: "#f7f9fc", // Light Gray/Blue background
    secondaryAccent: "#007bff", // Not used in this version but kept for palette consistency
    textPrimaryDark: "#1a1a1a",
};


// --- FORM VALIDATION AND SUBMISSION SIMULATION ---
const validateEmail = (val) => /^[^@\s]+@[^@\s]+\.(com|in)$/i.test(val);

const Contact = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        query: "Select your query type",
        message: "",
    });

    const [status, setStatus] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Simulated handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "", type: "" });
        setLoading(true);

        const isQuerySelected = formData.query !== "Select your query type";
        const isEmailValid = validateEmail(formData.email);
        
        if (!isQuerySelected || !isEmailValid) {
            setEmailTouched(true);
            const msg = !isQuerySelected 
                ? "Please select your query type." 
                : "Invalid email. Please use a valid .com or .in email.";
            setStatus({ message: msg, type: "error" });
            setLoading(false);
            return;
        }

        // --- SIMULATION OF API CALL ---
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            const isSuccess = Math.random() > 0.1;
            
            if (isSuccess) {
                setStatus({ message: "Message sent successfully! We'll get back soon.", type: "success" });
                setFormData({ name: "", phone: "", email: "", query: "Select your query type", message: "" });
            } else {
                throw new Error("Simulated sending failure.");
            }

        } catch (err) {
            console.error("Submission error:", err);
            setStatus({ message: "Failed to send. Please try again later.", type: "error" });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ message: "", type: "" }), 5000);
        }
    };


    // --- OFFICE INFO CARD COMPONENT (Relocated Social Icons) ---
    const OfficeInfoCard = () => (
        <Card
            elevation={0}
            sx={{
                background: 'transparent',
                color: 'white',
                p: { xs: 3, sm: 5 },
                borderRadius: 3,
                minHeight: { md: '100%' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 2,
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    component="h3"
                    sx={{ fontWeight: 800, mb: 3, color: BRAND.accent }}
                >
                    Connect Instantly
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
                    We are ready to propel your journey. Reach out to our dedicated team of startup enablers.
                </Typography>

                <Stack spacing={3} mb={5}>
                    {/* Location */}
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                        <LocationOnOutlined sx={{ color: 'white', fontSize: '1.5rem', mt: '3px' }} />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white' }}>
                                Propel Foundry HQ
                            </Typography>
                            <Typography variant="body2">
                                34/3, Tank Street, Chinnamettupalayam,
                                Saravanampatti, Coimbatore, India
                            </Typography>
                        </Box>
                    </Stack>
                    {/* Email */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <EmailOutlined sx={{ color: 'white', fontSize: '1.5rem' }} />
                        <Typography variant="body1" sx={{ color: BRAND.accent, fontWeight: 700 }}>support@propelfoundry.com</Typography>
                    </Stack>
                    {/* Phone */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <PhoneOutlined sx={{ color: 'white', fontSize: '1.5rem' }} />
                        <Typography variant="body1" sx={{ color: BRAND.accent, fontWeight: 700 }}>+91 99943 40054</Typography>
                    </Stack>
                    
                    {/* 🚀 MOVED SOCIAL LINKS HERE 🚀 */}
                    <Stack direction="row" spacing={3} sx={{ pt: 3, mt: 4 }}>
                        {[
                            { icon: LinkedIn, href: "https://www.linkedin.com/company/propelfoundry", label: "LinkedIn" },
                            { icon: Instagram, href: "https://www.instagram.com/propelfoundry", label: "Instagram" },
                            { icon: WhatsApp, href: "https://wa.me/919994340054", label: "WhatsApp" },
                            { icon: Public, href: "https://propelfoundry.com", label: "Website" },
                        ].map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a 
                                    key={index}
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label={social.label}
                                >
                                    <Icon sx={{ 
                                        fontSize: '2rem', 
                                        color: BRAND.accent, 
                                        transition: 'color 0.2s', 
                                        // Ensure hover is visible (accent to white on dark primary background)
                                        '&:hover': { color: 'white' } 
                                    }} />
                                </a>
                            );
                        })}
                    </Stack>
                    {/* 🚀 END MOVED SOCIAL LINKS 🚀 */}

                </Stack>
            </Box>
        </Card>
    );

    return (
        <Box
            component="section"
            id="contact"
            sx={{
                py: { xs: 10, sm: 12, md: 15 },
                background: BRAND.lightBg, // Light background anchors the entire section
            }}
        >
            <Helmet>
                <title>Contact Propel Foundry | Startup Support & Inquiries</title>
                <meta
                    name="description"
                    content="Get in touch with Propel Foundry for company registration, mentorship, training programs, R&D, hackathons, and general startup support. We respond within 24 hours."
                />
            </Helmet>

            <Container maxWidth="xl">
                {/* Header */}
                <Box 
                    sx={{ 
                        textAlign: 'center',
                        mx: 'auto',
                        maxWidth: 'md',
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
                            '& > span': { color: BRAND.accent }
                        }}
                    >
                        How Can We <span>Propel</span> You?
                    </Typography>
                    <Typography 
                        sx={{ 
                            fontSize: { xs: '1.1rem', sm: '1.35rem' },
                            color: BRAND.textPrimaryDark,
                            maxWidth: '700px',
                            mx: 'auto'
                        }}
                    >
                        Fill out the form below or contact our office directly. We are committed to quick and effective support for your startup journey.
                    </Typography>
                </Box>

                {/* Main Content: Layered Two Columns */}
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 5, md: 0 }}
                    alignItems="stretch"
                    sx={{ 
                        maxWidth: '1200px', 
                        mx: 'auto',
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'visible',
                        minHeight: { md: 650 },
                    }}
                >
                    {/* LEFT COLUMN: Deep Blue Info Card (Background Anchor) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: '35%' },
                            bgcolor: BRAND.primary,
                            borderRadius: { xs: 3, md: '32px 0 0 32px' },
                            color: 'white',
                            p: 0,
                            position: 'relative',
                            zIndex: 1,
                            order: { xs: 2, md: 1 },
                        }}
                    >
                        <OfficeInfoCard />
                    </Box>

                    {/* RIGHT COLUMN: Contact Form (Floating Foreground Card) */}
                    <Card
                        elevation={12}
                        component="form"
                        onSubmit={handleSubmit} 
                        noValidate
                        sx={{
                            flex: 1,
                            width: { xs: '100%', md: '65%' },
                            p: { xs: 4, sm: 6, md: 8 },
                            borderRadius: { xs: 3, md: '0 32px 32px 0' },
                            background: 'white',
                            position: 'relative',
                            zIndex: 2,
                            order: { xs: 1, md: 2 },
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 800, mb: 1.5, color: BRAND.textPrimaryDark }}
                        >
                            Start Your Inquiry
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={4}>
                            We typically respond within **24 hours**.
                        </Typography>
                        
                        <Stack spacing={3}>
                            {/* Form Fields */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <TextField
                                    label="Your Name" name="name" fullWidth required value={formData.name} onChange={handleChange}
                                    InputProps={{ startAdornment: <PersonOutline sx={{ color: 'action.active', mr: 1 }} /> }}
                                />
                                <TextField
                                    label="Phone Number" name="phone" fullWidth required inputMode="numeric" value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                                    InputProps={{ startAdornment: <PhoneOutlined sx={{ color: 'action.active', mr: 1 }} /> }}
                                />
                            </Stack>
                            <TextField
                                label="Your Email" name="email" fullWidth required type="email" value={formData.email} onChange={handleChange}
                                onBlur={() => setEmailTouched(true)}
                                error={emailTouched && !validateEmail(formData.email)}
                                helperText={emailTouched && !validateEmail(formData.email) ? "Please use a valid .com or .in email." : ""}
                                InputProps={{ startAdornment: <EmailOutlined sx={{ color: 'action.active', mr: 1 }} /> }}
                            />

                            {/* Query Type Select */}
                            <TextField
                                select label="Query Type" name="query" fullWidth required value={formData.query} onChange={handleChange}
                                InputProps={{ startAdornment: <CategoryOutlined sx={{ color: 'action.active', mr: 1 }} /> }}
                            >
                                <MenuItem value="Select your query type" disabled>Select your query type</MenuItem>
                                <MenuItem value="Company Registration">Company Registration / IPR</MenuItem>
                                <MenuItem value="Mentorship">Mentorship Programs</MenuItem>
                                <MenuItem value="Training Programs">Training & Workshops</MenuItem>
                                <MenuItem value="Research and Development">R&D / Faculty Collaboration</MenuItem>
                                <MenuItem value="Hackathon">Hackathon / Event Sponsorship</MenuItem>
                                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                            </TextField>

                            {/* Message Textarea */}
                            <TextField
                                label="State your query in detail" name="message" fullWidth multiline rows={4} required value={formData.message} onChange={handleChange}
                                InputProps={{ startAdornment: <MessageOutlined sx={{ color: 'action.active', mr: 1, alignSelf: 'flex-start', mt: 1 }} /> }}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit" variant="contained" size="large" disabled={loading}
                                sx={{
                                    py: 1.5,
                                    mt: 2,
                                    bgcolor: BRAND.accent,
                                    color: 'white',
                                    borderRadius: 1.5,
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    boxShadow: `0 8px 25px ${alpha(BRAND.accent, 0.4)}`,
                                    '&:hover': { bgcolor: alpha(BRAND.accent, 0.9), boxShadow: `0 12px 35px ${alpha(BRAND.accent, 0.6)}` }
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Send Secure Message"}
                            </Button>
                        </Stack>

                        {/* Status/Toast Alert */}
                        {status.message && (
                            <Alert 
                                severity={status.type} 
                                sx={{ mt: 3, opacity: 0.9, borderRadius: 1.5 }}
                            >
                                {status.message}
                            </Alert>
                        )}
                    </Card>
                </Stack>

                {/* Map Embed (Separated below the main contact block for clean visual separation) */}
                <Card 
                    elevation={8} 
                    sx={{ 
                        mt: { xs: 8, md: 10 }, 
                        borderRadius: 3, 
                        overflow: 'hidden',
                        maxWidth: '1200px',
                        mx: 'auto',
                    }}
                >
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            p: 3, 
                            fontWeight: 700, 
                            color: BRAND.textPrimaryDark, 
                            bgcolor: BRAND.lightBg 
                        }}
                    >
                        Our Location: Propel Foundry HQ
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        {/* Map centered on the provided coordinates for Saravanampatti, Coimbatore */}
                        <iframe
                            title="office-map"
                            width="100%"
                            height={isMd ? "450" : "300"}
                            frameBorder="0"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3683889139615!2d77.0180808!3d11.031520890971835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85999d7d5267b%3A0x8b0b9f0c69a0893d!2sSaravanampatti%2C%20Coimbatore%2C%20Tamil%20Nadu%20641217%2C%20India!5e0!3m2!1sen!2sin!4v1716382100000!5m2!1sen!2sin"
                            allowFullScreen
                            loading="lazy"
                        />
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default Contact;