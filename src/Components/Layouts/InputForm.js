import React from 'react';
import {
  Button,
  Form,
  InputGroup,
  Accordion,
  Row,
  Col,
} from 'react-bootstrap';
import './InputForm.css';

export default class InputForm extends React.Component {
  state = {
    principal: 400000,
    rate: 3.85,
    duration: 15,
    startDate: this.initializeDate(),
    extraPayment: 0,
  };
  initializeDate() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month + 1, 1);
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
        <Form.Group as={Row} controlId="formPrincipalAmount">
          <Form.Label column sm="2">Principal</Form.Label>
          <Col sm="10">
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
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAprPercentage">
          <Form.Label column sm="2">Interest Rate</Form.Label>
          <Col sm="10">
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
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTermYear">
          <Form.Label column sm="2">Term</Form.Label>
          <Col sm="10">
            <InputGroup>
              <Form.Control
                  name="term"
                  placeholder="Term in years"
                  value={this.state.duration}
                  onChange={this.changeHandler}
                  aria-label="Term"
                  aria-describedby="basic-addon1"
              />
              <InputGroup.Text id="basic-addon1">years</InputGroup.Text>
            </InputGroup>
          </Col>
        </Form.Group>

        <Button
          variant="primary"
          color="primary"
          className="full-width"
          onClick={this.submitForm}
        >
          Calculate
        </Button>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header as={Button} variant="link" eventKey="0">
              More options
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Form.Group as="start-on" controlId="formGridSomething">
                  <Form.Label>Start Date</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="startDate"
                      placeholder="Start Date..."
                      value={this.state.startDate.toLocaleDateString()}
                      onChange={this.changeHandler}
                      aria-label="Start date"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group as="extra-payment" controlId="formGridSomething">
                  <Form.Label>Extra $/month</Form.Label>
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
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    );
  }
}
