// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: {
     testKey: 'pk_test_51J9MZbJ6E4w7cr4J7bYyZ67szJypiNxIRbJ7U3WtEsjS5mEM1juyVNZLxd4T7ZqBd1H85hxoyp56uHvLg5JMVz6900Zn3nO6tp'
  },
  firebase: {
    apiKey: 'AIzaSyBC2WKMKDZmAaY6hpZIWkVdxeVVSlX4z84',
    authDomain: 'qr-code-website.firebaseapp.com',
    projectId: 'qr-code-website',
    storageBucket: 'qr-code-website.appspot.com',
    messagingSenderId: '1031597164438',
    appId: '1:1031597164438:web:45bd6cd38e343a66057fb7',
    measurementId: 'G-695BTJ8MGG',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
