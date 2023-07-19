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
  
  // if (emailDetails.toLowerCase().includes('@') && passwordDetails.length >= 8) {
  //   const userDetails = {
  //     userEmail: emailDetails,
  //     userPassword: passwordDetails,
  //   };
  //   user.push(userDetails);
    
  //   localStorage.setItem('user', JSON.stringify(user));

  //   alert('Please wait while we log you in');

  //   setTimeout(() => {
  //     window.location.href="index.html"
  //   }, 5000)
  // } else {
  //   alert('Please input a valid email addrress or password. \n Passwords must be atleast 8 characters or more')
  // }

  

  
  console.log(emailDetails)
	console.log(passwordDetails)
  console.log('Login Form Submitted');


});


// check if newSignUp exists
// if (localStorage.getItem('newSignUps' !== null)) {
  //fetch Details
//   const userDetails = JSON.parse(localStorage.getItem('newSignUps'))
//   const emailDetails = email.value;
//   const passwordDetails = password.value;

//   if (emailDetails = userDetails[0].email) {
//     const loggedInUser = {
//       userEmail: emailDetails,
//       password: passwordDetails,
//       firstName: userDetails[0].firstName
//     } 
//     user.push(loggedInUser)
//     localStorage.setItem('loggedInUserDetails', user);
//   }
// } else {
//   alert('OOPS!! It seems like you don\'t have a ULear aaccount at this time \n Please signup now, we want to serve you')
// }
// create user storage
// fill in details
// check if email input exists
// get 