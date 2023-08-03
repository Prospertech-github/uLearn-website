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

let courses = [];
let selectedCourse;

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
	localStorage.removeItem('selectedCourse');
	window.location.href = 'index.html';
}

// Handle Search Functonality
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const query = searchInput.value;

	if (query) {
		fetch(`http://localhost/ulearn/search.php?q=${query}`)
			.then(response => response.json())
			.then(data => {
				modal.style.display = 'block';

				const modalContent = document.querySelector('.modal-content');
				const courseList = document.createElement('div');
				courseList.classList.add('courseList');
				modalContent.appendChild(courseList);
				if (data.length > 0) {
					courseList.insertAdjacentHTML(
						'afterbegin',
						`
						<p> **Search results are based on your input </p>
					`
					);
					data.forEach(course => {
						courseList.insertAdjacentHTML(
							'beforeend',
							`
							<p class='courseResult'> ${course.course_name}</p>
						`
						);
						const courseResult =
							document.getElementsByClassName('courseResult');
						const courseArray = Array.from(courseResult);
						courseArray.map((course, index) => {
							course.setAttribute('id', `${index + 1}`);
						});
						searchInput.value = '';
					});
				} else {
					courseList.insertAdjacentHTML(
						'beforeend',
						`
						<p> **Course(s) displayed are course(s) related to search input </p>
						<p> Sorry, we don't have any course related to your search.</p>
						<p> We would consider adding that course to our library.</p>
					`
					);
					searchInput.value = '';
				}
				searchInput.blur();
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
// // When the user clicks anywhere outside of the modal, close it
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
		applyBtnsArray.map(applyBtn => {
			applyBtn.getAttribute('href');
			applyBtn.setAttribute('href', '#');
			applyBtn.addEventListener('click', () => {
				alert(
					'WAIT✋🏾✋🏾!! Users are expected to Login or Sign Up before applying for courses'
				);
				window.location.href = 'signup.html';
			});
		});
	} else {
		applyBtnsArray.map(applyBtn => {
			applyBtn.getAttribute('href');
			applyBtn.setAttribute('href', 'courseDetail.html');
		});
	}
};

//Fetch Course from Database Immediately
// IIFE(Immediately Invoked Function Experience)
(async function () {
	const response = await fetch('http://localhost/ulearn/courses.php');
	const data = await response.json();
	courses.push(...data);

	// Display Courses in Learning Page
	const coursesContainer = document.querySelector('.coursesContainer');
	if (courses.length > 0) {
		courses.map((course, index) => {
			coursesContainer.insertAdjacentHTML(
				'beforeend',
				`
				<div class="imgCtn">
					<img src="${course.course_image}" alt="">
					<a href="#" class="applyBtn" id="${course.id}"> Apply </a>
					<p> ${course.course_name} </p>
				</div>
			`
			);
		});
		//Check user authentication and restrict access
		restrictUserAccess();

		// Insert Event Listeners into Buttons
		const btns = document.getElementsByClassName('applyBtn');
		const btnArray = Array.from(btns);
		btnArray.map(btn => {
			btn.addEventListener('click', function (e) {
				selectedCourse = courses[e.target.id - 1];
				// Save Selected course to Local storage
				localStorage.setItem(
					'selectedCourse',
					JSON.stringify(selectedCourse)
				);
			});
		});
	}
})();

// Dynamically Change Course Detail Page
try {
	if (localStorage.getItem('selectedCourse') !== null) {
		const data = JSON.parse(localStorage.getItem('selectedCourse'));
		const courseName = document.querySelector('#courseName');
		courseName.textContent = data.course_name;
		const courseImage = document.querySelector('.courseImage');
		courseImage.src = data.course_image;
	}
} catch (error) {
	console.error(error);
}

const paymentCloseBtn = document.querySelector('.paymentClose');
const paymentModal = document.getElementById('paymentModal');

const paymentCloseModal = () => {
	paymentModal.style.display = 'none';
};
paymentCloseBtn.onclick = function () {
	paymentCloseModal();
};
window.onclick = function (event) {
	if (event.target == paymentModal) {
		paymentCloseModal();
	}
};

// Handles the Course Application and opens the payment modal
const btnApply = document.querySelector('#btnApply');
btnApply.addEventListener('click', () => {
	paymentModal.style.display = 'block';
});

// Checks Card details and Handles the Final Course Application step
const payBtn = document.getElementById('payBtn');
payBtn.addEventListener('click', e => {
	e.preventDefault();
	const courseId = JSON.parse(localStorage.getItem('selectedCourse')).id;
	const token = localStorage.getItem('userToken');
	console.log(token);

	let cardDetails = document.getElementById('cardNumber');
	let cardNumber;

	if (cardDetails.value.length >= 12) {
		cardNumber = cardDetails.value * 1;
	} else {
		alert('Card number must a minimum of 12 digits');
		fake = cardDetails.value;
	}

	if (cardNumber > 0) {
		console.log('a number');
		fetch('http://localhost/ulearn/apply.php', {
			method: 'POST',
			body: JSON.stringify({
				course_id: courseId,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(data => alert(data.message))
			.catch(error => console.error(error));
		paymentCloseModal();
	} else {
		alert('Please input a valid 12 digit number');
	}
});
