import express from 'express';
import cors from 'cors';
//cors extra security provide karta hai jese ki origin kis origin se accept krna hai kon sa method hi accept karna hai jese ki get post etc
import cookieParser  from 'cookie-parser';

const app = express();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true//allows cookie to be sent
    }
))
app.use(express.json({limit:"16Kb"}))//data available in req.body and prevent large requests to overload the server
app.use(express.urlencoded({extended:true , limit:"16Kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//user

import userRouter  from './routes/user.routes.js';
app.use("/api/v1/users" , userRouter)

//task
import taskRouter from './routes/task.routes.js'
app.use("/api/v1/tasks", taskRouter)
export {app}