// Retrieving DOM Elements
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDown = document.querySelector('.dropdown-menu');
const regDiv = document.querySelector('.cta-reg');
const mobileRegDiv = document.querySelector('.mobile-reg');
const greetingDivMain = document.querySelector('.greetingDivMain');
const greetingDivMobile = document.querySelector('.greetingDivMobile');
const logoutBtn = document.querySelector('.logout');
const mobileLogout = document.querySelector('#mobile-logout');
const searchForm = document.querySelector('.searchForm');
const searchInput = document.getElementById('search');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');

toggleBtn.addEventListener('click', () => {
	dropDown.classList.toggle('open');
	const isOpen = dropDown.classList.contains('open');
	toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

// Handle Log In Greeting Functionality
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

//Handle Logout Functionality
logoutBtn.addEventListener('click', handleLogOut);
mobileLogout.addEventListener('click', handleLogOut);
function handleLogOut() {
	localStorage.removeItem('userToken');
	localStorage.removeItem('loggedInUser');
	location.reload();
}

// Handle Search Functonality
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const query = searchInput.value;

	if (query) {
		console.log('Searching .....');
		fetch(`http://localhost/ulearn/search.php?q=${query}`)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				modal.style.display = 'block';

				const modalContent = document.querySelector('.modal-content');
				console.log(modalContent);
				const courseList = document.createElement('div');
				courseList.classList.add('courseList');
				modalContent.appendChild(courseList);
				if (data.length > 0) {
					console.log('Found Something');
					console.log(data)
					data.forEach(course => {
						courseList.insertAdjacentHTML(
							'beforeend',
							`
							<p class='courseResult'> ${course.course_name}</p>
						`
						);
						const courseResult = document.getElementsByClassName('courseResult');
						const courseArray = Array.from(courseResult);
						courseArray.map((course,index) => {
							course.setAttribute('id', `${index+1}`)
						})
						console.log(courseResult);
						searchInput.value = '';
					});
				} else {
					courseList.insertAdjacentHTML(
						'beforeend',
						`
						<p> Sorry, we don't have any course related to your search </p>
					`
					);
					searchInput.value = '';
				}
			})
			.catch(error => console.error(error));
	}
});

// Close Modal and clear Modal Content
const closeModal = () => {
	modal.style.display = 'none';
	const courseList = document.querySelector('.courseList');
	courseList.remove();
};
// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
	closeModal();
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		closeModal();
	}
};

// Restrict Unathenticated Users from Accessing the Course Details page
const restrictUserAccess = function () {
	const applyBtns = document.getElementsByClassName('applyBtn');
	const applyBtnsArray = Array.from(applyBtns);

	if (localStorage.getItem('loggedInUser') == null) {
		console.log('loggedOut');

		applyBtnsArray.map(applyBtn => {
			applyBtn.getAttribute('href');
			applyBtn.setAttribute('href', '#');
		});
	} else {
		applyBtnsArray.map(applyBtn => {
			console.log('loggedIn');
			applyBtn.getAttribute('href');
			applyBtn.setAttribute('href', 'apply.html');
		});
	}
};
restrictUserAccess();



// const fetchCourses = async function () {
// 	const response = await fetch('http://localhost/ulearn/courses.php');
// 	const data = await response.json();

// 	console.log(data);
// };
// fetchCourses();