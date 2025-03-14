// components/templates/DashboardTemplate.tsx
import React from "react";
import { Container, Box } from "@mui/material";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Box>{children}</Box>
    </Container>
  );
};

export default DashboardTemplate;
