const asyncHandler = (requestHandler)=>{
    return (req , res , next)=>{
        Promise.resolve(requestHandler(req ,res,next)).catch((err)=>next(err))
    }
}
export {asyncHandler}
//with asyncHandler, you no longer need to manually catch and pass errors to next. The asyncHandler utility takes care of this for you, making the route handler cleaner and easier to read.
