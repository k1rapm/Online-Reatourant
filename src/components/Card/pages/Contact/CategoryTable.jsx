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
  TextField,
  DialogContentText,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Formik, Form, Field } from "formik";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deletCotegoriya,
  editCategoriya,
  postCategoriya,
} from "../../../../reduser/Categoriya/categoriya";
import { getDataCategoriya } from "../../../../reduser/counter";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string(),
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

export function CategoryTable() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.dataCategoriya);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getDataCategoriya());
  }, [dispatch]);

  const handleAddClick = () => setOpenAddDialog(true);
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  };
  const handleDeleteClick = (id) => {
    setId(id);
    setOpenDeleteDialog(true);
  };

  const handleAddSubmit = (values) => {
    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Photo", values.photo);

    dispatch(postCategoriya(formData));
    setOpenAddDialog(false);
  };

  const handleEditSubmit = (values) => {
    const formData = new FormData();
    formData.append("Id", selectedCategory.id);
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Photo", values.photo);

    dispatch(editCategoriya(formData));
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    dispatch(deletCotegoriya(id));
    setOpenDeleteDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and paginate categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="my-[5%] pb-[5%] border rounded-md shadow-md shadow-gray-400 px-[5%]">
      <section>
        <div className="flex flex-col gap-[20px] my-[5%]">
          <div className="flex items-center gap-[16px]">
            <div className="bg-[#DB4444] font-mono w-[20px] h-[40px] rounded-[5px]"></div>
            <p className="text-[#DB4444] font-mono text-[20px]">Category</p>
          </div>
          <div className="flex justify-between flex-wrap">
            <p className="text-[35px] font-mono font-bold">All Categories</p>
            <Button variant="contained" onClick={handleAddClick}>
              Add Category
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <TextField
              label="Search Categories"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TableContainer
          component={Paper}
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
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                  Description
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontFamily: "monospace" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                    {category.name}
                  </TableCell>
                  <TableCell sx={{ color: "white", fontFamily: "monospace" }}>
                    {category.description}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "monospace" }}
                    align="right"
                  >
                    <div className="flex justify-between ml-[50%]">
                      <Link to={`/catalog/add/${category.id}`}>
                        <Button>
                          <AddIcon color="success" />
                        </Button>
                      </Link>
                      <Button onClick={() => handleEditClick(category)}>
                        <EditIcon />
                      </Button>
                      <Button>
                        <Link to={`/catalog/categoriya/${category.id}`}>
                          <InfoIcon sx={{ color: "orange" }} />
                        </Link>
                      </Button>
                      <Button onClick={() => handleDeleteClick(category.id)}>
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
          count={filteredCategories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </section>

      {/* Add Category Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        className="m-auto fixed border border-black rounded-xl shadow-gray-400 shadow-md"
      >
        <DialogTitle className="text-blue-500">
          <p className="py-[5%] font-mono">Add New Category</p>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: "", description: "", photo: "" }}
            validationSchema={validationSchema}
            onSubmit={handleAddSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="space-y-3">
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
                  <Button component="label" variant="contained">
                    Upload Photo
                    <input
                      type="file"
                      name="photo"
                      hidden
                      onChange={(event) =>
                        setFieldValue("photo", event.currentTarget.files[0])
                      }
                    />
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

      {/* Edit Category Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        className="fixed m-auto border border-black rounded-xl shadow-gray-400 shadow-md"
      >
        <DialogTitle className="text-blue-500">
          <p className="py-[5%] font-mono">Edit Category</p>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: selectedCategory ? selectedCategory.name : "",
              description: selectedCategory ? selectedCategory.description : "",
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleEditSubmit}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="space-y-3">
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
                  <Button component="label" variant="contained">
                    Upload Photo
                    <input
                      type="file"
                      name="photo"
                      hidden
                      onChange={(event) =>
                        setFieldValue("photo", event.currentTarget.files[0])
                      }
                    />
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

      {/* Delete Category Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        className="fixed border border-black rounded-xl shadow-gray-400 shadow-md"
      >
        <DialogTitle className="text-blue-500">
          <p className="py-[1%] font-mono">Confirm Delete</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
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
