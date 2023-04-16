import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// export interface Module
// the interface is used to define the structure of the data
export interface Module {
  credits: string;
  dueDate: string;
  lat: string;
  long: string;
  moduleName: string;
  moduleNo: string;
  room: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModuleServiceService {
  // create url variable to hold the php_ionic json-data-modules.php file
  // urlModules = 'http://localhost:8888/php_ionic/json-data-modules.php';

  // use the environment variable to hold the url to the php_ionic folder -> json-data-modules.php file
  urlModules = environment.urlModules;

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}

  // create a method to get the data from the json-data-modules.php file
  // return type is Observable<Module>
  // Module is the interface defined above
  getModules(): Observable<Module> {
    return this.http.get<Module>(this.urlModules);
  }
}
