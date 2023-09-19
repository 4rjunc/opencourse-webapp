import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./images/logo.png";
import "../index.css"
const NavBar = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "1rem",
            marginTop: ".5rem",
            marginLeft: ".3rem",
            marginRight: ".3rem",
            width: "99%",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", // Adding the boxShadow property for shadow
          }}
        >
          {" "}
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "50px", height: "50px", marginLeft: "8px" }}
                className="scale-up-center"
              />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              OpenCourseMate <h6>{props.title}</h6>
            </Typography>
            {props.logout ? (
              <Button
                style={{
                  backgroundColor: "#27ac1f",
                  color: "white",
                  borderRadius: "2rem",
                  padding: ".7rem",
                }}
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
