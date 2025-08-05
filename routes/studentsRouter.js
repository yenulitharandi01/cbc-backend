import express from 'express';
import Student from '../models/student.js';
import { createStudent, getStudents } from '../controllers/studentController.js';
const studentRouter = express.Router();

studentRouter.get("/",getStudents);
 
studentRouter.post("/",createStudent);

 export default studentRouter;