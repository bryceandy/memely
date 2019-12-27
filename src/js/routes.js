import AppTourPage from '../pages/app-tour.f7.html'
import AppTourFinalPage from '../pages/app-tour-final.f7.html'
import ImagesPage from '../pages/images.f7.html';
import CatalogPage from '../pages/catalog.f7.html';
import SettingsPage from '../pages/settings.f7.html';

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
    path: '/images/',
    component: ImagesPage,
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
