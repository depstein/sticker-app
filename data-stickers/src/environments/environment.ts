// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBvY2mqKyhE8u4IFBQ0IUg7qFL920uthI4",
    authDomain: "sticker-analytics.firebaseapp.com",
    projectId: "sticker-analytics",
    storageBucket: "sticker-analytics.appspot.com",
    messagingSenderId: "740150109623",
    appId: "1:740150109623:web:c96af3527449f06b227432",
    measurementId: "G-24Y1FMRDRL"
  },
  nutritionixID: '67853ab2',
  nutritionixKey: 'd27556fd8ab42acd7a7def7d91347f0e',
  usingHealthData: false,
  spotifyServerURL: 'https://sticker-spotify.herokuapp.com',
  serverURL: 'https://snap-pi.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
