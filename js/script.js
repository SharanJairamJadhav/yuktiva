// Navigation Hamburger Menu for Responsive Design
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav Panel
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation Toggle
        burger.classList.toggle('toggle');
    });
}

// Client Testimonials Slider Logic
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlideIndex = index;
}

function currentSlide(index) {
    showSlide(index);
}

// Auto Cycle Testimonials every 6 seconds
setInterval(() => {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}, 6000);

// Form Submission Handling 
// const form = document.getElementById('consultationForm');
// if(form) {
//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         alert('Thank you for booking a consultation with Yuktiva. Our strategic agricultural team will connect with you shortly.');
//         form.reset();
//     });
// }

const form = document.getElementById('consultationForm');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "19d6be51-4574-43b9-acfd-4e6c1059ea25");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Thank you for booking a consultation with Yuktiva. Our strategic agricultural team will connect with you shortly.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Initialize components
const initApp = () => {
    navSlide();
}

initApp();