const Product=required('../models/Products');

const createProduct=async(req,res)=>{
    const {name,price}=req.body;
    try{
        const existingProduct=await Product.find({name});
        if(existingProduct){
            return res.status(400).json({
                ok:false,
                msg:`${name} already exists in the database`
            });
        }
    
    const product = new Product({name,price});
    await product.save();
    return res.status(201).json({
        ok:true,
        msg:`${name} create successfully`,
        product
    });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            ok:false,
            msg:'Please contact support'
        });
    }

}