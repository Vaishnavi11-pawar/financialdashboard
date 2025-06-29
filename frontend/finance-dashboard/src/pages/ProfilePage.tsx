import { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const defaultAvatar =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff&size=128";
const BACKEND_URL = "http://localhost:8080";

function getAvatarUrl(avatar: string) {
  if (!avatar) return defaultAvatar;
  if (avatar.startsWith("http")) return avatar;
  return `${BACKEND_URL}${avatar}`;
}

const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return {
    avatar: user.avatar || "",
    fullname: user.fullname || "User",
    email: user.email || "user@example.com",
  };
};

const ProfilePage = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Try to fetch real user data from backend
    axios
      .get(`${BACKEND_URL}/api/profile`, { withCredentials: true })
      .then((res) => {
        setUser({
          avatar: res.data.avatar || "",
          fullname: res.data.fullname || "User",
          email: res.data.email || "user@example.com",
        });
        setLoading(false);
      })
      .catch(() => {
        // Fallback to localStorage if API fails
        setUser(getUserFromLocalStorage());
        setLoading(false);
        setError("Could not fetch latest profile. Showing saved data.");
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ pt: 10, px: 0, background: "#fafbfc", minHeight: "100vh" }}>
          <Container maxWidth="sm">
            <Paper
              elevation={2}
              sx={{
                p: 4,
                mt: 6,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 2,
              }}
            >
              {loading ? (
                <CircularProgress sx={{ my: 6 }} />
              ) : (
                <>
                  <Avatar
                    src={getAvatarUrl(user.avatar)}
                    alt={user.fullname}
                    sx={{ width: 90, height: 90, mb: 2, border: "3px solid #1976d2" }}
                  />
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                    {user.fullname}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {user.email}
                  </Typography>
                  <Divider sx={{ width: "100%", my: 2 }} />
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                    disabled
                  >
                    Edit Profile (Coming Soon)
                  </Button>
                  {error && (
                    <Typography color="error" mt={2} fontSize={14}>
                      {error}
                    </Typography>
                  )}
                </>
              )}
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;