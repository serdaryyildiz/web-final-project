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