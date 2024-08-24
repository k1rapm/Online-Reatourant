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
  Stack,
  TextField,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDrink,
  editDrink,
  postDrink,
} from "../../../../reduser/Drink/drink";
import { getDataDrink, getIngridient } from "../../../../reduser/counter";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string(),
  price: Yup.number().required("Required"),
  cookingTimeInMinutes: Yup.number().required("Required"),
  calorie: Yup.number(),
  photo: Yup.mixed().nullable(),
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

const DialogContainer = styled(Dialog)({
  border: "1px solid black",
  borderRadius: "15px",
});

export function DrinkTable() {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
  const productDrink = useSelector((state) => state.product.dataDrink);
  const ingredients = useSelector((state) => state.product.dataIngridient);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getDataDrink());
    dispatch(getIngridient());
  }, [dispatch]);

  const handleIngredientChange = (event) => {
    const { value } = event.target;
    setSelectedIngredients(value);
  };

  const handleAddClick = () => setOpenAddDialog(true);
  const handleEditClick = (drink) => {
    setSelectedDrink(drink);
    setSelectedIngredients(drink.ingredients || []);
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
    if (values.photo) formData.append("Photo", values.photo);
    formData.append("DishIngredientsJson", JSON.stringify(selectedIngredients));
    dispatch(postDrink(formData));
    setOpenAddDialog(false);
  };

  const handleEditSubmit = (values) => {
    const formData = new FormData();
    formData.append("Id", selectedDrink.id);
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Price", values.price);
    if (values.photo) formData.append("Photo", values.photo);
    formData.append("CookingTimeInMinutes", values.cookingTimeInMinutes);
    formData.append("DishIngredientsJson", JSON.stringify(selectedIngredients));
    dispatch(editDrink(formData));
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteDrink(deleteId));
    setOpenDeleteDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDrinks = productDrink.filter((drink) =>
    drink.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice the data for pagination
  const paginatedDrinks = filteredDrinks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <section className="my-[5%] pb-[5%] border rounded-md shadow-md shadow-gray-400 px-[5%]">
      <div className="flex flex-col gap-5 my-[5%]">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 font-mono w-5 h-10 rounded-md"></div>
          <p className="text-red-600 font-mono text-2xl">Drink</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-4xl font-mono font-bold">All Drinks</p>
          <Button variant="contained" onClick={handleAddClick}>
            Add Drink
          </Button>
        </div>
        <div>
          <TextField
            label="Search Drinks"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="mb-4"
          />
        </div>
      </div>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          backdropFilter: "blur(50px)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          border: "1px solid black",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                Avatar
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              >
                Description
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              >
                Cooking Time
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              >
                Have All Ingredients
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              >
                Price
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDrinks.map((drink) => (
              <TableRow key={drink.id}>
                <TableCell component="th" scope="row">
                  <img
                    src={`${imgUrl}${drink.pathPhoto}`}
                    alt={drink.name}
                    className="w-12"
                  />
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {drink.name}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {drink.description}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {drink.cookingTimeInMinutes} minutes
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {drink.areAllIngredients ? (
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
                  align="left"
                >
                  {drink.price}$
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  <div className="flex justify-between ml-[40%]">
                    <Button onClick={() => handleEditClick(drink)}>
                      <EditIcon />
                    </Button>
                    <Button>
                      <Link to={`/catalog/cart2/${drink.id}`}>
                        {" "}
                        <InfoIcon sx={{ color: "orange" }} />
                      </Link>
                    </Button>
                    <Button onClick={() => handleDeleteClick(drink.id)}>
                      <DeleteOutlineIcon color="error" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Component */}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filteredDrinks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          
        />

      {/* Add Drink Dialog */}
      <DialogContainer
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      >
        <DialogTitle className="text-blue-500">Add Drink</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              calorie: "",
              price: "",
              cookingTimeInMinutes: "",
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className="space-y-3">
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="calorie"
                    label="Calorie"
                    fullWidth
                    error={touched.calorie && Boolean(errors.calorie)}
                    helperText={touched.calorie && errors.calorie}
                  />
                  <Field
                    as={TextField}
                    name="price"
                    type="number"
                    label="Price"
                    fullWidth
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="ingredient-label">Ingredient</InputLabel>
                    <Select
                      labelId="ingredient-label"
                      multiple
                      value={selectedIngredients}
                      onChange={handleIngredientChange}
                    >
                      {ingredients.map((ingredient) => (
                        <MenuItem key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Field
                    as={TextField}
                    name="cookingTimeInMinutes"
                    type="number"
                    label="Cooking Time (Minutes)"
                    fullWidth
                    error={
                      touched.cookingTimeInMinutes &&
                      Boolean(errors.cookingTimeInMinutes)
                    }
                    helperText={
                      touched.cookingTimeInMinutes &&
                      errors.cookingTimeInMinutes
                    }
                  />
                  <Button component="label" variant="contained">
                    Upload Photo
                    <input
                      type="file"
                      name="photo"
                      style={{ display: "none" }}
                      onChange={(event) =>
                        setFieldValue("photo", event.currentTarget.files[0])
                      }
                    />
                  </Button>
                </div>
                <DialogActions>
                  <DisagreeButton onClick={() => setOpenAddDialog(false)}>
                    Cancel
                  </DisagreeButton>
                  <AgreeButton type="submit">Add</AgreeButton>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </DialogContainer>

      {/* Edit Drink Dialog */}
      <DialogContainer
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle className="text-blue-500">Edit Drink</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: selectedDrink ? selectedDrink.name : "",
              description: selectedDrink ? selectedDrink.description : "",
              price: selectedDrink ? selectedDrink.price : "",
              calorie: selectedDrink ? selectedDrink.calorie : "",
              cookingTimeInMinutes: selectedDrink
                ? selectedDrink.cookingTimeInMinutes
                : "",
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleEditSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className="space-y-3">
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="calorie"
                    label="Calorie"
                    fullWidth
                    error={touched.calorie && Boolean(errors.calorie)}
                    helperText={touched.calorie && errors.calorie}
                  />
                  <Field
                    as={TextField}
                    name="price"
                    type="number"
                    label="Price"
                    fullWidth
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="ingredient-label">Ingredient</InputLabel>
                    <Select
                      labelId="ingredient-label"
                      multiple
                      value={selectedIngredients}
                      onChange={handleIngredientChange}
                    >
                      {ingredients.map((ingredient) => (
                        <MenuItem key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Field
                    as={TextField}
                    name="cookingTimeInMinutes"
                    type="number"
                    label="Cooking Time (Minutes)"
                    fullWidth
                    error={
                      touched.cookingTimeInMinutes &&
                      Boolean(errors.cookingTimeInMinutes)
                    }
                    helperText={
                      touched.cookingTimeInMinutes &&
                      errors.cookingTimeInMinutes
                    }
                  />
                  <Button component="label" variant="contained">
                    Upload Photo
                    <input
                      type="file"
                      name="photo"
                      style={{ display: "none" }}
                      onChange={(event) =>
                        setFieldValue("photo", event.currentTarget.files[0])
                      }
                    />
                  </Button>
                </div>
                <DialogActions>
                  <DisagreeButton onClick={() => setOpenEditDialog(false)}>
                    Cancel
                  </DisagreeButton>
                  <AgreeButton type="submit">Save</AgreeButton>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </DialogContainer>

      {/* Delete Drink Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this drink?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DisagreeButton onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </DisagreeButton>
          <AgreeButton onClick={handleDelete}>Yes, Delete</AgreeButton>
        </DialogActions>
      </Dialog>
    </section>
  );
}
