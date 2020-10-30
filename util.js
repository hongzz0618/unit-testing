const CryptoJS = require("crypto-js");
const generateText = (email) => {
  let respuesta = ""
  // vemos si ha creado el usuario o no 
  $.ajax({
    url: `yoururl`,
    type: "GET",
    dataType: 'json',
    async: false,
    success: function (res) {
      respuesta = res
    }
  });
  return `email: ${email} ${respuesta.ok}`;
};

exports.createElement = (type, text, className) => {
  // Creates a new HTML element and returns it
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.textContent = text;
  return newElement;
};

const validateInput = (text, notEmpty, isNumber) => {
  // Validate user input with two pre-defined rules
  if (!text) {
    return false;
  }
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
};

exports.checkAndGenerate = (email, password, name, surname, country) => {
  if (!validateInput(email, false, true)) {
    return false;
  }
  return generateText(email);
};

const encodepassword = (pass) => {
  let hash = CryptoJS.SHA256(pass).toString();
  hash = CryptoJS.MD5(hash).toString();
  hash = CryptoJS.SHA512(hash).toString();
  return hash;
}
exports.encodepassword = encodepassword;
exports.generateText = generateText;
exports.validateInput = validateInput;
