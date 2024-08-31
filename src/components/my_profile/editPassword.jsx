import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import styles from "@/styles/Home.module.css";
import {
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { editUserPassword } from "@/src/utils/axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    const newErrors = {};
    if (formData.old_password === "") {
      newErrors.old_password = "This field is required";
    } else if (formData.new_password === "") {
      newErrors.new_password = "This field is required";
    } else if (formData.confirm_password === "") {
      newErrors.confirm_password = "This field is required";
    } else if (formData.confirm_password != formData.new_password) {
      newErrors.confirm_password = "Password mismatch";
    } else if (formData.new_password.length < 8) {
      // Check if password is too short
      newErrors.new_password = "Password must be at least 8 characters";
    } else if (formData.new_password.length > 12) {
      // Check if password is too long
      newErrors.new_password = "Password must be at most 12 characters";
    }
    if (Object.keys(newErrors).length === 0) {
      let res = await editUserPassword(formData);
      Toast.fire({
        icon: "success",
        title: res?.data?.message,
      });
      setFormData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      })
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <>
      <Button
        onClick={handleClickOpen}
        fullWidth
        className={styles.poppins_600}
        variant="contained"
        sx={{
          borderRadius: "75px",
          backgroundColor: "rackley.main",
          padding: "12px",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        change password
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Change Password
            </Typography>
            <Button autoFocus color="inherit" onClick={handleFormSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Grid container pt={5}>
            <Grid item md={12} xs={12}>
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
                  htmlFor="outlined-adornment-password"
                  sx={{ lineHeight: "unset", bgcolor: "#fff", pr: 1 }}
                >
                  Enter old password
                </InputLabel>
                <OutlinedInput
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleInputChange}
                  error={!!errors.old_password}
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
                <FormHelperText id="outlined-weight-helper-text">
                  {errors.old_password}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12} sx={{pr:{md:1, xs:0}}}>
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
                  htmlFor="outlined-adornment-password"
                  sx={{ lineHeight: "unset", bgcolor: "#fff", pr: 1 }}
                >
                  Enter new password
                </InputLabel>
                <OutlinedInput
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  error={!!errors.new_password}
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
                <FormHelperText id="outlined-weight-helper-text">
                  {errors.new_password}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
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
                  htmlFor="outlined-adornment-password"
                  sx={{ lineHeight: "unset", bgcolor: "#fff", pr: 1 }}
                >
                  Enter confirm password
                </InputLabel>
                <OutlinedInput
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  error={!!errors.confirm_password}
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
                <FormHelperText id="outlined-weight-helper-text">
                  {errors.confirm_password}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </>
  );
};

export default EditPassword;
