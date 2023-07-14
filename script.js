console.log('Hello World');
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDown = document.querySelector('.dropdown-menu');

toggleBtn.addEventListener('click', () => {
  dropDown.classList.toggle('open');
  
  const isOpen = dropDown.classList.contains('open');

  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
})