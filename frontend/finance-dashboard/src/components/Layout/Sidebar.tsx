import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 220;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Transactions", icon: <ListAltIcon />, path: "/transactions" },
  { label: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
  { label: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  { label: "Setting", icon: <SettingsIcon />, path: "/setting" },
  { label: "Help", icon: <HelpOutlineIcon />, path: "/help" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#f5f6fa",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Box display="flex" alignItems="center" width="100%">
          <Box
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#1976d2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1.5,
            }}
          >
            <Typography color="#fff" fontWeight={700} fontSize={20}>
              F
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight={700} color="primary">
            Finance
          </Typography>
        </Box>
      </Toolbar>
      <List sx={{ mt: 2 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              py: 1.2,
              color: location.pathname === item.path ? "#1976d2" : "#222",
              bgcolor: location.pathname === item.path ? "#e3f2fd" : "transparent",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                bgcolor: "#e3f2fd",
                color: "#1976d2",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#1976d2" : "#888",
                minWidth: 36,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 700 : 500,
                fontSize: 15,
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Box flexGrow={1} />
      <Divider sx={{ mx: 2, my: 1 }} />
      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            mx: 1,
            mb: 2,
            py: 1.2,
            color: "#e53935",
            "&:hover": {
              bgcolor: "#ffebee",
              color: "#b71c1c",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#e53935", minWidth: 36 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 700,
              fontSize: 15,
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;