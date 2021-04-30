import Application from './cores/Application';
import Plane from './entities/Plane/Plane';

window.addEventListener('load', () => {
  const app = new Application();
  app.addEntity(new Plane());
});
