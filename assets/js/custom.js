const typed = new Typed("#typed", {
    strings: ["trading", "math", "coding"],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 5000,
    loop: true,
    preStringTyped: (arrayPos) => {
        // Select all word spans
        const words = document.querySelectorAll(".word");
        words.forEach((word) => word.classList.remove("active", "previous"));
        
        // Determine the current and previous spans
        const currentWord = words[arrayPos];
        const previousWord = words[arrayPos === 0 ? words.length - 1 : arrayPos - 1];

        // Apply active and previous classes
        if (currentWord) currentWord.classList.add("active");
        if (previousWord) previousWord.classList.add("previous");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter-card h4");
    const cards = document.querySelectorAll(".counter-card");

    // Function to format numbers with commas
    const formatNumber = (number) => {
        return number.toLocaleString();
    };

    // Function to animate counters
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-count");
        const increment = Math.ceil(target / 100); // Adjust speed

        let count = 0;
        const updateCounter = () => {
            count += increment;
            if (count >= target) {
                if (counter.textContent.includes("$")) {
                    counter.textContent = `$${formatNumber(target)}+`;
                } else {
                    counter.textContent = `${formatNumber(target)}+`;
                }
            } else {
                if (counter.textContent.includes("$")) {
                    counter.textContent = `$${formatNumber(count)}+`;
                } else {
                    counter.textContent = `${formatNumber(count)}+`;
                }
                requestAnimationFrame(updateCounter);
            }
        };
        updateCounter();
    };

    // Intersection Observer to detect when the section is in view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const counter = card.querySelector("h4");

                    // Animate the counter
                    if (counter) animateCounter(counter);

                    // Add visible class for animation
                    card.classList.add("visible");

                    // Stop observing the card once it's animated
                    observer.unobserve(card);
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    // Observe each counter-card
    cards.forEach((card) => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
    const resBtn = document.querySelector(".res-btn");
    const closeMenu = document.querySelector(".close-menu");
    const navMenu = document.querySelector(".nav-items ul");

    // Add `.active` class when `.res-btn` is clicked
    resBtn.addEventListener("click", () => {
        navMenu.classList.add("active");
    });

    // Remove `.active` class when `.close-menu` is clicked
    closeMenu.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});
