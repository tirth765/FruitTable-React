import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import { object, string } from 'yup';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import { bgcolor } from '@mui/system';

export default function Contact() {
    const [catData, setcatData] = useState([]);

  let CategorySchema = object({
    name: string().required(),
    email: string().required().email(),
    Description: string().required()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email:'',
      Description: ''
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {
      localDataStore(values);
      resetForm();
    },
  });

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
        
        if(localData) {
          localData.push({...values, id: Math.floor(Math.random() * 100000)})    
          localStorage.setItem("category", JSON.stringify(localData));    
        } else {
          localStorage.setItem("category", JSON.stringify([{...values, id: Math.floor(Math.random() * 100000)}]));
        }
      }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

  return (
    <div>

      {/* Contact Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 className="text-primary">Get in touch</h1>
                  <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe className="rounded w-100" style={{ height: 400 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
              <div className="col-lg-7">



















                <form action className onSubmit={handleSubmit}>
                  <TextField
                    helperText={errors.name && touched.name ? errors.name : ''}
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name && touched.name}
                    onBlur={handleBlur} 
                    type="text" 
                    className="w-100 form-control border-0 py-3 mb-4" 
                    placeholder="Your Name" name="name" 
                    style={{backgroundColor:'white'}} />

                  <TextField 
                    helperText={errors.email && touched.email ? errors.email : ''}
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email && touched.email}
                    onBlur={handleBlur} 
                    name="email" 
                    className="w-100 form-control border-0 py-3 mb-4" 
                    placeholder="Enter Your Email" 
                    style={{backgroundColor:'white'}} />
                    
                    <TextField 
                    helperText={errors.Description && touched.Description ? errors.Description : ''}
                    onChange={handleChange}
                    value={values.Description}
                    error={errors.Description && touched.Description}
                    onBlur={handleBlur} 
                    name="Description" 
                    className="w-100 form-control border-0 py-3 mb-4" 
                    placeholder="Enter Your Description" 
                    style={{backgroundColor:'white'}} />

                  <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                </form>






















              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">123 Street New York.USA</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4" />
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">info@example.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>

  )
}
