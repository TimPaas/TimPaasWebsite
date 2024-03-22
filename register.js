async function handleSubmit(event) {
    event.preventDefault();
 
    // Collect form data
    const formData = new FormData(document.getElementById('register-form'));
    const username = formData.get('usn');
    const password = formData.get('psw');
    const email = formData.get('email');
    try {
        const requestPromises = [];
        requestPromises.push(fetch('http://localhost:5122/api/Register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                username: username,
                password: password,
                email: email
            })
        }));
 
        const responses = await Promise.all(requestPromises);
 
        for (const response of responses) {
            if (response.ok) {
              document.getElementById("ErrorLabel").style.display = "none";
                document.getElementById("AccountMade").style.display = "block";
            } else {
              var errormessage = await response.text();
              document.getElementById("ErrorLabel").style.display = "none";
              document.getElementById("ErrorLabel").innerText = errormessage;
              document.getElementById("ErrorLabel").style.display = "block";
            }
        }
    } catch (error) {
        document.getElementById("ErrorLabel").style.display = "none";
        document.getElementById("ErrorLabel").innerText = "An unknown error occured, the server might be down. Contact the developer via the information on the main page.";
        document.getElementById("ErrorLabel").style.display = "block";
    }
}
document.getElementById('register-form').addEventListener('submit', handleSubmit);