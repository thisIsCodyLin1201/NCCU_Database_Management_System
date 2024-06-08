
// Define the station names grouped by line


var searchInput = document.getElementById("searchInput");
var searchDropdown = document.getElementById("searchDropdown");

// Event listener to update dropdown when input changes
searchInput.addEventListener("input", function(event) {
    var searchValue = event.target.value.trim().toLowerCase();
    var filteredStations = [];

    // Filter stations based on input
    stationNames.forEach(function(line) {
        line.options.forEach(function(station) {
            if (station.toLowerCase().includes(searchValue)) {
                filteredStations.push({ label: line.label, value: station });
            }
        });
    });

    // Render dropdown
    renderDropdown(filteredStations);
});

// Function to render the dropdown
function renderDropdown(options) {
    // Clear previous dropdown
    searchDropdown.innerHTML = "";

    // Add options to dropdown
    options.forEach(function(option) {
        var item = document.createElement("div");
        item.textContent = option.label + " - " + option.value;
        item.classList.add("dropdown-item");
        searchDropdown.appendChild(item);
    });
}
// JavaScript to go back to initial homepage when the logo is clicked
document.querySelector(".logo").addEventListener("click", function() {
    window.location.href = "DBMS_Fontend.html";
});

// Toggle search block visibility and update search input
document.getElementById("searchLink").addEventListener("click", function(event) {
    event.preventDefault();
    toggleVisibility('searchBlock', true); // true to close linkContainer
    var searchInput = document.getElementById("searchInput");
    var searchBlock = document.getElementById("searchBlock");
    // Display the search input when 'Search' is clicked
    if (searchInput.style.display === "none") {
        searchInput.style.display = "block";
        searchBlock.style.display = "block"; // Ensure the container is visible
    } else {
        searchInput.style.display = "none";
        searchBlock.style.display = "none"; // Hide entire block if clicked again
    }
});

document.getElementById("searchInput").addEventListener("change", function() {
    var stationDetails = document.getElementById("stationDetails");
    var searchDetails = document.getElementById("searchDetails");
    var contentMap = {
        "BL11 Ximen": "Locker location for BL11 Ximen<br>Exit 2<br>Exit 5",
        "BL12 Taipei Main Station": "Locker location for BL12 Taipei Main Station<br>Exit 1<br>Exit 3",
        "BL13 Shandao Temple": "Locker location for BL13 Shandao Temple<br>Exit 1<br>Exit 3",
        "BL14 Zhongxiao Xinsheng": "Locker location for BL14 Zhongxiao Xinsheng<br>Exit 2",
        "BL15 Zhongxiao Fuxing": "Locker location for BL15 Zhongxiao Fuxing<br>Exit 1",
        "BL16 Zhongxiao Dunhua": "Locker location for BL16 Zhongxiao Dunhua<br>Exit 5",
        "BL17 Sun Yat-Sen Memorial Hall": "Locker location for BL17 Sun Yat-Sen Memorial Hall<br>Exit 2",
        "BL18 Taipei City Hall": "Locker location for BL18 Taipei City Hall<br>Exit 4"
    };
    // Display additional details when an option is selected
    if (this.value) {
        searchDetails.style.display = "block";
        stationDetails.innerHTML = contentMap[this.value] || "No information available for this station";
    }
});


// Toggle reservation info visibility
document.getElementById('reservationLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleVisibility('reservationInfo', true); // true to close linkContainer
});

document.getElementById('hotelLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleVisibility('hotelInfo', true); // true to close linkContainer
});



// Generic function to toggle visibility of a specific block and hide others
function toggleVisibility(activeBlockId, closeLinkContainer) {
    var allBlocks = ['searchBlock', 'reservationInfo', 'hotelInfo', 'account' ,'faqContainer', 'contactUs', 'linkContainer', 'history'];
    var activeBlock = document.getElementById(activeBlockId);
    allBlocks.forEach(blockId => {
        var block = document.getElementById(blockId);
        if (blockId === 'linkContainer' && !closeLinkContainer) {
            // Do not hide linkContainer when closeLinkContainer is false
        } else {
            block.style.display = (blockId === activeBlockId || blockId === 'linkContainer' && !closeLinkContainer) ? 
                                  (block.style.display === 'none' ? 'block' : 'none') : 'none';
        }
    });
}


