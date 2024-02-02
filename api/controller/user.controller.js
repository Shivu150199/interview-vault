import Delivery from '../models/user.model.js'

export const user=async(req,res,next)=>{
const {item,category,time,fare}=req.body
const newDelivery=new Delivery({item,category,time,fare})
try{
await newDelivery.save()
res.status(201).json('created successfully')
}
catch(error){
next(error)
}

}

export const userGet=async(req,res,next)=>{
    try{
const data=await Delivery.find();
// console.log(data)
  res.status(200).json(data)
    }catch(error){
        next(error)
    }
}