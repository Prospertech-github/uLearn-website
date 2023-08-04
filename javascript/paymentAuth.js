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
