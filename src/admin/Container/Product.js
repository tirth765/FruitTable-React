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
import { getSubCategores } from "../../redux/Slice/subCategorySlice";

import Stack from "@mui/material/Stack";
import {
  deleteProduct,
  updateProduct,
  getProduct,
  CreateProduct,
  getSubcat,
} from "../../redux/Slice/ProductSlice";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { getCategores } from "../../redux/Slice/CategorySlice";

export default function SubCategory() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(getProduct());
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

  let ProductSchema = object({
    Category: string().required(),
    SubCategory: string().required(),
    name: string()
      .required()
      .max(30, "only 30 character are allowed")
      .min(2, "character must be 2")
      .matches(/^[a-zA-Z ]*$/, "only character and space allowed"),
    description: string().required(),
    price: number().required().min(10, "Price must be 10"),
    product_img: mixed()
      .required("You need to provide a file")
      .test("fileSize", "The file is too large", (value) => {
        if (typeof value === "string" || typeof value.url === "string") {
          return true;
        } else if (typeof value === "object") {
          return value && value.size <= 2000000;
        }
      })
      // .test(
      //   "type",
      //   "Only the following formats are accepted: .jpeg, .jpg, .png",
      //   (value) => {
      //     if (typeof value === "string" || typeof value.url === "string") {
      //       return true;
      //     } else if (typeof value === "object") {
      //       return  value && (
      //         value.type === "image/jpeg" || value.type === "image/png" || value.type === "image/jpg" 
      //       );
      //     }
      //   }
      // ),
  });

  const formik = useFormik({
    initialValues: {
      Category: "",
      SubCategory: "",
      name: "",
      description: "",
      price: "",
      product_img: "",
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(updateProduct({_id: values._id, Category: values.Category, SubCategory: values.SubCategory, name: values.name, description: values.description, price: values.price, product_img: values.product_img  }));
      } else {
        handleProductSlice(values);
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

  const handleProductSlice = (values) => {
    dispatch(CreateProduct(values));
  };

  const productselector = useSelector((state) => state.Product);

  // console.log("productselector",productselector);

  const categoryData = useSelector((state) => state.Category);

  // console.log("categoryData", categoryData);

  const subcategoryselector = useSelector((state) => state.subCategory);

  console.log(subcategoryselector);

  const handleSubCategory = (cat_id) => {
    console.log("subcategoryselector", cat_id);

    dispatch(getSubcat(cat_id));
  };

  const handleEdit = (data) => {
    console.log(data);
    handleSubCategory(data.Category);
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
      width: 150,
      valueGetter: (params) => {
        const categoryId = params;

        const category = categoryData?.Category?.find(
          (cat) => cat._id === categoryId
        );

        return category ? category.name : "";
      },
    },
    {
      field: "SubCategory",
      headerName: "SubCategory",
      width: 180,
      valueGetter: (params) => {
        const SubcategoryId = params;

        const subcategory = subcategoryselector?.SubCategory.find(
          (c) => c._id === SubcategoryId
        );

        // console.log("Nooooooo", subcategory);

        return subcategory ? subcategory.name : "";
      },
    },
    { field: "name", headerName: "Name", width: 190 },
    { field: "description", headerName: "Description", width: 330 },
    { field: "price", headerName: "Price", width: 150 },

    {
      field: "product_img",
      headerName: "Img",
      width: 130,
      renderCell: (params) => (
        <Box
          component="img"
          sx={{
            height: 53,
            width: 53,
          }}
          src={params?.value?.url}
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

  const paginationModel = { page: 0, pageSize: 12 };

  return (
    <>
      <h1>Product</h1>
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
                name="Category"
                onChange={(e) => {
                  console.log("Selected Category ID:", e);
                  handleChange(e);
                  handleSubCategory(e.target.value);
                }}
                value={values.Category || ""}
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

              <InputLabel id="demo-simple-select-standard-label">
                SubCategory
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="SubCategory"
                onChange={(e) => {
                  console.log("Selected SubCategory ID:", e.target.value); // Debugging line
                  handleChange(e); // Call Formik's handleChange
                }}
                value={values.SubCategory || ""} // Ensure default value doesn't break
                error={Boolean(errors.SubCategory && touched.SubCategory)}
                onBlur={handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {productselector.subcat?.map((v) => {
                  return (
                    <MenuItem key={v._id} value={v._id}>
                      {v.name}
                    </MenuItem>
                  );
                })}
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

              <TextField
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                value={values.price}
                onChange={handleChange}
                helperText={errors.price && touched.price ? errors.price : ""}
                error={errors.price && touched.price}
                onBlur={handleBlur}
              />

              <br></br>
              <br></br>

              <input
                type="file"
                name="product_img"
                onChange={(e) => {
                  setFieldValue("product_img", e.target.files[0]);
                }}
                onBlur={handleBlur}
              />

              <img
                src={
                  typeof values?.product_img.url === "string"
                    ? values?.product_img.url
                    : typeof values?.product_img === "object"
                      ? URL.createObjectURL(values.product_img)
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
        <Paper sx={{ height: 733, width: "100%" }}>
          <DataGrid
            rows={productselector?.Product}
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
