import { Collection, MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'testing';

const main = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  const collection = db.collection('users');

  try {
    console.time('Index Creation Time');
    await collection.createIndex({ email: 1 });
    console.timeEnd('Index Creation Time');
  } catch (error) {}

  console.log('Index on email created');
  // Query with index
  console.time('Query with index');
  const resultsWithoutIndex = await collection
    .find({ email: 'user100@example.com' })
    .explain();
  console.timeEnd('Query with index');

  console.log(resultsWithoutIndex);

  console.log(
    `Results without index: ${resultsWithoutIndex.length} document(s)`
  );

  return 'done.';
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
