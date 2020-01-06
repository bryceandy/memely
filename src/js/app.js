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

// Register helpers
Template7.registerHelper('removeHyphens', (val) => {
  return val.split("-").join(" ");
});

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
      giphyApiKey: 'z5uTq4UNIpz91ygOfby4QwFcE3hsDu7m'
    };
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
    iosBackgroundColor: '#FFFFFF',
    androidBackgroundColor: '#FFFFFF'
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
  // App root methods
  methods: {
    saveToGallery (fileName) {
      // Fetch the file from temp/cache
      let fileDirectory = cordova.file.cacheDirectory;
      if (app.device.ios) fileDirectory = cordova.file.tempDirectory;

      window.resolveLocalFileSystemURL(fileDirectory, getFileFromEntry /** Success */,
      function () { /** Error callback */});

      function getFileFromEntry(dir) {
        dir.getFile(fileName, { create: false }, saveMediaFile /** Success */,
        function () { /** Error callback */
          app.toast.create({
            text: 'The file does not exist',
            closeButton: true,
            closeButtonText: 'OK',
            closeButtonColor: 'red',
            closeTimeout: 4000,
          }).open()
        })
      }

      function saveMediaFile(fileEntry) {
        if ( app.device.android ) {
          var permissions = cordova.plugins.permissions;
          permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function( status ){

            if ( status.hasPermission ) {
              return storeForAndroid()
            }
            return permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, storeForAndroid,
              function () {
                app.toast.create({
                  text: 'Storage access denied!',
                  closeButton: true,
                  closeButtonText: 'OK',
                  closeButtonColor: 'red'
                }).open();

                fileEntry.remove() // Delete from cache
              }
            );
          });
        }
        else if ( app.device.ios ) {
          const filePath = fileEntry.toURL();
          // Check if it is a video
          if (fileName.search(".mp4") > 0 || fileName.search(".mov") > 0) {
            return cordova.plugins.saveVideoToGallery(filePath, function () {
              app.toast.create({
                icon: '<i class="f7-icons">checkmark_alt</i>',
                text: 'Saved!',
                position: 'center',
                closeTimeout: 4000,
              }).open();

              fileEntry.remove() // Delete from tmp
            }, function () {/** Error callback saveVid */ fileEntry.remove()})
          }

          return window.plugins.socialsharing.saveToPhotoAlbum([filePath], function () {
            app.toast.create({
              icon: '<i class="f7-icons">checkmark_alt</i>',
              text: 'Saved!',
              position: 'center',
              closeTimeout: 4000,
            }).open();

            fileEntry.remove() // Delete from tmp
          }, function () {/** Error callback saveToAlbum */ fileEntry.remove()})
        }

        function storeForAndroid () {

          window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,
            function (dirEntry) { // Success
              fileEntry.moveTo(dirEntry, fileName, function () { // Success
                app.toast.create({
                  icon: '<i class="f7-icons">checkmark_alt</i>',
                  text: 'Saved!',
                  position: 'center',
                  closeTimeout: 4000,
                }).open();

                return fileEntry.remove() // Delete from cache
              }, function () {/** Error callback moveTo */ fileEntry.remove()})
            },
          function () {/** Error callback resolving */ fileEntry.remove()});
        }
      }
    },
  }
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
