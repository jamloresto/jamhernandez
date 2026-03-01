// Fun fact button
// const funFactBtn = document.getElementById("funFactBtn");
// const funFactText = document.getElementById("funFactText");

// const funFacts = [
// 	"Lorem ipsum fun fact #1: I love learning new things!",
// 	"Lorem ipsum fun fact #2: My favorite hobby helps me relax.",
// 	"Lorem ipsum fun fact #3: I enjoy building creative projects.",
// ];

// funFactBtn.addEventListener("click", () => {
// 	const randomIndex = Math.floor(Math.random() * funFacts.length);
// 	funFactText.textContent = funFacts[randomIndex];
// });

// Color theme
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateIcon() {
	if (document.body.classList.contains("dark")) {
		themeIcon.src = "assets/icons/light.svg";
	} else {
		themeIcon.src = "assets/icons/dark.svg";
	}
}

toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	updateIcon();
});

updateIcon();

// Auto year
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

// Hobby cards
const hobbyCards = document.querySelectorAll(".hobby-card");

hobbyCards.forEach((card) => {
	card.addEventListener("click", () => {
		if (window.innerWidth <= 768) {
			hobbyCards.forEach((c) => {
				if (c !== card) c.classList.remove("is-flipped");
			});

			card.classList.toggle("is-flipped");
		}
	});
});

// About section
const aboutCard = document.getElementById("aboutCard");
const aboutToggle = document.getElementById("aboutToggle");
const aboutMore = document.getElementById("aboutMore");

if (aboutCard && aboutToggle && aboutMore) {
	const setCollapsed = () => {
		aboutCard.classList.remove("is-expanded");
		aboutToggle.textContent = "Read more";
		aboutToggle.setAttribute("aria-expanded", "false");
		aboutMore.style.maxHeight = "0px";
	};

	const setExpanded = () => {
		aboutCard.classList.add("is-expanded");
		aboutToggle.textContent = "See less";
		aboutToggle.setAttribute("aria-expanded", "true");
		aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
	};

	setCollapsed();

	aboutToggle.addEventListener("click", () => {
		const expanded = aboutToggle.getAttribute("aria-expanded") === "true";
		if (expanded) setCollapsed();
		else setExpanded();
	});

	window.addEventListener("resize", () => {
		const expanded = aboutToggle.getAttribute("aria-expanded") === "true";
		if (expanded) aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
	});
}