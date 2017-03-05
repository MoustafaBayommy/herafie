import {Order} from '../models/order';
import {User} from '../models/user';
import { Injectable } from '@angular/core';

@Injectable()
 export class OrderService{
    public static order:Order;
    public static user:User;
    public static lang:string;
    constructor(){
    }
     


 }