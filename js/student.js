class student{
    constructor(name , surname , studentId){
        this.name = name;
        this.surname = surname;
        this.studentId = studentId;
    }

    toString() {
        return this.name + " " + this.surname ;
    }
}