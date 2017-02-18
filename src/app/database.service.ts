import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs';
import 'rxjs/Rx';
import {SQLite} from 'ionic-native';


@Injectable()
export class DataBaseService {
     db:SQLite;
   
constructor(private http:Http){


    }

    

}