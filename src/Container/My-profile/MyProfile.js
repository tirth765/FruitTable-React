// name: only character and space allowed, max 30, min 2
// age: positive and greater than zero
// address: maximum 100 word allowed
// bod: must be in past/current
// file: must be less or equal size of 2MB, and png and jpef only allowed
// country: dropdown must be select
// gender: radio button must be selected
// hobby: must be any 2 hobby select


import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { array, date, mixed, number, object, string } from 'yup';
import { MenuItem, Paper, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, setMyProfile } from '../../redux/Slice/MyProfileSlice';

export default function MyProfile() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const MyProfileselecter = useSelector(state => state.MyProfile);
 
  useEffect(() => {
    dispatch(getMyProfile())
  }, [])

  console.log(MyProfileselecter);

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
    select_file: mixed()
      .required("You need to provide a file")
      .test("fileSize", "The file is too large", (value) => {
        return value && value.size <= 2000000;
      })
      .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
        return value && (
          value.type === "image/jpeg" ||
          value.type === "image/png"

        );
      }),
    hobby: array()
      .min(2)
      .required(),
    country: string()
      .required(),
    gender: string()
    .required(),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      address: '',
      bod: '',
      select_file: '',
      country: '',
      gender: '',
      hobby: []
    },
    validationSchema: SubCategorySchema,
    onSubmit: values => {
      console.log(values);
      handleMyProfileSlice({ ...values, id: Math.floor(Math.random() * 1000) });

      },
  });

  const handleMyProfileSlice = (values) => {
    dispatch(setMyProfile(values))
  }

  const { handleChange, handleBlur, values, errors, touched, setFieldValue } = formik;

  const columns = [
  
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'age', headerName: 'age', width: 130 },
    { field: 'address', headerName: 'address', width: 230 },
    { field: 'bod', headerName: 'bod', width: 130 },
    { field: 'country', headerName: 'country', width: 130 },
    { field: 'gender', headerName: 'gender', width: 130 },
    { field: 'hobby', headerName: 'hobby', width: 230 },
  
  ];

  const paginationModel = { page: 0, pageSize: 5 };


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

              <br></br><br></br>

              <input type='file'
                name='select_file'
                onChange={(e) => { setFieldValue('select_file', e.target.files[0]) }}
                onBlur={handleBlur}
              />
              <br></br>

              <div style={{ color: 'red', fontSize: '13px' }} >
                {errors.select_file && touched.select_file ? errors.select_file : ''}
              </div>
              <br></br>

             <h6>Select Your Country</h6>
              <Select
                variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"

                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={'in'} >india</MenuItem>
                <MenuItem value={'us'} >US</MenuItem>
                <MenuItem value={'uk'} >UK</MenuItem>

              </Select>
              <br></br>
              <div style={{ color: 'red', fontSize: '13px' }} >
                {errors.country && touched.country ? errors.country : ''}
              </div>

              <br></br><br></br>
              <h6>Select Your gender</h6>
              <input type='radio' name='gender' onChange={handleChange}
                onBlur={handleBlur} value="male" /> <span>Male</span>
  <br></br>
                <input type='radio' name='gender' onChange={handleChange}
                onBlur={handleBlur} value="female" /> <span>Female</span>

              <div style={{ color: 'red', fontSize: '13px' }} >
                {errors.gender && touched.gender ? errors.gender : ''}
              </div>
              <br></br><br></br>


              <h6>Select Your Hobby</h6>
              <input type='checkbox' value={'Music'} name='hobby' onChange={handleChange}
                onBlur={handleBlur}
              />
              <span> Music </span>
              <br></br>
              <input type='checkbox' value={'Reading'} name='hobby' onChange={handleChange}
                onBlur={handleBlur}
              />
              <span> Reading</span><br></br>
              <input type='checkbox' value={'Sports'} name='hobby' onChange={handleChange}
                onBlur={handleBlur}
              />
              <span> Sports</span><br></br>
              <input type='checkbox' value={'Traveling'} name='hobby' onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>  Traveling</span><br></br>


              <div style={{ color: 'red', fontSize: '13px' }} >

                {errors.hobby && touched.hobby ? errors.hobby : ''}

              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>

        <br />
        <br />
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={MyProfile.subCategory}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>


      </React.Fragment>
    </div>


  )
}
