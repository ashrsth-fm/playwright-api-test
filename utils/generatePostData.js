const fs = require('fs');
const { faker } = require('@faker-js/faker');
const path = require('path');


// Function to generate random booking data
function generateRandomBookingData() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 500, max: 5000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.soon().toISOString().split('T')[0], // Only date part
      checkout: faker.date.soon(10).toISOString().split('T')[0], // 10 days ahead
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Wi-Fi', 'None']),
  };
}

// Generate data and save to JSON file
const randomBookingData = generateRandomBookingData();
const filePath = path.resolve(__dirname, '../test-data/createBookingData.json');
fs.writeFileSync(filePath, JSON.stringify(randomBookingData, null, 2), 'utf-8');

console.log('Random Booking Data Generated and Saved:', randomBookingData);