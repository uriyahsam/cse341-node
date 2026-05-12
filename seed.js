// seed.js — Run once to insert sample contacts into MongoDB
// Usage: node seed.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const contacts = [
  {
    firstName: 'Amara',
    lastName: 'Mensah',
    email: 'amara.mensah@gmail.com',
    favoriteColor: 'blue',
    birthday: '1995-03-14'
  },
  {
    firstName: 'Kofi',
    lastName: 'Asante',
    email: 'kofi.asante@yahoo.com',
    favoriteColor: 'green',
    birthday: '1998-07-22'
  },
  {
    firstName: 'Esi',
    lastName: 'Owusu',
    email: 'esi.owusu@live.com',
    favoriteColor: 'purple',
    birthday: '2000-11-05'
  },
  {
    firstName: 'Yaw',
    lastName: 'Boateng',
    email: 'yaw.boateng@outlook.com',
    favoriteColor: 'red',
    birthday: '1993-01-30'
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const result = await db.collection('contacts').insertMany(contacts);
    console.log(`Inserted ${result.insertedCount} contacts.`);
    console.log('Inserted IDs:', result.insertedIds);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.close();
  }
}

seed();
