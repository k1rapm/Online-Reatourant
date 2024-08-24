import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriyaProductById, getData } from "../../reduser/counter";
import { useParams } from "react-router-dom";
import { postDishCotegoriya } from "../../reduser/Modal/Modal";
import { editCategoriya } from "../../reduser/Categoriya/categoriya";
import toast, { Toaster } from "react-hot-toast";

const Modal = () => {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
  const { id } = useParams();
  const ById = useSelector((state) => state.product.dataCategoriyaById);
  const productDishes = useSelector((state) => state.product.data);
  const [mosiv, setMosiv] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getData());
    dispatch(getCategoriyaProductById(id));
  }, [id, dispatch]);

  const handleSelectDish = (dishId) => {
    setSelectedDishes((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.has(dishId)
        ? newSelected.delete(dishId)
        : newSelected.add(dishId);
      setMosiv(
        Array.from(newSelected).map((idx) => ({ dishId: idx }))
      );
      return newSelected;
    });
  };
  
  
  
  
  
  
  const handleAddSubmit = () => {
    const formData = new FormData();
    formData.append("Id", ById?.category?.id);
    formData.append("Name", ById?.category?.name);
    formData.append("Description", ById?.category?.description);
    formData.append("Photo", null);
    formData.append("CategoryDishesJson", JSON.stringify(mosiv));

    dispatch(editCategoriya(formData))
      .then(() => {
        toast.success("Dish successfully add!");
        setOpenEditDialog(false);
      })
      
  };
  
  const filteredDishes = productDishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="px-[5%] py-[10%]">
      <Toaster position="top-center"  />;
      <div className="flex flex-col gap-5 my-5">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 font-mono w-5 h-10 rounded-sm"></div>
          <p className="text-red-500 font-mono text-lg">
            {ById?.category?.name}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-4xl font-mono font-bold">
            {ById?.category?.description}
          </p>
        </div>
      </div>
      <div className="py-[2%]">
        <Button variant="contained" onClick={handleAddSubmit}>
          Add Dishes
        </Button>
      </div>
      <div className="my-4">
        <TextField
          label="Search Dishes"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          backdropFilter: "blur(50px)",
          backgroundColor: "rgba(0,0,0,0.9)",
          border: "1px solid black",
          boxShadow: "1px 1px 1px 1px 20px",
          color: "white",
          borderRadius: "15px",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="dish table">
          <TableHead>
            <TableRow>
              {[
                "Avatar",
                "Name",
                "Description",
                "Calories",
                "Cooking Time",
                "Have All Ingredients",
                "Price",
                "Select",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDishes.map((dish) => (
              <TableRow key={dish.id}>
                <TableCell component="th" scope="row">
                  <img
                    src={`${imgUrl}${dish.pathPhoto}`}
                    alt={dish.name}
                    className="w-12"
                  />
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {dish.name}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {dish.description}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {dish.calorie}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {dish.cookingTimeInMinutes} minutes
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {dish.areAllIngredients ? "Yes, exists" : "Does not exist"}
                  {dish.areAllIngredients ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      color="green"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      color="red"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  )}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {dish.price}$
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  <Checkbox
                    checked={selectedDishes.has(dish.id)}
                    onChange={() => handleSelectDish(dish.id)}
                    color="success"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Modal;
