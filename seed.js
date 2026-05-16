// seed.js — Run once to insert sample contacts into MongoDB
// Usage: node seed.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const contacts = [
  {
    firstName: 'Amara',
    lastName: 'Mensah',
    email: 'amara.mensah@example.com',
    favoriteColor: 'blue',
    birthday: '1995-03-14'
  },
  {
    firstName: 'Kofi',
    lastName: 'Asante',
    email: 'kofi.asante@example.com',
    favoriteColor: 'green',
    birthday: '1998-07-22'
  },
  {
    firstName: 'Esi',
    lastName: 'Owusu',
    email: 'esi.owusu@example.com',
    favoriteColor: 'purple',
    birthday: '2000-11-05'
  },
  {
    firstName: 'Yaw',
    lastName: 'Boateng',
    email: 'yaw.boateng@example.com',
    favoriteColor: 'red',
    birthday: '1993-01-30'
  },
  {
    firstName: 'Abena',
    lastName: 'Darko',
    email: 'abena.darko@example.com',
    favoriteColor: 'yellow',
    birthday: '2001-04-09'
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    // Clear existing contacts first to avoid duplicates
    await db.collection('contacts').deleteMany({});
    console.log('Cleared existing contacts.');
    const result = await db.collection('contacts').insertMany(contacts);
    console.log(`Inserted ${result.insertedCount} contacts.`);
    console.log('IDs:', Object.values(result.insertedIds).map(id => id.toString()));
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.close();
  }
}

seed();
