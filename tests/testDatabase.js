const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

const connectTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    console.log("Already connected to database. Skipping re-connection.");
    return;
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Test Database Connected!");
};

const clearTestDB = async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    console.log("Test Database Cleared!");
  }
};

const closeTestDB = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  console.log("Test Database Closed!");
};

module.exports = { connectTestDB, closeTestDB, clearTestDB };
