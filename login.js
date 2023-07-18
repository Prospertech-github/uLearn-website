const loginForm = document.getElementById('loginForm');
const email = document.querySelector('#email');
const fullName = document.querySelector('#fullName');
const password = document.querySelector('#password');

loginForm.addEventListener('submit', e => {
	e.preventDefault();
	console.log('Login Form Submitted');
});
