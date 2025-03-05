document.addEventListener("DOMContentLoaded", function() {
    fetch("https://jazeljeanachas.github.io/Subjects/course.json")
        .then(response => response.json())
        .then(data => {
            displaySubjects(data);
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

function displaySubjects(data) {
    let coursesDiv = document.getElementById("courses");
    coursesDiv.innerHTML = ""; 
    data.forEach(course => {
        let courseContainer = document.createElement("div");
        courseContainer.classList.add("course-container");

        let title = document.createElement("h2");
        title.textContent = `${course.year} - ${course.semester}`;
        courseContainer.appendChild(title);

        let ul = document.createElement("ul");
        course.subjects.forEach(subject => {
            let li = document.createElement("li");
            li.textContent = subject;
            ul.appendChild(li);
        });

        courseContainer.appendChild(ul);
        coursesDiv.appendChild(courseContainer);
    });
}

function searchSubjects() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    fetch("https://jazeljeanachas.github.io/Subjects/course.json")
        .then(response => response.json())
        .then(data => {
            let filteredData = data.map(course => ({
                year: course.year,
                semester: course.semester,
                subjects: course.subjects.filter(subject => 
                    subject.toLowerCase().includes(input)
                )
            })).filter(course => course.subjects.length > 0);

            displaySubjects(filteredData);
        });
}
