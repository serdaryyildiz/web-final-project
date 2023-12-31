
export class Course{
    constructor(courseName ,courseID , lecturer , midtermPercent , acts ){
        this.courseID = courseID;
        this.lecturer = lecturer;
        this.courseName = courseName;
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

    getMidtermPercent(){
        return this.midtermPercent;
    }
}