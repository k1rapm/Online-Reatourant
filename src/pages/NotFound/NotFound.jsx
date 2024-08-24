import React from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/vidio/bg-notfound.mp4";

const NotFound = () => {
  return (
    <div className="py-[15%]">
    <video
      autoPlay
      muted
      loop
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      src={bg}
    >
      <source src={bg} type="video/mp4" />
    </video>
    <div className="text-center relative z-10  flex flex-col items-center gap-[80px]">
        <div className="flex items-center flex-col gap-[40px] ">
          <h1 className="text-[#000] text-[110px] font-[500] not-italic font-mono">
            404 Not Found
          </h1>
          <p className="text-[16px] text-[#000] font-mono font-[400] not-italic">
            Your visited page not found. You may go home page.
          </p>
        </div>
        <Link to={"/catalog"}>
          <button className="p-[16px_48px] bg-[#DB4444] rounded-[4px] text-[#FAFAFA] text-[16px] font-mono font-[500] not-italic">
            Back to home page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
