document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Animate links with cursor
    const links = document.querySelectorAll('a, button, .cloud-icon, .skill-tag, .iac-node');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'var(--secondary)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--primary)';
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Terminal typing animation
    const typedText = document.querySelector('.typed-text');
    const textArray = [
        'whoami',
        'ls -la ~/skills',
        'cat about.txt',
        'cd projects',
        'git status',
        'kubectl get pods',
        'terraform apply',
        'ansible-playbook deploy.yml'
    ];
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }
    
    // Start typing animation
    setTimeout(type, 1000);
    
    // Generate hexagon grid
    const hexagonGrid = document.querySelector('.hexagon-grid');
    const gridWidth = window.innerWidth;
    const gridHeight = window.innerHeight;
    const hexWidth = 100;
    const hexHeight = 57.74;
    const hexMargin = 50;
    
    const cols = Math.ceil(gridWidth / (hexWidth + hexMargin)) + 1;
    const rows = Math.ceil(gridHeight / (hexHeight * 0.75 + hexMargin)) + 1;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const hexagon = document.createElement('div');
            hexagon.className = 'hexagon';
            hexagon.style.left = (j * (hexWidth + hexMargin) + (i % 2 ? hexWidth / 2 + hexMargin / 2 : 0)) + 'px';
            hexagon.style.top = (i * (hexHeight * 0.75 + hexMargin)) + 'px';
            hexagon.style.animationDelay = (Math.random() * 5) + 's';
            hexagonGrid.appendChild(hexagon);
        }
    }
    
    // Animate experience numbers
    const expNumbers = document.querySelectorAll('.exp-number');
    expNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            number.textContent = Math.floor(current);
        }, 20);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Scroll animations
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Trigger animations on load
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Make first section visible immediately
    sections[0].style.opacity = '1';
    sections[0].style.transform = 'translateY(0)';
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});