// JavaScript for More link to toggle linkContainer visibility and hide others
document.getElementById("moreLink").addEventListener("click", function(event) {
    event.preventDefault();
    toggleVisibility('linkContainer', true); // Manage linkContainer directly
    
});

document.getElementById('accountLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleVisibility('account', false); // false to keep linkContainer open
});

document.getElementById('historyLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleVisibility('history', false); // false to keep linkContainer open
});

document.getElementById('faqLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleVisibility('faqContainer', false); // false to keep linkContainer open
});


// Additional handling for FAQ link to toggle the FAQ block
document.getElementById('contactLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleVisibility('contactUs', false); // false to keep linkContainer open
});

document.querySelectorAll('.historyTitle').forEach(title => {
    title.addEventListener('click', function() {
        // Hide all history titles
        const allTitles = document.querySelectorAll('.historyTitle');
        allTitles.forEach(t => t.style.display = 'none');

        // Get the history title text to update the header
        const historyTitleText = this.textContent;

        // Update the history header with this title
        const historyHeader = document.querySelector('#history h2'); // Ensure you have an <h2> element in your #history div for the title
        if (historyHeader) {
            historyHeader.textContent = historyTitleText;
        }

        // Show the corresponding detail for the clicked title
        const detail = this.nextElementSibling; // Get the associated detail block
        detail.style.display = 'block'; // Show the detail block

        // Add a back button if it doesn't exist
        if (!detail.querySelector('.backButton')) {
            const backButton = document.createElement('button');
            backButton.className = 'backButton';
            backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                    </svg> back`;
            backButton.onclick = () => {
                // Hide this detail and show all history titles again
                detail.style.display = 'none';
                allTitles.forEach(t => t.style.display = 'block');
                // Reset the history header to default when going back
                if (historyHeader) {
                    historyHeader.textContent = "HISTORY";
                }
            };
            detail.appendChild(backButton);
        }
    });
});
/*
document.querySelectorAll('.historyTitle').forEach(title => {
    title.addEventListener('click', function() {
        // Hide all history titles
        const allTitles = document.querySelectorAll('.historyTitle');
        allTitles.forEach(t => t.style.display = 'none');

        // Get the history title text to update the header
        const historyTitleText = this.textContent;

        // Ensure the history header container is ready
        const historyHeaderContainer = document.querySelector('#history h2').parentNode; // Get the parent container of the h2
        const newHeader = document.createElement('h3');
        newHeader.textContent = historyTitleText;
        
        // Replace the existing h2 header with h3
        const currentHeader = historyHeaderContainer.querySelector('h2');
        if (currentHeader) {
            historyHeaderContainer.replaceChild(newHeader, currentHeader);
        }

        // Show the corresponding detail for the clicked title
        const detail = this.nextElementSibling; // Get the associated detail block
        detail.style.display = 'block'; // Show the detail block

        // Add a back button if it doesn't exist
        if (!detail.querySelector('.backButton')) {
            const backButton = document.createElement('button');
            backButton.className = 'backButton';
            backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                    </svg> Back`;
            backButton.onclick = () => {
                // Hide this detail and show all history titles again
                detail.style.display = 'none';
                allTitles.forEach(t => t.style.display = 'block');

                // Replace the h3 header back with an h2
                const oldHeader = document.createElement('h2');
                oldHeader.textContent = "HISTORY";
                historyHeaderContainer.replaceChild(oldHeader, newHeader);
            };
            detail.appendChild(backButton);
        }
    });
});
*/





document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling; // Assuming the answer div directly follows the question
        answer.style.display = (answer.style.display === 'none') ? 'block' : 'none';

        // Optionally rotate the chevron icon
        const svg = this.querySelector('svg');
        svg.classList.toggle('rotated');
    });
});

