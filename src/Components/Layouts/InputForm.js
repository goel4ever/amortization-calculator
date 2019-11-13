import React from 'react';
import Button from '@material-ui/core/Button';

export default props => (
  <div>
    <h1>Input Form</h1>
    <form action="#">
      Loan Amount:
      <input type="text" placeholder="Principal Amount" />
      Annual Interest Rate:
      <input type="text" placeholder="Rate of interest" />
      Loan Duration:
      <input type="text" placeholder="Duration in years" />
      First Payment Due Date:
      <input type="text" placeholder="Start Date..." />
      Extra payment per month:
      <input type="text" placeholder="0" />
      <Button variant="contained" color="primary">
        Calculate
      </Button>
    </form>
  </div>
);
