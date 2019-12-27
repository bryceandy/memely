import AppTourPage from '../pages/app-tour.f7.html'
import AppTourFinalPage from '../pages/app-tour-final.f7.html'

import HomePage from '../pages/home.f7.html'
import ImagesPage from '../pages/images.f7.html'
import GifsPage from '../pages/gifs.f7.html'
import CatalogPage from '../pages/catalog.f7.html'
import SettingsPage from '../pages/settings.f7.html'
import {app} from "./app";

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

          resolve ({
            component: ImagesPage
          },
          {
            context: {
              images: data
            }
          })
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
