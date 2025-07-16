const emailValidatorRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordValidatorRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const bdMobileRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
const usCaMobileRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
const ukMobileRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

const mobileValidator = (mobile) => {
  const normalized = mobile.toString().trim();
  return (
    bdMobileRegex.test(normalized) ||
    usCaMobileRegex.test(normalized) ||
    ukMobileRegex.test(normalized)
  );
};
const emailValidator = (email) => {
  return emailValidatorRegex.test(email);
};

const passwordValidator = (password) => {
  return passwordValidatorRegex.test(password);
};

export { emailValidator, passwordValidator, mobileValidator };