import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { array, boolean, date, mixed, number, object, string } from "yup";
import { Box, MenuItem, Paper, Select, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  editCoupon,
  getCoupon,
  setCoupon,
} from "../../redux/Slice/CouponSlice";
import Switch from "@mui/material/Switch";

export default function Coupon() {
  const [open, setOpen] = React.useState(false);
  // const [update, setUpdate] = React.useState(false);

  const dispatch = useDispatch();

  const Couponselecter = useSelector((state) => state.coupon);

  console.log(Couponselecter);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getCoupon());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    // setUpdate(false);
  };

  const CouponSchema = object({
    name: string()
      .required()
      .max(30, "only 30 character are allowed")
      .min(2, "character must be 2")
      .matches(/^[a-zA-Z ]*$/, "only character and space allowed"),

    couponDiscount: number().required().min(1),

    from: date().required(),

    to: date().required(),

    active: boolean().default(false),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      couponDiscount: "",
      from: "",
      to: "",
      active: false,
    },

    validationSchema: CouponSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // if (update) {
      // dispatch(editCoupon(values));
      // } else {
      handleCouponSlice(values);
      // }

      resetForm();
      handleClose();
    },
  });

  const handleCouponSlice = (values) => {
    console.log(values);

    dispatch(setCoupon(values));
  };

  const handleDelete = (id) => {
    dispatch(deleteCoupon(id));
  };

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    resetForm,
    touched,
    setFieldValue,
    setValues,
  } = formik;

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "couponDiscount", headerName: "couponDiscount", width: 130 },
    { field: "from", headerName: "from", width: 130 },
    { field: "to", headerName: "to", width: 130 },

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

  const handleEdit = (data) => {
    console.log(data);

    setValues(data);
    // setUpdate(true);
    handleClickOpen();
  };

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form
        </Button>
        <Dialog open={open} onClose={handleClose}>
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
                helperText={errors.name && touched.name ? errors.name : ""}
                onChange={handleChange}
                value={values.name}
                error={errors.name && touched.name}
                onBlur={handleBlur}
              />

              <TextField
                margin="dense"
                id="couponDiscount"
                name="couponDiscount"
                label="couponDiscount"
                type="couponDiscount"
                fullWidth
                variant="standard"
                helperText={
                  errors.couponDiscount && touched.couponDiscount
                    ? errors.couponDiscount
                    : ""
                }
                onChange={handleChange}
                value={values.couponDiscount}
                error={errors.couponDiscount && touched.couponDiscount}
                onBlur={handleBlur}
              />

              <TextField
                margin="dense"
                id="from"
                name="from"
                // label="from"
                type="date"
                fullWidth
                variant="standard"
                helperText={errors.from && touched.from ? errors.from : ""}
                onChange={handleChange}
                value={values.from}
                error={errors.from && touched.from}
                onBlur={handleBlur}
              />

              <TextField
                margin="dense"
                id="to"
                name="to"
                // label="to"
                type="date"
                fullWidth
                variant="standard"
                helperText={errors.to && touched.to ? errors.to : ""}
                onChange={handleChange}
                value={values.to}
                error={errors.to && touched.to}
                onBlur={handleBlur}
              />

              <Switch {...label} defaultChecked 
              onChange={handleChange}
              onBlur={handleBlur}
              name="active"
              helperText={errors.active && touched.active ? errors.active : ""}

              
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={resetForm} style={{ marginRight: "53%" }}>
                reset Form
              </Button>

              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>

        <br />
        <br />

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={Couponselecter?.coupon}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </React.Fragment>
    </div>
  );
}
