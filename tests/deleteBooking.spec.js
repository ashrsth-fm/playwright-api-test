const { test, expect, request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Delete booking data of the previously created booking', async () => {
  const apiContext = await request.newContext();

  // Path to the recently created booking data JSON
  const createdBookingDataPath = path.resolve(__dirname, '../test-data/createdBookingData.json');

  // Read the booking ID and the original booking data
  const { bookingid } = JSON.parse(fs.readFileSync(createdBookingDataPath, 'utf-8'));
  const createdBookingData = JSON.parse(fs.readFileSync(createdBookingDataPath, 'utf-8'));

  console.log('Booking ID:', bookingid);
  console.log('Created Booking Data:', createdBookingData);

  // Send DELETE request to delete the previosuly created booking
  const response = await apiContext.delete(`/booking/${bookingid}`, {
    headers: {
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=' // Default API authorization (username: admin, password: password123)
    },
  });

  // Assert the response status
  expect(response.status()).toBe(201);

// Send DELETE request to already deleted booking
const response1 = await apiContext.delete(`/booking/${bookingid}`, {
    headers: {
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=' // Default API authorization (username: admin, password: password123)
    },
    });

    // Assert the response status
    expect(response1.status()).toBe(405);
});