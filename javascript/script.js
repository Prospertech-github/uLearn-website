const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDown = document.querySelector('.dropdown-menu');
const regDiv = document.querySelector('.cta-reg');
const greetingDiv = document.querySelector('.greetingDiv');

toggleBtn.addEventListener('click', () => {
  dropDown.classList.toggle('open');
  
  const isOpen = dropDown.classList.contains('open');

  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
})

if (localStorage.getItem('loggedInUserDetails') !== null) {
	regDiv.style.display = 'none';
	const name = JSON.parse(localStorage.getItem('loggedInUserDetails'));
	greetingDiv.insertAdjacentHTML(
		'afterBegin',
		`
    <h2 class='greeting'> Howdy, ${name[0].firstName} </h2>
  `
	);
} else {
	greetingDiv.style.display = 'none';
}

