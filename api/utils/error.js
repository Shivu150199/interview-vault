export const errorHandler=(statusCode,errorMessage)=>{
const error=new Error()
error.status=statusCode
error.message=errorMessage
return error;
}