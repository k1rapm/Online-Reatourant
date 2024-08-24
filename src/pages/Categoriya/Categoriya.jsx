
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardContent, Typography } from "@mui/material";
import {
  getCategoriyaProductById,
  getDishCategoriy,
} from "../../reduser/counter";
import Card from "../../components/Card/Card";

const Cotegoriya = () => {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  const ById = useSelector((state) => state.product.dataCategoriyaById);

  useEffect(() => {
    dispatch(getCategoriyaProductById(id));
    dispatch(getDishCategoriy());
  }, [dispatch, id]);

  return (
    <div className="p-8 w-11/12 mx-auto flex flex-col mt-24 gap-10 sm:p-5 sm:mt-16">
      {/* Category Header */}
      <section className="flex flex-col gap-8 sm:hidden">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 w-5 h-10 rounded-sm"></div>
          <p className="text-red-600 text-xl font-mono">
            {ById?.category?.name}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-gray-800">
            {ById?.category?.description}
          </p>
        </div>
      </section>

      {/* Dish Cards */}
      <div className="grid grid-cols-4 gap-8 sm:grid-cols-1">
        {ById?.categoryDishes?.map((el) => (
          <Card
            key={el.id}
            id={el.id}
            img={`${imgUrl}${el.pathPhoto}`}
            description={el.description}
            title={el.name}
            cookingTimeInMinutes={el.cookingTimeInMinutes}
            price={el.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Cotegoriya;
