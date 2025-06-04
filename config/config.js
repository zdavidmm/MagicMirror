/* MagicMirror² configuration */
const dotenv = require('dotenv');
dotenv.config();

let config = {
  address: '0.0.0.0',
  port: 8080,
  language: 'en',
  timeFormat: 12,
  units: 'imperial',
  modules: [
    {
      module: 'clock',
      position: 'top_left',
    },
    {
      module: 'MMM-MLB-Scoreboard',
      position: 'top_center',
      config: {
        updateInterval: 300000,
        teams: ['LAD'],
      },
    },
    {
      module: 'MMM-MyCommute',
      position: 'top_right',
      config: {
        apikey: process.env.GOOGLE_MAPS_API_KEY,
        origin: 'Home Address',
        startTime: '07:00',
        endTime: '19:00',
        destinations: [
          {
            destination: 'Microsoft RTC',
            label: 'Work',
          },
          {
            destination: "Dad's, Boyds MD",
            label: 'Dad',
          },
        ],
      },
    },
    {
      module: 'MMM-GoogleMapsTraffic',
      position: 'bottom_left',
      config: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        lat: 38.9696,
        lng: -77.4089,
        height: '300px',
        width: '300px',
      },
    },
    {
      module: 'MMM-GoogleCalendar',
      position: 'bottom_center',
      config: {
        calendars: [
          {
            symbol: 'calendar-check',
            url: 'YOUR_ICAL_URL_HERE',
          },
        ],
      },
    },
    {
      module: 'MMM-Jast',
      position: 'bottom_bar',
      config: {
        stocks: ['MSFT', 'TQQQ', 'QQQ'],
      },
    },
    {
      module: 'MMM-MTG',
      position: 'lower_third',
    },
    {
      module: 'MMM-Wallpaper',
      position: 'fullscreen_below',
      config: {
        source: 'bing',
        slideInterval: 60 * 60 * 1000,
      },
    },
    {
      module: 'MMM-WeatherChart',
      position: 'top_bar',
      config: {
        apiKey: process.env.OPENWEATHER_API_KEY,
        location: 'Washington,US',
        units: 'imperial',
      },
    },
  ],
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
  module.exports = config;
}
