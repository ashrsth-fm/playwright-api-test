const { test, expect, request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Get booking details from the previously created booking', async () => {
  const apiContext = await request.newContext();

  // Path to the recently created booking data JSON
  const createdBookingDataPath = path.resolve(__dirname, '../test-data/createdBookingData.json');

  // Read the booking ID and the original booking data
  const { bookingid } = JSON.parse(fs.readFileSync(createdBookingDataPath, 'utf-8'));
  const createdBookingData = JSON.parse(fs.readFileSync(createdBookingDataPath, 'utf-8'));

  console.log('Booking ID:', bookingid);
  console.log('Created Booking Data:', createdBookingData);

  // Send GET request to retrieve booking details
  const response = await apiContext.get(`/booking/${bookingid}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  // Assert the response status
  expect(response.status()).toBe(200);

  // Get the response body
  const bookingDetails = await response.json();
  console.log('Booking Details:', bookingDetails);

  // Validate the booking details match the original booking data
  expect(bookingDetails.firstname).toBe(createdBookingData.booking.firstname);
  expect(bookingDetails.lastname).toBe(createdBookingData.booking.lastname);
  expect(bookingDetails.totalprice).toBe(createdBookingData.booking.totalprice);
  expect(bookingDetails.depositpaid).toBe(createdBookingData.booking.depositpaid);
  expect(bookingDetails.bookingdates.checkin).toEqual(createdBookingData.booking.bookingdates.checkin);
  expect(bookingDetails.bookingdates.checkout).toEqual(createdBookingData.booking.bookingdates.checkout);
  expect(bookingDetails.additionalneeds).toEqual(createdBookingData.booking.additionalneeds);
});