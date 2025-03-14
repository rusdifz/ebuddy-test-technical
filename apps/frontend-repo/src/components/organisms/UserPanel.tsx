"use client";
import React from "react";
import { Box } from "@mui/material";
import UserTable from "../molecules/UserTable";
import { User } from "@/interfaces/user";

interface DashboardPanelProps {
  users: User[];
  is_loading: boolean;
  onSort: () => void;
  onEdit: (data: any) => void;
}

const UserPanel: React.FC<DashboardPanelProps> = ({
  users,
  is_loading,
  onSort,
  onEdit,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <UserTable
        users={users}
        onSort={onSort}
        onEdit={onEdit}
        is_loading={is_loading}
      />
    </Box>
  );
};

export default UserPanel;
