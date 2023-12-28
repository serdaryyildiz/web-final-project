import { Department } from "../js/department.js";

export class Faculty{
    constructor(facultyName , facultyId , departments){
        this.facultyName = facultyName;
        this.facultyId = facultyId;
        this.departments = departments;
    }

    isFacultyIdValid(facultyId){
        if(facultyId > 0 && facultyId < 100){
            return true;
        }
        console.log("Unvalid faculty Id.")
        return false;
    }
}