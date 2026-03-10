// ==============================
// Page startup behavior
// ==============================

// Prevent the browser from restoring the previous scroll position on refresh.
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

// Always start at the top of the page on load.
window.scrollTo(0, 0);

// ==============================
// Theme handling
// ==============================

const THEME_STORAGE_KEY = "theme";
const DARK_THEME_CLASS = "dark";

const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

/**
 * Returns the saved theme from localStorage.
 * Falls back to "light" when no saved value exists.
 */
function getSavedTheme() {
	return localStorage.getItem(THEME_STORAGE_KEY) || "light";
}

/**
 * Saves the selected theme in localStorage.
 * @param {"light" | "dark"} theme
 */
function saveTheme(theme) {
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Applies the theme class to the document body.
 * @param {"light" | "dark"} theme
 */
function setTheme(theme) {
	document.body.classList.toggle(DARK_THEME_CLASS, theme === "dark");
	updateThemeIcon();
}

/**
 * Updates the toggle icon based on the active theme.
 */
function updateThemeIcon() {
	if (!themeIcon) return;

	const isDarkMode = document.body.classList.contains(DARK_THEME_CLASS);
	themeIcon.src = isDarkMode
		? "assets/icons/light.svg"
		: "assets/icons/dark.svg";
}

/**
 * Toggles between light and dark theme,
 * then persists the selected theme.
 */
function handleThemeToggle() {
	const isDarkMode = document.body.classList.toggle(DARK_THEME_CLASS);
	saveTheme(isDarkMode ? "dark" : "light");
	updateThemeIcon();
}

/**
 * Loads and applies the previously saved theme.
 */
function initializeTheme() {
	const savedTheme = getSavedTheme();
	setTheme(savedTheme);
}

// Only attach the click handler if the toggle button exists.
if (toggleBtn) {
	toggleBtn.addEventListener("click", handleThemeToggle);
}

initializeTheme();

// ==============================
// Footer year
// ==============================

const yearEl = document.getElementById("year");

/**
 * Displays the current year in the target element.
 */
function initializeYear() {
	if (!yearEl) return;
	yearEl.textContent = new Date().getFullYear();
}

initializeYear();

// ==============================
// Hobby Cards Interaction
// ==============================

// Select all hobby cards on the page
const hobbyCards = document.querySelectorAll(".hobby-card");

/**
 * Flips the selected card.
 * On mobile, only one card should stay flipped at a time.
 */
function handleHobbyCardClick(clickedCard) {
	// This interaction is only intended for small screens
	if (window.innerWidth > 768) return;

	hobbyCards.forEach((card) => {
		// Reset other cards so only one remains flipped
		if (card !== clickedCard) {
			card.classList.remove("is-flipped");
		}
	});

	// Toggle the clicked card
	clickedCard.classList.toggle("is-flipped");
}

/**
 * Attaches click listeners to all hobby cards.
 */
function initializeHobbyCards() {
	if (!hobbyCards.length) return;

	hobbyCards.forEach((card) => {
		card.addEventListener("click", () => handleHobbyCardClick(card));
	});
}

// Initialize hobby card behavior
initializeHobbyCards();

// ==============================
// About Section
// ==============================

const aboutCard = document.getElementById("aboutCard");
const aboutToggle = document.getElementById("aboutToggle");
const aboutMore = document.getElementById("aboutMore");

/**
 * Returns true when the about section is currently expanded.
 */
function isAboutExpanded() {
	return aboutToggle?.getAttribute("aria-expanded") === "true";
}

/**
 * Updates the toggle button label and accessibility state.
 */
function updateAboutToggleState(isExpanded) {
	aboutToggle.textContent = isExpanded ? "See less" : "Read more";
	aboutToggle.setAttribute("aria-expanded", String(isExpanded));
}

/**
 * Expands the hidden content area and updates the card state.
 */
function expandAboutSection() {
	aboutCard.classList.add("is-expanded");
	updateAboutToggleState(true);
	aboutMore.style.maxHeight = `${aboutMore.scrollHeight}px`;
}

/**
 * Collapses the hidden content area with a smooth height transition.
 */
function collapseAboutSection() {
	// Set the current height first so the transition can animate back to zero.
	aboutMore.style.maxHeight = `${aboutMore.scrollHeight}px`;

	requestAnimationFrame(() => {
		aboutCard.classList.remove("is-expanded");
		updateAboutToggleState(false);
		aboutMore.style.maxHeight = "0px";
	});
}

/**
 * Toggles the about section between expanded and collapsed states.
 */
function handleAboutToggle() {
	if (isAboutExpanded()) {
		collapseAboutSection();
		return;
	}

	expandAboutSection();
}

/**
 * Keeps the expanded height accurate when the viewport size changes.
 */
function handleAboutResize() {
	if (!isAboutExpanded()) return;
	aboutMore.style.maxHeight = `${aboutMore.scrollHeight}px`;
}

/**
 * Initializes the about section interaction.
 */
function initializeAboutSection() {
	if (!aboutCard || !aboutToggle || !aboutMore) return;

	aboutMore.style.maxHeight = "0px";
	updateAboutToggleState(false);

	aboutToggle.addEventListener("click", handleAboutToggle);
	window.addEventListener("resize", handleAboutResize);
}

initializeAboutSection();

// ==============================
// Introduction Sequence
// ==============================

function introduction() {
	const intro = document.getElementById("intro");
	const helloEl = document.getElementById("helloText");
	const page = document.getElementById("page");
	const progressBar = document.getElementById("bar");
	const wipe = document.getElementById("wipe");
	const header = document.querySelector(".site-header");
	const hero = document.querySelector(".hero");
	const hobbiesSection = document.querySelector(".section-hobbies");

	// Stop here if any required intro element is missing.
	if (
		!intro ||
		!helloEl ||
		!page ||
		!progressBar ||
		!wipe ||
		!header ||
		!hero ||
		!hobbiesSection
	) {
		return;
	}

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

	const INTRO_TIMING = {
		firstHold: 850,
		startHold: 250,
		minHold: 80,
		holdDecay: 0.78,
		startGap: 40,
		minGap: 40,
		gapDecay: 0.8,
		out: 0,
		finalPause: 220,
		wipe: 3600,
		headerRevealDelay: 200,
		heroRevealDelay: 350,
		hobbiesRevealDelay: 1000,
	};

	let currentGreetingIndex = 0;

	/**
	 * Prevents scrolling while the intro is playing.
	 */
	function lockIntroScroll() {
		document.body.classList.add("no-scroll");
	}

	/**
	 * Restores page scrolling after the intro finishes.
	 */
	function unlockIntroScroll() {
		document.body.classList.remove("no-scroll");
		document.body.style.overflow = "auto";
	}

	/**
	 * Returns the hold duration for the current greeting.
	 * The first greeting stays longer, then speeds up gradually.
	 */
	function getHoldDuration(i) {
		if (i === 0) return INTRO_TIMING.firstHold;

		const step = i - 1;
		return Math.max(
			INTRO_TIMING.minHold,
			Math.round(
				INTRO_TIMING.startHold * Math.pow(INTRO_TIMING.holdDecay, step),
			),
		);
	}

	/**
	 * Returns the gap before the next greeting appears.
	 */
	function getGapDuration(i) {
		if (i === 0) return 120;

		const step = i - 1;
		return Math.max(
			INTRO_TIMING.minGap,
			Math.round(
				INTRO_TIMING.startGap * Math.pow(INTRO_TIMING.gapDecay, step),
			),
		);
	}

	/**
	 * Displays the active greeting with the intro animation class.
	 */
	function showGreeting(text) {
		helloEl.textContent = text;
		helloEl.classList.remove("is-out");
		void helloEl.offsetWidth;
		helloEl.classList.add("is-in");
	}

	/**
	 * Starts the exit animation for the current greeting.
	 */
	function hideGreeting() {
		helloEl.classList.remove("is-in");
		helloEl.classList.add("is-out");
	}

	/**
	 * Updates the progress bar based on the current greeting index.
	 */
	function updateProgress(i) {
		const percentage = Math.round(((i + 1) / greetings.length) * 100);
		progressBar.style.width = `${percentage}%`;
	}

	/**
	 * Reveals the main page content after the intro wipe begins.
	 */
	function revealMainContent() {
		page.classList.add("is-visible");
		intro.style.display = "none";

		setTimeout(() => {
			header.classList.remove("is-hidden");
			header.classList.add("reveal");
		}, INTRO_TIMING.headerRevealDelay);

		setTimeout(() => {
			hero.classList.add("reveal");
		}, INTRO_TIMING.heroRevealDelay);

		setTimeout(() => {
			hobbiesSection.classList.remove("is-hidden");
			hobbiesSection.classList.add("reveal");
		}, INTRO_TIMING.hobbiesRevealDelay);

		unlockIntroScroll();
	}

	/**
	 * Plays the wipe transition, then swaps the intro with the page content.
	 */
	function transitionOut() {
		wipe.classList.remove("animate");
		void wipe.offsetWidth;
		wipe.classList.add("animate");

		setTimeout(() => {
			revealMainContent();
		}, INTRO_TIMING.wipe * 0.35);
	}

	/**
	 * Utility helper for timed pauses inside the intro sequence.
	 */
	function wait(ms) {
		return new Promise((r) => setTimeout(r, ms));
	}

	/**
	 * Runs the full greeting sequence from start to finish.
	 */
	async function runIntroSequence() {
		showGreeting(greetings[currentGreetingIndex]);
		updateProgress(currentGreetingIndex);

		while (currentGreetingIndex < greetings.length - 1) {
			await wait(getHoldDuration(currentGreetingIndex));
			hideGreeting();
			await wait(INTRO_TIMING.out + getGapDuration(currentGreetingIndex));

			currentGreetingIndex++;
			showGreeting(greetings[currentGreetingIndex]);
			updateProgress(currentGreetingIndex);
		}

		await wait(getHoldDuration(currentGreetingIndex) + INTRO_TIMING.finalPause);
		transitionOut();
	}

	lockIntroScroll();
	runIntroSequence();
}

introduction();

// ==============================
// Fun Facts and Furry Friends Data
// ==============================

const modalConfigs = [
	{
		triggerId: "surpriseBtn",
		modalId: "funfactModal",
		data: [
			{
				title: "bike.webp",
				headline: "104KM in One Ride",
				desc: [
					"My longest bike ride was 104KM back when I was still working and living in Bataan. During the pandemic, that was officially my 'biking era.'",
				],
				img: "./assets/images/bike.webp",
			},
			{
				title: "hotwheels.webp",
				headline: "Hot Wheels Collector Since 2013",
				desc: [
					"I've collected over 500 Hot Wheels since 2013, mainly Ford and Batman lines. I have no plans of selling them… for now.",
				],
				img: "./assets/images/hotwheels.webp",
			},
			{
				title: "taiwan.webp",
				headline: "Prenup in Taiwan",
				desc: [
					"My husband and I had our prenup pictorial in Taiwan. We chose it semi-randomly because it was just way too hot in the Philippines, plus, vacation on the side. Hitting two birds with one stone.",
				],
				img: "./assets/images/taiwan.webp",
			},
			{
				title: "mc.webp",
				headline: "Dream Wedding at Manila Cathedral",
				desc: [
					"I've always dreamed of getting married at Manila Cathedral… and it actually happened. Dream. Came. True.",
				],
				img: "./assets/images/mc.webp",
			},
			{
				title: "purple.webp",
				headline: "Purple Hair Era",
				desc: [
					"I dyed my hair purple twice. No deep reason… I just think it looks really nice.",
				],
				img: "./assets/images/purple.webp",
			},
			{
				title: "vikings.webp",
				headline: "Manifested Vikings Wedding",
				desc: [
					"Back in 2022 while dating at Vikings MOA, I randomly said, 'Gusto ko kapag kinasal ako sa Vikings Venue ang reception.' Three years later… it happened.",
				],
				img: "./assets/images/vikings.webp",
			},
		],
	},
	{
		triggerId: "furryfriend-btn",
		modalId: "furryfriendsModal",
		data: [
			{
				title: "yassi.webp",
				headline: "Yassi & the Milk Tea",
				desc: [
					"Professional zoomies specialist.",
					"Treat-driven developer assistant.",
					"Will absolutely judge your code quality.",
				],
				img: "./assets/images/yassi.webp",
			},
			{
				title: "yna.webp",
				headline: "Yna the Royal Napper",
				desc: [
					"Sleeps 18 hours a day.",
					"Still somehow exhausted.",
					"Master of dramatic slow blinks.",
				],
				img: "./assets/images/yna.webp",
			},
			{
				title: "yohan.webp",
				headline: "Yohan the Style Icon",
				desc: [
					"Woke up like this.",
					"Owns more outfits than I do.",
					"Main character in every room.",
				],
				img: "./assets/images/yohan.webp",
			},
			{
				title: "yoshi.webp",
				headline: "Yoshi the Code Reviewer",
				desc: [
					"Appears the moment VS Code opens.",
					"Sits directly on the keyboard during peak productivity.",
					"Believes every deploy needs supervision.",
				],
				img: "./assets/images/yoshi.webp",
			},
			{
				title: "yuki.webp",
				headline: "Yuki the iPad Kid",
				desc: [
					"Currently binge-watching cartoons.",
					"Judges plot twists intensely.",
					"Will not be disturbed during screen time.",
				],
				img: "./assets/images/yuki.webp",
			},
			{
				title: "yuri.webp",
				headline: "Yuri the Unbothered Kween",
				desc: [
					"Too glamorous to be stressed.",
					"Looks offended 24/7.",
					"Serves attitude without trying.",
				],
				img: "./assets/images/yuri.webp",
			},
			{
				title: "yvanna.webp",
				headline: "Yvanna the Diva",
				desc: [
					"Overreacts to everything.",
					"Demands attention immediately.",
					"Would win an Oscar.",
				],
				img: "./assets/images/yvanna.webp",
			},
			{
				title: "yves.webp",
				headline: "Yves the Box Engineer",
				desc: [
					"If it fits, I sits.",
					"Structural stability tester.",
					"Prefers cardboard over luxury beds.",
				],
				img: "./assets/images/yves.webp",
			},
		],
	},
];

// ==============================
// Image Preload Utilities
// ==============================

const imageCache = new Map();

/**
 * Creates an image element and resolves once the file is fully ready.
 */
function loadImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = async () => {
			// Decode the image when supported to reduce visible loading flicker.
			if (img.decode) {
				try {
					await img.decode();
				} catch {
					// Ignore decode errors and continue with the loaded image.
				}
			}

			resolve(img);
		};

		img.onerror = () => {
			reject(new Error(`Failed to load image: ${url}`));
		};

		img.src = url;
	});
}

