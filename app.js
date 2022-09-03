require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// middlewares
app.use(cors({
    origin: '*'
}));
app.use(fileUpload());
app.use(express.static('public'));

// Rutas
const fileUploadRouter = require('./routers/fileUploadRouter');
app.use('/', fileUploadRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server iniciado en el puerto: ${process.env.PORT}`);
});