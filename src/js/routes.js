
import HomePage from '../pages/home.f7.html';
import CatalogPage from '../pages/catalog.f7.html';
import SettingsPage from '../pages/settings.f7.html';

var routes = [
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
