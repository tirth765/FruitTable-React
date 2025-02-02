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
import { CreateProduct, deleteProduct, getProduct, updateProduct } from "../../redux/Slice/ProductSlice";

import Stack from "@mui/material/Stack";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IMG_URL } from "../../Utils/Base";
import axios from "axios";

export default function SubCategory() {
  const [open, setOpen] = React.useState(false);
  const [Catdata, setCatData] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(getProduct());

    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/get-products"
      );
      console.log("hi", response.data.data);
      // localStorage.setItem("category", JSON.stringify(response.data.data));
      setCatData(response.data.data);
    };

    fetchData(); // Call the async function
  };

  useEffect(() => {
    getData();
    dispatch(getProduct());
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
    Category: number().required(),
    SubCategory: number().required(),

    name: string()
      .required()
      .max(30, "only 30 character are allowed")
      .min(2, "character must be 2")
      .matches(/^[a-zA-Z ]*$/, "only character and space allowed"),
    Description: string().required(),
    Price: number().required(),
    subcat_img: mixed()
      .required("You need to provide a file")
      .test("fileSize", "The file is too large", (value) => {
        if (typeof value === "string") {
          return true;
        } else if (typeof value === "object") {
          return value && value.size <= 2000000;
        }
      })

      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc",
        (value) => {
          if (typeof value === "string") {
            return true;
          } else if (typeof value === "object") {
            return (
              value &&
              (value.type === "image/jpeg" || value.type === "image/png")
            );
          }
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      Category: "",
      SubCategory: "",
      name: "",
      Description: "",
      Price: "",
      subcat_img: "",
    },
    validationSchema: SubCategorySchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(updateProduct(values));
      } else {
        handleSubCategorySlice({
          ...values,
          id: Math.floor(Math.random() * 1000),
        });
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

  console.log(values);

  const handleSubCategorySlice = (values) => {
    dispatch(CreateProduct(values));
  };

  const subcatselector = useSelector((state) => state.subCategory);

  console.log(subcatselector);

  const handleEdit = (data) => {
    console.log(data);

    setValues(data);
    setUpdate(true);
    handleClickOpen();
    dispatch(updateProduct(data));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: "Category",
      headerName: "Category",
      width: 130,
      renderCell: (params) => {
        const dataIdToName = Catdata.find((v) => params.row.Category === v.id);

        // console.log(dataIdToName.name);

        return dataIdToName?.name;
      },
    },
    {
      field: "SubCategory",
      headerName: "SubCategory",
      width: 130,
      renderCell: (params) => {
        const dataIdToName = Catdata.find(
          (v) => params.row.SubCategory === v.id
        );

        // console.log(dataIdToName.name);

        return dataIdToName?.name;
      },
    },

    { field: "name", headerName: "Name", width: 130 },
    { field: "Description", headerName: "Description", width: 130 },
    { field: "Price", headerName: "Price", width: 130 },

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
          src={IMG_URL + params.value}
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
                  handleDelete(params.row.id);
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

  return (
    <>
      <div>Product</div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Product
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Product</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Category"
                name="Category"
                onChange={handleChange}
                value={values.Category ? values.Category : ""}
                error={errors.Category && touched.Category}
                onBlur={handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Catdata?.map((v) => (
                  <MenuItem value={v.id}>{v.name}</MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.Category && touched.Category ? errors.Category : ""}
              </FormHelperText>

              <InputLabel id="demo-simple-select-standard-label">
                SubCategory
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="SubCategory"
                name="SubCategory"
                onChange={handleChange}
                value={values.SubCategory ? values.SubCategory : ""}
                error={errors.SubCategory && touched.SubCategory}
                onBlur={handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Catdata?.map((v) => (
                  <MenuItem value={v.id}>{v.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.SubCategory && touched.SubCategory
                  ? errors.SubCategory
                  : ""}
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
                id="Description"
                name="Description"
                label="Description"
                type="Description"
                fullWidth
                variant="standard"
                onChange={handleChange}
                helperText={
                  errors.Description && touched.Description
                    ? errors.Description
                    : ""
                }
                value={values.Description}
                error={errors.Description && touched.Description}
                onBlur={handleBlur}
              />
              <br></br>
              <br></br>

              <TextField
                margin="dense"
                id="Price"
                name="Price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                helperText={errors.Price && touched.Price ? errors.Price : ""}
                value={values.Price}
                error={errors.Price && touched.Price}
                onBlur={handleBlur}
              />
              <br></br>
              <br></br>

              <input
                type="file"
                name="cat_img"
                onChange={(e) => {
                  setFieldValue("cat_img", e.target.files[0]);
                }}
                onBlur={handleBlur}
              />

              <img
                src={
                  typeof values?.cat_img === "string"
                    ? IMG_URL + values?.cat_img
                    : typeof values?.cat_img === "object"
                    ? URL.createObjectURL(values.cat_img)
                    : null
                }
                width={"90px"}
                height={"90px"}
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
            rows={subcatselector.subCategory}
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