document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent any default action
    // Show a pop-up alert window
    alert('You have been logged out.');
    // Redirect to the homepage
    window.location.href = "WelcomePage.html";
});



//新增Buttons
const container = document.getElementById('buttons-container');
/*
// 紅線
for (let i = 2; i <= 28; i++) {
    const button = document.createElement('button');
    button.id = 'R' + (i < 10 ? '0' : '') + i;
    button.className = 'map-button';
    container.appendChild(button);
}

// 棕線
for (let i = 1; i <= 24; i++) {
    const button = document.createElement('button');
    button.id = 'BR' + (i < 10 ? '0' : '') + i; // Ensuring two-digit format
    button.className = 'map-button';
    container.appendChild(button);
}
*/
// 藍線


for (let i = 11; i <= 18; i++) {
    const button = document.createElement('button');
    button.id = 'BL' + (i < 10 ? '0' : '') + i;
    button.className = 'map-button';
    button.addEventListener('click', function() {
        // 獲取按鈕的 ID
        const buttonID = this.id;
        // 導航到 StationInfo.html 頁面，並將按鈕的 ID 作為參數傳遞
        window.location.href = 'http://127.0.0.1:5501/src/main/resources/templates/StationInfo.html?id=' + buttonID;

    });
    container.appendChild(button);
}



       
       
/*
//綠線
for (let i = 1; i <= 19; i++) {
    const button = document.createElement('button');
    button.id = 'G' + (i < 10 ? '0' : '') + i; // Ensuring two-digit format
    button.className = 'map-button';
    container.appendChild(button);
}

//橘線-新莊
for (let i = 1; i <= 21; i++) {
    const button = document.createElement('button');
    button.id = 'O' + (i < 10 ? '0' : '') + i; // Ensuring two-digit format
    button.className = 'map-button';
    container.appendChild(button);
}
//橘線-三蘆
for (let i = 50; i <= 54; i++) {
    const button = document.createElement('button');
    button.id = 'O' + i; // Ensuring two-digit format
    button.className = 'map-button';
    container.appendChild(button);
}*/

/*測試*/
/*
// Example of adding station codes as button text
const lines = {
    'R': 28,
    'BR': 24,
    'BL': 23,
    'G': 19,
    'O': 21, // Assuming O line goes up to 21
    'O-Sanlu': 54 // Assuming special case for O line from 50-54
};

Object.keys(lines).forEach(line => {
    const count = lines[line];
    const isSpecial = line.includes('-'); // Check if it's a special naming case
    const base = isSpecial ? 50 : 1; // Starting index for special cases like 'O-Sanlu'

    for (let i = base; i <= count; i++) {
        const button = document.createElement('button');
        const code = `${line.replace('-Sanlu', '')}${i < 10 && base === 1 ? '0' + i : i}`; // Ensuring two-digit format
        button.id = code;
        button.className = 'map-button';
        button.textContent = code; // Set the button text to the station code
        container.appendChild(button);
    }
});
*/

