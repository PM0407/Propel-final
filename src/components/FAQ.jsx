import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    Chip,
    Button,
    useTheme,
    useMediaQuery,
    Tooltip,
    alpha,
    Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// --- BRAND COLOR PALETTE ---
const BRAND = {
    primary: "#121490", // Deep Blue
    accent: "#fd3007", // Primary Accent Red/Orange
    lightBg: "#f7f9fc", // Background of the whole section (Soft Gray/Blue)
    textPrimaryDark: "#1a1a1a", 
};

// --- DATA STRUCTURE (Remains the same for functionality) ---
const faqData = [
    { category: "Ideation & Validation", questions: [{ q: "How do I know if my startup idea is unique or has market potential?", a: "Conduct competitor research and identify your unique value proposition." }, { q: "What methods can I use to validate my business idea before launching?", a: "Use surveys, interviews, and small-scale pilots to test customer interest." }, { q: "How do I conduct market research with minimal investment?", a: "Leverage free online surveys, Google Trends, and competitor analysis tools." }, { q: "What is customer discovery, and how do I perform it effectively?", a: "Engage with potential users to understand their needs and pain points before product development." }, { q: "How can I protect my startup idea from being copied by others?", a: "Sign NDAs, secure trademarks, and avoid publicly disclosing your business model too early." },], },
    { category: "Company Registration & Legal Setup", questions: [{ q: "What are the different types of business entities in India (Proprietorship, LLP, Pvt Ltd, OPC)?", a: "They differ in liability, compliance, and taxation; LLP and Pvt Ltd are most common for startups." }, { q: "Which business structure is best suited for my startup?", a: "Choose based on funding goals and compliance — Pvt Ltd for scalability, LLP for simplicity." }, { q: "How do I register my startup under the Startup India initiatives?", a: "Register on startupindia.gov.in with your business documents and incorporation details." }, { q: "What documents are required for company registration in India?", a: "PAN, Aadhaar, address proof, DSC, and MoA/AoA documents are required." }, { q: "What are the steps to obtain a GST, PAN, and Udyam (MSME) registration?", a: "Apply online via GST portal, NSDL for PAN, and MSME registration portal." }, { q: "How do I handle compliance, annual filings, and tax obligations?", a: "Use CA services or online compliance platforms for ROC and tax filings." }, { q: "How can startups avail exemptions under DPIIT or MSME schemes?", a: "Apply for DPIIT recognition to access tax benefits and funding opportunities." },], },
    { category: "Funding & Financial Management", questions: [{ q: "What are the stages of startup funding (pre-seed, seed, Series A, etc.)?", a: "Funding stages depend on business maturity — from idea to growth scaling." }, { q: "How can I approach investors or angel networks for funding?", a: "Prepare a strong pitch deck, validate traction, and network at startup events." }, { q: "What are the government schemes available for startups (like SIDBI, MSME, NIDHI, Startup India Seed Fund)?", a: "Multiple central and state schemes offer grants, equity, and credit support." },], },
    { category: "Growth & Marketing", questions: [{ q: "What is traction, and how do I measure it?", a: "Track key metrics like user growth, retention, and monthly recurring revenue." }, { q: "How do I acquire my first 100 customers?", a: "Leverage referrals, social proof, and partnerships for early traction." }, { q: "What digital marketing strategies work best for startups?", a: "Use SEO, email campaigns, and social media ads for visibility." },], },
    { category: "Technology & Innovation", questions: [{ q: "How do I develop an MVP (Minimum Viable Product)?", a: "Focus on core features that solve the main problem first." }, { q: "What are common mistakes to avoid in early product development?", a: "Overbuilding features before validation or ignoring user feedback." }, { q: "What tools can I use for project management, CRM, and collaboration?", a: "Use Notion, Trello, Slack, or HubSpot for smooth team management." },], },
    { category: "Exit & Future Growth", questions: [{ q: "What is an exit strategy, and when should I plan for it?", a: "Plan early to attract investors and ensure long-term sustainability." }, { q: "What are the common exit routes — acquisition, merger, or IPO?", a: "Choose based on market timing, valuation, and scalability." }, { q: "How do I ensure business continuity after founder transition or acquisition?", a: "Set up governance frameworks and documentation for smooth transition." },], },
];
// Flattening all questions and getting categories (logic kept from original component)
const categories = ["All", ...faqData.map((c) => c.category)];
const allQuestions = faqData.flatMap((cat) => cat.questions.map((q) => ({ ...q, category: cat.category })));


