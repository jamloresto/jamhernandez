if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// Color theme
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applySavedTheme() {
	const savedTheme = localStorage.getItem("theme");

	if (savedTheme === "dark") {
		document.body.classList.add("dark");
	} else {
		document.body.classList.remove("dark");
	}
	updateIcon();
}

function updateIcon() {
	if (!themeIcon) return;

	if (document.body.classList.contains("dark")) {
		themeIcon.src = "assets/icons/light.svg";
	} else {
		themeIcon.src = "assets/icons/dark.svg";
	}
}

if (toggleBtn && themeIcon) {
	toggleBtn.addEventListener("click", () => {
		const isDark = document.body.classList.toggle("dark");

		localStorage.setItem("theme", isDark ? "dark" : "light");

		updateIcon();
	});
}

applySavedTheme();

// Auto year
const yearEl = document.getElementById("year");

if (yearEl) {
	yearEl.textContent = new Date().getFullYear();
}

// Hobby cards
const hobbyCards = document.querySelectorAll(".hobby-card");

if (hobbyCards.length) {
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
}

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
	document.body.classList.add("no-scroll");

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

	if (!intro || !helloEl || !page || !bar || !wipe) return;

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

			document.body.classList.remove("no-scroll");
		}, WIPE_MS * 0.35);
	}

	function wait(ms) {
		return new Promise((r) => setTimeout(r, ms));
	}

	runIntro();
}

introduction();

// Fun facts Section
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

const imageCache = new Map();

function preloadImage(url) {
	if (imageCache.has(url)) return imageCache.get(url);

	const promise = new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = async () => {
			if (img.decode) {
				try {
					await img.decode();
				} catch {}
			}
			resolve(img);
		};
		img.onerror = reject;
		img.src = url;
	});

	imageCache.set(url, promise);
	return promise;
}

modalConfigs.forEach((config) => {
	let didPreload = false;

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

	function pickRandom() {
		let i = Math.floor(Math.random() * config.data.length);
		while (i === lastIndex && config.data.length > 1) {
			i = Math.floor(Math.random() * config.data.length);
		}
		lastIndex = i;
		return config.data[i];
	}

	async function render(item) {
		mediaEl.classList.add("is-loading");

		try {
			await preloadImage(item.img);

			imgEl.src = item.img;

			titleEl.textContent = item.title;
			headlineEl.textContent = item.headline;

			descEl.innerHTML = "";
			item.desc.forEach((line) => {
				const p = document.createElement("p");
				p.textContent = line;
				descEl.appendChild(p);
			});
		} finally {
			requestAnimationFrame(() => {
				mediaEl.classList.remove("is-loading");
			});
		}
	}

	async function open() {
		if (!didPreload) {
			didPreload = true;
			config.data.forEach((item) => preloadImage(item.img));
		}

		modal.classList.add("is-open");
		lockScroll();

		const item = pickRandom();
		await render(item);
	}

	function close() {
		modal.classList.add("is-closing");

		setTimeout(() => {
			modal.classList.remove("is-open", "is-closing");
			document.body.classList.remove("modal-open");
			unlockScroll();
		}, 300);
	}

	trigger.addEventListener("click", open);
	closeBtn.addEventListener("click", close);
	overlay.addEventListener("click", close);
	anotherBtn.addEventListener("click", open);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") close();
	});
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
