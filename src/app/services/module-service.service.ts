import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

// export interface Module
// the interface is used to define the structure of the data
export interface Module {
  [key: string]: any;
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

  // created  a method to get only the object from modules array that has the moduleNo property that matches the moduleNo parameter
  // this will create a details page for each module
  //using angular pipe to filter the data
  getModuleDetails(moduleNo: string): Observable<Module> {
    return this.http.get<Module>(this.urlModules).pipe(
      map((result) => {
        let module = result['modules'].filter(
          (m: any) => m.moduleNo == moduleNo
        );
        return module && module.length ? module[0] : null;
      })
    );
  }
}
