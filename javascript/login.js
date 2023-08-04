const loginForm = document.getElementById('loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

//Declaring user token variable
let token;

//Handling Login Functionality and saving userToken
loginForm.addEventListener('submit', e => {
	e.preventDefault();

	if (email.value.includes('@') && password.value.length >= 8) {
		fetch('http://localhost/ulearn/login.php', {
			method: 'POST',
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(response => response.json())
			.then(data => {
				if (data.token == null) {
					alert(data.message)
				}
				if(data.token){
					alert(data.token);
					localStorage.setItem('userToken', data.token);
					token = data.token

					return fetch('http://localhost/ulearn/user.php', {
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
							Authorization: `Bearer ${token}`,
						},
					});
				}
			})
			.then(info => info.json())
      .then(userDetails => {
        
				localStorage.setItem(
					'loggedInUser',
					JSON.stringify(userDetails.user)
        )
        window.location.href = 'index.html';
      }
			)
			.catch(error => console.error(error.message));
	} else {
		alert(
			`OOPS!! 😞😞 Wrong email or password \nHint: \n**Make sure you are logged in with the correct email and password`
		);
	}
});
