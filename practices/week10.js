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

app.post("/school", async (req, res)=>{
    const result = await School.create({
        name: "National University of Singapore",
        city: "Singapore",
        countryRegion: "Singapore",
        score: 83.5
    });
    console.log(result);
    res.status(200).send(`Document of School is created!`);
});

app.delete("/school", async (req, res)=>{
    const { id } = req.query;
    const result = await School.deleteOne({
        _id: id
    });
    res.status(200).send(`Document (_id: ${id}) is deleted!`);
});

app.put("/school", async (req, res)=>{
    const { id, name, score, city, countryRegion } = req.query;
    // On your curl command, encodeURI(...) maybe needed for url that contain information in Chinese.
    const result = await School.updateOne({
        _id: id
    }, {
        name, city, countryRegion, score
    });
    res.status(200).send(`Document (_id: ${id}) is updated!`);
});

app.get('/', async (req, res)=>{
    const schools = await School.find({});
    console.log(schools);
    res.status(200).send(schools);
});

app.listen(port, ()=>{
    console.log(`Server responsed on port ${port}!!!`);
});