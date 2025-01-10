import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { object, string } from 'yup';

import { useFormik } from 'formik';

import { useSelector } from 'react-redux';



export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [catData, setcatData] = useState([]);
  const [Update, setUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    setUpdate(false);
  };

  const handleDelete = (id) => {

    const localData = JSON.parse(localStorage.getItem("category"));

    console.log(localData, id);


    // --------------------- Method:- 1 ( findIndex ) --------------------

    //   const index = localData.findIndex((v) => v.id === id)

    //   console.log(index);

    //  let data = localData.splice(index,1)

    //   console.log(data);

    //---------------------------------------------------------------------

    // --------------------- Method:- 2 ( filter ) ------------------------

    let fdata = localData.filter((v) => v.id !== id)

    console.log(fdata);

    //---------------------------------------------------------------------


    localStorage.setItem("category", JSON.stringify(fdata))

    setcatData(fdata);

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
    { field: 'Description', headerName: 'Description', width: 130 },
    {
      headerName: 'Action', width: 130,
      renderCell: (params) => {
        return (
          <>

            <IconButton aria-label="edit" onClick={() => { handleEdit(params.row) }}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="delete" onClick={() => { handleDelete(params.row.id) }}>
              <DeleteIcon />
            </IconButton>

          </>
        )

      }
    }
  ];

  const getData = () => {

    let localDataes = JSON.parse(localStorage.getItem("category"));

    setcatData(localDataes);
  }

  useEffect(() => {

    getData();

  }, []);

  const localDataStore = (values) => {

    let localData = JSON.parse(localStorage.getItem("category"));

    console.log(values, localData);

    if (localData) {
      localData.push({ ...values, id: Math.floor(Math.random() * 100000) })
      localStorage.setItem("category", JSON.stringify(localData));
      setcatData(localData)
    } else {
      localStorage.setItem("category", JSON.stringify([{ ...values, id: Math.floor(Math.random() * 100000) }]));
      setcatData([{ ...values, id: Math.floor(Math.random() * 100000) }])
    }
  }

  let CategorySchema = object({
    name: string().required(),
    Description: string().required()
  });

  const updateData = (data) => {
    let localData = JSON.parse(localStorage.getItem("category"))

    console.log(localData, data);

    const index = localData.findIndex((v) => v.id == data.id)

    localData[index] = data

    console.log(localData);

    localStorage.setItem("category", JSON.stringify(localData))

    setcatData(localData)



  }

  const formik = useFormik({
    initialValues: {
      name: '',
      Description: ''
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {

      if (Update) {
        updateData(values);
      } else {
        localDataStore(values);
      }

      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm, setValues } = formik;

  const paginationModel = { page: 0, pageSize: 5 };
  
  const c = useSelector ((state => state.count))
  console.log(c);

  return (
    <>

      <React.Fragment>
      <h1>Category <span>{c.count}</span> </h1>
        <Button variant="outlined" onClick={handleClickOpen} style={{ marginLeft: '89%' }}>
          Add Category
        </Button>

        <Dialog open={open} onClose={handleClose}>

          <form onSubmit={handleSubmit}>
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
                id="Description"
                name="Description"
                label="Description"
                type="Description"
                fullWidth
                variant="standard"
                helperText={errors.Description && touched.Description ? errors.Description : ''}
                onChange={handleChange}
                value={values.Description}
                error={errors.Description && touched.Description}
                onBlur={handleBlur}
              />

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
          rows={catData}
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