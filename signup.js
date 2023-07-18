const signUpForm = document.getElementById('signUpForm');
const email = document.querySelector('#email');
const fullName = document.querySelector('#fullName');
const password = document.querySelector('#password');

signUpForm.addEventListener('submit', e => {
	e.preventDefault();
	console.log('Form Submitted');
});
