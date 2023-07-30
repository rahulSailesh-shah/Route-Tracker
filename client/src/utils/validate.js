const validate = (input) => {
  let errors = {};

  if (input.name === "") {
    errors.name = "Name is required";
  }

  const isEmailValid = String(input.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (input.email === "") {
    errors.email = "Email is required";
  } else if (input.email && !isEmailValid) {
    errors.email = "Enter a valid email";
  }

  if (input.password === "") {
    errors.password = "Password is required";
  } else if (input.password && input.password.length < 6) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (input.otp === "") {
    errors.otp = "OTP is required";
  } else if (input.otp && (input.otp.length !== 4 || !parseInt(input.otp))) {
    errors.otp = "OTP must be numeric and 4 digits long.";
  }
  return errors;
};

export default validate;
