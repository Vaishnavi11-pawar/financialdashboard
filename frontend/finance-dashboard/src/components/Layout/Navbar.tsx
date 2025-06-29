import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

// Replace this with your actual user fetching logic
const getUser = () => {
  // Example: get user from localStorage or context
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return {
    avatar: user.avatar || "",
    fullname: user.fullname || "User",
  };
};

const defaultAvatar =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff&size=128";

const BACKEND_URL = "http://localhost:8080";
function getAvatarUrl(avatar: string) {
  if (!avatar) return defaultAvatar;
  if (avatar.startsWith("http")) return avatar;
  return `${BACKEND_URL}${avatar}`;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "180px",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 4),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const drawerWidth = 220;

const Navbar = () => {
  const [user, setUser] = useState<{ avatar: string; fullname: string }>({
    avatar: "",
    fullname: "User",
  });

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        ml: `${drawerWidth}px`, 
        width: `calc(100% - ${drawerWidth}px)`
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
          <IconButton color="primary" sx={{ mr: 1 }}>
            <NotificationsNoneIcon />
          </IconButton>
          <Avatar
            src={getAvatarUrl(user.avatar) || defaultAvatar}
            alt={user.fullname}
            sx={{ width: 40, height: 40, ml: 1, border: "2px solid #1976d2" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;