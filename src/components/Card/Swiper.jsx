import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Card.css";

// import required modules
import { Pagination } from "swiper/modules";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import HeadsetOutlinedIcon from "@mui/icons-material/HeadsetOutlined";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";

export function Swipe() {
  return (
    <div className="hidden sm:flex sm:flex-col sm:gap-[32px]">
      <div className="sm:p-[0px_20px] sm:flex sm:flex-col sm:gap-[20px]">
        <div className="flex items-center gap-[16px]">
          <div className="bg-[#DB4444] w-[20px] h-[40px] rounded-[5px]"></div>
          <p className="text-[#DB4444] text-[20px]">Categories</p>
        </div>
        <p className="text-[35px] font-bold">Browse By Category</p>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        className="mySwiper"
      >
        <SwiperSlide className="sm:p-[20px_70px] sm:w-[100px] sm:rounded-[4px] sm:flex sm:flex-col sm:border sm:border-[gray] hover:text-[white] hover:bg-[#DB4444]">
          <PhoneAndroidOutlinedIcon sx={{ width: "70px", height: "70px" }} />
          <p className="text-[20px]">Phones</p>
        </SwiperSlide>
        <SwiperSlide className="sm:p-[20px_70px] sm:w-[100px] sm:rounded-[4px] sm:flex sm:flex-col sm:border sm:border-[gray] hover:text-[white] hover:bg-[#DB4444]">
          <DesktopWindowsOutlinedIcon sx={{ width: "70px", height: "70px" }} />
          <p className="text-[20px]">Computers</p>
        </SwiperSlide>
        <SwiperSlide className="sm:p-[20px_70px] sm:w-[100px] sm:rounded-[4px] sm:flex sm:flex-col sm:border sm:border-[gray] hover:text-[white] hover:bg-[#DB4444]">
          <WatchOutlinedIcon sx={{ width: "70px", height: "70px" }} />
          <p className="text-[20px]">SmartWatch</p>
        </SwiperSlide>
        <SwiperSlide className="sm:p-[20px_70px] sm:w-[100px] sm:rounded-[4px] sm:flex sm:flex-col sm:border sm:border-[gray] hover:text-[white] hover:bg-[#DB4444]">
          <CameraAltOutlinedIcon sx={{ width: "70px", height: "70px" }} />
          <p className="text-[20px]">Camera</p>
        </SwiperSlide>
        <SwiperSlide className="sm:p-[20px_70px] sm:w-[100px] sm:rounded-[4px] sm:flex sm:flex-col sm:border sm:border-[gray] hover:text-[white] hover:bg-[#DB4444]">
          <HeadsetOutlinedIcon sx={{ width: "70px", height: "70px" }} />
          <p className="text-[20px]">HeadPhones</p>
        </SwiperSlide>
        <SwiperSlide className="sm:p-[20px_70px] sm:w-[100px] sm:rounded-[4px] sm:flex sm:flex-col sm:border sm:border-[gray] hover:text-[white] hover:bg-[#DB4444]">
          <VideogameAssetOutlinedIcon sx={{ width: "70px", height: "70px" }} />
          <p className="text-[20px]">Gaming</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Swipe;
