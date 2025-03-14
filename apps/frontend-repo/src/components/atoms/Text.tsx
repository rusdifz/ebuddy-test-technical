// components/atoms/Text.tsx
import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CustomTextProps extends TypographyProps {
  content: string;
}

const CustomText: React.FC<CustomTextProps> = ({ content, ...props }) => {
  return <Typography {...props}>{content}</Typography>;
};

export default CustomText;
