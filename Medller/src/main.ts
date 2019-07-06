import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PenAppModule } from './app/pentest.module';
import { environment,  firebaseCredentials } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PenAppModule)
  .catch(err => console.log(err));
