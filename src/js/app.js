import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';

// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';

var app = new Framework7({
  root: '#app', // App root element
  id: 'com.bryce.memely', // App bundle ID
  name: 'memely', // App name
  theme: 'auto', // Automatic theme detection

  // App root data
  data: function () {
    return {
      XRapidAPIKey: '5a5db81725mshedb8ee9d33ab24fp163f56jsnc051c51e6ced',
      XRapidAPIHost: 'ronreiter-meme-generator.p.rapidapi.com',
      requestingDomain: 'https://ronreiter-meme-generator.p.rapidapi.com/'
    };
  },
  // App root methods
  methods: {

  },
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: false,
    androidOverlaysWebView: false,
    androidBackgroundColor: "#ffffff"
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

