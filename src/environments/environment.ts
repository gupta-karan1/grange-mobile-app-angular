// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // create a variable to hold the url to the php_ionic folder -> json-data-modules.php file
  urlModules: 'http://localhost:8888/php_ionic/json-data-modules.php',

  // create url variable to hold the php_ionic json-data-students.php file
  urlStudents: 'http://localhost:8888/php_ionic/json-data-students.php',

  // create url variable to hold the php_ionic json-data-lecturers.php file
  urlLecturers: 'http://localhost:8888/php_ionic/json-data-lecturers.php',

  // create a variable to hold the url to the php_ionic folder -> json-update-student.php file
  urlUpdateStudents: 'http://localhost:8888/php_ionic/json-update-student.php',

  // create a variable to hold random images api url
  urlRandomImages: 'https://picsum.photos',

  //firebase API key
  firebase: {
    apiKey: 'AIzaSyCrXIhp80PuJPZSVaTudQE86L9Ao_-9m7k',
    authDomain: 'grange-mobile-karan.firebaseapp.com',
    projectId: 'grange-mobile-karan',
    storageBucket: 'grange-mobile-karan.appspot.com',
    messagingSenderId: '446380689792',
    appId: '1:446380689792:web:ff8bbbaa88af2b27df1965',
  },

  //supabase API key - supabase is a postgres database with a rest api  - https://supabase.io/npc

  supabaseUrl: 'https://gxefmaykzhiqjsmnxvlb.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4ZWZtYXlremhpcWpzbW54dmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1MTIxNzIsImV4cCI6MTk5ODA4ODE3Mn0.amObRTjDoPqEQzGOCO0lwXlvmvJ_wq9Vpp6UjSq4Bs4',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
