import mongoose from 'mongoose'

const DeliverySchema=new mongoose.Schema(
{
    item:{
        type:String,

    },
    category:{
        type:String,
    },
    time:{
        type:String,
    },
    fare:{
        type:Number,
    }


},
{
    timestamps:true,
}
)


const Delivery=mongoose.model("Delivery",DeliverySchema)

export default Delivery