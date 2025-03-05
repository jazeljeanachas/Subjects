document.addEventListener("DOMContentLoaded", function () {
    fetch("https://jazeljeanachas.github.io/Subjects/course.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);
            displaySubjects(data);
            window.allCourses = data; 
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

const subjectDescriptions = {
    "IT111": "Introduction to Computing",
    "IT112": "Computer Programming 1",
    "PurCom": "Purposive Communication",
    "RPH": "Readings in Philippine History",
    "TCW": "The Contemporary World",
    "MMW": "Mathematics in the Modern World",
    "PATHFit": "Movement Competency Training",
    "CWTS 1": "Civic Welfare Training Service",
    "IT121": "Computer Programming",
    "IT122": "Data Structures and Algorithms",
    "IT123": "Discrete Mathematics",
    "ArtApp": "Art Appreciation",
    "UTS": "Understanding the Self",
    "STS": "Science, Technology and Society",
    "CWTS 2": "Civic Welfare Training Service",
    "IT211": "Intro to Human Computer Interaction",
    "IT212": "Fundamentals of Database Systems",
    "IT213": "Platform Technologies",
    "IT214": "Object Oriented Programming",
    "IT215": "Accounting Principles",
    "EnviSci": "Environmental Science",
    "IT221": "Information Management",
    "IT222": "Networking 1",
    "IT223": "Web Systems and Technologies",
    "IT224": "Systems Integration and Architecture 1",
    "Etch": "Ethics",
    "Rizal": "Life and Works of Rizal",
    "PATHFit": "Physical Activity Towards Health and Fitness 4",
     "IT311": "Information Assurance and Security",
    "IT312": "Networking 2",
    "IT313": "Mobile Programming",
    "IT314": "Software Engineering",
    "IT315": "IT Elective 1",
    "ES211a": "Technopreneurship",
    "IT321": "CAPSTONE Project and Research 1",
    "IT322": "Integrative Programming and Technologies",
    "IT323": "Application Development and Emerging Technologies",
    "IT324": "Quantitative Methods",
    "IT325": "IT Elective 2",
    "FreeElec": "Foreign Language"
};

function displaySubjects(data) {
    let coursesTable = document.getElementById("courses");
    coursesTable.innerHTML = ""; 

    data.forEach(course => {
        let yearSemesterRow = document.createElement("tr");
        let yearSemesterCell = document.createElement("td");
        yearSemesterCell.textContent = `${course.year || "Unknown Year"} - ${course.semester || "Unknown Semester"}`;
        yearSemesterCell.colSpan = 3;
        yearSemesterCell.style.fontWeight = "bold";
        yearSemesterCell.style.textAlign = "center";
        yearSemesterRow.appendChild(yearSemesterCell);
        coursesTable.appendChild(yearSemesterRow);

        course.subjects.forEach(subject => {
            let row = document.createElement("tr");

            let subjectCell = document.createElement("td");
            subjectCell.textContent = subject;
            row.appendChild(subjectCell);

            let descCell = document.createElement("td");
            descCell.textContent = subjectDescriptions[subject] || "No description available";
            row.appendChild(descCell);

            coursesTable.appendChild(row);
        });
    });
}

function searchSubjects() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    let filteredData = window.allCourses.map(course => ({
        year: course.year || "Unknown Year",
        semester: course.semester || "Unknown Semester",
        subjects: course.subjects.filter(subject =>
            subject.toLowerCase().includes(input) || 
            (subjectDescriptions[subject] && subjectDescriptions[subject].toLowerCase().includes(input))
        )
    })).filter(course => course.subjects.length > 0);

    displaySubjects(filteredData);
}

