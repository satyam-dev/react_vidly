import React from "react";
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
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} style={{ maxWidth: "400px" }}>
          <div className="form-group">
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
          </div>
          {this.renderSubmit("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
