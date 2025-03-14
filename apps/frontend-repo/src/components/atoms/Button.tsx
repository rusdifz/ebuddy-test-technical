// components/atoms/Button.tsx
import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...rest }) => {
  return (
    <MuiButton variant="contained" color="primary" {...rest}>
      {label}
    </MuiButton>
  );
};

export default CustomButton;
