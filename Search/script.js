document.addEventListener("DOMContentLoaded", function() {
    fetch("https://Jazz.io/Subjects/courses.json")
        .then(response => response.json())
        .then(data => {
            let coursesDiv = document.getElementById("courses");

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
        })
        .catch(error => console.error("Error fetching JSON:", error));
});
