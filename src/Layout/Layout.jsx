import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import SendIcon from "@mui/icons-material/Send";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, TextField } from "@mui/material";
import logo from "../assets/img/logo.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { jwtDecode } from "jwt-decode";
import { destroyToken, getToken } from "../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { getDataCategoriya } from "../reduser/counter";

const Layout = () => {
  const token = jwtDecode(localStorage.getItem("access_token"));
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
  const productCategoriya = useSelector(
    (state) => state.product.dataCategoriya
  );

  useEffect(() => {
    dispatch(getDataCategoriya());
  }, [dispatch]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const LogOut = () => {
    destroyToken();
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = productCategoriya.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <h1 className="text-[16px] text-[#000] font-mono font-[400] not-italic sm:p-[20px]">
          <Link to={"/catalog"}>Home</Link>
        </h1>
        {getToken()[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "User" ? null : (
        <h1 className="text-[16px] text-[#000] font-mono font-[400] not-italic sm:p-[20px]">
             <Link to={"contact"}>Stock</Link>
          
             </h1>
            )}
        <h1 className="text-[16px] text-[#000] font-mono font-[400] not-italic sm:p-[20px]">
          <Link to={"categotypage"}>Category</Link>
        </h1>
        <h1 className="text-[16px] text-[#000] font-mono font-[400] not-italic sm:p-[20px]">
          <Link to={"dish"}>Dish</Link>
        </h1>
        <h1 className="text-[16px] text-[#000] font-mono font-[400] not-italic sm:p-[20px]">
          <Link to={"drink"}>Drink</Link>
        </h1>
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={"profile"}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={LogOut}>Logout</MenuItem>
      </Menu>

      <div className="flex z-50 fixed w-full bg-[rgb(0,0,0,0.9)] sm:justify-center top-0 p-[0px_95px_0px_0px] gap-[148px] sm:p-[20px_20px]">
        <div className="hidden sm:flex sm:gap-[20px] sm:items-center">
          <div className="sm:flex sm:gap-[10px] sm:w-[250px] sm:items-center">
            <MenuIcon
              onClick={toggleDrawer(true)}
              sx={{ fontSize: "25px", height: "30px", color: "white" }}
            />
          </div>
          <div className="sm:flex sm:items-center sm:gap-[5px]">
            <Link to={"/catalog/shoppingcart"}>
              <ShoppingCartIcon
                sx={{ fontSize: "25px", height: "30px", color: "white" }}
              />
            </Link>
            <PermIdentityIcon
              onClick={handleMenuClick}
              sx={{ fontSize: "28px", color: "white" }}
            />
          </div>
        </div>
        <div className="flex justify-between flex-1 sm:hidden">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="w-[50%] opacity-100 rounded-r-full"
            />
          </div>
          <ul className="flex gap-10 justify-center items-center p-[10px_0px] dark:bg-[#252525] dark:text-[white]">
            <li className="text-[16px] text-[white] font-mono font-[400] not-italic hover:border-[white] hover:border-b-[2px] hover:duration-500">
              <Link to={"/catalog"}>Home</Link>
            </li>

            {getToken()[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] === "User" ? null : (
              <li className="text-[16px] text-[white] font-mono font-[400] not-italic hover:border-[white] hover:border-b-[2px] hover:duration-500">
                <Link to={"contact"}>Stock</Link>
              </li>
            )}

            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative text-[16px] text-[white] font-mono font-[400] not-italic hover:border-[white] hover:border-b-[2px] hover:duration-500"
            >
              <Link to={"categotypage"}>Category</Link>
              {isDropdownOpen && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 mt-2  bg-white text-black rounded-md shadow-lg"
                >
                  {filteredCategories?.slice(0, 10)?.map((e) => (
                    <Link
                      key={e.id}
                      to={`categoriya/${e.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {e.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li className="text-[16px] text-[white] font-mono font-[400] not-italic hover:border-[white] hover:border-b-[2px] hover:duration-500">
              <Link to={"dish"}>Dish</Link>
            </li>
            <li className="text-[16px] text-[white] font-mono font-[400] not-italic hover:border-[white] hover:border-b-[2px] hover:duration-500">
              <Link to={"drink"}>Drink</Link>
            </li>

          
          </ul>
        </div>
        <div className="flex items-center gap-[24px] sm:hidden">
          <div className="flex gap-[16px] items-center sm:hidden">
            <Link to={"/catalog/shoppingcart"}>
              <ShoppingCartIcon
                sx={{ width: "30px", height: "30px", color: "white" }}
              />
            </Link>
            <PermIdentityIcon
              onClick={handleMenuClick}
              sx={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                color: "white",
              }}
            />
          </div>
        </div>
      </div>

      <Outlet />

      <footer className="bg-[rgb(0,0,0,0.9)] p-[20px_10%] flex flex-col items-center gap-[12px] sm:p-[32px_20px_24px_20px] sm:gap-[4 0px]">
        <div className="border-t w-[114%] text-center pt-[20px] sm:w-[400px]">
          <h1 className="text-[var(--Primary,_#FFF)] text-[16px] font-[400] font-mono not-italic sm:w-[160px] sm:m-auto">
            Copyright Rimel 2022. All rights reserved.
          </h1>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
