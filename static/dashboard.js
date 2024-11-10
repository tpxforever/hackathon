document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem("username");

    // Redirect to login if no username is found in localStorage
    if (!username) {
        window.location.href = "/login";
        return;
    }

    // Select elements from the DOM
    const rectangleBar = document.getElementById("rectangle-bar");
    const sidebar = document.getElementById("sidebar");
    const welcome = document.getElementById("Welcome");
    const username1 = document.getElementById("username1");
    const capsuleContent = document.getElementById("capsule-content");
    const capsulesSection = document.getElementById("capsules-section");
    const dashboard = document.getElementById("dashboard");
    const capsuleButton = document.getElementById("capsule-button");
    // Display the username and welcome message
    username1.textContent = username;
    capsuleButton.addEventListener("click", async () =>
    {
        welcome.style.display = "none";
        username1.style.display = "none";
        showCapsuleForm();
    });
    setTimeout(() => {
        welcome.style.opacity = 1;
        username1.style.opacity = 1;
        dashboard.style.overflowY = "scroll";
    }, 500);

    setTimeout(() => {
        capsuleButton.style.opacity = 1;
        capsuleButton.style.cursor = "pointer";
    }, 2000);

    // Display the rectangle bar and sidebar with animations
    setTimeout(() => {
        rectangleBar.classList.add("rectangle-bar-active");
    }, 500);
    setTimeout(() => {
        sidebar.classList.add("sidebar-visible");
    }, 1500);

    // Event listener for "Capsules" button click
    capsulesSection.addEventListener("click", async () => {
        // Hide welcome message and username
        welcome.style.display = "none";
        username1.style.display = "none";
        fetchCapsules(username);
    });
});

// Create a <style> element and append it to the document head
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

function addCapsuleStyle(index) {
    const color = colors[index % colors.length];
    styleElement.sheet.insertRule(`
        #capsule-${index} {
            background-color: ${color};
            margin-right: 10px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 200px;
            min-height: 150px;
            transition: transform 0.3s;
        }
    `, styleElement.sheet.cssRules.length);

    styleElement.sheet.insertRule(`
        #capsule-${index}:hover {
            transform: scale(1.05);
        }
    `, styleElement.sheet.cssRules.length);
}

function generateCapsuleElement(capsule, index) {
    const questions = [
        "What is your favorite memory?",
        "Where would you like to travel?",
        "What are your future goals?",
        "Who has influenced you the most?",
        "Describe a challenging experience you overcame."
    ];    
    const capsuleDiv = document.createElement("div");
    capsuleDiv.id = `capsule-${index}`;
    capsuleDiv.classList.add("capsule-item");
    capsuleDiv.setAttribute("data-expired", "false"); // Track expired state for each capsule

    // Display the capsule title
    capsuleDiv.innerHTML = `<h3>Capsule ${index + 1}</h3>`;

    // Timer display
    const timerDiv = document.createElement("div");
    timerDiv.classList.add("capsule-timer");
    capsuleDiv.appendChild(timerDiv);

    let isExpired = false; // Track if this capsule is expired

    // Start countdown and set data-expired attribute when expired
    if (capsule.expiration_date) {
        console.log(`Starting countdown for Capsule ${index + 1} with expiration: ${capsule.expiration_date}`);
        startCountdown(timerDiv, capsule.expiration_date, () => {
            isExpired = true;
            capsuleDiv.setAttribute("data-expired", "true"); // Mark as expired
        });
    } else {
        console.warn(`No expiration date found for Capsule ${index + 1}`);
        timerDiv.textContent = "No expiration date set";
    }

    // Answers section with questions (initially hidden)
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("capsule-answers");
    answersDiv.id = `answers-${index}`; // Unique ID for each capsule’s answers
    answersDiv.style.display = "none";
    answersDiv.innerHTML = `
        <p><strong>Question 1:</strong> ${questions[0]} <br><strong>Answer:</strong> ${capsule.answer1}</p>
        <p><strong>Question 2:</strong> ${questions[1]} <br><strong>Answer:</strong> ${capsule.answer2}</p>
        <p><strong>Question 3:</strong> ${questions[2]} <br><strong>Answer:</strong> ${capsule.answer3}</p>
        <p><strong>Question 4:</strong> ${questions[3]} <br><strong>Answer:</strong> ${capsule.answer4}</p>
        <p><strong>Question 5:</strong> ${questions[4]} <br><strong>Answer:</strong> ${capsule.answer5}</p>
        <button class="close-button">Close</button>
    `;
    capsuleDiv.appendChild(answersDiv);

    // Click event to expand only if expired
    capsuleDiv.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents affecting other elements
        const isExpired = capsuleDiv.getAttribute("data-expired") === "true";
        if (isExpired) {
            expandCapsule(capsuleDiv, answersDiv); // Expand this capsule
        } else {
            alert("This capsule is not yet available.");
        }
    });

    return capsuleDiv;
}

