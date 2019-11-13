import React from 'react';
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Accordion,
  Card,
} from 'react-bootstrap';
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
      <Form>
        <Accordion>
          <Card>
            <Card.Header>
              <Form.Row>
                <Form.Group as="principal" controlId="formGridSomething">
                  <Form.Label>Principal</Form.Label>
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
                </Form.Group>

                <Form.Group as="apr" controlId="formGridSomething">
                  <Form.Label>Interest Rate</Form.Label>
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
                </Form.Group>

                <Form.Group as="duration" controlId="formGridSomething">
                  <Form.Label>Duration</Form.Label>
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
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                color="primary"
                className="full-width"
                onClick={this.submitForm}
              >
                Calculate
              </Button>

              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                More options
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form.Row>
                  <Form.Group as="start-on" controlId="formGridSomething">
                    <Form.Label>Start Date</Form.Label>
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
                  </Form.Group>

                  <Form.Group as="extra-payment" controlId="formGridSomething">
                    <Form.Label>Extra $/month</Form.Label>
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
                  </Form.Group>
                </Form.Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Form>
    );
  }
}

export default InputForm;
