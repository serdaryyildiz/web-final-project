function addLecture(lectureName , lectureId , midtermPercent , lecturer){
    courses.push({
        "courseName" : lectureName,
        "courseID" : lectureId,
        "midtermPercent" : midtermPercent,
        "lecturer" : lecturer
    })
    saveJson(coursesJsonFile , courses);
}


class Courses{
    constructor(courseName ,courseID , lecturer , courseFaculty , courseDepartment , midtermPercent ){
        this.courseID = courseID;
        this.lecturer = lecturer;
        this.courseName = courseName;
        this.courseFaculty = courseFaculty;
        this.courseDepartment = courseDepartment;
        this.midtermPercent = midtermPercent;
    }
}