import "./scss/index.scss";

import "particles.js";
particlesJS.load('background-particles', 'assets/particles.json', function() {
	console.log('callback - particles.js config loaded');
});

import Typed from 'typed.js';
new Typed(
	'.hero-container__hero.animate__typed',
	{
		strings: ['David Keller', 'Developer'],
		smartBackspace: true,
		typeSpeed: 75,
		backSpeed: 75,
		startDelay: 3150,
		backDelay: 3000,
		loop: false,
		showCursor: true,
		cursorChar: '|',
		autoInsertCss: true,
		fadeOut: false,
	}
);

document.getElementById('scroll-down-button').addEventListener('click', () => {
	const anchor = document.querySelector('#aboutme-main-container');
	anchor.scrollIntoView({
		behavior: "smooth"
	});
});
