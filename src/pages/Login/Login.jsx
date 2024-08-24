import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import GoogleIcon from "@mui/icons-material/Google";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useFormik } from "formik";
import { saveToken } from "../../utils/token";
import { Box, Drawer, List, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import vid from "../../assets/vidio/vid.mp4";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../assets/img/logo.jpg";
import Button from "@mui/material/Button";
import { axiosRequest } from "../../utils/axiosRequest";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fogotPassword, resetPassword } from "../../reduser/counter";
import { useDispatch } from "react-redux";

const Login = () => {
  let API = import.meta.env.VITE_APP_API_URL;
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [value, setValue] = useState("");
  let [value2, setValue2] = useState("");
  let [value3, setValue3] = useState("");
  let [value4, setValue4] = useState("");
  let [value5, setValue5] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "https://webapi20240816105645.azurewebsites.net/api/Account/login",
        {
          userName: userName,
          password: password,
        }
      );
      if (data.statusCode == 200) {
        setTimeout(() => {
          saveToken(data.data);
          navigate("/catalog");
          toast.success("Successfully toasted!");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(fogotPassword(value));
    setOpen(false);
    handleClickOpen2();
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
     dispatch(
       resetPassword({
         code: value2,
         email: value3,
         password: value4,
         confirmPassword: value5,
       })
     );
    setOpen2(false);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />;
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 h-[100vh] object-cover w-[100%]"
        src={vid}
      >
        <source src={vid} />
      </video>
      <div className="p-[50px] sm:p-[10px] pt-[10%] relative z-20 cursor-pointer">
        <h1 className="text-[40px] font-[600] font-mono text-center">
          Log in to Exclusive
        </h1>
        <h1 className="text-[18px] font-[400] font-mono text-gray-500 pt-[10px] text-center">
          Enter your information here
        </h1>
        <div className="p-[30px] w-[500px] m-[auto] mt-[20px] rounded-lg sm:w-[100%]">
          <form onSubmit={(e) => login(e)}>
            <input
              name="userName"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              className="w-[80%] sm:w-[90%] font-mono text-[20px] text-[#000000] mt-[10px] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Name"
              type="text"
            />

            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-[80%]  sm:w-[90%] font-mono text-[20px] text-[#000000] mt-[5%] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Password"
              type="password"
            />
            <button
              type="submit"
              className="w-[80%] font-mono cursor-pointer sm:w-[90%] text-[18px] font-[600] text-[white] block m-[auto] bg-[#DB4444] rounded-lg h-[60px] mt-[30px]"
            >
              Log In
            </button>
            <input
              onClick={handleClickOpen}
              value={"Forget Password?"}
              className="w-[80%] cursor-pointer font-mono  sm:w-[90%] text-[#DB4444] text-[18px] font-[600]  block m-[auto] bg-[transparent] border-[2px] rounded-lg h-[60px] mt-[10px]"
              type="button"
            />
            <Link to={"/"}>
              <button className="w-[80%] cursor-pointer font-mono  sm:w-[90%] text-green-400 text-[18px] font-[600]  block m-[auto] bg-[transparent] border-[2px] rounded-lg h-[60px] mt-[10px]">
                <span className="text-[20px] ml-[10px]  sm:text-[16px]">
                  Registration
                </span>
              </button>
            </Link>
          </form>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enter your email"}</DialogTitle>
        <DialogContent>
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className=" border border-black rounded-md p-[3%] h-[30px] w-[100%] "
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button sx={{ color: "green" }} onClick={handleClose} autoFocus>
            send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Enter your details</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter number"
            />
            <input
              type="email"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter email"
            />
            <input
              type="password"
              value={value4}
              onChange={(e) => setValue4(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter password"
            />
            <input
              type="password"
              value={value5}
              onChange={(e) => setValue5(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Confirm password"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button sx={{ color: "green" }} onClick={handleClose2} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Login;
