// Name and Password from the register-form
var name = document.getElementById('uName');
var pw = document.getElementById('uPw');

// storing input from register-form
function store() {
    localStorage.setItem('name', uName.value);
    localStorage.setItem('pw', uPw.value);

}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var usrName = document.getElementById('userName').value;
    var usrPw = document.getElementById('userPw').value;

    // check if stored data from register-form is equal to data from login form
    if (userName.value == storedName && userPw.value == storedPw) {
        alert('You are logged in ' + usrName);
        location.replace("./index.html")

    } else {
        alert('Access denied. Valid username and password is required.');
    }

}



