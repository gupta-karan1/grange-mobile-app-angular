// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // create a variable to hold the url to the php_ionic folder -> json-data-modules.php file
  urlModules: 'http://localhost:8888/php_ionic/json-data-modules.php',

  // create url variable to hold the php_ionic json-data-students.php file
  urlStudents: 'http://localhost:8888/php_ionic/json-data-students.php',

  // create a variable to hold random images api url
  urlRandomImages: 'https://picsum.photos',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
