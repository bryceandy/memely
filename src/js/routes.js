import AppTourPage from '../pages/app-tour.f7.html'
import AppTourFinalPage from '../pages/app-tour-final.f7.html'

import HomePage from '../pages/home.f7.html'
import ImagesPage from '../pages/images.f7.html'
import DownloadImagePage from '../pages/download-image.f7.html'
import GifsPage from '../pages/gifs.f7.html'
import CatalogPage from '../pages/catalog.f7.html'
import SettingsPage from '../pages/settings.f7.html'

var routes = [
  {
    path: '/app-tour/',
    component: AppTourPage
  },
  {
    path: '/app-tour-final/',
    component: AppTourFinalPage,
    options: {
      transition: 'f7-flip',
    }
  },
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/images/',
    async: function (routeTo, routeFrom, resolve, reject) {

      const app = this.app;

      // Request
      app.request({
        url: app.data.requestingDomain+'images',
        method: 'Get',
        headers: {
          "x-rapidapi-host": app.data.XRapidAPIHost,
          "x-rapidapi-key": app.data.XRapidAPIKey
        },
        dataType: 'json',
        success(data, status, xhr) {

          setTimeout(() => {
            resolve ({
              component: ImagesPage
            },{
              context: {
                images: data
              }
            })
          }, 100)
        },
        error(xhr, status) {
          reject();
          app.toast.create({
            text: 'Failed to load images! '+status,
            closeButton: true,
            closeButtonText: 'OK',
            closeButtonColor: 'red',
          }).open()
        }
      })
    },
  },
  {
    path: '/image/get/:name/',
    name: 'download-image',
    async: function (routeTo, routeFrom, resolve, reject) {

      const app = this.app, imageName = routeTo.params.name;
      app.preloader.show('orange');

      setTimeout(() => {
        app.preloader.hide();
        resolve({
          component: DownloadImagePage
        },{
          context: {
            name: imageName
          }
        })
      }, 2000)
    }
  },
  {
    path: '/gifs/',
    component: GifsPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
];

export default routes;
