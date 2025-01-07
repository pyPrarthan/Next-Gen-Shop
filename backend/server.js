import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.get('/', (req, res)=>{
    res.send('Server is ready');
})

app.use(express.json()); //middleware to parse json data

app.post('/api/products', async (req, res)=>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).send({success: false, message: 'name, price and image are required'});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct})
    }catch(error){
        console.error('error in creating product:', error);
        res.status(500).json({success: false, message: "Server error"});
    }

})

app.delete('/api/products/:id', async(req, res)=>{
    const productId = req.params.id;
    
    try{
        await Product.findByIdAndDelete(productId);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    }catch(error){
        res.status(404).json({success: false, message: 'Product not found'});
    }
})


app.get('/api/products', async(req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }catch(error){
        console.error('error in fetching products:', error);
        res.status(500).json({success: false, message: "Server error"}); 
    }
})

app.put('/api/products/:id', async(req, res)=>{
    const productId = req.params.id;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({success: false, message: 'Invalid Product Id'}); 
    }

    try{
        const updatedProcuct = await Product.findByIdAndUpdate(productId, product, {new: true}); //update the product
        res.status(200).json({success: true, message: 'Product updated successfully', data: updatedProcuct});
    }catch(error){
        res.status(404).json({success: false, message: 'Product not found'});
    }
})

app.listen(5000, ()=>{
    connectDB();
    console.log('Server is running on port http://localhost:5000' );
}) 