import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'testing';

const main = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  // Generate and insert millions of documents
  const insertManyDocuments = async (count: number) => {
    const documents = [];
    for (let i = 0; i < count; i++) {
      documents.push({
        name: `User${i}`,
        email: `user${i}@example.com`,
        age: Math.floor(Math.random() * 100), // Random age for demonstration
      });
    }

    // Insert documents in batches to avoid memory issues
    const batchSize = 1000; // Adjust the batch size as needed
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      await collection.insertMany(batch);
      console.log(`Inserted ${batch.length} documents`);
    }
  };

  await insertManyDocuments(1000000);

  return 'done.';
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
