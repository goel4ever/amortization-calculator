import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
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
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="principal"
            placeholder="Principal Amount"
            value={this.state.principal}
            onChange={this.changeHandler}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <label name="apr">Interest Rate</label>
        <InputGroup>
          <FormControl
            name="rate"
            placeholder="Annual Interest Rate"
            value={this.state.rate}
            onChange={this.changeHandler}
            aria-label="Interest Rate"
            aria-describedby="basic-addon1"
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <label name="duration">Duration</label>
        <InputGroup>
          <FormControl
            name="duration"
            placeholder="Duration in years"
            value={this.state.duration}
            onChange={this.changeHandler}
            aria-label="Duration"
            aria-describedby="basic-addon1"
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon1">years</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <label name="start-on">Start Date</label>
        <InputGroup>
          <FormControl
            name="startDate"
            placeholder="Start Date..."
            value={this.state.startDate}
            onChange={this.changeHandler}
            aria-label="Start date"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <label name="extra-payment">Extra $/month</label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Extra payment per month"
            name="extraPayment"
            value={this.state.extraPayment}
            onChange={this.changeHandler}
            aria-label="Extra payment"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button
          variant="primary"
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
