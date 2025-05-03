import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { mixed, number, object, string } from "yup";

import { useFormik } from "formik";
import { Box, FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubCategory,
  updateSubCategory,
  getSubCategores,
  CreateSubCategory,
} from "../../redux/Slice/subCategorySlice";

import Stack from "@mui/material/Stack";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IMG_URL } from "../../Utils/Base";
import axios from "axios";
import { getCategores } from "../../redux/Slice/CategorySlice";

export default function SubCategory() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(getSubCategores());
    dispatch(getCategores());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    setUpdate(false);
  };

  let SubCategorySchema = object({
    Category: string().required(),
    name: string()
      .required()
      .max(30, "only 30 character are allowed")
      .min(2, "character must be 2")
      .matches(/^[a-zA-Z ]*$/, "only character and space allowed"),
    description: string().required(),
    subcat_img: mixed()
      .required("You need to provide a file")
      .test("fileSize", "The file is too large", (value) => {
        if (!value) return false;
        if (typeof value === "string" || typeof value.url ==='string') return true; // Allow pre-existing string URLs
        return value.size <= 2000000;
      })
      .test("type", "Only JPEG and PNG are allowed", (value) => {
        if (!value) return false;
        if (typeof value === "string" || typeof value.url ==='string') return true; 
        return ["image/jpeg", "image/png"].includes(value.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      Category: "",
      name: "",
      description: "",
      subcat_img: "",
    },
    validationSchema: SubCategorySchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(updateSubCategory({_id: values._id, Category: values.Category, name: values.name, description: values.description, subcat_img: values.subcat_img  }));
      } else {
        handleSubCategorySlice(values);
      }

      resetForm();
      handleClose();
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
    resetForm,
    setValues,
  } = formik;

  console.log(values, errors);

  const handleSubCategorySlice = (values) => {
    dispatch(CreateSubCategory(values));
  };

  const subcatselector = useSelector((state) => state.subCategory);

  console.log(subcatselector);

  const categoryData = useSelector((state) => state.Category);

  console.log(categoryData);

  const handleEdit = (data) => {
    console.log(data);

    setValues(data);
    setUpdate(true);
    handleClickOpen();
    dispatch(updateSubCategory(data));
  };

  const handleDelete = (id) => {
    dispatch(deleteSubCategory(id));
  };

  const columns = [
    {
      field: "Category",
      headerName: "Category",
      width: 130,
      valueGetter: (params) => {
        const categoryId = params;
        console.log(params);

        const category = categoryData?.Category?.find(
          (cat) => cat._id === categoryId
        );

        console.log("YESSSS", category);

        return category ? category.name : "";
      },
    },
    { field: "name", headerName: "Name", width: 230 },
    { field: "description", headerName: "Description", width: 350 },
    {
      field: "subcat_img",
      headerName: "Img",
      width: 130,
      renderCell: (params) => (
        <Box
          component="img"
          sx={{
            height: 56,
            width: 56,
          }}
          src={params.value.url}
        />
      ),
    },
    {
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleEdit(params.row);
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                href="#outlined-buttons"
                onClick={() => {
                  handleDelete(params.row._id);
                }}
              >
                Delete
              </Button>
            </Stack>
          </>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  console.log(categoryData.Category);

  return (
    <>
      <h1>SubCategory</h1>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add SubCategory
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>SubCategory</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="Category"
                onChange={(e) => {
                  console.log("Selected Category ID:", e.target.value); // Debugging line
                  handleChange(e); // Call Formik's handleChange
                }}
                value={values.Category || ""} // Ensure default value doesn't break
                error={Boolean(errors.Category && touched.Category)}
                onBlur={handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoryData.Category?.map((v) => {
                  return (
                    <MenuItem key={v._id} value={v._id}>
                      {v.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errors.Category && touched.Category ? errors.Category : ""}
              </FormHelperText>

              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="name"
                fullWidth
                variant="standard"
                value={values.name}
                onChange={handleChange}
                helperText={errors.name && touched.name ? errors.name : ""}
                error={errors.name && touched.name}
                onBlur={handleBlur}
              />

              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="name"
                fullWidth
                variant="standard"
                onChange={handleChange}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
                value={values.description}
                error={errors.description && touched.description}
                onBlur={handleBlur}
              />
              <br></br>
              <br></br>
              <input
                type="file"
                name="subcat_img"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFieldValue("subcat_img", e.target.files[0]);
                  }
                }}
                onBlur={handleBlur}
              />

              <img
                src={
                 typeof values?.subcat_img?.url === 'string'
                    ? values?.subcat_img?.url
                      : typeof  values?.subcat_img === 'object'
                      ? URL.createObjectURL(values.subcat_img)
                    : null
                }
                alt="Preview"
                width="90"
                height="90"
              />

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{update ? "Update" : "Submit"}</Button>
              </DialogActions>
            </DialogContent>
          </form>
        </Dialog>
        <br />
        <br />
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={subcatselector?.SubCategory}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </React.Fragment>
    </>
  );
}
