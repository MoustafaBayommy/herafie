


export class User{
name:string;
mobile:string;
email:string;
neighborhood:Neigbouhood;
city:string;
knownFrom:string;


} ;

export interface Neigbouhood{
  id :number,
name:string,
title:string
} ;

export interface City{
  id :number,
name:string,
title:string
} ;

export interface ways{
  id :number,
name:string,
title:string
} ;