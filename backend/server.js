import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import productRoute from './routes/productRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Server is ready');
})

app.use(express.json()); //middleware to parse json data

app.use('/api/products', productRoute);


app.listen(PORT, ()=>{
    connectDB();
    console.log('Server is running on port http://localhost:' + PORT);
}) 