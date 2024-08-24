import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import GoogleIcon from "../../assets/img/Icon-Google.svg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axios from "axios";
import vid from "../../assets/vidio/vid.mp4";
import toast, { Toaster } from "react-hot-toast";
import { Photo } from "@mui/icons-material";
import { Button } from "@mui/material";





export function SignUp() {
  let API = import.meta.env.VITE_APP_API_URL;
  let [userName, setUserName] = useState("");
  let [Email, setEmail] = useState("");
  let [Phone, setPhone] = useState("");
  let [Password, setPassword] = useState("");
  let [ConfirmPassword, setConfirmPassword] = useState("");
  let [photo, setPhoto] = useState("");
  let [animSignUp, setAnimSignUp] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    console.log(1);
    e.preventDefault();
    try {
      let { data } = await axios.post(
        `        "https://webapi20240816105645.azurewebsites.net/api/Account/register?UserName=${userName}&Phone=${Phone}&Email=${Email}&Password=${Password}&ConfirmPassword=${ConfirmPassword}`,
        {
          UserName: userName,
          Email: Email,
          Phone: Phone,
          Password: Password,
          ConfirmPassword: ConfirmPassword,
          Photo: photo,
        }
      );
      if (data.statusCode == 200) {
        // saveToken(data.data);
        // setAnimSignUp(!animSignUp);
        setTimeout(() => {
          // setAnimSignUp(!animSignUp);
          navigate("login");
          toast.success("Succses register");
        },0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Register failed. Please try again.");
    }
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div >
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
      <div className="p-[5.5%_50px] pb-[10px] sm:p-[10px] relative z-20 ">
        <h1 className="text-[40px] font-mono font-[600] text-center">
          Create an account
        </h1>
        <h1 className="text-[18px] font-mono text-gray-500 font-[400] pt-[10px] text-center">
          Enter your information here
        </h1>
        <div className="p-[10px] w-[500px] m-[auto] mt-[20px] rounded-lg sm:w-[100%]">
          <form onSubmit={register}>
            <input
              name="userName"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              className="w-[80%] sm:w-[90%]  items-center font-mono text-[20px] text-[#000000] mt-[10px] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Name"
              type="text"
            />
            <input
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-[80%] sm:w-[90%] font-mono text-[20px] text-[#000000] mt-[10px] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Email"
              type="text"
            />
            <input
              name="Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              className="w-[80%] sm:w-[90%] font-mono text-[20px] text-[#000000] mt-[10px] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Phone"
              type="text"
            />
            <input
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-[80%] sm:w-[90%] font-mono text-[20px] text-[#000000] mt-[10px] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Password"
              type="password"
            />
            <input
              name="ConfirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={ConfirmPassword}
              className="w-[80%] sm:w-[90%] font-mono text-[20px] text-[#000000] mt-[10px] outline-none block m-[auto] hover:shadow-md h-[60px] border-[1px] rounded-lg pl-[10px]"
              placeholder="Confirm-Password"
              type="password"
            />

            <Button component="label" variant="contained" sx={{ width:"80%", marginLeft:"10%", marginTop:"5%"}}>
              Upload Photo
              <input
                type="file"
                name="photo"
                style={{ display: "none" }}
                onChange={(event) => setPhoto(event.currentTarget.files[0])}
              />
            </Button>

            <button
              type="submit"
              className="w-[80%] font-mono cursor-pointer sm:w-[90%] text-[18px] font-[600] text-[white] block m-[auto] bg-[#DB4444] rounded-lg h-[60px] mt-[30px]"
            >
              Create Account
            </button>
            <button className="w-[80%] sm:w-[90%] text-[18px] font-[600]  block m-[auto] bg-[transparent] border-[2px] rounded-lg h-[60px] mt-[10px]">
              <span className="absolute left-[42%] sm:absolute sm:left-[20%]">
                <img src={GoogleIcon} alt="" />
              </span>
              Sign up with Google
            </button>
            <Link to={"login"}>
              <button className="w-[80%] text-[18px] font-[600]  block m-[auto] rounded-lg h-[60px] mt-[10px] sm:text-[16px]">
                Already have account?{" "}
                <span className="text-[20px] ml-[10px] text-[#DB4444] underline sm:text-[16px]">
                  Log in
                </span>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
