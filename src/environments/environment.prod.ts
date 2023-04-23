export const environment = {
  production: true,
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
};
