import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { number, object, string } from 'yup';

import { useFormik } from 'formik';
import { FormHelperText } from '@mui/material';


export default function SubCategory() {
  const [open, setOpen] = React.useState(false);
  const [Catdata, setCatData] = React.useState([]);

  const getData = () => {
    const localData = JSON.parse(localStorage.getItem("category"))
    setCatData(localData);
  }

  useEffect(() => {
    getData();
  }, [])

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let SubCategorySchema = object({
    Category: number().required(),
    name: string().required(),
    Description: string().required()
  })


  const formik = useFormik({
    initialValues: {
      Category: '',
      name: '',
      Description: ''
    },
    validationSchema: SubCategorySchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

  console.log(values);
  

  return (
    <>
      <div>SubCategory</div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add SubCategory
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>SubCategory</DialogTitle>
          <form onSubmit={handleSubmit}>

            <DialogContent>

              <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Category"
                name="Category"
                onChange={handleChange}
                value={values.Category ? values.Category : ''}
                error={errors.Category && touched.Category}
                onBlur={handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  Catdata.map((v) => (
                    <MenuItem value={v.id}>{v.name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText>{errors.Category && touched.Category ? errors.Category : ''}</FormHelperText>

              <TextField

                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="name"
                fullWidth
                variant="standard"
                onChange={handleChange}
                helperText={errors.name && touched.name ? errors.name : ''}
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
                onChange={handleChange}
                helperText={errors.Description && touched.Description ? errors.Description : ''}
                value={values.Description}
                error={errors.Description && touched.Description}
                onBlur={handleBlur}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </DialogContent>
          </form>

        </Dialog>
      </React.Fragment>
    </>
  );
}

