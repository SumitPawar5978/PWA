import Head from "next/head";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "@/src/utils/theme";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Banner from "@/public/assets/images/banner.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginAxios } from "@/src/utils/axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  setAgentUserDetails,
  setLoginRole,
  setLoginUserName,
  setRole,
  setUserDetails,
} from "@/src/app/reducer";

export default function Index() {
  const dispatch = useDispatch();
  const Swal = require("sweetalert2");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loginData, setLoginData] = useState({
    mobile_no: "",
    password: "",
  });
  function handleUnameChange(event) {
    setLoginData({ ...loginData, mobile_no: String(event.target.value) });
  }
  function handlePassChange(event) {
    setLoginData({ ...loginData, password: String(event.target.value) });
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isFormValid = loginData.mobile_no && loginData.password;

  
  const clickHandler = async () => {
    await loginAxios(loginData)
      .then(async (res) => {
        if (res.data.status === "success") {
          await localStorage.setItem(
            "userDetails",
            JSON.stringify(res.data.authorisation)
          );
          dispatch(setUserDetails(res.data.authorisation));
          dispatch(setLoginUserName(res?.data?.user?.firstName));
          dispatch(setLoginRole(res?.data?.user?.role));
          dispatch(
            setAgentUserDetails({
              ...res?.data?.user,
              password: loginData?.password,
            })
          );

          Toast.fire({
            icon: "success",
            title: "Logged in successfully",
          });
          router.push("/");
        } else {
          Swal.fire({
            title: "Login failed",
            text: res?.data?.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        console.log(err?.response?.data.message, "errorMessage");
        if (err?.response?.data.message !== false) {
          Swal.fire({
            title: "Login failed",
            text: err?.response?.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Login failed",
            text: "Please enter valid credentials",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color="#fff"
        sx={{
          position: "relative",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          minHeight: { md: "100vh", xs: "auto" },
          backgroundImage: `url(${Banner.src})`,
          boxShadow: "inset 0 0 0 2000px #0d1f37cc;",
        }}
      >
        <Container sx={{ py: 5 }}>
          <Box
            bgcolor={"#fff"}
            borderRadius={"5px"}
            sx={{
              padding: { md: "60px", xs: "10px" },
              margin: { md: "0px 60px", xs: "0px" },
            }}
          >
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"p"}
              sx={{ fontSize: { sm: "50px", xs: "30px" } }}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Log{" "}
              <Typography
                variant="poppins_600"
                sx={{ fontSize: { sm: "50px", xs: "30px" } }}
                color={"gold.main"}
                component="span"
              >
                In{" "}
              </Typography>
              To Your Account
            </Typography>
            <Typography
              textAlign={"center"}
              variant="poppins_600"
              component={"p"}
              sx={{ fontSize: { sm: "20px", xs: "15px" } }}
              color={"space.main"}
              letterSpacing={"1.44px"}
            >
              Welcome Back ! Enter Mobile Number & Password For Login
            </Typography>

            <Stack mt={5} justifyContent={"center"} alignItems={"center"}>
              <Box>
                <TextField
                  type="text"
                  value={loginData.mobile_no}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handleUnameChange(e);
                    }
                  }}
                  fullWidth
                  id="outlined-basic"
                  label="Enter Mobile Number"
                  variant="outlined"
                  sx={{
                    my: 1.5,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    "& .MuiInputLabel-root": { lineHeight: "unset" },
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 1.5,
                    "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <InputLabel
                    sx={{ lineHeight: "unset", bgcolor: "#fff", pr: 1 }}
                    htmlFor="outlined-adornment-password"
                  >
                    Enter Password
                  </InputLabel>
                  <OutlinedInput
                    value={loginData.password}
                    onChange={handlePassChange}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "75px" },
                      "& .MuiOutlinedInput-input": { padding: "13.5px 14px" },
                    }}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Box>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ width: { md: "482px", xs: "100%" } }}
                my={1}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{
                    "& .MuiTypography-root": { color: "#15151599" },
                    "& .MuiCheckbox-root": { color: "#1A2B56 !important" },
                  }}
                  label="Remember me"
                />
                <Link
                  className={styles.roboto_400}
                  href="#"
                  color={"space.main"}
                >
                  Forgot Password
                </Link>
              </Stack>
              <Button
              disabled={!isFormValid}
                className={styles.poppins_600}
                variant="contained"
                sx={{
                  width: { md: "482px", xs: "100%" },
                  border: "3px solid #B58A44",
                  borderRadius: "75px",
                  backgroundColor: "gold.main",
                  padding: "6px",
                  mb: 3,
                  color: "space.main",
                  fontSize: "18px",
                }}
                onClick={clickHandler}
              >
                Login
              </Button>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography
                  className={styles.roboto_400}
                  color={"#15151599"}
                  px={0.5}
                >
                  Don’t have an account ?
                </Typography>
                <Typography
                  className={styles.roboto_400}
                  px={0.5}
                  sx={{cursor:'pointer', borderBottom:1}}
                  onClick={()=>{ dispatch(setRole('user'))
                    router.push('registration')
                  }}
                  underline="hover"
                  color={"space.main"}
                >
                  Register Now
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
