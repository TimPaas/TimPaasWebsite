// const token = localStorage.getItem('token');
// if(!token){
//   window.location.href = "login.html"
// }

let previousPixel = null;

document.addEventListener("DOMContentLoaded", async function() {
  const container = document.querySelector('.container');

  // Fetch artboard data from the server
  const artboardData = await fetchArtboardData();

  // Create grid of pixels and set colors based on fetched data
  for (let i = 0; i < 40 * 40; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    container.appendChild(pixel); // Append pixel to container before setting color
    pixel.addEventListener('click', function() {
      showColorPicker(this); // Show color picker when pixel is clicked
    });

    // Set color from fetched data if available
    const pixelData = artboardData.find(item => item.location === i);
    if (pixelData) {
      const color = `rgb(${pixelData.rgbValue})`;
      pixel.style.backgroundColor = color;
      if (color != "rgb(255,255,255)"){
        pixel.style.border = `1px solid ${color}`;
      }
      else{
        pixel.style.border = `1px solid #ddd`;

      }
    }
  }
});



function showColorPicker(pixel) {
  const colorPicker = document.querySelector('.color-picker');
  colorPicker.style.display = 'block';
  colorPicker.innerHTML = ''; // Clear previous content
  
  // Remove red border from previous pixel
  if (previousPixel && previousPixel.style.backgroundColor == "rgb(255, 255, 255)") {
    previousPixel.style.border = "1px solid #ddd";
    previousPixel.style.width = "18.66px";
    previousPixel.style.height = "18.66px";
  } else if (previousPixel && previousPixel.style.backgroundColor != "rgb(255, 255, 255)"){
    const pixelColor = previousPixel.style.backgroundColor;
    previousPixel.style.border = `1px solid ${pixelColor}`;  }
  
    pixel.style.width = "18.66px";
    pixel.style.height = "18.66px";
    pixel.style.border = "1px solid #ddd";
    if (pixel.backgroundColor != "red"){
    pixel.style.borderColor = "red";
    } else{
      pixel.style.borderColor = "darkred";

    }

  const input = document.createElement('input');
  input.type = 'color';
  input.addEventListener('input', function() {
    pixel.style.backgroundColor = this.value;
    const pixelColor = pixel.style.backgroundColor;
    colorPicker.style.display = 'none';
    pixel.style.border = `1px solid ${pixelColor}`;
  pixel.style.width = "18.66px";
  pixel.style.height = "18.66px";
    handleSubmit();
  });
  colorPicker.appendChild(input);

  // Update previousPixel to current pixel
  previousPixel = pixel;
}




async function handleSubmit() {
  if (!previousPixel) {
      console.error("No pixel selected.");
      return;
  }

  try {
      const pixelIndex = Array.prototype.indexOf.call(previousPixel.parentNode.children, previousPixel); // Get index of selected pixel
      const color = rgbToCsv(previousPixel.style.backgroundColor || "rgb(255, 255, 255)"); // Get color of selected pixel or default to white

      // Send pixel data to server using PUT method
      const response = await fetch(`http://localhost:5122/api/Artboards/${pixelIndex}`, {
          method: 'PUT',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
              Location: pixelIndex,
              RGBValue: color
          })
      });

      if (response.ok) {
          console.log("Pixel data updated successfully.");
          // Clear the color picker and reset previousPixel
          previousPixel.style.width = "18.66px";
          previousPixel.style.height = "18.66px";
          previousPixel = null;
      } else {
          console.error("Failed to update pixel data:", await response.text());
      }
  } catch (error) {
      console.error("An error occurred:", error);
  }
}

function rgbToCsv(rgb) {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return match ? `${match[1]},${match[2]},${match[3]}` : '0,0,0';
}

// Fetch artboard data from the server
async function fetchArtboardData(page = 1, pageSize = 100) {
  try {
    const response = await fetch(`http://localhost:5122/api/Artboards?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error('Failed to fetch artboard data');
    }
    const artboardData = await response.json();
    return artboardData;
  } catch (error) {
    console.error('Error fetching artboard data:', error);
    return [];
  }
}



// Set colors and locations on the artboard based on fetched data
async function setArtboardFromData() {
  const artboardData = await fetchArtboardData();
  artboardData.forEach(pixel => {
    const pixelIndex = parseInt(pixel.location); // Parse location as an integer
    const color = `rgb(${pixel.rgbValue})`.toLowerCase(); // Convert color to lowercase for consistent comparison
    const pixelElement = document.querySelector(`.container .pixel:nth-child(${pixelIndex + 1})`);
    if (pixelElement) {
      pixelElement.style.backgroundColor = color;
    }
  });
}












// Call this function to set artboard data when needed
setArtboardFromData();
