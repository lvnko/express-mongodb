const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const db = mongoose.connect('mongodb://localhost:27017/test', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const findAsync = async ({ collectionModel, filter = {} }) => {
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

const insertAsync = async ({ collectionModel, data }) => {
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

const deleteAsync = async ({ collectionModel, conditions, multiple = false }) => {
    try {
        const result = multiple ? await collectionModel.deleteMany(conditions) : await collectionModel.deleteOne(conditions);
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

const updateAsync = async ({ collectionModel, filter, update, multiple = false }) => {
    try {
        const result = multiple ?  await collectionModel.updateMany(filter, update) : await collectionModel.updateOne(filter, update);
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
        new Schema({ // 類似 JS 裡的 Interface，主要在定義文件中不同 field 的 類別、限制與規則
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

    const findResult = await findAsync({
        collectionModel: School,
        filter: {
            // name: 'Columbia University',
            countryRegion: {
                $in: ['United States', 'U.S.A.']
            },
            // city: 'New York City'
        },
        
    });

    console.log('findResult => ', findResult);

    if (findResult.payload?.length <= 0) {
        // const insertResult = await insertAsync({
        //     collectionModel: School,
        //     data: [
        //         {
        //             name: 'Columbia University',
        //             city: 'New York City',
        //             score: 86.4,
        //             countryRegion: 'United States'
        //         }
        //     ]
        // });
        // console.log('insertResult => ', insertResult);
    }

    if (findResult.payload?.length > 0) {
        // // Sample to delete a record found.
        // console.log('record to be deleted (_id): ', findResult.payload[0]._id);
        // const deleteResult = await deleteAsync({
        //     collectionModel: School,
        //     filter: {
        //         _id: findResult.payload[0]._id
        //     }
        // });
        // console.log('deleteResult => ', deleteResult);
        
        // // Sample to update a record found.
        // console.log('records to be updated : ', findResult);
        // const updateResult = await updateAsync({
        //     collectionModel: School,
        //     filter: {
        //         countryRegion: "United States"
        //     },
        //     update: {
        //         countryRegion: "U.S.A."
        //     },
        //     // multiple: true
        // });
        // console.log('updateResult => ', updateResult);
    }
    
});
