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


document.addEventListener('DOMContentLoaded', () => {
	const signUpButton = document.getElementById('sign-up-btn');

	signUpButton.addEventListener('click', async () => {
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		try {
			const res = await fetch('http://localhost:3000/api/auth', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await res.json();

			if (res.ok) {
				alert(`User created with email: ${email}`);
			} else {
				alert(`Error: ${data.error}`);
			}
		} catch (e) {
			console.log(e);
			alert('Something went wrong!');
		}
	});
});




