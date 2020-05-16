import React, { Component } from "react";
import Input from "./common/input";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}, // keys as account keys, values as error string
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    // Call database request
  };
  validate = () => {
    const errors = {};
    const {
      account: { username, password },
    } = this.state;

    if (username.trim() === "") {
      errors.username = "Username is required!";
    }
    if (password.trim() === "") {
      errors.password = "Password is required!";
    }
    return Object.keys(errors).length ? errors : null;
  };
  render() {
    const {
      account: { username, password },
      errors,
    } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} style={{ maxWidth: "400px" }}>
          <div className="form-group">
            <Input
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
              label="Username"
              error={errors.username}
            />
            <Input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              label="Password"
              error={errors.password}
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
