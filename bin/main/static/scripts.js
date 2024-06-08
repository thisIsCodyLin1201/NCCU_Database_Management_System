
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


var VisibleMenu = ''; // 記錄目前顯示的子選單的 ID
function getvalue(inputId){ //get  value
var input = document.getElementById(inputId);
 if (input) {
    var str = input.value;
    onsole.log(str);
 }
}
function getpass(inputId){ //get password value
    var input = document.getElementById(inputId);
    if (input) {
        var str = input.value;
        console.log(str);
    }
}
   

/* 顯示或隱藏子選單
function switchMenu(theMainMenu, theSubMenu, theEvent) {
    var subMenu = document.getElementById('SubMenu1');
    if (subMenu.style.display === 'none') {
        subMenu.style.display = 'block';
    } else {
        subMenu.style.display = 'none';
    }
}
*/

const en = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'yyyy/MM/dd',
    timeFormat: 'hh:mm aa',
    firstDay: 0
};
const today = new Date(); // 獲取當前日期
const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 獲取一星期後的日期

const datepicker = new AirDatepicker('#myDatepicker',{
    locale: en, // Set language
    minDate: today, // 設定最小日期為今天
    maxDate: oneWeekLater, // 設定最大日期為一星期後
});

// 定義 time 函數
function time(inputId1, inputId2) {
    var startStr = document.getElementById(inputId1).value;
    var endStr = document.getElementById(inputId2).value;

    // 將時間字符串轉換為 Date 物件，並設置相同的日期（例如 2000/01/01）
    var start = new Date("2000/01/01 " + startStr);
    var end = new Date("2000/01/01 " + endStr);

    if (start < end) {
       
    } else if (start > end) {
      
    } else {
     
    }
}
const confirmed = () => {
    Swal.fire({
        icon: 'success',
        title: 'RESERVATION CONFIRMED!',
        html: 'Your reservation no is!<br>Check your reservation status on RESERVATION Page.',
        willClose: () => {
            window.location.href = 'http://127.0.0.1:5501/src/main/resources/templates/DBMS_Fontend.html'; // 替换为你的目标页面 URL
        }
    }); 
}
//choose delivery or deposit 
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


    $(document).ready(function() {
        // 初始化 start timepicker
        var start = $("#start").kendoTimePicker({
            change: startChange
        }).data("kendoTimePicker");
    
        // 初始化 end timepicker
        var end = $("#end").kendoTimePicker().data("kendoTimePicker");
    
        // 定義最小/最大範圍
        start.min("8:00 AM");
        start.max("6:00 PM");
    
        // 定義最小/最大範圍
        end.min("8:00 AM");
        end.max("7:30 AM");
    
        // start timepicker 改變事件處理函式
        function startChange() {
            var startTime = start.value(),
                endTime = end.value();
    
            if (startTime) {
                startTime = new Date(startTime);
                startTime.setMinutes(startTime.getMinutes() + 30);
                end.min(startTime);
            } else if (endTime) {
                start.max(new Date(endTime));
            } else {
                end.min("8:00 AM");
            }
        }
    });
    



    const apiBaseUrl = 'http://localhost:8080';

 
    /////api

    function fetchAllReservations() {
        fetch(`${apiBaseUrl}/reservations`)
            .then(response => response.json())
            .then(data => {
                console.log('All Reservations:', data);
                // Here you can update your UI with the fetched data
            })
            .catch(error => console.error('Error fetching reservations:', error));
    }


    document.getElementById('confirm').addEventListener('click', function(event) {
        event.preventDefault();

        const date = document.getElementById('myDatepicker').value;
        const quantity = document.getElementById('quantity').value;

        fetch('http://localhost:8080/api/reservation/addreservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: date, quantity: quantity })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const lockerName = urlParams.get('save');
    const lockerSize= urlParams.get('no');
    const spanElement = document.getElementById('title');
    spanElement.textContent = lockerSize;

function handleEmailInput() {
    var emailLabel = document.getElementById("emailLabel");
    var emailInput = document.getElementById("emailInput");
    if (emailInput.value !== "") {
        emailLabel.textContent = "";
    } else {
        emailLabel.textContent = "Email";
    }
}

function verifyEmail() {
    var emailInput = document.getElementById("emailInput");
    var emailValue = emailInput.value.trim();
    if (emailValue === "") {
        alert("Please input your E-mail");
    } else {
        getvalue('emailforget');
        window.location.href = 'http://127.0.0.1:5501/src/main/resources/templates/LoginPage.html';
    }
}
    