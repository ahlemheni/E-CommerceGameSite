const ProductModel=require('../Models/ProductModel')

module.exports.get= async(req,res)=>{

    const products = await ProductModel.find()
    res.send(products)
}


module.exports.save= async(req,res)=>{

    const {name,description,category,qty,image,game_title,price,genre} = req.body
    ProductModel
    .create({name,description,category,qty,image,game_title,price,genre:{name:genre}})
    .then((data)=>{
        console.log("Product has been added to the inventory...")
        console.log(data)
        res.send(data)
    })
}

module.exports.update= async(req,res)=>{

    const {_id,qty,image,price}= req.body
    ProductModel
    .findByIdAndUpdate(_id,{qty,image,price})
    .then(()=>{res.send("product information updated sucessfully...")})
    .catch((err)=>{
            console.log(`Error while updating info for product : ${_id} :${err}`)
    })
}


module.exports.delete= async(req,res)=>{

    const {_id,name} = req.body
    ProductModel
    .findByIdAndDelete(_id)
    .then(()=>{res.status(201).send("product deleted sucessfully...")})
    .catch((err)=>{
            console.log(`Error while deleting ${name}'s account :${err}`)
    })
} 

module.exports.findone = async (req, res) => {
    const { genreparam, categoryparam, id } = req.params;
    console.log(genreparam, categoryparam, id);
  
    try {
      const product = await ProductModel.findOne({
        'genre.name': genreparam,
        category: categoryparam,
        _id: id
      });
      console.log(product);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.send(product);
      }
    } catch (err) {
      return res.status(500).json({ err: 'Internal server error' });
    }
  };
