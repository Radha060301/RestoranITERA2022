import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import axios from "axios";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
      />
    );
  };
  
  return Wrapper;
};

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      status: ''
    };
  }

  async Auth(e){
    e.preventDefault();
    const { navigate } = this.props;
    try {
      await axios.post("http://localhost:8000/users/login", {
        email: this.state.email,
	      password: this.state.password
      }).then((res) => {
        window.sessionStorage.setItem("token", res.data.token);
        navigate("/admin");
      });
    } catch (error) {
      if (error.response) {
        this.setState({
          status: error.response.data.status
        });
      }
    }
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("token")) {
      window.location.replace("/admin");
    }
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right,  #254EDB, #3366FF, #6690FF )",
        }}
      >
        <Form
          className="bg-light p-5 rounded-2 shadow-sm"
          style={{ width: "450px", height: "auto" }}
          onSubmit={(e) => this.Auth(e)}
        >
          <h4 className="text-center pb-5">Admin login</h4>
          <h6 className="text-center">{this.state.status}</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" placeholder="E-mail" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
          </Form.Group>

          <Form.Group className="text-center mt-5">
            <Button
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
