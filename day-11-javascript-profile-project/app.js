"use strict";

// 1. Profile object
const profile = {
    name: "Tehreem Ijaz",
    role: "Software Developer",
    experience: "Fresher",
    contact: "tehreemijaz@gmail.com",

    skills: [
        { name: "HTML", score: 90 },
        { name: "CSS", score: 85 },
        { name: "JavaScript", score: 75 },
        { name: "Python", score: 70 },
        { name: "GitHub", score: 65 }
    ],

    education: [
        "Web Development Training",
        "Computer Science"
    ],

    projects: [
        {
            name: "Personal Profile Website",
            description: "A website created using HTML and CSS."
        },
        {
            name: "Responsive Dashboard",
            description: "A responsive dashboard using CSS Grid."
        }
    ],

    achievements: [
        "Completed HTML training",
        "Completed CSS training",
        "Created a personal website"
    ]
};


// 2. Destructuring
const { name, role, experience, contact } = profile;


// 3. Spread syntax
const updatedSkills = [...profile.skills];


// 4. Function to display profile information
function showProfile() {
    document.getElementById("profileName").textContent = name;

    document.getElementById("profileRole").textContent = role;

    document.getElementById("profileExperience").textContent =
        `Experience: ${experience}`;

    document.getElementById("profileContact").textContent =
        `Contact: ${contact}`;
}

// 5. Function to display skills
function showSkills(skillArray) {

    const skillsList = document.getElementById("skillsList");

    skillsList.innerHTML = "";

    skillArray.forEach(function(skill) {

        const skillElement = document.createElement("span");

        skillElement.className = "skill";

        skillElement.textContent = skill.name;

        skillsList.appendChild(skillElement);

    });
}

// 6. Arrow function to calculate average skill score
const calculateScore = (skills) => {

    const total = skills.reduce((sum, skill) => {
        return sum + skill.score;
    }, 0);

    return skills.length ? Math.round(total / skills.length) : 0;
};


// 7. Function to search skills using filter
function searchSkills() {

    const searchValue = document
        .getElementById("skillSearch")
        .value.toLowerCase()
        .trim();

    const filteredSkills = profile.skills.filter(function(skill) {

        return skill.name.toLowerCase().includes(searchValue);

    });

    showSkills(filteredSkills);

    const message = document.getElementById("skillMessage");

    if (filteredSkills.length === 0) {
        message.textContent = "No matching skills found.";
    } else {
        message.textContent =
            `${filteredSkills.length} skill(s) found.`;
    }
}

// 8. Function to find a particular skill
function findSkill(skillName) {

    return profile.skills.find(function(skill) {

        return skill.name.toLowerCase() === skillName.toLowerCase();

    });

}

// 9. Function to display education
function showEducation() {

    const educationList = document.getElementById("educationList");

    educationList.innerHTML = "";

    // map creates a new array
    const educationItems = profile.education.map(item => {

        return `<li>${item}</li>`;

    });

    educationList.innerHTML = educationItems.join("");

}

// 10. Function to display projects
function showProjects() {

    const projectsList = document.getElementById("projectsList");

    projectsList.innerHTML = profile.projects.map(project => {

        return `
            <div class="project">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `;

    }).join("");

}

// 11. Function to display achievements
function showAchievements() {

    const achievementsList =
        document.getElementById("achievementsList");

    achievementsList.innerHTML = profile.achievements
        .map(item => `<li>${item}</li>`)
        .join("");

}

// 12. Function to show skill score
function showSkillScore() {

    const score = calculateScore(profile.skills);

    document.getElementById("skillScore").textContent =
        `Your Average Skill Score: ${score}%`;

}

// 13. Conditional messages
function showMessage() {

    const message = document.getElementById("profileMessage");

    if (experience >= 3) {

        message.textContent = "You have good development experience!";

    } else if (experience >= 1) {

        message.textContent = "You are building your development experience!";

    } else {

        message.textContent = "Start learning and building projects!";

    }

}

// 14. Callback example
function processSkills(callback) {

    callback(profile.skills);

}

// 15. Try and catch example
function checkSkill() {

    try {

        const result = findSkill("JavaScript");

        if (!result) {
            throw new Error("JavaScript skill was not found.");
        }

        console.log("Found skill:", result.name);

    } catch (error) {

        document.getElementById("skillMessage").textContent =
            "Sorry, something went wrong. Please try again.";

        console.error(error.message);

    } finally {

        console.log("Skill checking completed.");

    }

}

// 16. Event listener for skill search
document.getElementById("skillSearch").addEventListener(
    "input",
    searchSkills
);

// 17. Display all information when page loads
showProfile();

showSkills(profile.skills);

showEducation();

showProjects();

showAchievements();

showSkillScore();

showMessage();

// 18. Using callback
processSkills(function(skills) {

    console.log("Total skills:", skills.length);

});

// 19. Testing find()
console.log("JavaScript skill:", findSkill("JavaScript"));

// 20. Testing map()
const skillNames = profile.skills.map(skill => skill.name);

console.log("Skill names:", skillNames);

// 21. Testing filter()
const strongSkills = profile.skills.filter(skill => skill.score >= 80);

console.log("Skills with score 80 or above:", strongSkills);

// 22. Testing reduce()
const totalScore = profile.skills.reduce((total, skill) => {

    return total + skill.score;

}, 0);

console.log("Total skill score:", totalScore);

// 23. Run error handling example
checkSkill();