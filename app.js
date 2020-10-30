const { checkAndGenerate, createElement, encodepassword } = require('./util');

const initApp = () => {
  // Initializes the app, registers the button click listener
  const newUserButton = document.querySelector('#btnAddUser');
  newUserButton.addEventListener('click', addUser);
};

const addUser = () => {
  //primero eliminamos el usuario
  $.ajax({
    url: "yoururl/deleteunittestuser",
    type: "GET",
    dataType: 'json',
    async: false, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer token");//put your token
    },
    success: function (res) {
      console.log(res);
    }
  });
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM 
  const username = document.querySelector('input#email').value;
  const password = document.querySelector('input#password').value;
  const jwt = "mijwt";
  const fbt = "unittestfbt";
  const accesstoken = "-";
  const name = document.querySelector('input#name').value;
  const surname = document.querySelector('input#surname').value;
  const email = document.querySelector('input#email').value;
  const gender = "m";
  const active = true;
  const country = document.querySelector('input#country').value;
  const created_at = "2020-10-29";
  const deleted_at = 0;
  const last_access = "2020-10-29";
  const provider = "email";
  const receive_mail = true;
  const premium = false;

  let formData = {
    username: username,
    password: encodepassword(password),
    jwt: jwt,
    fbt: fbt,
    accesstoken: accesstoken,
    name: name,
    surname: surname,
    email: email,
    gender: gender,
    active: active,
    country: country,
    created_at: created_at,
    deleted_at: deleted_at,
    last_access: last_access,
    provider: provider,
    receive_mail: receive_mail,
    premium: premium,
  };
  console.log(formData)
  $.ajax({
    url: "yoururl/create", 
    type: "GET",
    data: formData, 
    async: false,
    success: function (response, textStatus, jqXHR) {
      console.log(response);
      $('#t2').toast('show');
      let code = { code: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtb3VuaXR0ZXN0QHlvcG1haWwuY29tIiwiaWF0IjoxNjAzOTY4NDgyLCJleHAiOjE2MDQ0MDA0ODJ9.W_Ap9UQyJ9wfZ-S53LqJ4fi24zUSR5HKwsWSbbtTabE" }
      $.ajax({
        url: "yoururl/confirm",
        type: "POST",
        data: code,
        async: false, 
        success: function (response, textStatus, jqXHR) {
          console.log(response);
          setTimeout(function () { $('#t1').toast('show'); }, 3000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });



  const outputText = checkAndGenerate(email, password, name, surname, country);

  if (!outputText) {
    return;
  }

  const userList = document.querySelector('.user-list');

  const element = createElement('li', outputText, 'user-item');
  userList.appendChild(element);
};

// Start the app!
initApp();
