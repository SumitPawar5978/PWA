import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import { theme } from "@/src/utils/theme";
import { poppins_400, poppins_600 } from "@/src/components/common/font";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserState,
  setCityDialogbox,
  setRole,
  setUserProfile,
} from "@/src/app/reducer";
import { logout, userProfileDetail } from "@/src/utils/axios";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import PlaceIcon from "@mui/icons-material/Place";
import GenerateLead from "../contact/generateLead";
const Topnavbar = () => {
  const selectedCityName = useSelector((state) => state.reducer.selectCityName);
  console.log(selectedCityName,'selectedCityName')
  const selectCityDialogbox = useSelector(
    (state) => state.reducer.selectCityDialogbox
  );
  const loginUserDetails = useSelector((state) => state.reducer.userDetails);
  const agentUserDetails = useSelector(
    (state) => state.reducer.agentUserDetails
  );
  const loggedInRole = useSelector((state) => state.reducer.loggedInRole);

  const router = useRouter();
  const { query } = router;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  const role = useSelector((state) => state.reducer.role);
  const handleUserRole = (role) => {
    dispatch(setRole(role));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = loginUserDetails;
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log(storedToken, "Token doesn't exist,");
    }
  }, [role]);

  const handleLogout = async () => {
    handleClose();
    dispatch(resetUserState());
    let res = await logout();
    Swal.fire({
      title: "Logout",
      text: res?.data?.message,
      icon: "success",
      confirmButtonText: "Ok",
    });
    router.push("/login");
  };
  
console.log(agentUserDetails,'agentUserDetails')
  return (
    <Container sx={{ px: { sm: "auto", xs: 0.5 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        pt={1}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{ display: { md: "flex", xs: "none" } }}
        >
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="Picture of the author"
              sizes="100vw"
              className="headerLogo"
              blurDataURL="data:..."
            />
          </Link>
          <Typography
            color="space.main"
            fontSize={"19px"}
            fontWeight={"500"}
            sx={{ pl: 2, transform: "translateY(-8px)", fontWeight: "bold" }}
          >
            "Your Ideal Property is Waiting – Let's Find It Together."
          </Typography>
        </Box>
        <Box
          sx={{
            width: { md: "auto", xs: "100%" },
            justifyContent: { sm: "end", xs: "space-between" },
          }}
          display={"flex"}
          alignItems={"center"}
        >
          {/* <Button
            className={styles.poppins_600}
            sx={{
              boxShadow: "unset",
              borderRadius: "20px",
              fontSize: { sm: "12px", xs: "10px" },
              backgroundColor: "space.main",
              px: { sm: 1.5, xs: 0.5 },
            }}
            variant="contained"
            onClick={() => {
              console.log(!selectCityDialogbox, "selectCityDialogbox");
              dispatch(setCityDialogbox(!selectCityDialogbox));
            }}
          >
            <PlaceIcon
              sx={{ fontSize: "1rem", display: { sm: "block", xs: "none" } }}
            />{" "}
            {selectedCityName}
          </Button> */}
          <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          sx={{
            borderRadius: "20px",
            backgroundColor: "space.main",
            px: { sm: 1.5, xs: 0.5 },
          }}
        >
          <PlaceIcon
            sx={{color:'#fff', fontSize: "1.3rem", display: { sm: "block", xs: "none" } }}
          />

          <Button
            className={styles.poppins_600}
            sx={{
              width: "100px",
              "&:hover": { backgroundColor: "transparent" },
              boxShadow: "unset",
              fontSize: { sm: "12px", xs: "10px" },
              backgroundColor: "transparent",
              paddingX: "0",
              textAlign: {xs:'center', sm:"left"},
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              textOverflow: "ellipsis",
            }}
            variant="contained"
            onClick={() => {
              console.log(!selectCityDialogbox, "selectCityDialogbox");
              dispatch(setCityDialogbox(!selectCityDialogbox));
            }}
          >
            {selectedCityName}
          </Button>
        </Box>
          {!loginUserDetails && (
            <Box>
              <Link href={"/registration"}>
                <Button
                  className={styles.poppins_600}
                  sx={{
                    boxShadow: "unset",
                    borderRadius: "20px",
                    fontSize: { sm: "12px", xs: "10px" },
                    backgroundColor: "space.main",
                    mx: { sm: 1, xs: 0.5 },
                    px: { sm: 1.5, xs: 0.5 },
                  }}
                  variant="contained"
                  onClick={() => handleUserRole("User")}
                >
                  Registration
                </Button>
              </Link>
              <Link href={"/login"}>
                <Button
                  className={styles.poppins_600}
                  sx={{
                    boxShadow: "unset",
                    borderRadius: "20px",
                    fontSize: { sm: "12px", xs: "10px" },
                    backgroundColor: "gold.main",
                    mx: { sm: 1, xs: 0.5 },
                    px: { sm: 1.5, xs: 0.5 },
                  }}
                  variant="contained"
                >
                  login
                </Button>
              </Link>
            </Box>
          )}

          {loginUserDetails && (
            <Typography
              variant="poppins_600"
              component={"p"}
              fontSize={"12px"}
              textAlign={"center"}
              mx={1}
              textTransform={"uppercase"}
            >
              HELLO{" "}
              {agentUserDetails?.name
                ? agentUserDetails?.name
                : agentUserDetails?.firstName}
            </Typography>
          )}
            {loginUserDetails && (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {loginUserDetails && (
              <Box>
                <Button
                  sx={{
                    backgroundColor: "gold.main",
                    borderRadius: "50%",
                    height: "35px",
                    minWidth: "35px",
                    mx: { sm: 1, xs: 0.5 },
                    "&:hover": { backgroundColor: "space.main" },
                  }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <PersonIcon sx={{ color: "#fff", fontSize: "20px" }} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      position: loginUserDetails ? "relative" : "unset",
                      width: loginUserDetails ? "fit-content" : "unset",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{ borderBottom: "1px solid #dfdfdf" }}
                  >
                    <Link
                      className={poppins_400.className}
                      style={{ textDecoration: "none", color: "#000" }}
                      href={
                        loggedInRole === "Agent"
                          ? "https://stage.ekatta.tech/agentportal-dashboard/public/validate_login/" +
                            btoa(
                              `${agentUserDetails?.email} ${agentUserDetails?.password} dashboard`
                            )
                          : "/myProfile"
                      }
                    >
                      <AccountBoxOutlinedIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      Profile
                    </Link>
                  </MenuItem>
                  {loggedInRole === "Agent" && (
                    <MenuItem
                      className={poppins_400.className}
                      sx={{ borderBottom: "1px solid #dfdfdf" }}
                    >
                      <AssessmentOutlinedIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      <GenerateLead handleCloseFun={handleClose} />
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Link
                      className={poppins_400.className}
                      style={{ textDecoration: "none", color: "#000" }}
                      href={"/login"}
                    >
                      <LogoutIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {loginUserDetails && (
              <Link
                href={"/notification"}
                style={{
                  backgroundColor: "#1A2B56",
                  borderRadius: "50%",
                  height: "35px",
                  minWidth: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NotificationsActiveIcon
                  sx={{ color: "#fff", fontSize: "22px", verticalAlign: "sub" }}
                />
              </Link>
            )}
          </Box>
        )}
        </Box>
      </Stack>
    </Container>
  );
};

export default Topnavbar;