/**
 * Returns a cached preload promise when available.
 * This avoids loading the same image more than once.
 */
function preloadImage(url) {
	if (imageCache.has(url)) {
		return imageCache.get(url);
	}

	const imagePromise = loadImage(url);
	imageCache.set(url, imagePromise);

	return imagePromise;
}

/**
 * Starts preloading all images for one modal config.
 */
function preloadModalImages(modalConfig) {
	modalConfig.data.forEach((item) => {
		preloadImage(item.img);
	});
}

// ==============================
// Modal Behavior
// ==============================

modalConfigs.forEach((config) => {
	const trigger = document.getElementById(config.triggerId);
	const modal = document.getElementById(config.modalId);

	if (!trigger || !modal) return;

	const overlay = modal.querySelector(".ff-modal__overlay");
	const closeBtn = modal.querySelector(".ff-window__close");
	const titleEl = modal.querySelector(".ff-window__title");
	const headlineEl = modal.querySelector(".ff-headline");
	const descEl = modal.querySelector(".ff-desc");
	const imgEl = modal.querySelector(".ff-image");
	const anotherBtn = modal.querySelector(".ff-another");
	const mediaEl = modal.querySelector(".ff-window__media");

	let lastIndex = -1;
	let hasPreloadedImages = false;

	/**
	 * Returns a random item without immediately repeating the last one.
	 */
	function getRandomItem() {
		let nextIndex = Math.floor(Math.random() * config.data.length);

		while (config.data.length > 1 && nextIndex === lastIndex) {
			nextIndex = Math.floor(Math.random() * config.data.length);
		}

		lastIndex = nextIndex;
		return config.data[nextIndex];
	}

	/**
	 * Rebuilds the description area using the current item's text lines.
	 */
	function renderDescription(lines) {
		descEl.innerHTML = "";

		lines.forEach((line) => {
			const paragraph = document.createElement("p");
			paragraph.textContent = line;
			descEl.appendChild(paragraph);
		});
	}

	/**
	 * Updates the modal content after the image is ready.
	 */
	async function renderModalContent(item) {
		mediaEl.classList.add("is-loading");

		try {
			await preloadImage(item.img);

			imgEl.src = item.img;
			titleEl.textContent = item.title;
			headlineEl.textContent = item.headline;
			renderDescription(item.desc);
		} finally {
			requestAnimationFrame(() => {
				mediaEl.classList.remove("is-loading");
			});
		}
	}

	/**
	 * Preloads all images for this modal the first time it is opened.
	 */
	function preloadModalImagesOnce() {
		if (hasPreloadedImages) return;

		hasPreloadedImages = true;
		preloadModalImages(config);
	}

	/**
	 * Opens the modal and renders a random item.
	 */
	async function openModal() {
		preloadModalImagesOnce();

		modal.classList.add("is-open");
		lockScroll();

		const item = getRandomItem();
		await renderModalContent(item);
	}

	/**
	 * Starts the close animation, then resets the modal state.
	 */
	function closeModal() {
		if (!modal.classList.contains("is-open")) return;

		modal.classList.add("is-closing");

		setTimeout(() => {
			modal.classList.remove("is-open", "is-closing");
			unlockScroll();
		}, 300);
	}

	/**
	 * Closes the modal only when Escape is pressed while this modal is open.
	 */
	function handleEscapeKey(event) {
		if (event.key !== "Escape") return;
		if (!modal.classList.contains("is-open")) return;

		closeModal();
	}

	trigger.addEventListener("click", openModal);

	if (closeBtn) {
		closeBtn.addEventListener("click", closeModal);
	}

	if (overlay) {
		overlay.addEventListener("click", closeModal);
	}

	if (anotherBtn) {
		anotherBtn.addEventListener("click", openModal);
	}

	document.addEventListener("keydown", handleEscapeKey);
});

function lockScroll() {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;

	document.documentElement.style.setProperty(
		"--scrollbar-width",
		`${scrollbarWidth}px`,
	);

	document.body.classList.add("modal-open");
}

function unlockScroll() {
	document.body.classList.remove("modal-open");
	document.documentElement.style.removeProperty("--scrollbar-width");
}
