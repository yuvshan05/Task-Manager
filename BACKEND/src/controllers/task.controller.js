import { Task } from "../models/tasks.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/assynHandler.js";


const createTask = asyncHandler(async(req ,res)=>{
    const {title , description , dueDate } = req.body
    if(!title){
        throw new apiError(401 , "Title is important")
    }
    const task = await Task.create({
        title ,
        description ,
        dueDate,
        user:req.user._id
    })
    return res
    .status(200)
    .json(
        new apiResponse(200,task , "tast is created successfully")
    )
})

const getTasks = asyncHandler(async(req, res)=>{
    const tasks = await Task.find({ user: req.user._id });
    return res
    .status(200)
    .json(
        new apiResponse(200 , tasks , "all tasks fetched successfully")
    )
})

const updateTask = asyncHandler(async(req ,res)=>{
    const{title , description , completed , dueDate } = req.body;
    const task = await Task.findById( req.params.id );
    if(!task){
        return apiError(401 , "task not found")
    }
    if (task.user.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not authorized to update this task");
    }
    task.title = title || task.title 
    task.description = description || task.description
    task.dueDate = dueDate || task.dueDate
    task.completed = completed !== undefined ?completed : task.completed
    await task.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(
        new apiResponse(401 , task , "updated task successfully")
    )
})

const deleteTask = asyncHandler(async (req ,res )=>{
    const task =await Task.findById(req.params.id)
    if(!task){
        throw new apiError(404, "Task not found")
    }

    //to check ki user wahi ho jiska task ho
    if(task.user.toString()!== req.user._id.toString())
    {
        throw new apiError(404 , "unauthorized Access") 
    }

    await Task.findByIdAndDelete(req.params.id)

    res
    .status(200)
    .json(
        new apiResponse(200 , {} ,"deleted successfully")
    )
})

const ToggleTaskCompletion = asyncHandler(async (req , res)=>{
    const task = await Task.findById(req.params.id)
    if(!task){
        throw new apiError(401 , "Task not found")
    }

    if(task.user.toString() !== req.user._id.toString()){
        throw new apiError(401, "Unauthorized Request") 
    }

    task.completed = !(task.completed)
    await task.save({validateBeforeSave:false})

    res
    .status(200)
    .json(
        new apiResponse(200 , task ,"task completed successfully")
    )
})

export {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    ToggleTaskCompletion
}