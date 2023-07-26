const OrderModel = require("../Models/OrderModel");
const UserModel = require("../Models/UserModel")
const {assert}= require("assert")
module.exports.get=async (req,res)=>{
    const orders= await OrderModel.find()
    console.log(orders)
    res.send(orders)
}
module.exports.save =async (req,res)=>{
    const {shoppingcart,orderby} = req.body
    try{
      const client= await UserModel.findOne({username:orderby})
      console.log(client)
      const cart=await cartModel.find({_id:shoppingcart})
    OrderModel
    .create({shoppingcart:cart,orderby:client})
    .then((data)=>{
        console.log("Product has been added to the inventory...")
        console.log(data)
        res.send(data);
    })}
    catch(err){
      return res.status(500).json({ err: 'Internal server error' });
    }
    }

module.exports.update=async (req,res)=>{
    const {_id}= req.body
    OrderModel
    .findByIdAndUpdate(_id,{orderStatus:true})
    .then(()=>{res.send("Order has been delivered => deleting order from the list  ...")
                    })
    .catch((err)=>{
            console.log(`Error while updating info for product : ${_id} :${err}`)
    })
}
module.exports.delete=async (req,res)=>{
        const {_id,orderby} = req.body
        OrderModel
        .findByIdAndDelete(_id)
        .then(()=>{res.status(201).send("order deleted sucessfully...")})
        .catch((err)=>{
                console.log(`Error while deleting ${orderby}'s order :${err}`)
        })
      }
module.exports.findone=async (req,res)=>{
    const { orderby, id } = req.params;
    console.log(orderby, id);

    const client= await UserModel.findOne({username:orderby})
    if (assert.ok(client,"No Client by this name exists"))
    {
        try {
            const order = await OrderModel.findById({
                _id:id,
                orderby:orderby

            });
            console.log(order);
            if (!order) {
                res.status(404).json({ error: 'order not found' });
            } else {
                res.send(order);
            }
            } catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
            }
        }}
module.exports.findmany=async (req,res)=>{
        const { orderby} = req.params;
        console.log(orderby);
        
        const client= await UserModel.findOne({username:orderby})
        if (assert.ok(client,"No Client by this name exists"))
            {
             try {
                    const order = await OrderModel.findById({
                        orderby:orderby
        
                    });
                    console.log(order);
                    if (!order) {
                        res.status(404).json({ error: 'order not found' });
                    } else {
                        res.send(order);
                    }
                    } catch (err) {
                    return res.status(500).json({ err: 'Internal server error' });
                    }
                }}