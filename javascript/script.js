const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDown = document.querySelector('.dropdown-menu');
const regDiv = document.querySelector('.cta-reg');
const mobileRegDiv = document.querySelector('.mobile-reg');
const greetingDivMain = document.querySelector('.greetingDivMain');
const greetingDivMobile = document.querySelector('.greetingDivMobile');
const logoutBtn = document.querySelector('.logout');
const mobileLogout = document.querySelector('#mobile-logout');


toggleBtn.addEventListener('click', () => {
  dropDown.classList.toggle('open');
  const isOpen = dropDown.classList.contains('open');
  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
})

if (localStorage.getItem('loggedInUser') !== null) {
	regDiv.style.display = 'none';
	mobileRegDiv.style.display = 'none';
	const name = JSON.parse(localStorage.getItem('loggedInUser'));
	greetingDivMain.insertAdjacentHTML(
		'afterBegin',
		`
    <h2 class='greeting'> Howdy, ${name.name.split(' ')[0]} </h2>
  `
	);
	greetingDivMobile.insertAdjacentHTML(
		'afterBegin',
		`
    <h2 class='greeting'> Howdy, ${name.name.split(' ')[0]} </h2>
  `
	);
} else {
	greetingDivMain.style.display = 'none';
	greetingDivMobile.style.display = 'none';
}

logoutBtn.addEventListener('click', handleLogOut)
mobileLogout.addEventListener('click', handleLogOut);

function handleLogOut() {
	localStorage.removeItem('userToken');
	localStorage.removeItem('loggedInUser');
	location.reload();
}