import React from 'react';
import Button from '@material-ui/core/Button';
import './InputForm.css';

export default props => (
  <div className="input-form">
    <form action="#">
      <label name="principal">Principal</label>
      <input type="text" placeholder="Principal Amount" />
      <label name="apr">Interest Rate</label>
      <input type="text" placeholder="Rate of interest" />
      <label name="duration">Duration</label>
      <input type="text" placeholder="Duration in years" />
      <label name="start-on">Start Date</label>
      <input type="text" placeholder="Start Date..." />
      <label name="extra-payment">Extra $/month</label>
      <input type="text" placeholder="0" />
      <Button
        variant="contained"
        color="primary"
        className="full-width"
        onClick={props.onSubmit}
      >
        Calculate
      </Button>
    </form>
  </div>
);