export default function FAQ() {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const searchRef = useRef(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    // --- State & Handlers (Logic remains functional) ---
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [itemsToShow, setItemsToShow] = useState(6);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(query.trim()), 240);
        return () => clearTimeout(t);
    }, [query]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "/") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const handleChangeCategory = (newCategory) => {
        setSelectedCategory(newCategory);
        setQuery("");
        setDebouncedQuery("");
        setExpanded(null);
        setItemsToShow(6);
    };

    const handleCopyLink = (panelId) => {
        const url = `${window.location.origin}${window.location.pathname}#${panelId}`;
        console.log(`Simulated copy to clipboard: ${url}`);
        
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 1500);
    };

    const scoreItem = useCallback((text, q) => {
        if (!q) return 0;
        const t = text.toLowerCase();
        const s = q.toLowerCase();
        if (t === s) return 100;
        if (t.startsWith(s)) return 60;
        if (t.includes(s)) return 30;
        return 0;
    }, []);

    const filtered = useMemo(() => {
        const base =
            selectedCategory === "All"
                ? allQuestions
                : allQuestions.filter((a) => a.category === selectedCategory);

        if (!debouncedQuery) return base;

        const tokens = debouncedQuery.split(/\s+/).filter(Boolean);
        return base
            .map((item) => {
                let total = 0;
                for (const t of tokens) {
                    total += scoreItem(item.q, t) * 1.4;
                    total += scoreItem(item.a, t) * 0.9;
                    total += scoreItem(item.category || "", t) * 0.6;
                }
                return { item, score: total };
            })
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .map((s) => s.item);
    }, [selectedCategory, debouncedQuery, scoreItem]);

    const showLoadMore = selectedCategory === "All" && filtered.length > itemsToShow;
    const displayed = selectedCategory === "All" ? filtered.slice(0, itemsToShow) : filtered;

    const highlight = useCallback(
        (text) => {
            if (!debouncedQuery) return text;
            const tokens = debouncedQuery.split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
            if (!tokens.length) return text;
            const re = new RegExp(`(${tokens.join("|")})`, "ig");
            const parts = String(text).split(re);
            return parts.map((part, i) =>
                re.test(part) ? (
                    <Box
                        key={i}
                        component="span"
                        sx={{
                            bgcolor: alpha(BRAND.accent, 0.2), 
                            color: BRAND.textPrimaryDark,
                            px: 0.4,
                            borderRadius: 0.6,
                            fontWeight: 700,
                        }}
                    >
                        {part}
                    </Box>
                ) : (
                    <span key={i}>{part}</span>
                )
            );
        },
        [debouncedQuery]
    );

    const suggestions = useMemo(() => {
        if (!debouncedQuery) return [];
        return filtered.slice(0, 4).map((f) => f.q);
    }, [debouncedQuery, filtered]);

    // --- Render ---
    return (
        <Box 
            component="section" 
            aria-labelledby="faq-heading" 
            sx={{ 
                py: { xs: 8, md: 12 }, 
                background: BRAND.lightBg, // Soft light background for the whole section
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography 
                            id="faq-heading" 
                            variant={isSm ? "h5" : "h4"} 
                            sx={{ 
                                fontWeight: 900, 
                                color: BRAND.textPrimaryDark, // Dark text on light background
                                fontSize: { xs: '2rem', sm: '2.8rem' },
                                mb: 1
                            }}
                        >
                            Frequently Asked <span style={{ color: BRAND.accent }}>Questions</span>
                        </Typography>
                        <Typography sx={{ mt: 1, color: theme.palette.text.secondary, maxWidth: 900, mx: 'auto' }}>
                            Find quick answers and expert guidance on starting, funding, and scaling your venture.
                        </Typography>
                    </Box>

                    {/* Controls & Search Bar (Floating Card) */}
                    <Card sx={{ 
                        borderRadius: 4, // More pronounced rounding
                        bgcolor: BRAND.primary, // Dark primary color for high-contrast control bar
                        p: { xs: 3, sm: 4 },
                        boxShadow: `0 15px 40px ${alpha(BRAND.primary, 0.4)}`, // Stronger, premium shadow
                        zIndex: 10, // Ensure it sits above other content if necessary
                    }}>
                        <Stack spacing={2.5}>
                            {/* Search Field */}
                            <TextField
                                inputRef={searchRef}
                                size="large" 
                                value={query}
                                placeholder='Search compliance, funding, or mentorship (Press "/" to focus)'
                                onChange={(e) => setQuery(e.target.value)}
                                sx={{ 
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 999, // Pill shape for modern look
                                        bgcolor: 'white', // White input field inside dark card
                                        py: 0.5,
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: BRAND.primary, ml: 1 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: query ? (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={() => { setQuery(""); setDebouncedQuery(""); searchRef.current?.focus(); }} aria-label="Clear search">
                                                <ClearIcon fontSize="small" sx={{ color: BRAND.accent }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null,
                                }}
                                aria-label="Search FAQ"
                            />
                            
                            {/* Category Chips (Pill Filter Bar) */}
                            <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', py: 1, pb: 0, '&::-webkit-scrollbar': { display: 'none' } }}>
                                {categories.map((cat) => (
                                    <Chip
                                        key={cat}
                                        label={cat}
                                        clickable
                                        size="medium"
                                        onClick={() => handleChangeCategory(cat)}
                                        sx={{
                                            minWidth: 'auto',
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            borderRadius: 999, // Pill shape
                                            transition: 'all 0.3s',
                                            fontSize: '0.8rem',
                                            // Active state uses accent color for pop
                                            ...(selectedCategory === cat
                                                ? { 
                                                    bgcolor: BRAND.accent, 
                                                    color: 'white',
                                                    boxShadow: `0 2px 8px ${alpha(BRAND.accent, 0.5)}`,
                                                    transform: 'scale(1.05)',
                                                }
                                                : { 
                                                    bgcolor: alpha(BRAND.primary, 0.7), // Semi-transparent primary
                                                    color: alpha(theme.palette.background.paper, 0.9), // Light text
                                                    border: `1px solid ${alpha(BRAND.accent, 0.4)}`,
                                                    '&:hover': {
                                                        bgcolor: BRAND.primary,
                                                        color: 'white',
                                                    }
                                                }
                                            ),
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Card>
                    
                    {/* quick suggestions */}
                    {debouncedQuery && suggestions.length > 0 && (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap", mt: 2, p: 1 }}>
                            <Typography variant="caption" sx={{ color: BRAND.primary, fontWeight: 700, mr: 1 }}>Top Suggestions:</Typography>
                            {suggestions.map((s, i) => (
                                <Button
                                    key={i}
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                        setQuery(s);
                                        setDebouncedQuery(s);
                                    }}
                                    sx={{ 
                                        textTransform: "none", 
                                        borderRadius: 999, // Pill shape buttons
                                        fontWeight: 600,
                                        borderColor: alpha(BRAND.accent, 0.4),
                                        color: BRAND.textPrimaryDark,
                                        '&:hover': {
                                            borderColor: BRAND.accent,
                                            bgcolor: alpha(BRAND.accent, 0.05)
                                        }
                                    }}
                                >
                                    {s.length > 45 ? `${s.slice(0, 42)}…` : s}
                                </Button>
                            ))}
                        </Stack>
                    )}

                    {/* FAQ list (Minimalist, Shadow-based) */}
                    <Stack spacing={2} sx={{ mt: 4 }}>
                        {displayed.length > 0 ? (
                            displayed.map((item, idx) => {
                                const globalIndex = allQuestions.findIndex((aq) => aq.q === item.q && aq.category === item.category);
                                const panelId = `q-${globalIndex}-${item.q.slice(0, 20).replace(/\s+/g, "-")}`;
                                
                                const isCurrentExpanded = expanded === panelId;

                                return (
                                    <Accordion
                                        key={panelId}
                                        expanded={isCurrentExpanded}
                                        onChange={() => setExpanded(isCurrentExpanded ? null : panelId)}
                                        elevation={isCurrentExpanded ? 8 : 1} // Higher shadow when expanded
                                        sx={{ 
                                            borderRadius: 2, 
                                            // Removed border, relying on shadow and background for separation
                                            border: 'none',
                                            "&:before": { display: "none" },
                                            bgcolor: isCurrentExpanded ? 'white' : BRAND.lightBg, // Subtle background contrast
                                            transition: 'box-shadow 0.3s, background-color 0.3s',
                                            '&:hover:not(.Mui-expanded)': {
                                                bgcolor: alpha(BRAND.lightBg, 0.8), // Slight hover effect
                                            }
                                        }}
                                        id={panelId}
                                    >
                                        <AccordionSummary 
                                            expandIcon={<ExpandMoreIcon sx={{ color: BRAND.primary }} />}
                                            sx={{ 
                                                minHeight: { xs: 60, sm: 70 },
                                                '& .MuiAccordionSummary-content': { 
                                                    my: 0,
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%", pr: 2 }}>
                                                {/* Left-side accent dot/line */}
                                                <Box sx={{
                                                    width: 4,
                                                    height: 24,
                                                    borderRadius: 1,
                                                    bgcolor: isCurrentExpanded ? BRAND.accent : alpha(BRAND.primary, 0.5),
                                                    transition: 'background-color 0.3s'
                                                }} />

                                                {/* Question Text */}
                                                <Typography sx={{ 
                                                    fontWeight: 700, 
                                                    color: BRAND.textPrimaryDark,
                                                    flexGrow: 1,
                                                    textAlign: 'left'
                                                }}>
                                                    {highlight(item.q)}
                                                </Typography>
                                                
                                                {/* Copy Link Button */}
                                                <Tooltip 
                                                    title={tooltipOpen && isCurrentExpanded ? "Link copied!" : "Copy link"}
                                                    open={tooltipOpen && isCurrentExpanded}
                                                    placement="top"
                                                    arrow
                                                >
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCopyLink(panelId);
                                                        }}
                                                        aria-label="Copy link to question"
                                                        sx={{ color: isCurrentExpanded ? BRAND.accent : alpha(BRAND.primary, 0.6), '&:hover': { color: BRAND.accent } }}
                                                    >
                                                        <LinkIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </AccordionSummary>

                                        <AccordionDetails sx={{ borderTop: `1px solid ${alpha(BRAND.primary, 0.1)}`, pt: 2, pb: 3, bgcolor: 'white' }}>
                                            <Typography sx={{ color: BRAND.textPrimaryDark, lineHeight: 1.7, fontSize: '1.05rem' }}>
                                                {highlight(item.a)}
                                            </Typography>
                                            
                                            {/* Category Chip (Moved to bottom of answer) */}
                                            <Chip 
                                                label={`Category: ${item.category}`} 
                                                size="small" 
                                                sx={{ 
                                                    mt: 3,
                                                    bgcolor: alpha(BRAND.primary, 0.08), 
                                                    color: BRAND.primary, 
                                                    fontWeight: 600,
                                                    borderRadius: 999,
                                                    fontSize: '0.8rem'
                                                }} 
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })
                        ) : (
                            <Box sx={{ textAlign: "center", py: 6, bgcolor: theme.palette.background.paper, borderRadius: 3 }}>
                                <Typography variant="h6" sx={{ color: BRAND.primary, mb: 2 }}>No matching results found.</Typography>
                                <Typography sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                                    Try adjusting your search terms or selecting 'All' categories.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    onClick={() => { setQuery(""); setDebouncedQuery(""); setSelectedCategory("All"); searchRef.current?.focus(); }} 
                                    sx={{ textTransform: "none", bgcolor: BRAND.primary, '&:hover': { bgcolor: alpha(BRAND.primary, 0.9) } }}
                                >
                                    Reset Search & View All
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    sx={{ 
                                        ml: 2, 
                                        textTransform: "none", 
                                        color: BRAND.accent, 
                                        borderColor: BRAND.accent,
                                        '&:hover': { 
                                            borderColor: BRAND.accent, 
                                            bgcolor: alpha(BRAND.accent, 0.05)
                                        } 
                                    }} 
                                    onClick={() => console.log("Navigating to /contact to ask a question")}
                                >
                                    Ask a Specific Question
                                </Button>
                            </Box>
                        )}
                    </Stack>

                    {/* actions */}
                    <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                        {showLoadMore ? (
                            <Button 
                                onClick={() => setItemsToShow((s) => s + 6)} 
                                variant="outlined" 
                                size="large"
                                sx={{ 
                                    textTransform: "none", 
                                    borderRadius: 999, 
                                    color: BRAND.primary,
                                    borderColor: alpha(BRAND.primary, 0.4),
                                    fontWeight: 700,
                                    '&:hover': {
                                        borderColor: BRAND.primary,
                                    }
                                }}
                            >
                                Show more ({filtered.length - itemsToShow} remaining)
                            </Button>
                        ) : (
                            filtered.length > 6 && (
                                <Button 
                                    onClick={() => { setItemsToShow(6); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                                    variant="text" 
                                    sx={{ textTransform: "none", color: BRAND.primary, fontWeight: 700 }}
                                >
                                    Collapse View
                                </Button>
                            )
                        )}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}