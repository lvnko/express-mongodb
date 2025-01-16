const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const db = mongoose.connect('mongodb://localhost:27017/test', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const find = async ({ collectionModel, filter = {} }) => {
    try {
        const result = await collectionModel.find(filter);
        return {
            statusText: 'ok',
            payload: result
        };
    } catch (err) {
        return {
            statusText: 'fail',
            message: err.message
        };
    }
}

const insertMany = async ({ collectionModel, data }) => {
    try {
        const result = await collectionModel.insertMany(data);
        return {
            statusText: 'ok',
            payload: result
        };
    } catch (err) {
        return {
            statusText: 'fail',
            message: err.message
        };
    }
}

db.then(async (mongo)=>{
    /**
     * 創建 Model
     * - Model 可以輔助 Mogoose 去認識 Collections
     */ 
    const School = mongo.model(
        'School',
        new Schema({
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
        }),
        'school'
    );
    console.log('Model => ', School);

    const findResult = await find({
        collectionModel: School,
        filter: {
            name: 'Columbia University',
            countryRegion: 'United States',
            city: 'New York City'
        }
    });

    console.log('findResult => ', findResult);

    if (findResult.payload?.length <= 0) {
        const insertResult = await insertMany({
            collectionModel: School,
            data: [
                {
                    name: 'Columbia University',
                    city: 'New York City',
                    score: 86.4,
                    countryRegion: 'United States'
                }
            ]
        });
        console.log('insertResult => ', insertResult);
    }
    
});
