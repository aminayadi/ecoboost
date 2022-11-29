// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBackend: 'http://localhost:8080',

  urlProducts: 'http://54.36.180.8:8082/api/products',
  urlContact: 'http://localhost:28080/contactus',
  
  apiURL: 'http://localhost:4000/api',
  soapApiURL: 'http://localhost:4000',
  keycatcha: '6Lf-zREgAAAAALFz38FBUQAQer1uWxkcS4bxZ2Ii'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
