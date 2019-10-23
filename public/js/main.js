"use strict";

function getCourses() {
  fetch("http://localhost/PHP-restful-web-services-master/", {
    method: "GET"
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    e.forEach(function (e) {
      document.querySelector("tbody").innerHTML += "\n                    <td>".concat(e.course_code, "</td>\n                    <td>").concat(e.course_name, "</td>\n                    <td>").concat(e.course_progression, "</td>\n                    <td><a href=\"").concat(e.course_link, "\" target=\"_blank\">L\xE4nk</a></td>\n                    ");
    });
  });
}

function addCourse(e) {
  e.preventDefault();
  var t = {
    course_code: document.getElementById("code").value,
    course_name: document.getElementById("name").value,
    course_progression: document.getElementById("progression").value,
    course_link: document.getElementById("link").value
  };
  fetch("http://localhost/PHP-restful-web-services-master/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  }).then(function (e) {
    return e.ok ? e.json() : Promise.reject({
      status: e.status,
      statusText: e.statusText
    });
  }), document.getElementById("code").value = "", document.getElementById("name").value = "", document.getElementById("progression").value = "", document.getElementById("link").value = "";
}

document.getElementById("courseform").addEventListener("submit", addCourse), window.addEventListener("load", getCourses);