function toggleMenu() {
    const navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('show');
}

// Smooth scrolling for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');

    function checkScroll() {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            aboutSection.classList.add('visible');
            aboutImage.classList.add('visible');
            aboutText.classList.add('visible');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}); 