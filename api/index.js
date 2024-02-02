import express from 'express'

import connection from './config/db.js'
// import loginRouter from './routes/auth.route.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
const app = express()
// app.get('/',(req,res)=>{
  //   res.send('hello')
  // })
  app.use(express.json())
  app.use(cookieParser())
app.use(cors())
// app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/app',userRouter)


app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500
  const message=err.message || 'Internal server Error'
  return res.status(statusCode).json({
success:false,
message,
statusCode
  })
})
app.listen(3000, async() => {
 await connection;
  console.log('app is listening on port 3000')
})
