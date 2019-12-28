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
import Template7 from "template7";

// Partial templates to be used anywhere
Template7.registerPartial('menu-link',
    `<a href="#" class="link icon-only panel-open" data-panel="left">
                <i class="icon f7-icons if-not-md">menu</i>
                <i class="icon material-icons if-md">menu</i>
              </a>`
    );

var app = new Framework7({
  root: '#app', // App root element
  id: 'com.bryce.memely', // App bundle ID
  name: 'memely', // App name
  theme: 'auto', // Automatic theme detection
  iosSwipeBack: false,
  panel: {
    closeByBackdropClick: true,
    swipe: true
  },

  // App root data
  data: function () {
    return {
      XRapidAPIKey: '5a5db81725mshedb8ee9d33ab24fp163f56jsnc051c51e6ced',
      XRapidAPIHost: 'ronreiter-meme-generator.p.rapidapi.com',
      requestingDomain: 'https://ronreiter-meme-generator.p.rapidapi.com/',
      igAppId: 2368452289927461,
      igAppSecret: '9fa95fe6a8621962a78c2a5e8f3b3e07'
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
    androidOverlaysWebView: false
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

let startUrl = '/app-tour/';
const currentUser = JSON.parse(localStorage.getItem("user"));

if (currentUser ? currentUser.passedTour : false) {
  startUrl = '/'
}

// Choose which route to load
app.views.create('.view-main', {
  url: startUrl
});
