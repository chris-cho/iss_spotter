/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const apiKey = "";

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    }
    return callback(error, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://geo.ipify.org/api/v1?apiKey=at_xjXqymNdY4rPAFiC6p8MeQ7M1w78V&ipAddress=${ip}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`), null);
    }
    return callback(null, JSON.parse(body).location.lat, JSON.parse(body).location.lng);
  });

 
};

module.exports = { fetchMyIP , fetchCoordsByIP };