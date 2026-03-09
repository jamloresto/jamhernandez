# 🌐 Mini Portfolio Website

A responsive single-page personal website built using **HTML, CSS, and JavaScript**.

This project demonstrates semantic HTML structure, responsive layout design, dark/light mode theming, and basic JavaScript interactivity.

---

## 📌 Project Objectives

By completing this project, students will:

- ✅ Develop a structured and semantic HTML page
- ✅ Apply CSS for layout, colors, and typography
- ✅ Use JavaScript for simple interactivity
- ✅ Implement responsive design for mobile and desktop
- ✅ Practice debugging and refining their web pages

---

# ✨ Features

## 🧱 Website Structure
The website is built as a **single-page application layout** containing:

- **Header** – Site title, navigation menu, and theme toggle
- **About Me** – Introduction section with expandable content
- **Hobbies & Interests** – Interactive cards showing hobbies
- **Fun Facts** – Random fun facts displayed in modal pop-ups
- **Furry Friends** – Random pet gallery modal
- **Contact Section** – Email and social links
- **Footer** – Copyright notice with dynamic year

---

## 🎬 Intro Animation

The website begins with a **custom animated introduction screen**.

Features include:

- Multilingual greeting animation
- Progress bar animation
- Smooth transition to the main website
- Scroll locking during the intro animation

This creates a more engaging entry experience before revealing the page content.

---

## 🎨 UI & Styling

The site uses a modern card-based layout with:

- Responsive layout (desktop + mobile)
- CSS Grid and Flexbox layouts
- Hover effects and transitions
- Card UI components
- Smooth animations
- Custom typography using Google Fonts

---

## 🌙 Dark / Light Mode

Users can toggle between dark and light themes.

Features:

- Toggle button switches themes
- Icons change dynamically (reverse of current theme)
- Uses CSS custom properties (`:root`)
- Smooth theme transitions
- **User preference saved using `localStorage`**

This ensures the theme remains consistent even after refreshing the page.

---

## 🔄 Interactive Hobby Cards

The hobbies section uses **interactive flip cards**.

Features:

- Flip animation using CSS `transform`
- Hover interaction on desktop
- Tap interaction on mobile devices
- Responsive layout for different screen sizes

Each card reveals additional details about the hobby when flipped.

---

## 🪟 Modal Pop-Ups

The project includes a reusable **modal system** for displaying dynamic content.

Used in:

- **Fun Facts**
- **Furry Friends**

Features include:

- Random content generation
- Image preloading for smoother display
- Overlay click to close
- Close button support
- **Keyboard support (Esc key)**
- Scroll locking while modal is open

---

## ⚡ JavaScript Interactivity

JavaScript is used to power several interactive features:

- Theme toggle logic
- Theme persistence using `localStorage`
- Animated intro sequence
- Expandable "About Me" section
- Interactive hobby cards
- Random fun fact generator
- Modal pop-up system
- Image preloading and caching
- Dynamic current year in the footer

---

# 🛠️ Technologies Used

### HTML5
- Semantic tags (`header`, `section`, `footer`)
- Accessible structure

### CSS3
- Flexbox
- CSS Grid
- Media Queries
- CSS Variables
- Animations and transitions

### JavaScript (ES6)
- DOM manipulation
- Event listeners
- LocalStorage
- Dynamic content rendering
- Modal logic
- Image preloading

---

# 📂 Project Structure
mini-portfolio/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
├── images
├── icons
└── favicon


---

# 🚀 How to Run

1. Download or clone this repository.
2. Open `index.html` in your browser.
3. Click the theme toggle icon to switch between dark and light mode.
4. Resize the browser window to test responsiveness.
5. Click **Surprise Me** to generate random fun facts.

---

# 📱 Responsive Design

The website adapts across different screen sizes using CSS media queries.

### Desktop
- Multi-column grid layout
- Hover-based interactions

### Mobile/Tablet
- Stacked layout
- Touch-friendly interactions
- Tap-based card flipping

Typography and containers scale fluidly for improved readability.

---

# ♿ Accessibility Considerations

The project includes several accessibility features:

- Semantic HTML structure
- ARIA attributes for expandable content and modals
- Keyboard support (Esc to close modal)
- Reduced motion support using `prefers-reduced-motion`

---

# 📘 Reflection

While the core requirements focused on building a basic personal webpage, I challenged myself to expand the project by adding interactive UI elements such as a loading intro animation, dark/light theme, and modal pop-ups.

Through this process, I practiced debugging JavaScript timing logic, improving responsive interactions between desktop and mobile views, and refining small UI details to improve the overall user experience.

---

# 📄 License

This project is created for **educational purposes only**.