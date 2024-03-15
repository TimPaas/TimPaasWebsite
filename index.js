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
