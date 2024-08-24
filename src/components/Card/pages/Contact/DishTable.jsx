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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TablePagination,
  DialogContentText
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { deleteDish, editDish, postDish } from "../../../../reduser/Dish/dish";
import {
  getData,
  getDataCategoriya,
  getDishIngridient,
  getIngridient,
} from "../../../../reduser/counter";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string(),
  price: Yup.number().required("Required"),
  cookingTimeInMinutes: Yup.number().required("Required"),
});

const AgreeButton = styled(Button)({
  backgroundColor: "green",
  color: "white",
  "&:hover": {
    backgroundColor: "darkgreen",
  },
});

const DisagreeButton = styled(Button)({
  backgroundColor: "red",
  color: "white",
  "&:hover": {
    backgroundColor: "darkred",
  },
});

export function DishTable() {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
  const categoriya = useSelector((state) => state.product.dataCategoriya);
  const productDishes = useSelector((state) => state.product.data);
  const product = useSelector((state) => state.product.dataIngridient);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [personName, setPersonName] = useState([]);
  const [personName2, setPersonName2] = useState([]);
  const [mosiv, setMosiv] = useState([]);
  const [mosiv2, setMosiv2] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getData());
    dispatch(getDishIngridient());
    dispatch(getIngridient());
    dispatch(getDataCategoriya());
  }, [dispatch]);

  function handleIngredientChange(event) {
    const value = event.target.value;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    const selectedIngredients = product.filter((ingredient) =>
      value.includes(ingredient.name)
    );
    setMosiv(
      selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.id,
        quantity: 1,
        description: "string",
      }))
    );
  }

  function handleCategoryChange(event) {
    const value = event.target.value;
    setPersonName2(typeof value === "string" ? value.split(",") : value);
    const selectedCategories = categoriya.filter((category) =>
      value.includes(category.name)
    );
    setMosiv2(
      selectedCategories.map((category) => ({
        categoryId: category.id,
      }))
    );
  }

  const handleAddClick = () => setOpenAddDialog(true);
  const handleEditClick = (dish) => {
    setSelectedDish(dish);
    setOpenEditDialog(true);
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleAddSubmit = (values) => {
    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Price", values.price);
    formData.append("Calorie", values.calorie);
    formData.append("CookingTimeInMinutes", values.cookingTimeInMinutes);
    formData.append("Photo", values.photo);
    formData.append("DishIngredientsJson", JSON.stringify(mosiv));
    formData.append("DishCategoriesJson", JSON.stringify(mosiv2));
    dispatch(postDish(formData));
    setOpenAddDialog(false);
  };

  const handleEditSubmit = (values) => {
    const formData = new FormData();
    formData.append("Id", selectedDish.id);
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Price", values.price);
    formData.append("Photo", values.photo);
    formData.append("CookingTimeInMinutes", values.cookingTimeInMinutes);
    formData.append("DishIngredientsJson", JSON.stringify(mosiv));
    dispatch(editDish(formData));
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteDish(deleteId));
    setOpenDeleteDialog(false);
  };

  const filteredDishes = productDishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIngredients = product.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  const filteredCategories = categoriya.filter((category) =>
    category.name.toLowerCase().includes(searchQuery3.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className="my-[5%] pb-[5%] border rounded-md shadow-md shadow-gray-400 px-[5%]">
      <div className="flex flex-col gap-5 my-[5%]">
        <div className="flex items-center gap-4">
          <div className="bg-red-500 font-mono w-5 h-10 rounded-sm"></div>
          <p className="text-red-500 font-mono text-lg">Dishes</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-4xl font-mono font-bold">All Dishes</p>
          <Button variant="contained" onClick={handleAddClick}>
            Add Dish
          </Button>
        </div>
        <div className="my-4">
          <TextField
            label="Search Dishes"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              {[
                "Avatar",
                "Name",
                "Description",
                "Calories",
                "Cooking Time",
                "Have All Ingredients",
                "Price",
              ].map((header) => (
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
            {filteredDishes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dish) => (
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
                    {dish.cookingTimeInMinutes}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "monospace" }}
                    align="center"
                  >
                    {dish.areAllIngredients ? (
                      <p className="flex items-center">
                        Yes, exists
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
                      </p>
                    ) : (
                      <p className="flex items-center">
                        Does not exist
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
                      </p>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "monospace" }}
                    align="center"
                  >
                    {dish.price}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "monospace" }}
                    align="left"
                  >
                    <div className="flex justify-between ml-[30%]">
                      <Button onClick={() => handleEditClick(dish)}>
                        <EditIcon />
                      </Button>
                      <Button>
                        <Link to={`/catalog/cart/${dish.id}`}>
                          <InfoIcon sx={{ color: "orange" }} />
                        </Link>
                      </Button>
                      <Button onClick={() => handleDeleteClick(dish.id)}>
                        <DeleteOutlineIcon color="error" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filteredDishes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
       
        />
      {/* Dialogs for Add, Edit, Delete */}
  

      {/* Add Dish Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Dish</DialogTitle>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            cookingTimeInMinutes: "",
            calorie: "",
            photo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  Fill in the details for the new dish.
                </DialogContentText>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="cookingTimeInMinutes"
                  label="Cooking Time (minutes)"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="calorie"
                  label="Calories"
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Ingredients</InputLabel>
                  <Select
                    multiple
                    value={personName}
                    onChange={handleIngredientChange}
                    input={<OutlinedInput label="Ingredients" />}
                  >
                    {filteredIngredients.map((ingredient) => (
                      <MenuItem key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    value={personName2}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Categories" />}
                  >
                    {filteredCategories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input
                  type="file"
                  name="photo"
                  onChange={(event) =>
                    setFieldValue("photo", event.currentTarget.files[0])
                  }
                />
              </DialogContent>
              <DialogActions>
                <DisagreeButton onClick={() => setOpenAddDialog(false)}>
                  Cancel
                </DisagreeButton>
                <AgreeButton type="submit">Add Dish</AgreeButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Edit Dish Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Dish</DialogTitle>
        <Formik
          initialValues={{
            name: selectedDish?.name || "",
            description: selectedDish?.description || "",
            price: selectedDish?.price || "",
            cookingTimeInMinutes: selectedDish?.cookingTimeInMinutes || "",
            calorie: selectedDish?.calorie || "",
            photo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleEditSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  Edit the details for the dish.
                </DialogContentText>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="cookingTimeInMinutes"
                  label="Cooking Time (minutes)"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  name="calorie"
                  label="Calories"
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Ingredients</InputLabel>
                  <Select
                    multiple
                    value={personName}
                    onChange={handleIngredientChange}
                    input={<OutlinedInput label="Ingredients" />}
                  >
                    {filteredIngredients.map((ingredient) => (
                      <MenuItem key={ingredient.id} value={ingredient.name}>
                        {ingredient.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    value={personName2}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Categories" />}
                  >
                    {filteredCategories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input
                  type="file"
                  name="photo"
                  onChange={(event) =>
                    setFieldValue("photo", event.currentTarget.files[0])
                  }
                />
              </DialogContent>
              <DialogActions>
                <DisagreeButton onClick={() => setOpenEditDialog(false)}>
                  Cancel
                </DisagreeButton>
                <AgreeButton type="submit">Save Changes</AgreeButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this dish?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DisagreeButton onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </DisagreeButton>
          <AgreeButton onClick={handleDelete}>Delete</AgreeButton>
        </DialogActions>
      </Dialog>
    </section>
  );
}
