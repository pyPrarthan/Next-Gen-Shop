import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoute from './routes/productRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.get('/', (req, res)=>{
    res.send('Server is ready');
})

app.use(express.json()); //middleware to parse json data

app.use('/api/products', productRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}


app.listen(PORT, ()=>{
    connectDB();
    console.log('Server is running on port http://localhost:' + PORT);
}) 