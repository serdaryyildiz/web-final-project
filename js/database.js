import fs from 'fs';
import { promises as promises } from "fs";

const studentJsonFile = '../json/students.json';
const obsJsonFile = '../json/obs.json';
const courseJsonFile = '../json/courses.json';

function saveJson(path , data){
    try{
        const jsonData = JSON.stringify(data);
        promises.writeFile(path , jsonData);
    }catch(err){
        return "Writing JSON Error , error : "+ err; 
    }
}

function getJson(path){
    try{
        const data = promises.readFile(path , 'utf-8');
        const students = JSON.parse(data);
        return students;
    }catch(err){
        return "Reading file error , error : "+err;
    }
}

module.exports = {
    saveJson : saveJson,
    getJson : getJson
}