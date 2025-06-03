// src/components/customers/CustomerTable.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../../store/actions/customerActions';
import { 
  selectAllCustomers, 
  selectCustomerStatus 
} from '../../store/reducers/customerSlice';

const CustomerTable = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectAllCustomers);
  const status = useSelector(selectCustomerStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCustomers());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading customers...</div>;
  if (status === 'failed') return <div>Error loading customers</div>;

  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Total Spent</th>
          <th>Last Purchase</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>₹{customer.totalSpent?.toLocaleString() || '0'}</td>
            <td>{customer.lastPurchaseDate || 'Never'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;