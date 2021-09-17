/**
 * Import Module Dependencies and declare constants.
 */
const mongo = require("mongodb").MongoClient;
const config = require('./config.json');
const {ObjectId} = require("mongodb");



/**
 * Database Object.
 * Connects to database client with DSN adress.
 * Returns database client and collection.
 * @type {{getDb: (function(): {client: MongoClient, collection: *})}}
 */
const database = {
    dsn: String,
    dbClient: Object,
    dbCollection: Object,
    db: Object,

    /**
     * @method getDb()
     * @description
     *      Set DSN property depending on the environment.
     *      Connect database client with DSN.
     *      Get the database.
     *      Get the database collection.
     *      Return Object containing collection and client.
     *
     * @param collectionName
     * @return {Promise<{client: *, collection: (*|Object|ObjectConstructor|*)}>}
     */
    getDb: async function getDb(collectionName) {
        let dsn;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        } else if (process.env.NODE_ENV === 'development') {
            dsn = `mongodb://localhost:27017/document`;
        } else if (process.env.NODE_ENV === 'production') {
            dsn = `mongodb+srv://texteditor:${config.password}@${config.username}.c1ix7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        }

        this.dbClient  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.db = await this.dbClient.db();
        this.dbCollection = await this.db.collection(collectionName);

        return {
            collection: this.dbCollection,
            client: this.dbClient,
        };
    },


    /**
     * @method readFromDb()
     * @description
     *      Connect to database using method getDb and name of collection.
     *      Search in database collection with arguments.
     *      Return the results from the search.
     *
     * @param collectionName
     * @param criteria
     * @param projection
     * @param limit
     * @return {Promise<*>}
     */
    readFromDb: async function readFromDb(collectionName, criteria, projection, limit) {
        await this.getDb(collectionName);

        let result = await this.dbCollection.find(criteria, projection).limit(limit).toArray();

        return result;
    },


    /**
     * @method createInDb()
     * @description
     *      Connect to database using method getDb and name of collection.
     *      Create new database item from request body.
     *      Return status from
     *
     * @param collectionName
     * @param requestBody
     * @return {Promise<*|*>}
     */
    createInDb: async function createInDb(collectionName, requestBody) {
        await this.getDb(collectionName);

        const response = await this.dbCollection.insertOne(requestBody);

        await this.dbClient.close();

        if (response.ok) {
            return response.status(201).json({ data: response.ops });
        }

        return response;
    },


    /**
     * @method updateInDb()
     * @description
     *      Connect to database using method getDb and name of collection.
     *      Filter from database item IDs.
     *      Create object to update existing object with.
     *      Update database object.
     *      Close database connection.
     *      Return result.
     *
     * @param collectionName
     * @return {Promise<*>}
     */
    updateInDb: async function updateInDb(collectionName, requestBody) {
        await this.getDb(collectionName);

        let filter = { _id: ObjectId(requestBody['_id']) };
        let updatedObject = {
            $set: {
                author: requestBody.author,
                title: requestBody.title,
                updated: requestBody.updated
            }
        };

        let result = await this.dbCollection.updateOne(
            filter,
            updatedObject
        );

        await this.dbClient.close();

        return result;
    },


    /**
     * @method deleteFromDb()
     * @description
     *      Connect to database using method getDb and name of collection.
     *      Filter from database item IDs.
     *      Delete from database collection.
     *      Close database connection.
     *
     * @param collectionName
     * @param requestBody
     * @return {Promise<void>}
     */
    deleteFromDb: async function deleteFromDb(collectionName, requestBody) {
        await this.getDb(collectionName);

        const filter = { _id: ObjectId(requestBody['_id']) };

        await this.dbCollection.deleteOne(filter);
        await this.dbClient.close();
    },


    /**
     * @method resetCollection()
     * @description
     *      Connect to database using method getDb and name of collection.
     *      Delete many from database.
     *      Insert many into database with JSON document.
     *      Close database connection.
     *
     * @param collectionName
     * @return {Promise<void>}
     */
    resetDbCollection: async function hejdar(collectionName, doc) {
        await this.getDb(collectionName);
        await this.dbCollection.deleteMany();
        await this.dbCollection.insertMany(doc);
        await this.dbClient.close();
    }
};



/**
 * Module Exports.
 * @type {{getDb: (function(): {client: MongoClient, collection: *})}}
 */
module.exports = database;
