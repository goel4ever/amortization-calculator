import React from 'react';
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import './InputForm.css';

export default class InputForm extends React.Component {
  state = {
    principal: 400000,
    rate: 3.85,
    durationYears: 15,
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
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="principal">
          <Form.Label>Principal*</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <Form.Control
              name="principal"
              placeholder="Principal Amount"
              value={this.state.principal}
              onChange={this.changeHandler}
              aria-label="Principal Amount"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="interest">
          <Form.Label>Interest*</Form.Label>
          <InputGroup>
            <Form.Control
              name="rate"
              placeholder="Annual Interest Rate"
              value={this.state.rate}
              onChange={this.changeHandler}
              aria-label="Interest Rate"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="term">
          <Form.Label>Term*</Form.Label>
          <InputGroup>
            <Form.Control
              name="term"
              placeholder="Term in years"
              value={this.state.durationYears}
              onChange={this.changeHandler}
              aria-label="Term"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">years</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <InputGroup>
            <Form.Control
              name="startDate"
              type="date"
              placeholder="Start Date..."
              value={this.state.startDate}
              onChange={this.changeHandler}
              aria-label="Start date"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="extraPayment">
          <Form.Label>Extra Payment</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
            <Form.Control
              placeholder="Extra payment per month"
              name="extraPayment"
              value={this.state.extraPayment}
              onChange={this.changeHandler}
              aria-label="Extra payment"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formSubmit">
          <Col sm="12">
            <Button
              variant="primary"
              color="primary"
              className="full-width justify-content-center"
              onClick={this.submitForm}>
              Calculate
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
