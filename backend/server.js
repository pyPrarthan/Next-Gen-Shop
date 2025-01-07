import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import productRoute from './routes/productRoute.js';

dotenv.config();

const app = express();

app.get('/', (req, res)=>{
    res.send('Server is ready');
})

app.use(express.json()); //middleware to parse json data

app.use('/api/products', productRoute);


app.listen(5000, ()=>{
    connectDB();
    console.log('Server is running on port http://localhost:5000' );
}) 