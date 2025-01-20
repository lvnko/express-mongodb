const express = require("express");
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const app = express();
const port = 8081;
const portMongodbDefault = 27017;

mongoose.connect(`mongodb://localhost:${portMongodbDefault}/test`, {
    useNewUrlParser: true
});

const SchoolSchema = new mongoose.Schema({
    name: Schema.Types.String,
    city: Schema.Types.String,
    score: {
        type: Schema.Types.Number,
        min: 0, max: 100,
        required: true
    },
    countryRegion: Schema.Types.String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const School = mongoose.model('school', SchoolSchema, 'school');

app.get('/', async (req, res)=>{
    const schools = await School.find({});
    console.log(schools);
    res.status(200).send(schools);
});

app.listen(port, ()=>{
    console.log(`Server responsed on port ${port}!!!`);
});