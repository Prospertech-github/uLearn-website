const loginForm = document.getElementById('loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const user = [];

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const emailDetails = email.value;
  const passwordDetails = password.value;

  if (localStorage.getItem('newSignUps')) {
    const userDetails = JSON.parse(localStorage.getItem('newSignUps'));
    console.log(userDetails)
    
    if (emailDetails == userDetails[0].email && passwordDetails == userDetails[0].password) {
      console.log('Matched')
      
      const loggedInUser = {
        email: emailDetails,
        password: passwordDetails,
        firstName: userDetails[0].firstName
      }
      user.push(loggedInUser)

      localStorage.setItem('loggedInUserDetails', JSON.stringify(user))
      window.location.href='index.html'
    } else {
      alert(
			"OOPS!! Your inputs aren't correct \n If you don\'t have an account, Please signup now, we want to serve you"
      );
      window.location.href='signup.html'
    }
  }
  
  console.log(emailDetails)
	console.log(passwordDetails)
  console.log('Login Form Submitted');
});
