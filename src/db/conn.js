const mongoose = require('mongoose');

const mongooseURI = "mongodb+srv://aditya:aditya@bankwiz.l0qgrei.mongodb.net/?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const connectToMongo = ()=>{
    
    mongoose.connect(mongooseURI,connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
}

module.exports = connectToMongo;