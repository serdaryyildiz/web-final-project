
export class Course{
    constructor(courseName ,courseID , lecturer , courseFaculty , courseDepartment , midtermPercent ){
        this.courseID = courseID;
        this.lecturer = lecturer;
        this.courseName = courseName;
        this.courseFaculty = courseFaculty;
        this.courseDepartment = courseDepartment;
        this.midtermPercent = midtermPercent;
        this.finalPerc = 100 - midtermPercent;
    }

    constructor(courseId){
        this.courseID = courseID;
        this.lecturer = this.getCourseLecturer;
        this.courseName = this.getCourseName;
        this.courseFaculty = this.getCourseFaculty;
        this.courseDepartment = this.getCourseDepartment;
        this.midtermPercent = this.getMidtermPercent;
        this.finalPerc = 100 - this.getMidtermPercent;
    }

    getCourseName(){
        return this.courseName;
    }

    getCourseLecturer(){
        return this.lecturer;
    }

    getCourseFaculty(){
        return this.courseFaculty;
    }

    getCourseDepartment(){
        return this.courseDepartment;
    }

    getMidtermPercent(){
        return this.midtermPercent;
    }

}