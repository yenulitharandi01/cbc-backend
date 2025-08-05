import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/studentsRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";

const app = express() 

//Middleware to parse JSON bodies
app.use(express.json()) 

app.use(
    (req,res,next)=>{
        let token = req.header("Authorization")

      if(token != null){
        token = token.replace("Bearer","")
        jwt.verify(token,"jwt-secret",
         (err,decoded)=>{
           if(decoded == null){
            res.json({
                message:"Invalid token please login again"
            })
            return

           }else{
            req.user =  decoded
        
           }
         }
        )
      }
      next()
    }
)
const connectionstring ="mongodb+srv://admin:123@cluster0.majhtmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionstring).then(
()=>{
    console.log("Database connected successfully")
}
).catch(
    ()=>{
        console.log("Database connection failed")
    }
)



app.use("/users",userRouter)
app.use("/products", productRouter)

app.listen(5000,
    ()=>{
        console.log("server is running on port 5000")
        
    }
    )