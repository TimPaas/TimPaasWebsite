// const token = localStorage.getItem('token');
// if(!token){
//   window.location.href = "login.html"
// }

let previousPixel = null;

document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.container');

  // Create grid of pixels
  for (let i = 0; i < 40 * 40; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.addEventListener('click', function() {
      showColorPicker(this);
    });
    container.appendChild(pixel);
  }
});

function showColorPicker(pixel) {
  const colorPicker = document.querySelector('.color-picker');
  colorPicker.style.display = 'block';
  colorPicker.innerHTML = ''; // Clear previous content
  
  // Remove red border from previous pixel
  if (previousPixel) {
    previousPixel.style.borderColor = '';
    previousPixel.style.border = "0px";
    previousPixel.style.width = "20px";
    previousPixel.style.height = "20px";
  }
  
  pixel.style.width = "18.66px";
  pixel.style.height = "18.66px";
  pixel.style.border = "1px solid #ddd";
  pixel.style.borderColor = "red";

  const input = document.createElement('input');
  input.type = 'color';
  input.addEventListener('input', function() {
    pixel.style.backgroundColor = this.value;
    colorPicker.style.display = 'none';
    pixel.style.border = "0px";
    pixel.style.width = "20px";
    pixel.style.height = "20px";
  });
  colorPicker.appendChild(input);
  
  // Update previousPixel to current pixel
  previousPixel = pixel;
}
