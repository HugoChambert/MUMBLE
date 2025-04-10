

const text = document.querySelector(".quote-thingy");

text.addEventListener('mousemove', (e) => {
	const rect = e.target.getBoundingClientRect();

	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const xPercent = Math.round((x / rect.width) * 100) + "%";
	const yPercent = Math.round((y / rect.height) * 100) + "%";

	text.style.setProperty("--x", xPercent);
    text.style.setProperty("--y", yPercent);
    
});