const students = require('../js/students.js');
const courses = require('../js/courses.js'); 

async function getJson(path){
    const response = await fetch(path);
    return response;
}


console.log(students);

function updateScore(lectureId , studentId){



}