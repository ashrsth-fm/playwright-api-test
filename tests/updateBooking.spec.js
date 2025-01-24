const { test, expect, request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Update Booking Details', async () => {
  const apiContext = await request.newContext();

  // Path to the recently created booking data JSON
  const createdBookingDataPath = path.resolve(__dirname, '../test-data/createdBookingData.json');


  // Read the booking ID and original booking data
  const { bookingid } = JSON.parse(fs.readFileSync(createdBookingDataPath, 'utf-8'));
  const createdBookingData = JSON.parse(fs.readFileSync(createdBookingDataPath, 'utf-8'));

  console.log('Updating Booking ID:', bookingid);

  // New data to update the booking
  const updatedBookingData = {
    totalprice: createdBookingData.totalprice + 50, // Increment the total price
    depositpaid: !createdBookingData.depositpaid, // Toggle deposit paid
  };

  // Send PATCH request to update the booking
  const response = await apiContext.patch(`/booking/${bookingid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=' // Default API authorization (username: admin, password: password123)
    },
    data: updatedBookingData,
  });

  // Assert the response status
  expect(response.status()).toBe(200);

  // Get the response body
  const updatedBooking = await response.json();
  console.log('Updated Booking Response:', updatedBooking);

  // Validate that the booking was updated correctly
  expect(updatedBooking.firstname).toBe(createdBookingData.booking.firstname);
  expect(updatedBooking.lastname).toBe(createdBookingData.booking.lastname);
  const updatedTotalPrice = await createdBookingData.booking.totalprice + 50;
//   console.log('thissss:::', updatedTotalPrice);
//   expect(updatedBooking.totalprice).toBe(updatedTotalPrice);  
//   expect(updatedBooking.totalprice).toBe(createdBookingData.booking.totalprice + 50);
  expect(updatedBooking.depositpaid).toBe(!createdBookingData.depositpaid);
  expect(updatedBooking.bookingdates.checkin).toEqual(createdBookingData.booking.bookingdates.checkin);
  expect(updatedBooking.bookingdates.checkout).toEqual(createdBookingData.booking.bookingdates.checkout);
  expect(updatedBooking.additionalneeds).toBe(createdBookingData.booking.additionalneeds);
});