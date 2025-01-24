const { test, expect, request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Create booking', async () => {
    // Read random data from JSON file
    const filePath = path.resolve(__dirname, '../test-data/createBookingData.json');
    const randomBookingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log('Using Random Booking Data:', randomBookingData);

    const apiContext = await request.newContext();
    const postAPIResponse = await apiContext.post(`/booking`,{
        data: randomBookingData
    })

    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody =  await postAPIResponse.json();
    const createdBooking = postAPIResponseBody.booking;
    expect(createdBooking).toMatchObject(randomBookingData);

    const filePath1 = path.resolve(__dirname, '../test-data/createdBookingData.json');
    fs.writeFileSync(filePath1, JSON.stringify(postAPIResponseBody, null, 2), 'utf-8');
    
    console.log('Randomly generated data response saved to:', postAPIResponseBody);
});