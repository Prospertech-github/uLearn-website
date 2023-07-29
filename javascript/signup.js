const signUpForm = document.getElementById('signUpForm');
const email = document.querySelector('#email');
const fullName = document.querySelector('#name');
const password = document.querySelector('#password');

signUpForm.addEventListener('submit', e => {
	e.preventDefault();

	if (email.value.includes('@') && password.value.length >= 8) {

		fetch('http://localhost/ulearn/register.php', {
			method: 'POST',
			body: JSON.stringify({
				name: fullName.value,
				email: email.value,
				password: password.value,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(response => {
				if ((response.status = 200)) {
					alert(
						'Welcome!! You have successfully signed up to ULEARN'
					);
					window.location.href = 'login.html'
				}
			})
			.catch(error => console.error(error.message));
	}
});
