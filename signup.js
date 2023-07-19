const signUpForm = document.getElementById('signUpForm');
const email = document.querySelector('#email');
const fullName = document.querySelector('#fullName');
const password = document.querySelector('#password');

const newSignUps = []

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  
  if (password.value.length >= 8) {
    const firstName = fullName.value.split(' ')[0];
    const lastName = fullName.value.split(' ')[1];
    const newEmail = email.value;
    const newPassword = password.value;
  
    const newUserDetails = {
      firstName: firstName,
      lastName: lastName,
      email: newEmail,
      password: newPassword
    }
  
    newSignUps.push(newUserDetails);
    localStorage.setItem('newSignUps', JSON.stringify(newSignUps));
    
  } else {
    alert('Please check your inputs and ')
  }	

});
