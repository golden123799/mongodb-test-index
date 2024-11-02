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

  try {
    console.time('Index Drop Time');
    await collection.dropIndex('email_1');
    console.timeEnd('Index Drop Time');
  } catch (error) {}

  // Query without index
  console.time('Query without index');
  const resultsWithoutIndex = await collection
    .find({ email: 'user100@example.com' })
    .toArray();
  console.timeEnd('Query without index');

  console.log(`Results with index: ${resultsWithoutIndex.length} document(s)`);

  return 'done.';
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
