import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import usav from "../../assets/vidio/usa.mp4";
import tjv from "../../assets/vidio/tj.mp4";
import italiyav from "../../assets/vidio/italiya.mp4";
import japanv from "../../assets/vidio/japan.mp4";
import chinav from "../../assets/vidio/china.mp4";
import { getDataCategoriya, getOrderById, getProductById, getProductdrinkById } from "../../reduser/counter";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";

const SopingCartById = () => {
    const id = useParams();
    const imgUrl = import.meta.env.VITE_APP_FILES_URL;
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const orderid = useSelector((state) => state.product.dataOrderById);
    const productdish = useSelector((state) => state.product.ById);
    const productdrink = useSelector((state) => state.product.drinkById);

    const [iddrink, setIddrink] = useState(orderid.drinkId);
    const [iddish, setIddish] = useState(orderid.dishId);
    
    useEffect(() => {
      setIddish(orderid.dishId);
      dispatch(getOrderById(id.id));
      dispatch(getProductById(iddish));
      dispatch(getProductdrinkById(iddrink));
    }, [dispatch, iddish, id, iddrink]);

  return (
    <div className="py-[10%] px-[5%]">
      <div className="w-[20%]">
        {" "}
        <Card
          key={productdish?.dish?.id}
          id={productdish?.dish?.id}
          img={`${imgUrl}${productdish?.dish?.pathPhoto}`}
          description={productdish?.dish?.description}
          cookingTimeInMinutes={productdish?.dish?.cookingTimeInMinutes}
          title={productdish?.dish?.name}
          price={productdish?.dish?.price}
        />
      </div>
    </div>
  );
};

export default SopingCartById;
