import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import { object, string } from 'yup';

import { useFormik } from 'formik';


export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Name', width: 130 },
        { field: 'lastName', headerName: 'Description', width: 130 },
        { field: 'outlined', headerName: 'Action', width: 130 }
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    let CategorySchema = object({
        name: string().required(),
        Description: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            Description: ''
        },
        validationSchema: CategorySchema,
        onSubmit: (values , {resetForm}) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <>

            <React.Fragment>
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
                                helperText={errors.Description  && touched.Description ? errors.Description : ''}
                                onChange={handleChange}
                                value={values.Description}
                                error={errors.Description  && touched.Description} 
                                onBlur={handleBlur}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Category</Button>
                        </DialogActions>

                    </form>

                </Dialog>
            </React.Fragment>

            {/* <Paper sx={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />

            </Paper> */}

            {/* <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </Stack> */}


        </>
    );
}