const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const middlewareError = require('./middlewares/error');


// Config

dotenv.config({path:"backend/config/config.env"});
      
app.use(cors());
app.use(express.json({ limit: '50mb'}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());

// Routes Import
const productRouter = require('./routers/productRouters');
const userRouter = require('./routers/userRouters');
const orderRouter = require('./routers/orderRouters');
const paymentRouter = require('./routers/paymentRouters');

app.use('/api/v1',productRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',orderRouter);
app.use('/api/v1',paymentRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


// Middleware for Errors
app.use(middlewareError);

module.exports = app;