function menuFunction() {
    var menuDiv = document.getElementById("menuDiv");
    var personalia = document.getElementById("personalia");
    var profile = document.getElementById("profile");

    if (menuDiv.style.display == "block") {
        menuDiv.style.animation = "fadeOut 0.35s"; // Apply fadeOut animation
        menuDiv.addEventListener("animationend", function() {
            menuDiv.style.display = "none"; // Hide the menuDiv after animation ends
        }, { once: true });
        personalia.classList.remove('blur');
        profile.classList.remove('blur');
    } else {
        menuDiv.style.display = "block";
        menuDiv.style.animation = "fadeIn 0.35s"; // Apply fadeIn animation
        personalia.classList.add('blur');
        profile.classList.add('blur');
    }
}

document.addEventListener('click', function(event) {
    var menuDiv = document.getElementById("menuDiv");
    var personalia = document.getElementById("personalia");
    var profile = document.getElementById("profile");
    var tdobject = document.getElementById("3DObject");

    // Check if the screen is currently blurred
    if (personalia.classList.contains('blur') && profile.classList.contains('blur')) {
        // Check if the clicked element is outside the menuDiv
        if (!menuDiv.contains(event.target) && !tdobject.contains(event.target)) {
            // Remove blur effect and hide menuDiv
            menuDiv.style.animation = "fadeOut 0.35s"; // Apply fadeOut animation
            menuDiv.addEventListener("animationend", function() {
                menuDiv.style.display = "none"; // Hide the menuDiv after animation ends
            }, { once: true });
            personalia.classList.remove('blur');
            profile.classList.remove('blur');
        }
    }
});


    document.addEventListener('DOMContentLoaded', function () {
        // Add event listener to the form
        document.getElementById('mail-service-form').addEventListener('submit', function (event) {
          // Prevent the default form submission
          event.preventDefault();
  
          // Reset the form after submission
          this.reset();
  
          // Display confirmation message
          displayConfirmationMessage();
        });
  
        // Function to display confirmation message
        function displayConfirmationMessage() {
          // Create a new element for the confirmation message
          var confirmationMessage = document.createElement('div');
          confirmationMessage.id = 'confirmation-message';
          confirmationMessage.textContent = 'Thank you for your submission! We will get back to you soon.';
  
          // Append the element to the body
          document.body.appendChild(confirmationMessage);
  
          // Display the message
          confirmationMessage.style.display = 'block';
  
          // Hide the message after a few seconds (adjust as needed)
          setTimeout(function () {
            confirmationMessage.style.display = 'none';
          }, 3000); // 3000 milliseconds (3 seconds)
        }
      });

// CAPTCHA

      function handleAcceptClick() {
          grecaptcha.execute('6Lcmr3IpAAAAAEGUgkz6w4joPBr7fBFYts0Mq8ka');
      }
  
      function handleRejectClick() {
          grecaptcha.execute('6Lcmr3IpAAAAAEGUgkz6w4joPBr7fBFYts0Mq8ka');
      }

// Mailservice
    async function handleSubmit(event) {
    event.preventDefault();
 
    // Collect form data
    const formData = new FormData(document.getElementById('mail-service-form'));
    const email = formData.get('email');
    const subject = formData.get('subject');
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const text = formData.get('Message');
    // setEmailStatus('');
    // setLoadingStatus(true);
 
    try {
        const requestPromises = [];
        requestPromises.push(fetch('http://localhost:5122/api/Email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                emailMessage: email,
                subject: subject,
                firstname: firstname,
                lastname: lastname,
                message: text
            })
        }));
 
        const responses = await Promise.all(requestPromises);
 
        for (const response of responses) {
            if (response.ok) {
            } else {

            }
        }
    } catch (error) {

    }
}
function LoginCheckArtboard() {
    const token = localStorage.getItem('token');
    console.log('token:', token); // Add this line to check the value of token
    if (token) {
        window.location.href = 'artboard.html';
    } else {
        window.location.href = 'login.html';
    }
}


document.getElementById('mail-service-form').addEventListener('submit', handleSubmit);

// Vue Logic
const app = Vue.createApp({
    data() {
        return {
            introductionDescription: 'Student Software Developer',
            aboutMe: '\"Hello, I am Tim. A passionate programmer who is based in Steenwijk, The Netherlands. I get along well with people and enjoy cooperative work. I like a challenging environment and I don\'t shy away from challenges.\"',
        }
    }
})
app.mount('#page')

const token = localStorage.getItem('token');
console.log('token:', token); // Add this line to check the value of token
var loginoutButton = document.getElementById("loginButton");
var currentUser = document.getElementById("current-user");
if (token) {
    loginoutButton.innerText = "Log Out";
    var username = localStorage.getItem("username");
    currentUser.innerHTML = "Welcome <span class='text-shadows'>" + username + "!</span>";
} else {
    loginoutButton.innerText = "Log in";
    currentUser.innerHTML = "Log in to access more features! Try pressing the <span class='text-shadows'>3D</span> logo...";
    currentUser.style.top = "23px";
}

function LoginPageCheck(){
    if (!token){
        window.location.href = "login.html"
    }
    else{
        localStorage.removeItem('token');
        location.reload();
    }
}
