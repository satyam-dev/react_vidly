import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}, // keys as data keys, values as error string
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = (e) => {
    //submit
    console.log("Submitted");
    // Call database request
  };
  render() {
    const {
      data: { username, password },
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
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
