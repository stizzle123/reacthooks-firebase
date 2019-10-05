import React from "react";

function useFormValidation(initstate, validate, authenticate) {
  const [values, setValues] = React.useState(initstate);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [isSubmitting, errors, authenticate]);

  function handleChange(e) {
    e.persist();
    setValues(previousvalues => ({
      ...previousvalues,
      [e.target.name]: e.target.value
    }));
  }

  function handleBlur(e) {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }

  return {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    isSubmitting
  };
}

export default useFormValidation;