// Function to expand a capsule and hide others
function expandCapsule(capsuleDiv, answersDiv) {
    // Hide all other capsules
    document.querySelectorAll(".capsule-item").forEach(capsule => {
        if (capsule !== capsuleDiv) {
            capsule.style.display = "none";
        }
    });

    // Expand the selected capsule
    capsuleDiv.classList.add("expanded"); // Add a CSS class for styling the expanded capsule
    answersDiv.style.display = "block"; // Show answers section

    // Add event listener to close button
    const closeButton = answersDiv.querySelector(".close-button");
    closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        collapseCapsule(capsuleDiv, answersDiv); // Collapse back to normal view
    });
}

// Function to collapse the expanded capsule and show all capsules again
function collapseCapsule(capsuleDiv, answersDiv) {
    // Show all other capsules
    document.querySelectorAll(".capsule-item").forEach(capsule => {
        capsule.style.display = "block";
    });

    // Collapse the expanded capsule
    capsuleDiv.classList.remove("expanded"); // Remove the expanded class
    answersDiv.style.display = "none"; // Hide answers section
}


function startCountdown(timerDiv, expirationDate, onExpireCallback) {
    const expiration = new Date(expirationDate);
    console.log("Parsed expiration date:", expiration);

    let intervalId;

    function updateTimer() {
        const now = new Date();
        const timeRemaining = expiration - now;

        if (timeRemaining <= 0) {
            timerDiv.textContent = "Unlocked";
            clearInterval(intervalId); // Stop the countdown when expired
            onExpireCallback(); // Call the expiration callback
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        timerDiv.textContent = `Time Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    intervalId = setInterval(updateTimer, 1000); // Update every second
    updateTimer(); // Initial immediate update
}


async function fetchCapsules(username) {
    const capsuleContent = document.getElementById("capsule-content");

    try {
        const response = await fetch(`http://127.0.0.1:5001/get_capsules?username=${username}`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        
        const result = await response.json();
        capsuleContent.style.display = "flex"; // Ensure the container is flex
        capsuleContent.style.flexWrap = "wrap";
        capsuleContent.innerHTML = ""; // Clear any previous content
        
        if (result.capsules.length > 0) {
            // Display all existing capsules side-by-side using generateCapsuleElement
            result.capsules.forEach((capsule, index) => {
                const capsuleDiv = generateCapsuleElement(capsule, index);
                capsuleDiv.style.borderRadius = "40px";
                capsuleDiv.style.textAlign = "center";
                capsuleContent.appendChild(capsuleDiv);
            });
        } else {
            showCreateCapsuleButton(); // Only show if no capsules exist
        }
    } catch (error) {
        console.error("Error fetching capsules:", error);
        alert("Error fetching capsules. Please try again later.");
    }
}


// Display the form to create a new capsule
function showCapsuleForm() {
    console.log("capsule form working");
    const capsuleContent = document.getElementById("capsule-content");
    capsuleContent.style.display = "flex";
    capsuleContent.innerHTML = `
        <form id="capsule-form">
            <label>Question 1: What is your favorite memory?</label>
            <input class="ans" type="text" name="answer1" required><br><br>

            <label>Question 2: Where would you like to travel?</label>
            <input class="ans" type="text" name="answer2" required><br><br>

            <label>Question 3: What are your future goals?</label>
            <input class="ans" type="text" name="answer3" required><br><br>

            <label>Question 4: Who has influenced you the most?</label>
            <input class="ans" type="text" name="answer4" required><br><br>

            <label>Question 5: Describe a challenging experience you overcame.</label>
            <input class="ans" type="text" name="answer5" required><br><br>

            <label for="timer">Choose Timer Duration:</label>
            <select id="timer" name="timer" required>
                <option value="5_seconds">5 Seconds</option>
                <option value="1_year">1 Year</option>
                <option value="5_years">5 Years</option>
            </select><br><br>

            <button type="submit">Submit Answers</button>
        </form>
    `;

    document.getElementById("capsule-form").addEventListener("submit", submitCapsuleForm);
}

// Handle the form submission for creating a new capsule
async function submitCapsuleForm(event) {
    event.preventDefault();

    const username = localStorage.getItem("username");
    const answer1 = document.querySelector('input[name="answer1"]').value;
    const answer2 = document.querySelector('input[name="answer2"]').value;
    const answer3 = document.querySelector('input[name="answer3"]').value;
    const answer4 = document.querySelector('input[name="answer4"]').value;
    const answer5 = document.querySelector('input[name="answer5"]').value;
    const timer = document.querySelector('select[name="timer"]').value;

    try {
        const response = await fetch("http://127.0.0.1:5001/save_capsule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                answer5: answer5,
                timer: timer
            })
        });

        const result = await response.json();
        if (result.success) {
            alert("Capsule saved successfully!");
            location.reload(); // Reload to display the new capsule
        } else {
            alert("Failed to save capsule.");
        }
    } catch (error) {
        console.error("Error saving capsule:", error);
        alert("Error saving capsule. Please try again.");
    }
}
