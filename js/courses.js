class course{
    constructor(courseID , lecturer){
        this.courseID = courseID;
        this.lecturer = lecturer;
    }
}

const coursesJsonFile = "../json/courses.json";
const response = getJson(coursesJsonFile); /* Reading JSON file to response variable */
const courses = response.json(); /* Turning JSON file to student object */

async function getJson(path){
    const response = await fetch(path);
    return response;
}

function findCourseIndex(courseID){
    return index = courses.findIndex((course) => course.courseID === courseID);
}

function addLecture(lectureName , lectureId , midtermPercent , lecturer){
    courses.push({
        "courseName" : lectureName,
        "courseID" : lectureId,
        "midtermPercent" : midtermPercent,
        "lecturer" : lecturer
    })
    saveJs
}

function deleteLecture(lectureId){

}

function findLectureAverageScore(lectureId){
    
}
