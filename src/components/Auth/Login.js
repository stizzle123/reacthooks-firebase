import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/");
    } catch (error) {
      console.error("Authentication Error", error);
      setFirebaseError(error.message);
    }
  }
  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
            value={values.name}
          />
        )}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="off"
          value={values.email}
          className={errors.email && "error-input"}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="password"
          value={values.password}
          className={errors.password && "error-input"}
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin(prev => !prev)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>

      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
