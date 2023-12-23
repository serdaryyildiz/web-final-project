const studentJsonFile = '../json/students.json';
const obsJsonFile = '../json/obs.json';
const courseJsonFile = '../json/courses.json';
const stResponse = fetch(studentJsonFile); /* Reading JSON file to response variable */
const students = stResponse.json(); /* Turning JSON file to student object */

async function getJson(path){
    const response = await fetch(path);
    return response;
}

var profileButton = document.querySelector(".profile");

console.log(students);

function updateScore(lectureId , studentId){



}