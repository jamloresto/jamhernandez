window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

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
	const collapse = () => {
		aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
		requestAnimationFrame(() => {
			aboutCard.classList.remove("is-expanded");
			aboutToggle.textContent = "Read more";
			aboutToggle.setAttribute("aria-expanded", "false");
			aboutMore.style.maxHeight = "0px";
		});
	};

	const expand = () => {
		aboutCard.classList.add("is-expanded");
		aboutToggle.textContent = "See less";
		aboutToggle.setAttribute("aria-expanded", "true");
		aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
	};

	aboutMore.style.maxHeight = "0px";

	aboutToggle.addEventListener("click", () => {
		const expanded = aboutToggle.getAttribute("aria-expanded") === "true";
		if (expanded) collapse();
		else expand();
	});

	window.addEventListener("resize", () => {
		const expanded = aboutToggle.getAttribute("aria-expanded") === "true";
		if (expanded) aboutMore.style.maxHeight = aboutMore.scrollHeight + "px";
	});
}

function introduction() {
	const greetings = [
		"Hello",
		"Kumusta",
		"Hola",
		"Bonjour",
		"Ciao",
		"Hallo",
		"مرحبا",
		"नमस्ते",
		"你好",
		"こんにちは",
		"안녕하세요",
		"Salam",
	];

	const intro = document.getElementById("intro");
	const helloEl = document.getElementById("helloText");
	const page = document.getElementById("page");
	const bar = document.getElementById("bar");
	const wipe = document.getElementById("wipe");

	const FIRST_HOLD_MS = 850;
	const START_HOLD_MS = 250;
	const MIN_HOLD_MS = 80;
	const HOLD_DECAY = 0.78;
	const START_GAP_MS = 40;
	const MIN_GAP_MS = 40;
	const GAP_DECAY = 0.8;
	const OUT_MS = 0;
	const TOTAL = greetings.length;

	let idx = 0;

	function getHoldMs(i) {
		if (i === 0) return FIRST_HOLD_MS;
		const step = i - 1;
		return Math.max(
			MIN_HOLD_MS,
			Math.round(START_HOLD_MS * Math.pow(HOLD_DECAY, step)),
		);
	}

	function getGapMs(i) {
		if (i === 0) return 120;
		const step = i - 1;
		return Math.max(
			MIN_GAP_MS,
			Math.round(START_GAP_MS * Math.pow(GAP_DECAY, step)),
		);
	}

	function showGreeting(text) {
		helloEl.textContent = text;
		helloEl.classList.remove("is-out");
		void helloEl.offsetWidth;
		helloEl.classList.add("is-in");
	}

	function hideGreeting() {
		helloEl.classList.remove("is-in");
		helloEl.classList.add("is-out");
	}

	function setProgress(i) {
		const pct = Math.round(((i + 1) / TOTAL) * 100);
		bar.style.width = pct + "%";
	}

	async function runIntro() {
		showGreeting(greetings[idx]);
		setProgress(idx);

		while (idx < TOTAL - 1) {
			await wait(getHoldMs(idx));
			hideGreeting();
			await wait(OUT_MS + getGapMs(idx));
			idx++;
			showGreeting(greetings[idx]);
			setProgress(idx);
		}

		await wait(getHoldMs(idx) + 220);
		transitionOut();
	}

	function revealHero() {
		const hero = document.querySelector(".hero");
		hero.classList.add("reveal");
	}

	const WIPE_MS = 3600;

	function transitionOut() {
		wipe.classList.remove("animate");
		void wipe.offsetWidth;
		wipe.classList.add("animate");

		setTimeout(() => {
			page.classList.add("is-visible");
			intro.style.display = "none";
			document.body.style.overflow = "auto";

			setTimeout(() => {
				const header = document.querySelector(".site-header");
				header.classList.remove("is-hidden");
				header.classList.add("reveal");
			}, 200);

			setTimeout(() => {
				revealHero();
			}, 350);

			setTimeout(() => {
				const hobbies = document.querySelector(".section-hobbies");
				hobbies.classList.remove("is-hidden");
				hobbies.classList.add("reveal");
			}, 1000);
		}, WIPE_MS * 0.35);
	}

	function wait(ms) {
		return new Promise((r) => setTimeout(r, ms));
	}

	runIntro();
}

introduction();