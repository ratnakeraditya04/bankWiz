const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/bankingsys",
{
    useNewUrlParser : true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(e);
})
