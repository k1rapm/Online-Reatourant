import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { postCart } from "../../reduser/counter";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Card2 = ({
  id,
  img,
  title,
  price,
  description,
  cookingTimeInMinutes,
}) => {
  const dispatch = useDispatch();
  const [descriptionVisible, setDescriptionVisible] = useState(false);


  const handleAddToCart = () => {
    const product = {
      id,
      img,
      title,
      price,
      description,
      cookingTimeInMinutes,
    };
    const cartdrink = JSON.parse(localStorage.getItem("cartdrink")) || [];
    const productIndex = cartdrink.findIndex((item) => item.id === product.id);

    if (productIndex > -1) {
      cartdrink[productIndex].count += 1;
    } else {
      cartdrink.push({ ...product, count: 1 });
    }

    localStorage.setItem("cartdrink", JSON.stringify(cartdrink));
  };

  return (
    <div className="overflow-hidden flex   flex-col gap-2 border   hover:shadow-gray-400 hover:shadow-md pb-[10%]">
      <Link to={`/catalog/cart2/${id}`}>
        <div className="product rounded-[5%] relative">
          <img
            src={img}
            className="w-[90%] border h-[200px] m-[5%] rounded-md    object-cover   mix-blend-multiply "
            alt="picture"
          />
        </div>
      </Link>
      <div className="px-[5%] py-[2%] rounded-xl w-[100%] ">
        <div className="flex justify-between items-center">
          <p className="text-[30px] font-mono font-[600]">{title}</p>
          <div
            onClick={handleAddToCart}
            className="bg-orange-500 px-[5%] cursor-pointer hover:border-black hover:border hover:shadow-gray-400 hover:shadow-md gap-[10%] items-center flex rounded-full py-[1%]"
          >
            <p className="text-white font-mono text-[24px]">${price}</p>
            <ShoppingCartIcon
              sx={{ width: "30px", height: "30px", color: "white" }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          {" "}
          <p className="text-[16px] pt-[5%] text-gray-600 font-mono ">
            Cooking-Time:{" "}
            <span className="text-[18px]">{cookingTimeInMinutes}</span>min
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card2;
