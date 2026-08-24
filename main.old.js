// Modal Logic
const modalOverlay = document.getElementById('contactModalOverlay');
const formState = document.getElementById('modalFormState');
const successState = document.getElementById('modalSuccessState');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  // Reset form with a slight delay to allow closing animation
  setTimeout(() => {
    formState.style.display = 'block';
    successState.style.display = 'none';
    contactForm.reset();
    submitBtn.textContent = 'Send Inquiry →';
    submitBtn.disabled = false;
  }, 300);
}

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Close on outside click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Handle Form Submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  // Set Loading State
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Gather data
  const data = {
    fullName: document.getElementById('fullName').value,
    workEmail: document.getElementById('workEmail').value,
    company: document.getElementById('company').value,
    interest: document.getElementById('interest').value,
    requirement: document.getElementById('requirement').value,
  };

  try {
    const response = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      formState.style.display = 'none';
      successState.style.display = 'block';
    } else {
      alert('Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry →';
    }
  } catch (err) {
    alert('An error occurred. Please check your connection and try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Inquiry →';
  }
}

const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

const saved = localStorage.getItem("blaiselogic-theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("blaiselogic-theme", theme);
  icon.textContent = theme === "dark" ? "☀" : "☾";
}

setTheme(saved || (systemDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});