/*
//拖拉地圖
// Get the background image element
const backgroundImage = document.getElementById('bgImage');

// Get all the buttons
const buttons = document.querySelectorAll('.map-button');

// Initialize variables for tracking mouse movement
let isDragging = false;
let initialX = 0;
let initialY = 0;
let initialButtonPositions = {}; // Store initial positions of buttons

// Store initial positions of buttons
buttons.forEach(button => {
    // Get initial positions from CSS using window.getComputedStyle()
    const buttonStyles = window.getComputedStyle(button);
    const initialLeft = buttonStyles.getPropertyValue('left');
    const initialTop = buttonStyles.getPropertyValue('top');

    // Set initial positions obtained from CSS
    button.style.left = initialLeft;
    button.style.top = initialTop;

    initialButtonPositions[button.id] = {
        left: button.style.left, 
        top: button.style.top
    };
});

// Add event listeners for mouse down, move, and up events
backgroundImage.addEventListener('mousedown', function(event) {
  isDragging = true;
  initialX = event.clientX;
  initialY = event.clientY;
});

document.addEventListener('mousemove', function(event) {
  if (isDragging) {
    const movementX = event.clientX - initialX;
    const movementY = event.clientY - initialY;

    // Update background image position
    const currentPositionX = backgroundImage.style.backgroundPositionX ? parseInt(backgroundImage.style.backgroundPositionX) : 0;
    const currentPositionY = backgroundImage.style.backgroundPositionY ? parseInt(backgroundImage.style.backgroundPositionY) : 0;
    backgroundImage.style.backgroundPositionX = `${currentPositionX + movementX}px`;
    backgroundImage.style.backgroundPositionY = `${currentPositionY + movementY}px`;

    // Move all buttons in the same direction and distance as BR13
    buttons.forEach(button => {
      const initialButtonPosition = initialButtonPositions[button.id];
      button.style.left = `${initialButtonPosition.left + movementX}px`;
      button.style.top = `${initialButtonPosition.top + movementY}px`;
    });

    initialX = event.clientX;
    initialY = event.clientY;
  }
});
*/
// Get the background image container element
const backgroundImage = document.getElementById('bgImage');
// Get all buttons with class 'map-button'
const buttons = document.querySelectorAll('.map-button');

// Variables to track dragging state
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let offsetX = 0;
let offsetY = 0;

// Function to update the position of the map and buttons
function updatePositions(dx, dy) {
    backgroundImage.style.backgroundPositionX = `${offsetX + dx}px`;
    backgroundImage.style.backgroundPositionY = `${offsetY + dy}px`;
    buttons.forEach(button => {
        button.style.transform = `translate(${dx}px, ${dy}px)`;
    });
}

// Mouse down event to initiate dragging
backgroundImage.addEventListener('mousedown', function(event) {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    event.preventDefault(); // Prevent default drag behavior
});

// Mouse move event to handle dragging
document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        updatePositions(dx, dy);
    }
});

// Mouse up event to end dragging
document.addEventListener('mouseup', function(event) {
    if (isDragging) {
        offsetX += event.clientX - dragStartX;
        offsetY += event.clientY - dragStartY;
        isDragging = false;
        // Reset transformations on buttons to bake in the translation
        buttons.forEach(button => {
            const computedStyle = window.getComputedStyle(button);
            button.style.left = `${parseInt(computedStyle.left, 10) + (event.clientX - dragStartX)}px`;
            button.style.top = `${parseInt(computedStyle.top, 10) + (event.clientY - dragStartY)}px`;
            button.style.transform = ''; // Clear transform to avoid accumulation
        });
    }
});

/*
// Zoom functionality
let zoomLevel = 1;

backgroundImage.addEventListener('wheel', function(event) {
    event.preventDefault(); // Prevent scrolling the page
    const zoomDirection = event.deltaY < 0 ? 0.1 : -0.1;
    zoomLevel = Math.max(0.5, Math.min(3, zoomLevel + zoomDirection));
    backgroundImage.style.transform = `scale(${zoomLevel})`;
    buttons.forEach(button => {
        button.style.transform = `scale(${zoomLevel})`;
    });
});
*/

// Variables to track zoom state
/*
let zoomLevel = 1;
const initialButtonScale = 1; // Initial scale level for buttons

backgroundImage.addEventListener('wheel', function(event) {
    event.preventDefault(); // Prevent scrolling the page
    const zoomDirection = event.deltaY < 0 ? 0.1 : -0.1;
    zoomLevel = Math.max(0.5, Math.min(3, zoomLevel + zoomDirection));

    // Apply zoom level to background image
    backgroundImage.style.transform = `scale(${zoomLevel})`;

    // Calculate inverse scale for buttons to maintain their screen size
    const buttonScale = initialButtonScale / zoomLevel;

    // Apply the inverse scale to each button
    buttons.forEach(button => {
        button.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${buttonScale})`;
    });
});
*/  
