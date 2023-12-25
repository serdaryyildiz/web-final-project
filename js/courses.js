class courses{
    constructor(courseName ,courseID , lecturer , courseFaculty , midtermPercent ){
        this.courseID = courseID;
        this.lecturer = lecturer;
        this.courseName = courseName;
        this.courseFaculty = courseFaculty;
        this.midtermPercent = midtermPercent;
    }
    constructor(courseName ,courseID , lecturer , courseFaculty, courseDepartment , midtermPercent ){ //Overwriting with courseDept* variable.
        this.courseID = courseID;
        this.lecturer = lecturer;
        this.courseName = courseName;
        this.courseFaculty = courseFaculty;
        this.midtermPercent = midtermPercent;
        this.courseDepartment = courseDepartment;
    }
}

const coursesJsonFile = "../json/courses.json";
const response = getJson(coursesJsonFile); /* Reading JSON file to response variable */
const courses = response.json(); /* Turning JSON file to course object */

async function getJson(path){
    const response = await fetch(path);
    return response;
}

function saveJson(path, data) {  //I implemented this method to my code from stackoverflow , had no idea how to write json without 'fs'.
    try{
        const response =  fetch(path, {
            method: 'PUT',        //method: 'PUT' specifies the HTTP method used for the request.The PUT method is used to update a resource. 
            body: JSON.stringify(data), // In this case, body: JSON.stringify(data) places the data given as the data parameter into the request body.
          });
          return response.status === 200; //Status 200 means updating json file completed successfully
    } catch(err){
        console.log(err);
        return "An error has occured , error : " + err;
    }
}
  

export function findCourseIndex(courseID){
    return index = courses.findIndex((course) => course.courseID === courseID);
}

function addLecture(lectureName , lectureId , midtermPercent , lecturer){
    courses.push({
        "courseName" : lectureName,
        "courseID" : lectureId,
        "midtermPercent" : midtermPercent,
        "lecturer" : lecturer
    })
    saveJson(coursesJsonFile , courses);
}

function deleteLecture(lectureId){

}

function findLectureAverageScore(lectureId){
    
}
