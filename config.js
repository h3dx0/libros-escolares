module.exports = {
    secret_token: 'miclave123456',
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://127.0.0.1:27017/libros_escolares',
    imagesUrl: 'https://res.cloudinary.com/h3dx0/image/upload/'
}
