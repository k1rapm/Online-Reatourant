import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postShopingCart } from "../../reduser/ShopingCart/shopingCart";
import TablePagination from "@mui/material/TablePagination";
import {
  blocked,
  getBlock,
  getOrder,
  getOrderById,
  orderStatus,
} from "../../reduser/counter";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const [cartDishes, setCartDishes] = useState([]);
  const [cartDrinks, setCartDrinks] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderInfo, setOrderInfo] = useState("");
  const [dateError, setDateError] = useState("");
  const [id, setId] = useState(null);
  const [idx, setIdx] = useState(null);
  const [orderstatus, setOrderstatus] = useState("");
  const block = useSelector((state) => state.product.dataBlock);
  const order = useSelector((state) => state.product.dataOrder);
  const orderById = useSelector((state) => state.product.dataOrderById);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const displayedRows = order.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    const savedCartDishes = JSON.parse(localStorage.getItem("cart")) || [];
    const savedCartDrinks = JSON.parse(localStorage.getItem("cartdrink")) || [];

    setCartDishes(savedCartDishes);
    setCartDrinks(savedCartDrinks);
    dispatch(getBlock());
    dispatch(getOrder());
    dispatch(getOrderById(idx));
    calculateTotal(savedCartDishes, savedCartDrinks);
  }, [dispatch, idx]);

  const handleEditSubmit = () => {
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("OrderStatus", 4);
    dispatch(orderStatus(formData));
  };

  const calculateTotal = (dishes, drinks) => {
    const totalDishes = dishes.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    const totalDrinks = drinks.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setTotalAmount(totalDishes + totalDrinks);
  };

  const updateLocalStorage = (dishes, drinks) => {
    localStorage.setItem("cart", JSON.stringify(dishes));
    localStorage.setItem("cartdrink", JSON.stringify(drinks));
  };

  const handleQuantityChange = (id, action, isDrink) => {
    const cart = isDrink ? cartDrinks : cartDishes;
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newCount =
            action === "increase" ? item.count + 1 : item.count - 1;
          return { ...item, count: Math.max(newCount, 1) };
        }
        return item;
      })
      .filter((item) => item.count > 0);

    if (isDrink) {
      setCartDrinks(updatedCart);
    } else {
      setCartDishes(updatedCart);
    }

    updateLocalStorage(
      isDrink ? cartDishes : updatedCart,
      isDrink ? updatedCart : cartDrinks
    );
    calculateTotal(
      isDrink ? updatedCart : cartDishes,
      isDrink ? cartDrinks : updatedCart
    );
  };

  const handleRemoveItem = (id, isDrink) => {
    const cart = isDrink ? cartDrinks : cartDishes;
    const updatedCart = cart.filter((item) => item.id !== id);

    if (isDrink) {
      setCartDrinks(updatedCart);
    } else {
      setCartDishes(updatedCart);
    }

    updateLocalStorage(
      isDrink ? updatedCart : cartDishes,
      isDrink ? cartDishes : updatedCart
    );
    calculateTotal(
      isDrink ? cartDishes : updatedCart,
      isDrink ? updatedCart : cartDrinks
    );
  };

  const handleClearCart = () => {
    setCartDishes([]);
    setCartDrinks([]);
    setTotalAmount(0);
    localStorage.removeItem("cartDishes");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartdrink");
  };

  const handleUpdateCart = () => {
    if (!selectedDate) {
      setDateError("Please select a delivery date.");
      return;
    }

    const now = new Date();
    if (selectedDate < now) {
      setDateError("Selected date cannot be in the past.");
      return;
    }

    if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedDate.getTime() < now.getTime() + 20 * 60 * 1000
    ) {
      setDateError(
        "For today's date, please select a time at least 20 minutes from now."
      );
      return;
    }

    setDateError("");

    const orderDetails = [
      ...cartDishes.map((item) => ({
        dishId: item.id,
        drinkId: null,
        quantity: item.count,
      })),
      ...cartDrinks.map((item) => ({
        dishId: null,
        drinkId: item.id,
        quantity: item.count,
      })),
    ];

    const orderDate = selectedDate.toISOString();

    dispatch(
      postShopingCart({
        orderInfo,
        dateOfPreparingOrder: orderDate,
        orderDetails,
      })
    )
      .then(() => handleClearCart())
      .catch((error) => console.error("Order error:", error));
  };

  const handleDateChange = (date) => {
    const now = new Date();
    if (date) {
      if (date.toDateString() === now.toDateString()) {
        const minDate = new Date(now);
        minDate.setMinutes(now.getMinutes() + 20);

        if (date.getTime() < minDate.getTime()) {
          date = minDate;
        }
      }
      setSelectedDate(date);
    }
  };

  const blockClick = () => {
    dispatch(blocked(!block.isBlocked));
  };

  return (
    <div className="p-6 sm:p-4 py-[10%] bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Shopping Cart
      </h1>
      <div className=" py-[2%] absolute top-[10%] right-[2%]">
        <Button variant="contained" onClick={blockClick}>
          {block.isBlocked ? "Unblock" : "Blocked"}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-md border-gray-300 shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-4 text-left text-gray-600">Product</th>
              <th className="px-6 py-4 text-left text-gray-600">Price</th>
              <th className="px-6 py-4 text-left text-gray-600">Count</th>
              <th className="px-6 py-4 text-left">Subtotal</th>
              <th className="px-6 py-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartDrinks.map((item) => (
              <tr key={item.id} className="border-b rounded-md border-gray-200">
                <td className="px-6 py-4 flex items-center gap-4">
                  <span className="text-lg font-medium">{item.title}</span>
                </td>
                <td className="px-6 py-4 text-lg text-gray-700">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ArrowDropUpIcon
                      onClick={() =>
                        handleQuantityChange(item.id, "increase", true)
                      }
                      sx={{ cursor: "pointer" }}
                    />
                    <span>{item.count}</span>
                    <ArrowDropDownIcon
                      onClick={() =>
                        handleQuantityChange(item.id, "decrease", true)
                      }
                      sx={{ cursor: "pointer" }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-lg font-semibold text-gray-700">
                  ${(item.price * item.count).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <IconButton onClick={() => handleRemoveItem(item.id, true)}>
                    <HighlightOffIcon sx={{ color: "red" }} />
                  </IconButton>
                </td>
              </tr>
            ))}
            {cartDishes.map((item) => (
              <tr key={item.id} className="border-b rounded-md border-gray-200">
                <td className="px-6 py-4 flex items-center gap-4">
                  <span className="text-lg font-medium">{item.title}</span>
                </td>
                <td className="px-6 py-4 text-lg text-gray-700">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ArrowDropUpIcon
                      onClick={() =>
                        handleQuantityChange(item.id, "increase", false)
                      }
                      sx={{ cursor: "pointer" }}
                    />
                    <span>{item.count}</span>
                    <ArrowDropDownIcon
                      onClick={() =>
                        handleQuantityChange(item.id, "decrease", false)
                      }
                      sx={{ cursor: "pointer" }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-lg font-semibold text-gray-700">
                  ${(item.price * item.count).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <IconButton onClick={() => handleRemoveItem(item.id, false)}>
                    <HighlightOffIcon sx={{ color: "red" }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-wrap justify-between items-center mt-6 gap-4 mb-[5%]">
        <div className="flex gap-4">
          <button
            onClick={handleClearCart}
            className="border-2 px-10 border-red-500 text-lg w-full sm:w-auto h-12 rounded-md bg-white text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Remove
          </button>
          <button
            onClick={handleUpdateCart}
            disabled={!selectedDate}
            className={`border-2 px-10 text-lg w-full sm:w-auto h-12 rounded-md ${
              !selectedDate
                ? "border-gray-400 text-gray-400 cursor-not-allowed"
                : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            } transition`}
          >
            Order
          </button>
        </div>
        {dateError && <p className="text-red-500 mt-2">{dateError}</p>}
        <div className="w-full sm:w-80 mt-6 sm:mt-0 bg-white border-2 border-gray-300 rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Cart Total
          </h2>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Subtotal:
            </span>
            <span className="text-lg font-semibold text-gray-700">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 pb-2 mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Shipping:
            </span>
            <span className="text-lg font-semibold text-gray-700">Free</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">
              Delivery Date:
            </span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              className="border rounded-md p-2"
              placeholderText="Select a date"
            />
          </div>
          <div className="flex justify-between">
            <span className="text-xl font-semibold text-gray-800">Total:</span>
            <span className="text-xl font-semibold text-gray-800">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
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
              {["Info", "Quantiti", "Price"].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align={header === "Have All Ingredients" ? "left" : "center"}
                >
                  {header}
                </TableCell>
              ))}
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((e) => (
              <TableRow key={e.id}>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  <Link
                    to={`/catalog/shoppingcartbyid/${e.id}`}
                    className="w-[100%]"
                  >
                    <p className="text-orange-400 border-2 border-white w-[25px] h-[25px] m-auto rounded-full">
                      i
                    </p>
                  </Link>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {e.quantity}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  {e.unitPrice}$
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="center"
                >
                  <button
                    onClick={() => {
                      setId(e.orderId);
                      handleEditSubmit();
                    }}
                    className="border-2 px-2 border-green-500 py-1.5 sm:w-auto rounded-md text-green-500 hover:bg-green-500 hover:text-white transition"
                  >
                    Done
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={order.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  );
};

export default ShoppingCart;
