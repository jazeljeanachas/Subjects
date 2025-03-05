document.addEventListener("DOMContentLoaded", function () {
    fetch("https://jazeljeanachas.github.io/Subjects/course.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); 
            displaySubjects(data);
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
    "IT121": "Computer Programming 2",
    "Physics 2": "College Physics",
    "Programming 2": "Intermediate Programming",
    "English 2": "Academic Writing",
    "Data Structures": "Fundamentals of Data Structures",
    "Database Systems": "Introduction to Database Management",
    "Operating Systems": "Operating System Concepts"
};

function displaySubjects(data) {
    let coursesTable = document.getElementById("courses");
    coursesTable.innerHTML = ""; 

    data.forEach(course => {
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
                subjects: course.subjects.filter(subject =>
                    subject.toLowerCase().includes(input)
                )
            })).filter(course => course.subjects.length > 0);

            displaySubjects(filteredData);
        });
}
