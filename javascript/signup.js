const signUpForm = document.getElementById('signUpForm');
const email = document.querySelector('#email');
const fullName = document.querySelector('#name');
const password = document.querySelector('#password');

const object = {
	name: 'Hello'
}
const JSONobj = {
	'name': 'Hello'
}

signUpForm.addEventListener('submit', e => {
	e.preventDefault();

	if (
		fullName.value.length >= 3 &&
		email.value.includes('@') &&
		password.value.length >= 8
	) {
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
						'Welcome!! You have successfully signed up to ULEARN 👍🏾👍🏾 \n Please login to access the courses ☺☺'
					);
					window.location.href = 'login.html';
				}
			})
			.catch(error => console.error(error.message));
	} else {
		alert(
			`OOPS!! 😞😞 Check your inputs \nHint: \n**Name must be at least 3 characters long \n**Email must be of a valid email format \n**Password must be atleast 8 characters long`
		);
	}
});
