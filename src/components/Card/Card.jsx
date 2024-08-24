import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Card = ({ id, img, title, price, description, cookingTimeInMinutes }) => {
  const dispatch = useDispatch();
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible((prev) => !prev);
  };

  const handleAddToCart = () => {
    const product = {
      id,
      img,
      title,
      price,
      description,
      cookingTimeInMinutes,
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex > -1) {
      cart[productIndex].count += 1;
    } else {
      cart.push({ ...product, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="overflow-hidden flex flex-col gap-2 border hover:shadow-md pb-10">
      <Link to={`/catalog/cart/${id}`}>
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={img}
            className="w-full h-48 m-4 rounded-md object-cover"
            alt={title}
          />
        </div>
      </Link>
      <div className="px-4 py-2 rounded-xl w-full">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">{title}</p>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 px-4 py-2 rounded-full text-white flex items-center gap-2 hover:bg-orange-600"
          >
            <p className="text-lg">${price}</p>
            <ShoppingCartIcon sx={{ width: 24, height: 24 }} />
          </button>
        </div>
        <div className="pt-2 text-gray-600">
          <p className="text-sm">
            Cooking Time:{" "}
            <span className="font-medium">{cookingTimeInMinutes} min</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
