import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { object, string, mixed } from 'yup';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import {  CreateCategory, deleteCategory, getCategores, updateCategory } from '../../redux/Slice/CategorySlice';
import { IMG_URL } from '../../Utils/Base';

export default function Category() {
  const [open, setOpen] = React.useState(false);
  const [catData, setcatData] = useState([]);
  const [Update, setUpdate] = useState(false);

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    setUpdate(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
    // const localData = JSON.parse(localStorage.getItem("category"));

    // console.log(localData, id);


    // // --------------------- Method:- 1 ( findIndex ) --------------------

    // //   const index = localData.findIndex((v) => v.id === id)

    // //   console.log(index);

    // //  let data = localData.splice(index,1)

    // //   console.log(data);

    // //---------------------------------------------------------------------

    // // --------------------- Method:- 2 ( filter ) ------------------------

    // let fdata = localData.filter((v) => v.id !== id)

    // console.log(fdata);

    // //---------------------------------------------------------------------


    // localStorage.setItem("category", JSON.stringify(fdata))

    // setcatData(fdata);

  }

  const handleEdit = (data) => {
      
    console.log(data);

    setValues(data);
    handleClickOpen();
    setUpdate(true)

  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'description', width: 330 },
    {
      field: 'cat_img', headerName: 'Img', width: 130,
      renderCell: (params) => <Box component="img"
        sx={{
          height: 56,
          width: 56,
        }}
        src={params?.value?.url}
      />,
    },
    {
      headerName: 'Action', width: 130,
      renderCell: (params) => {
        return (
          <>

            <IconButton aria-label="edit" onClick={() => { handleEdit(params.row  ) }}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="delete" onClick={() => { handleDelete(params.row._id) }}>
              <DeleteIcon />
            </IconButton>

          </>
        )

      }
    }
  ];

  const getData = () => {
    dispatch(getCategores())
  }

  useEffect(() => {

    getData();

  }, []);

  const localDataStore = (values) => {
    console.log(values);

    dispatch(CreateCategory(values))
  }

  let CategorySchema = object({
    name: string()
      .required()
      .max(30, "only 30 character are allowed")
      .min(2, "character must be 2")
      .matches(/^[a-zA-Z ]*$/, "only character and space allowed"),
    description: string().required(),
    cat_img: mixed()
      .required("You need to provide a file")
      .test("fileSize", "The file is too large", (value) => {
        if (typeof value === 'string' || typeof value.url === "string") {
          return true;
        } else if (typeof value === 'object') {
          return value && value.size <= 2000000;
        }
      })

      .test("type", "Only JPEG, PNG, JPG are allowed", (value) => {
        if (typeof value === 'string' || typeof value.url === "string") {
          return true;
        } else if (typeof value === 'object') {
          return value && (
            value.type === "image/jpeg" ||
            value.type === "image/jpg" ||
            value.type === "image/png"
          );
        }

      }),
  });

  const updateData = (data) => {
    dispatch(updateCategory(data))
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      cat_img: ''
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {

      console.log("values",values.category , values.description, values.cat_img);
      
      if (Update) {
        updateData({_id: values._id, name: values.name, description: values.description, cat_img: values.cat_img  });
      } else {
        localDataStore(values);
      }

      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched, resetForm, setValues } = formik;

  const paginationModel = { page: 0, pageSize: 5 };

  const c = useSelector((state => state.count))
  const Category = useSelector((state => state.Category))
  // console.log(c);

  return (
    <>

      <React.Fragment>
        <h1>Category <span>{c.count}</span> </h1>
        <Button variant="outlined" onClick={handleClickOpen} style={{ marginLeft: '89%' }}>
          Add Category
        </Button>

        <Dialog open={open} onClose={handleClose}>

          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <DialogTitle>Category</DialogTitle>
            <DialogContent>

              <TextField
                margin="dense"
                id="name"
                name="name"
                label="name"
                type="name"
                fullWidth
                variant="standard"
                helperText={errors.name && touched.name ? errors.name : ''}
                onChange={handleChange}
                value={values.name}
                error={errors.name && touched.name}
                onBlur={handleBlur}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="description"
                type="description"
                fullWidth
                variant="standard"
                helperText={errors.description && touched.description ? errors.description : ''}
                onChange={handleChange}
                value={values.description}
                error={errors.description && touched.description}
                onBlur={handleBlur}
              />

              <br></br><br></br>

              <input type='file'
                name='cat_img'
                onChange={(e) => { setFieldValue('cat_img', e.target.files[0]) }}
                onBlur={handleBlur}
              />

              <img src={typeof values?.cat_img?.url === 'string' ? values?.cat_img?.url : typeof values?.cat_img === 'object' ? URL.createObjectURL(values.cat_img): null } width={"90px"} height={"90px"} />

             
                {errors.cat_img && touched.cat_img ? <span style={{color: "red"}}> {errors.cat_img} </span>  : ""}

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{Update ? 'Update' : 'Submit'}</Button>
            </DialogActions>

          </form>

        </Dialog>
      </React.Fragment>

      <Paper sx={{ height: 400, width: '100%' }}>

        <DataGrid
          rows={Category?.Category}
          getRowId={(row) => row._id}

          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />

      </Paper>


    </>
  );
}