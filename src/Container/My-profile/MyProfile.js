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
import { Box, MenuItem, Paper, Select, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyProfile, getMyProfile, setMyProfile } from '../../redux/Slice/MyProfileSlice';

export default function MyProfile() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  const dispatch = useDispatch();

  const MyProfileselecter = useSelector((state => state.myProfile));

  useEffect(() => {
    dispatch(getMyProfile())
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm()
    setUpdate(false)
  };

  const MyProfileSchema = object({
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
        // console.log(value, str);

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
    validationSchema: MyProfileSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      handleMyProfileSlice({ ...values, select_file: values.select_file });

      resetForm()
      handleClose()
    },
  });

  const handleMyProfileSlice = (values) => {
    console.log(values);

    dispatch(setMyProfile(values))
  }

  const handleDelete = (id) => {
    dispatch(deleteMyProfile(id));
  }

  const { handleChange, handleBlur, values, errors, resetForm, touched, setFieldValue, setValues } = formik;

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'age', width: 130 },
    { field: 'address', headerName: 'address', width: 130 },
    { field: 'bod', headerName: 'bod', width: 130 },
    {
      field: 'select_file', headerName: 'Img', width: 130,
      renderCell: (params) => <Box component="img"
        sx={{
          height: 56,
          width: 56,
        }}
        src={"img/" + params.value}
      />,
    },
    { field: 'country', headerName: 'country', width: 130 },
    { field: 'gender', headerName: 'gender', width: 130 },
    { field: 'hobby', headerName: 'hobby', width: 130 },
    {
      headerName: 'Action', width: 180,
      renderCell: (params) => {
        return (
          <>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => { handleEdit(params.row) }}>Edit</Button>
              <Button variant="outlined" href="#outlined-buttons" onClick={() => { handleDelete(params.row.id) }}>
                Delete
              </Button>
            </Stack>

          </>
        )

      }
    }

  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleEdit = (data) => {
    console.log(data);

    setValues(data)
    setUpdate(true)
    handleClickOpen();
  }

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

              {/* <select variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={values.country}
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}>
                <option value='India' >India</option>
                <option value='US' >US</option>
                <option value='UK' >UK</option>
              </select> */}

              <Select
               variant="standard"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={values.country}
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={'India'} >India</MenuItem>
                <MenuItem value={'US'} >US</MenuItem>
                <MenuItem value={'UK'} >UK</MenuItem>

              </Select>
              <br></br>
              <div style={{ color: 'red', fontSize: '13px' }} >
                {errors.country && touched.country ? errors.country : ''}
              </div>

              <br></br><br></br>
              <h6>Select Your gender</h6>
              <input type='radio' name='gender' onChange={handleChange}
                onBlur={handleBlur} value="male" checked={values.gender === 'male' ? true : false}/> <span>Male</span>
              <br></br>
              <input type='radio' name='gender' onChange={handleChange}
                onBlur={handleBlur} value="female" checked={values.gender === 'female' ? true : false}/> <span>Female</span>

              <div style={{ color: 'red', fontSize: '13px' }} >
                {errors.gender && touched.gender ? errors.gender : ''}
              </div>
              <br></br><br></br>


              <h6>Select Your Hobby</h6>
              <input type='checkbox' value={'Music'} name='hobby' onChange={handleChange}
                onBlur={handleBlur} checked={values.hobby.includes("Music") }
              />
              <span> Music </span>
              <br></br>
              <input type='checkbox' value={'Reading'} name='hobby' onChange={handleChange}
                onBlur={handleBlur}checked={values.hobby.includes("Reading") }
              />
              <span> Reading</span><br></br>
              <input type='checkbox' value={'Sports'} name='hobby' onChange={handleChange}
                onBlur={handleBlur} checked={values.hobby.includes("Sports") }
              />
              <span> Sports</span><br></br>
              <input type='checkbox' value={'Traveling'} name='hobby' onChange={handleChange}
                onBlur={handleBlur} checked={values.hobby.includes("Traveling") }
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
            rows={MyProfileselecter?.myProfile}
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
