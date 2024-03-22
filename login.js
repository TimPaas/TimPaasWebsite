async function handleSubmit(event) {
    event.preventDefault();
 
    // Collect form data
    const formData = new FormData(document.getElementById('login-form'));
    const email = formData.get('email');
    const password = formData.get('psw');
    console.WriteLine(email, password)
    try {
        const requestPromises = [];
        requestPromises.push(fetch('http://localhost:5122/api/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }));
 
        const responses = await Promise.all(requestPromises);
 
        for (const response of responses) {
            if (response.ok) {
                document.getElementById(loginLabel).color = "green";
            } else {
                document.getElementById(loginLabel).color = "red";
            }
        }
    } catch (error) {
        document.getElementById("ErrorLabel").style.display = "none";
        document.getElementById("ErrorLabel").innerText = "An unknown error occured, the server might be down. Contact the developer via the information on the main page.";
        document.getElementById("ErrorLabel").style.display = "block";
    }
}