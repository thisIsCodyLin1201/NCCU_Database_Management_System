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
    // Display additional details when an option is selected
    if (this.value) {
        searchDetails.style.display = "block";
        stationDetails.textContent = "Information for " + this.value;
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


function toggleVisibility(activeBlockId, closeLinkContainer) {
    var allBlocks = ['searchBlock', 'reservationInfo', 'hotelInfo', 'account', 'faqContainer', 'contactUs', 'linkContainer', 'history'];
    var activeBlock = document.getElementById(activeBlockId);
    
    allBlocks.forEach(blockId => {
        var block = document.getElementById(blockId);
        if (block) { // 检查 block 是否为 null
            if (blockId === 'linkContainer' && !closeLinkContainer) {
                // Do not hide linkContainer when closeLinkContainer is false
            } else {
                block.style.display = (blockId === activeBlockId || (blockId === 'linkContainer' && !closeLinkContainer)) ? 
                                      (block.style.display === 'none' ? 'block' : 'none') : 'none';
            }
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
    window.location.href = "DBMS_Fontend.html";
});
// 從 URL 中獲取 id 參數的值
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const buttonID = urlParams.get('id');
const spanElement = document.getElementById('stationName');

// 創建一個陣列，並將六個字串儲存其中
const stringsArray = ['Ximen', 'Taipei Main Station', 'Shandao Temple','Zhongxiao Xinsheng Station', 'Zhongxiao Funxing Station', 'Zhongxiao Dunhua Station','Sun Yat-Sen Memorial Hall Station', 'Taipei City Hall'];
for (let i = 0; i < stringsArray.length; i++) {
    const targetButtonID = 'BL' + (i + 11); // 計算目標按鈕的ID
    if (buttonID === targetButtonID) {
        console.log(targetButtonID);
        spanElement.textContent = stringsArray[i];
        break; // 找到對應的按鈕後，結束迴圈
    }
}
/* 顯示或隱藏子選單
function show(theMainMenu, theSubMenu, theEvent) {
    var subMenu = document.getElementById(theSubMenu);
    if (subMenu.style.display === 'none') {
        subMenu.style.display = 'block';
    } else {
        subMenu.style.display = 'none';
    }
}
*/
const choosed = () => { 
    Swal.fire({
        title: 'Deposit Or Delivery?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Deposit',
        cancelButtonText: 'Delivery',
      }).then((result) => {
        if (result.isConfirmed) {
          // 如果用戶點擊 "Deposit Page" 按鈕，執行相應的操作
          window.location.href = 'http://127.0.0.1:5501/src/main/resources/templates/DepositPage.html'; // 導向到 deposit page
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // 如果用戶點擊 "Delivery" 按鈕，執行相應的操作
          window.location.href = 'http://127.0.0.1:5501/src/main/resources/templates/DeliveryPage.html'; // 導向到 delivery page
        }
      });
}