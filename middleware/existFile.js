
const existFile = (req, res, next) => {

    // Comprobamos si existe imagen
    const file = req.files;
    if (!file) {
        return res.status(402).json({
            msg: 'Debe ingresar un archivo'
        });
    }

    // Verificamos si la key de data-form es correcto
    if (!file?.image) {
        return res.status(400).json({
            msg: 'La key del data-form debe ser [image]'
        })
    }

    //Verificamos si hay mas de un archivo
    if (file.image.length > 0) {
        return res.status(406).json({
            msg: 'No puede enviar mas de un archivo'
        })
    }

    // Verificamos si el mimeType corresponde a una imagen 
    if (!['image/png', 'image/jpeg'].includes(file.image.mimetype)) {
        return res.status(400).json({
            msg : 'El archivo debe ser un png o jpg'
        })
    }

    next();
}

module.exports = existFile;