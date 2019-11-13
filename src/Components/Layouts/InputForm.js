import React from 'react';
import Button from '@material-ui/core/Button';
import './InputForm.css';

class InputForm extends React.Component {
  state = {
    principal: 400000,
    rate: 3.85,
    duration: 30,
    startDate: this.initializeDate(),
    extraPayment: 0,
  };
  initializeDate() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month + 1, 1).toLocaleDateString();
  }
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (value) {
      this.setState({
        [name]: value,
      });
    }
  };
  submitForm = () => {
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <form action="#" className="input-form">
        <label name="principal">Principal</label>
        <div className="input-group">
          <div className="input-group-icon">$</div>
          <input
            className="input-group-area"
            type="text"
            name="principal"
            placeholder="Principal Amount"
            value={this.state.principal}
            onChange={this.changeHandler}
          />
        </div>
        <label name="apr">Interest Rate</label>
        <div className="input-group">
          <input
            className="input-group-area"
            type="text"
            name="rate"
            placeholder="Annual Interest Rate"
            value={this.state.rate}
            onChange={this.changeHandler}
          />
          <div className="input-group-icon">%</div>
        </div>
        <label name="duration">Duration</label>
        <div className="input-group">
          <input
            className="input-group-area"
            type="text"
            name="duration"
            placeholder="Duration in years"
            value={this.state.duration}
            onChange={this.changeHandler}
          />
          <div className="input-group-icon">years</div>
        </div>
        <label name="start-on">Start Date</label>
        <input
          type="text"
          name="startDate"
          placeholder="Start Date..."
          value={this.state.startDate}
          onChange={this.changeHandler}
        />
        <label name="extra-payment">Extra $/month</label>
        <input
          type="text"
          placeholder="Extra payment per month"
          name="extraPayment"
          value={this.state.extraPayment}
          onChange={this.changeHandler}
        />
        <Button
          variant="contained"
          color="primary"
          className="full-width"
          onClick={this.submitForm}
        >
          Calculate
        </Button>
      </form>
    );
  }
}

export default InputForm;
