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

    // Display the username and welcome message
    username1.textContent = username;
    setTimeout(() => {
        welcome.style.opacity = 1;
        username1.style.opacity = 1;
        dashboard.style.overflowY = "scroll";
    }, 500);

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
    const capsuleDiv = document.createElement("div");
    capsuleDiv.id = `capsule-${index}`;
    capsuleDiv.classList.add("capsule-item");

    // Display only the capsule title initially
    capsuleDiv.innerHTML = `<h3>Capsule ${index + 1}</h3>`;

    // Create a hidden div for the answers
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("capsule-answers");
    answersDiv.style.display = "none"; // Hide answers initially
    answersDiv.innerHTML = `
        <p>Question 1: ${capsule.question1}</p>
        <p>Question 2: ${capsule.question2}</p>
        <p>Question 3: ${capsule.question3}</p>
        <p>Question 4: ${capsule.question4}</p>
        <p>Question 5: ${capsule.question5}</p>
    `;
    
    // Append the answers div to the capsule, but keep it hidden
    capsuleDiv.appendChild(answersDiv);

    // Toggle the visibility of the answers when the capsule title is clicked
    capsuleDiv.addEventListener("click", () => {
        if (answersDiv.style.display === "none") {
            answersDiv.style.display = "block";
        } else {
            answersDiv.style.display = "none";
        }
    });

    return capsuleDiv;
}


async function fetchCapsules(username) {
    showCreateCapsuleButton();
    const capsuleContent = document.getElementById("capsule-content");
    try {
        const response = await fetch(`http://127.0.0.1:5001/get_capsules?username=${username}`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        
        const result = await response.json();

        if (result.capsules.length > 0) {
            // Display all existing capsules side-by-side
            capsuleContent.style.display = "flex"; // Flex display for side-by-side layout
            capsuleContent.style.flexWrap = "wrap";
            capsuleContent.innerHTML = ""; // Clear any previous content

            result.capsules.forEach((capsule) => {
                const capsuleDiv = document.createElement("div");
                capsuleDiv.classList.add("capsule-item");
                capsuleDiv.id = `capsule-${capsule.id}`; // Set a unique ID for each capsule item
                capsuleDiv.innerHTML = `
                    <h3>Capsule ${capsule.id}</h3>
                    <p>Question 1: ${capsule.question1}</p>
                    <p>Question 2: ${capsule.question2}</p>
                    <p>Question 3: ${capsule.question3}</p>
                    <p>Question 4: ${capsule.question4}</p>
                    <p>Question 5: ${capsule.question5}</p>
                `;
                capsuleContent.appendChild(capsuleDiv);
            });
        } else {
            // Show "Create Capsule" button if no capsules exist
            showCreateCapsuleButton();
        }
    } catch (error) {
        console.error("Error fetching capsules:", error);
        alert("Error fetching capsules. Please try again later.");
    }
}


// Display the form to create a new capsule
function showCapsuleForm() {
    const capsuleContent = document.getElementById("capsule-content");

    capsuleContent.innerHTML = `
        <form id="capsule-form">
            <label>Question 1: What is your favorite memory?</label>
            <input type="text" name="question1" required><br><br>

            <label>Question 2: Where would you like to travel?</label>
            <input type="text" name="question2" required><br><br>

            <label>Question 3: What are your future goals?</label>
            <input type="text" name="question3" required><br><br>

            <label>Question 4: Who has influenced you the most?</label>
            <input type="text" name="question4" required><br><br>

            <label>Question 5: Describe a challenging experience you overcame.</label>
            <input type="text" name="question5" required><br><br>

            <button type="submit">Submit Answers</button>
        </form>
    `;

    document.getElementById("capsule-form").addEventListener("submit", submitCapsuleForm);
}

// Handle the form submission for creating a new capsule
async function submitCapsuleForm(event) {
    event.preventDefault();

    const username = localStorage.getItem("username");
    const question1 = document.querySelector('input[name="question1"]').value;
    const question2 = document.querySelector('input[name="question2"]').value;
    const question3 = document.querySelector('input[name="question3"]').value;
    const question4 = document.querySelector('input[name="question4"]').value;
    const question5 = document.querySelector('input[name="question5"]').value;

    try {
        const response = await fetch("http://127.0.0.1:5001/save_capsule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                question1: question1,
                question2: question2,
                question3: question3,
                question4: question4,
                question5: question5
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
