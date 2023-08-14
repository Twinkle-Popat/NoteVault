const mongoose = require('mongoose');
const mongodburl = "mongodb+srv://twinklevpopat20:zT0EvEwX883LTsYP@cluster0.2bugeqr.mongodb.net/iNotebook";

const connectDB = async () => {
    try {
        await mongoose.connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB is connected");
    } catch (err) {
        console.log(err);
    }
}
module.exports = connectDB;