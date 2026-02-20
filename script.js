// Fun fact button
const funFactBtn = document.getElementById("funFactBtn");
const funFactText = document.getElementById("funFactText");

const funFacts = [
	"Lorem ipsum fun fact #1: I love learning new things!",
	"Lorem ipsum fun fact #2: My favorite hobby helps me relax.",
	"Lorem ipsum fun fact #3: I enjoy building creative projects.",
];

funFactBtn.addEventListener("click", () => {
	const randomIndex = Math.floor(Math.random() * funFacts.length);
	funFactText.textContent = funFacts[randomIndex];
});

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