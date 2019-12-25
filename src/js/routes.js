import AppTourPage from '../pages/app-tour.f7.html'
import HomePage from '../pages/home.f7.html';
import CatalogPage from '../pages/catalog.f7.html';
import SettingsPage from '../pages/settings.f7.html';

var routes = [
  {
    path: '/app-tour/',
    name: 'app-tour',
    component: AppTourPage
  },
  {
    path: '/',
    component: HomePage,
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
