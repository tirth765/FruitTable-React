// name: only character and space allowed, max 30, min 2
// age: positive and greater than zero
// address: maximum 100 word allowed
// bod: must be in past/current
// file: must be less or equal size of 2MB, and png and jpef only allowed
// country: dropdown must be select
// gender: radio button must be selected
// hobby: must be any 2 hobby select


import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';

export default function MyProfile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SubCategorySchema = object({
    name: string()
      .required()
      .max(30, "only 30 character are allowed")
      .min(2, "character must be 2")
      .matches(/^[a-zA-Z ]*$/, "only character and space allowed"),

    age: number().required().min(1),

    address: string()
      .required()
      .test('address', "maximum 100 words", (value) => {

        let str = value.trim().split(" ").length;
        console.log(value, str);

        if (str > 100) {
          return false
        } else {
          return true
        }

      }),
      
    bod: date()
      .required()
      .max(new Date, "must be in past/current"),
    

  })

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      address: '',
      bod: '',

    },
    validationSchema: SubCategorySchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleChange, handleBlur, values, errors, touched } = formik;

  return (

    <div style={{ marginTop: '15%' }}>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <form onSubmit={formik.handleSubmit}>

            <DialogTitle>Form</DialogTitle>
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
                id="age"
                name="age"
                label="age"
                type="age"
                fullWidth
                variant="standard"
                helperText={errors.age && touched.age ? errors.age : ''}
                onChange={handleChange}
                value={values.age}
                error={errors.age && touched.age}
                onBlur={handleBlur}
              />
              <TextField
                margin="dense"
                id="address"
                name="address"
                label="address"
                type="address"
                fullWidth
                variant="standard"
                helperText={errors.address && touched.address ? errors.address : ''}
                onChange={handleChange}
                value={values.address}
                error={errors.address && touched.address}
                onBlur={handleBlur}
              />
              <TextField
                margin="dense"
                id="bod"
                name="bod"
                // label="bod"
                type="date"
                fullWidth
                variant="standard"
                helperText={errors.bod && touched.bod ? errors.bod : ''}
                onChange={handleChange}
                value={values.bod}
                error={errors.bod && touched.bod}
                onBlur={handleBlur}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>


      </React.Fragment>
    </div>


  )
}
