import mongoose , {Schema} from 'mongoose'
import { type } from 'os'

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps: true})

export const Task = mongoose.model("Task" , taskSchema)