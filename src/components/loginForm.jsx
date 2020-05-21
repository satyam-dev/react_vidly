import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}, // keys as account keys, values as error string
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = this.validateProperty(input);
    else delete errors[input.name];
    this.setState({ account, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    // Call database request
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    if (!result.error) return null;
    let errors = {};
    errors = result.error.details
      .map((detail) => {
        return { [detail.path[0]]: detail.message };
      })
      .reduce((a, b) => {
        return { ...a, ...b };
      });
    return Object.keys(errors).length ? errors : null;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
