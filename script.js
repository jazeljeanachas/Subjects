document.addEventListener("DOMContentLoaded", function () {
    fetch("https://jazeljeanachas.github.io/Subjects/course.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); 
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
    "CWTS 2": "Civic Welfare Training Service"
};

function displaySubjects(data) {
    let coursesTable = document.getElementById("courses");
    coursesTable.innerHTML = ""; 

    data.forEach(course => {
        let yearSemesterRow = document.createElement("tr");
        let yearSemesterCell = document.createElement("td");
        yearSemesterCell.textContent = `${course.year} - ${course.semester}`;
        yearSemesterCell.colSpan = 3;
        yearSemesterCell.style.fontWeight = "bold";
        yearSemesterCell.style.textAlign = "center";
        coursesTable.appendChild(yearSemesterRow);
        yearSemesterRow.appendChild(yearSemesterCell);

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

    fetch("https://jazeljeanachas.github.io/Subjects/course.json")
        .then(response => response.json())
        .then(data => {
            let filteredData = data.map(course => ({
                year: course.year || "Unknown Year",
                semester: course.semester || "Unknown Semester",
                subjects: course.subjects.filter(subject =>
                    subject.toLowerCase().includes(input) || 
                    (subjectDescriptions[subject] && subjectDescriptions[subject].toLowerCase().includes(input))
                )
            })).filter(course => course.subjects.length > 0);

            displaySubjects(filteredData);
        });
}
