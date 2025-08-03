const {Shema,model}=required('moongoose');

const productSchema =Schema({
 name:{
    type:String,required:true,unique:true
 },
 price:{
    type: Number
 }
});

module.exports=model('Products',productSchema)