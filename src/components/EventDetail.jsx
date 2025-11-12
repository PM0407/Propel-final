import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Card,
  CardMedia,
  useTheme,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Brand colors
const BRAND = {
  blue: "#121490",
  red: "#fd3007",
  orange: "#fe883f"
};

const eventsData = [
  // ...existing event data unchanged...
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const event = eventsData.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "text.secondary" }}>
          Event not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/opportunities")}
          sx={{
            color: BRAND.blue,
            borderColor: `${BRAND.blue}22`,
            "&:hover": { borderColor: BRAND.blue },
          }}
        >
          Back to Opportunities
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        py: { xs: 4, md: 8 },
        background: `linear-gradient(180deg, ${BRAND.blue}05 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => navigate("/opportunities")}
              sx={{ color: BRAND.blue }}
              aria-label="Back to opportunities"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Back to Opportunities
            </Typography>
          </Box>

          {/* Main Content Card */}
          <Card
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              background: theme.palette.background.paper,
              boxShadow: `0 12px 40px ${BRAND.blue}15`,
            }}
          >
            {/* Event Image */}
            <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: 400 } }}>
              <CardMedia
                component="img"
                image={event.poster}
                alt={event.title}
                sx={{
                  borderRadius: 2,
                  height: { xs: 240, md: 320 },
                  objectFit: "cover",
                  boxShadow: `0 8px 32px ${BRAND.blue}15`,
                }}
              />
            </Box>

            {/* Event Details */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: BRAND.blue }}>
                  {event.title}
                </Typography>
                <Chip
                  label={event.status}
                  sx={{
                    fontWeight: 700,
                    bgcolor: event.status === "Active" 
                      ? `${BRAND.blue}15`
                      : event.status === "Closed"
                      ? `${theme.palette.error.main}15`
                      : `${BRAND.orange}15`,
                    color: event.status === "Active"
                      ? BRAND.blue
                      : event.status === "Closed"
                      ? theme.palette.error.main
                      : BRAND.orange,
                  }}
                />
              </Box>

              <Stack spacing={2}>
                <Stack direction="row" spacing={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <BusinessIcon sx={{ color: BRAND.blue }} />
                    <Typography sx={{ color: "text.secondary" }}>
                      {event.organiser}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon sx={{ color: BRAND.red }} />
                    <Typography sx={{ color: "text.secondary" }}>
                      Deadline: {event.deadline}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography sx={{ color: "text.primary", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  {event.description}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    endIcon={<OpenInNewIcon />}
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.orange})`,
                      color: "white",
                      px: 3,
                      py: 1,
                      borderRadius: "28px",
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": {
                        boxShadow: `0 8px 24px ${BRAND.red}40`,
                      },
                    }}
                  >
                    View Event Details
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default EventDetail;