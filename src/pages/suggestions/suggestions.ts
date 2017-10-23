import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import $ from "jquery";

@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html'
})

export class SuggestionsPage {
  public GOOGLE_FORMS_URL : string = 'https://docs.google.com/forms/d/1OczhNdlEUv6X7yPuNPhq7bZh1AF2DEuk8OE1TkBrpRk/formResponse';

  constructor(public navCtrl: NavController) {
  }

  submitForm = (): void => {
   var name = $('#name').val();
   var phone_number = $('#phone_number').val();
   var email = $('#email').val();
   var user_experience = $('#user_experience').val();
   var aesthetics = $('#aesthetics').val();
   var device = $('#device').val();
   var compatibility = $('#compatibility').val();
   var comments = $('#comments').val();
   var request = {
     'usp': 'pp_url',
     'entry.1710756200': name, /* Name */
     'entry.1036644864': phone_number, /* Phone Number */
     'entry.118019032': email, /* Mail Address */
     'entry.328842982': Number(user_experience), /* User Experience */
     'entry.1516275287': Number(aesthetics), /* Aesthetics */
     'entry.2103220588': device, /* Device Model/Software */
     'entry.1534649750': compatibility, /* Compatibility */
     'entry.2041983297': comments /* Other Suggestions */
   };

   $.ajax({
           url: this.GOOGLE_FORMS_URL,
           data: request,
           type: "GET",
           dataType: "xml",
           statusCode: {
               0: function () {

               },
               200: function () {
                 console.log('Form submitted, no errors');
               }
           }
       });

       $('#name').val('');
       $('#phone_number').val('');
       $('#email').val('');
       $('#user_experience').val('');
       $('#aesthetics').val('');
       $('#device').val('');
       $('#compatibility').val('');
       $('#comments').val('');
 }

}
