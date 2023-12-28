
export class Course{
    constructor(courseName ,courseID , lecturer , courseFaculty , courseDepartment , midtermPercent , acts ){
        this.courseID = courseID;
        this.lecturer = lecturer;
        this.courseName = courseName;
        this.courseFaculty = courseFaculty;
        this.courseDepartment = courseDepartment;
        this.midtermPercent = midtermPercent;
        this.finalPerc = 100 - midtermPercent;
        this.acts = acts;
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