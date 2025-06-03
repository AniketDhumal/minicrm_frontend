import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, updateCustomer, getCustomerById } from '../../../services/api';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Phone is required'),
  address: Yup.string(),
  totalSpent: Yup.number().min(0, 'Must be positive'),
  lastPurchaseDate: Yup.date()
});

const CustomerForm = ({ mode = 'create' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    totalSpent: 0,
    lastPurchaseDate: null
  });

  // Fetch customer data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchCustomer = async () => {
        setIsLoading(true);
        try {
          const customer = await getCustomerById(id);
          setInitialValues({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address || '',
            totalSpent: customer.totalSpent || 0,
            lastPurchaseDate: customer.lastPurchaseDate || null
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCustomer();
    }
  }, [id, mode]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        if (mode === 'edit' && id) {
          await updateCustomer(id, values);
        } else {
          await createCustomer(values);
        }
        navigate('/customers');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  if (isLoading && mode === 'edit') {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {mode === 'edit' ? 'Edit Customer' : 'Create New Customer'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="totalSpent"
            name="totalSpent"
            label="Total Spent"
            type="number"
            value={formik.values.totalSpent}
            onChange={formik.handleChange}
            error={formik.touched.totalSpent && Boolean(formik.errors.totalSpent)}
            helperText={formik.touched.totalSpent && formik.errors.totalSpent}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="lastPurchaseDate"
            name="lastPurchaseDate"
            label="Last Purchase Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.lastPurchaseDate || ''}
            onChange={formik.handleChange}
            error={formik.touched.lastPurchaseDate && Boolean(formik.errors.lastPurchaseDate)}
            helperText={formik.touched.lastPurchaseDate && formik.errors.lastPurchaseDate}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/customers')}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !formik.dirty}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : mode === 'edit' ? 'Update Customer' : 'Create Customer'}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;