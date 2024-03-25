async function handleSubmit(event) {
    event.preventDefault();
 
    // Collect form data
    const formData = new FormData(document.getElementById('login-form'));
    const email = formData.get('email');
    const password = formData.get('psw');
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
                var data = await response.json();
                var token = data.token;
                var username = data.username;
                var id = data.id;
                console.log(token);
                console.log(username);
                console.log(id);
                console.log(data);
                localStorage.setItem('token', token);
                console.log(localStorage.getItem('token'));
                document.getElementById("ErrorLabel").innerText = "Success! Welkom " + username;
            } else {
                document.getElementById("ErrorLabel").innerText = await response.text();
            }
        }
    } catch (error) {
        // var errormessage = await response.text();
        document.getElementById("ErrorLabel").style.display = "none";
        document.getElementById("ErrorLabel").innerText = "caught in a bad request";
        document.getElementById("ErrorLabel").style.display = "block";

    }
}
document.getElementById('login-form').addEventListener('submit', handleSubmit);
console.log(localStorage.getItem('token'));
