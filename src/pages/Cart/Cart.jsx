import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getData, getProductById, postCart } from "../../reduser/counter";
import { Card, Rating } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Card2 from "../../components/Card/Card2";

const Cart = () => {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const { id } = useParams();
  const ById = useSelector((state) => state.product.ById);
  const product = useSelector((state) => state.product.data);
  const dispatch = useDispatch();

  console.log(ById);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getData());
  }, []);

  let [cnt, setCnt] = useState(1);

  return (
    <div className="py-[5%] mt-[100px] w-[90%] m-auto flex flex-col gap-[40px] ">
      <div className="flex gap-[70px] items-start sm:flex-col sm:">
        <div className="flex items-start gap-[30px] sm:gap-[12px] sm:flex-col-reverse">
          <img
            src={`${imgUrl}${ById.dish?.pathPhoto}`}
            className="w-[775px] h-[600px] p-[154px_27px_131px_27px] rounded-[5px] object-cover bg-[var(--grey-100,_#F5F5F5)]  sm:p-[var(--none,_65px)_var(--none,_26px)_var(--none,_66px)_var(--none,_27px)]"
            alt="picture"
          />
        </div>
        <div className="w-[320px] flex flex-col gap-[33px] ">
          <div className="flex flex-col gap-[21px] sm:gap-[12px]">
            <h1 className="text-[25px] font-[600] font-mono sm:text-[20px] ">
              {ById.dish?.name}
            </h1>
            <h1 className="text-[18px] font-[400] text-gray-400 font-mono sm:text-[20px] ">
              {ById.dish?.description}
            </h1>
            <h1 className="text-[18px] font-[400] text-gray-400 font-mono sm:text-[20px] ">
              {ById.dishIngredients?.map((e) => {
                return e.name + ",";
              })}
            </h1>

            <div className="flex items-center"></div>
            <hr className="w-[100%] h-[2px]" />

            <div className="flex items-center gap-[24px]">
              <h1 className="text-[18px] font-[700] font-mono">Calories :</h1>
              <h1 className="text-[18px] font-[400] text-orange-400 font-mono sm:text-[20px] ">
                {ById.dish?.calorie * cnt}g
              </h1>
            </div>
            <div className="flex items-center gap-[24px]">
              <h1 className="text-[18px] font-[700] font-mono">
                Cooking-Time :
              </h1>
              <h1 className="text-[18px] font-[400] text-green-500 font-mono sm:text-[20px] ">
                {ById.dish?.cookingTimeInMinutes * cnt}min
              </h1>
            </div>
            <hr />
          </div>
          <h1 className="text-[25px] font-[600] sm:text-[24px] sm:font-[700]">
            {ById.dish?.price * cnt}$
          </h1>
          <div className="flex gap-[18px] items-center sm:flex-col  sm:self-stretch sm:items-start">
            <div className="sm:flex sm:justify-between sm:items-center sm:self-stretch ">
              <div className="flex items-center">
                <button
                  className="p-[var(--none,_10px)_var(--none,_8px)] rounded-[var(--borderRadius,_4px)_var(--none,_0px)_var(--none,_0px)_var(--borderRadius,_4px)] w-[40px] text-[20px] font-[700] border hover:text-[white] hover:bg-[#DB4444]"
                  onClick={() => {
                    if (cnt > 0) {
                      setCnt(cnt - 1);
                    }
                  }}
                >
                  -
                </button>
                <h1 className="p-[var(--none,_10px)_var(--none,_8px)_var(--none,_10px)_var(--none,_9px)] w-[80px] border-b border-t text-center font-[700] text-[20px]">
                  {cnt}
                </h1>
                <button
                  className="p-[var(--none,_10px)_var(--none,_8px)_var(--none,_10px)_var(--none,_9px)] rounded-[var(--none,_0px)_var(--borderRadius,_4px)_var(--borderRadius,_4px)_var(--none,_0px)] w-[40px] text-[20px] font-[700] border  hover:text-[white] hover:bg-[#DB4444]"
                  onClick={() => setCnt((cnt += 1))}
                >
                  +
                </button>
              </div>
              <p className="border justify-center rounded-[4px] p-[var(--none,_4px)] hidden sm:flex">
                <FavoriteBorderIcon className="w-[32px] h-[32px]" />
              </p>
            </div>
            <Link className="w-[40%] mt-[3%]" to={"/catalog/shoppingcart"}>
              <button
                onClick={() => dispatch(postCart(id))}
                className="bg-[#DB4444] text-[white] w-[100%] text-[16px] font-mono font-[800] h-[50px] mb-2 rounded-[5px]"
              >
                Buy Now
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[18px] border p-[20px_0px] rounded-[4px] ">
            <div className="flex items-center gap-[16px] p-[0px_20px]">
              <LocalShippingIcon sx={{ fontSize: "40px" }} />
              <div>
                <h1 className="sm:text-[16px] font-[Poppins] text-[#000] sm:font-[500]">
                  Free Delivery
                </h1>
                <p className="sm:text-[12px] underline sm:font-[500] font-[Poppins] text-[#000]">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <hr className="" />
            <div className="flex items-center gap-[16px] p-[0px_20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_11_5814)">
                  <path
                    d="M33.3332 18.3334C32.9256 15.4004 31.565 12.6828 29.4609 10.5992C27.3569 8.51563 24.6261 7.18161 21.6893 6.80267C18.7525 6.42372 15.7725 7.02088 13.2085 8.50216C10.6445 9.98343 8.63859 12.2666 7.49984 15.0001M6.6665 8.33341V15.0001H13.3332"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.6665 21.6667C7.0741 24.5997 8.43472 27.3173 10.5388 29.4009C12.6428 31.4845 15.3736 32.8186 18.3104 33.1975C21.2472 33.5764 24.2271 32.9793 26.7912 31.498C29.3552 30.0167 31.3611 27.7335 32.4998 25.0001M33.3332 31.6667V25.0001H26.6665"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11_5814">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>
                <h1 className="sm:text-[16px] font-[Poppins] text-[#000] sm:font-[500]">
                  Return Delivery
                </h1>
                <p className="sm:text-[12px]   sm:font-[500] font-[Poppins] text-[#000]">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Cart;
