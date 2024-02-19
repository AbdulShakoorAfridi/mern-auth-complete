import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
import userAuthRouter from './routes/user.routes.js';
import { not_Found, errorHandler } from './middlewares/errorHandler.js';
import connectDB from './config/dbConnection.js';
import cookieParser from 'cookie-parser';
// connection to database
connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api/user",userAuthRouter);

if(process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist','index.html'));
  });
}else{
   app.get('/', (req, res) => {
    res.send('client and server combined');
  });
}


app.use(not_Found);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});