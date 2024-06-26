//The apiError class extends the built-in Error class in JavaScript to create custom error objects that can be used in an API.
class apiError extends Error{
    constructor(
        statusCode,
        message="something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode
        this.data=null
        this.message = message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this , this.message)
        }
    }
}

export {apiError}