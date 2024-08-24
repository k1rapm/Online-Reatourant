import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIngridient,
  editIngredient,
  postIngredient,
} from "../../../../reduser/Ingridient/ingridient";
import { getIngridient } from "../../../../reduser/counter";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  count: Yup.number()
    .required("Required")
    .positive("Must be positive")
    .integer("Must be an integer"),
  price: Yup.number().required("Required").positive("Must be positive"),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
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

export function IngredientTable() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.dataIngridient);
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAddClick = () => setOpenAddDialog(true);
  const handleEditClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenEditDialog(true);
  };
  const handleDeleteClick = (id) => {
    setId(id);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    dispatch(getIngridient());
  }, [dispatch]);

  const handleAddSubmit = (values) => {
    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Count", values.count);
    formData.append("Price", values.price);
    formData.append("Photo", values.photo);
    dispatch(postIngredient(formData));
    setOpenAddDialog(false);
  };

  const handleEditSubmit = (values) => {
    const formData = new FormData();
    formData.append("Id", selectedIngredient.id);
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Count", values.count);
    formData.append("Price", values.price);
    formData.append("Photo", values.photo);
    dispatch(editIngredient(formData));
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteIngridient(id));
    setOpenDeleteDialog(false);
  };

  // Filter ingredients based on the search term
  const filteredIngredients = product.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const paginatedIngredients = filteredIngredients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <div className=" my-[5%] pb-[5%] border rounded-md shadow-md shadow-gray-400 px-[5%]">
      <div className="flex flex-col gap-[20px] my-[5%]">
        <div className="flex items-center gap-[16px]">
          <div className="bg-[#DB4444] font-mono w-[20px] h-[40px] rounded-[5px]"></div>
          <p className="text-[#DB4444] font-mono text-[20px]">Ingredient</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-[35px] font-mono font-bold">Ingredient in Stock</p>
          <Button variant="contained" onClick={handleAddClick}>
            Add Ingredient
          </Button>
        </div>
        {/* Search Input */}
        <TextField
          label="Search Ingredients"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          sx={{ marginBottom: 2 }}
        />
      </div>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          backdropFilter: "blur(50px)",
          backgroundColor: "rgb(0,0,0,0.9)",
          border: "1px solid black",
          boxShadow: "1px 1px 1px 1px 20px",
          color: "white",
          borderRadius: "15px",
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
                Count
              </TableCell>
              <TableCell
                sx={{ color: "white", fontFamily: "monospace" }}
                align="left"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedIngredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell component="th" scope="row">
                  <img
                    src={`${imgUrl}${ingredient.pathPhoto}`}
                    alt=""
                    className="w-[50px]"
                  />
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {ingredient.name}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {ingredient.description}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  {ingredient.count}
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                  align="left"
                >
                  <div className="flex justify-between ml-[50%]">
                    <Button onClick={() => handleEditClick(ingredient)}>
                      <EditIcon color="success" />
                    </Button>
                    <Button onClick={() => handleDeleteClick(ingredient.id)}>
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
          count={filteredIngredients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      {/* Add Ingredient Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        className=" m-auto fixed  border border-black rounded-xl shadow-gray-400 shadow-md"
      >
        <DialogTitle className="text-blue-500">
          <p className="py-[5%] font-mono">Add New Ingredient</p>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              count: "",
              price: "",
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-[100%]">
                <div className=" space-y-3">
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="count"
                    as={TextField}
                    label="Count"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="price"
                    as={TextField}
                    label="Price"
                    variant="outlined"
                    fullWidth
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      name="photo"
                      onChange={(event) =>
                        setFieldValue("photo", event.currentTarget.files[0])
                      }
                    />
                    Upload Photo
                  </Button>
                  <DialogActions>
                    <DisagreeButton onClick={() => setOpenAddDialog(false)}>
                      Cancel
                    </DisagreeButton>
                    <AgreeButton type="submit">Add</AgreeButton>
                  </DialogActions>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Edit Ingredient Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        className=" fixed  m-auto border border-black rounded-xl shadow-gray-400 shadow-md"
      >
        <DialogTitle className="text-blue-500">
          <p className="py-[5%] font-mono">Edit Ingredient</p>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: selectedIngredient?.name || "",
              description: selectedIngredient?.description || "",
              count: selectedIngredient?.count || "",
              price: selectedIngredient?.price || "",
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleEditSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-[100%]">
                <div className=" space-y-3">
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="count"
                    as={TextField}
                    label="Count"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="price"
                    as={TextField}
                    label="Price"
                    variant="outlined"
                    fullWidth
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      name="photo"
                      onChange={(event) =>
                        setFieldValue("photo", event.currentTarget.files[0])
                      }
                    />
                    Upload Photo
                  </Button>
                  <DialogActions>
                    <DisagreeButton onClick={() => setOpenEditDialog(false)}>
                      Cancel
                    </DisagreeButton>
                    <AgreeButton type="submit">Save</AgreeButton>
                  </DialogActions>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Delete Ingredient Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        className="fixed  border border-black rounded-xl shadow-gray-400 shadow-md"
      >
        <DialogTitle className="text-blue-500">
          <p className="py-[5%] font-mono">Delete Ingredient</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ingredient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <AgreeButton onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </AgreeButton>
          <DisagreeButton onClick={handleDelete}>Delete</DisagreeButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
