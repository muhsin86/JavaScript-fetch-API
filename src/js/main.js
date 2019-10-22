"use strict";

//ADDEVENTLISTENER
document.getElementById('courseform').addEventListener('submit', addCourse);
window.addEventListener('load', getCourses);

//  GET COURSE FROM MYSQL DATA
function getCourses() {
    fetch('http://localhost/PHP-restful-web-services-master/', {
        
        method: 'GET'
    })
        .then((response) => response.json())
        .then(courses => {
            courses.forEach(function (course) {
                document.querySelector('tbody').innerHTML += `
                    <td>${course.course_code}</td>
                    <td>${course.course_name}</td>
                    <td>${course.course_progression}</td>
                    <td><a href="${course.course_link}" target="_blank">Länk</a></td>
                    `;

            });
            
        });
}

//ADD COURSE TO MYSQL DATA
function addCourse(e) {
    e.preventDefault();

    let code = document.getElementById('code').value;
    let name = document.getElementById('name').value;
    let progression = document.getElementById('progression').value;
    let link = document.getElementById('link').value;

    const myCourse = {
        "course_code": code,
        "course_name": name,
        "course_progression": progression,
        "course_link": link
    };
    fetch('http://localhost/PHP-restful-web-services-master/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCourse)
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        });

        inputCleaner();
}

function inputCleaner() {
    document.getElementById('code').value = '';
    document.getElementById('name').value = '';
    document.getElementById('progression').value = '';
    document.getElementById('link').value = '';

}