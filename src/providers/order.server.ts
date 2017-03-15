import {Order} from '../models/order';
import {User,Neigbouhood} from '../models/user';
import { Injectable } from '@angular/core';

@Injectable()
 export class OrderService{
    public static order:Order;
    public static user:User;
    public static lang:string;
    public static neigbouhoods:Neigbouhood[]= [
      { id: 0, name: 'المسفلة', 'title': 'register.neighs.almusaffala' },
      { id: 1, name: 'الكعكية', 'title': 'register.neighs.alkaakih' },
      { id: 2, name: 'الملاوى', 'title': 'register.neighs.almalawaa' },
      { id: 3, name: 'بطحاء قريش', 'title': 'register.neighs.butaha_quraysh' },
      { id: 4, name: 'العوالى', 'title': 'register.neighs.aleawala' },
      { id: 5, name: 'الاسكان', 'title': 'register.neighs.aliiskan' },
      { id: 6, name: 'الشوقية', 'title': 'register.neighs.alshshawqia' },
      { id: 7, name: 'كدى', 'title': 'register.neighs.kudaa' },
      { id: 8, name: 'السبهانى', 'title': 'register.neighs.alssubhana' },
      { id: 9, name: 'الحمراء', 'title': 'register.neighs.alhamra' },
      { id: 10, name: 'الشهداء', 'title': 'register.neighs.alshshuhada' },
      { id: 11, name: 'العمرة', 'title': 'register.neighs.alemr' },
      { id: 12, name: 'البحيرات', 'title': 'register.neighs.albuhayrat' },
      { id: 13, name: 'النوارية', 'title': 'register.neighs.alnnawaria' },
      { id: 14, name: 'الفيحاء', 'title': 'register.neighs.alfayaha' },
      { id: 15, name: 'شارع الحج', 'title': 'register.neighs.sharie_alhajj' },
      { id: 16, name: 'الغسالة', 'title': 'register.neighs.alghasala' },
      { id: 17, name: 'وادى جليل', 'title': 'register.neighs.wadda_jalil' },
      { id: 18, name: 'الخنساء', 'title': 'register.neighs.alkhinsa' },
      { id: 19, name: 'ريع زاخر', 'title': 'register.neighs.rie_dhakhir' },
      { id: 20, name: 'جرول', 'title': 'register.neighs.jarwal' },
      { id: 21, name: 'العتيبيه', 'title': 'register.neighs.alotaibih' },
      { id: 22, name: 'ريع الكحل', 'title': 'register.neighs.rie_alkihl' },
      { id: 23, name: 'الزاهر', 'title': 'register.neighs.alzzahir' },
      { id: 24, name: 'ملقيه', 'title': 'register.neighs.milqayh' },
      { id: 25, name: 'السفلة', 'title': 'register.neighs.alssafla' },
      { id: 26, name: 'الهجرة', 'title': 'register.neighs.alhijra' },
      { id: 27, name: 'الدائرى', 'title': 'register.neighs.alddayiree' },
      { id: 28, name: 'الإسكان', 'title': 'register.neighs.al_iiskan' },
      { id: 29, name: 'شارع منصور', 'title': 'register.neighs.sharie_mansur' },
      { id: 30, name: 'الحفاير', 'title': 'register.neighs.alhafayir' },
      { id: 31, name: 'الطندباوى', 'title': 'register.neighs.altndbawa' },
      { id: 32, name: 'الهنداوية', 'title': 'register.neighs.alhindawia' },
      { id: 33, name: 'البيبان', 'title': 'register.neighs.albayban' },
      { id: 34, name: 'القشلة', 'title': 'register.neighs.alqashla' },
      { id: 35, name: 'مخططات الشرائع', 'title': 'register.neighs.mukhattatat_alshsharayie' },
      { id: 36, name: 'شرائع المجاهدين', 'title': 'register.neighs.sharayie_almujahidin' },
      { id: 37, name: 'جبل النور', 'title': 'register.neighs.jabal_alnnur' }

    ];
    constructor(){
    }
     


 }