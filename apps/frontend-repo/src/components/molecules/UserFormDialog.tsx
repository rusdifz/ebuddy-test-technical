import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { User } from "@/interfaces/user";
import UserForm from "./UserForm";
import { useState } from "react";

interface UserFormDialogProps {
  open: boolean;
  user: User | any;
  onClose: () => void;
  onSubmit: (values: Partial<User>) => void;
}

const UserFormDialog = ({
  open,
  user,
  onClose,
  onSubmit,
}: UserFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: Partial<User>) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogTitle className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        Edit User Profile
        <IconButton onClick={onClose} sx={{ color: "black" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <UserForm
        user={user}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
        // isLoading={isSubmitting}
      />
    </Dialog>
  );
};

export default UserFormDialog;
