import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import $ from "jquery";

@Component({
  selector   : 'page-suggestions',
  templateUrl: 'suggestions.html'
})

export class SuggestionsPage {
  private readonly formsUrl : string = 'https://docs.google.com/forms/d/1OczhNdlEUv6X7yPuNPhq7bZh1AF2DEuk8OE1TkBrpRk/formResponse';
  private response = {};

  /**
   * SuggestionsPage Constructor
   * @param  {NavController}   navCtrl   Used to navigate to pages. A stack of pages representing history.
   * @param  {ToastController} toastCtrl Used to create, display, and dismiss Toasts.
   */
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
  }

  /**
   * PresentToast
   * Displays a subtle notification, informing the user that their response has
   * been recorded. Dismissed when the user clicks the close button.
   */
  presentToast = (): void => {
    const toast = this.toastCtrl.create({
      closeButtonText: 'Ok',
      message: 'Thank you! Your response has been recorded.',
      position: 'bottom',
      showCloseButton: true
    }).present();
  }

  /**
   * SubmitForm
   * Read the data from the form and POST it to the Google API. Clears the form
   * and thanks the user for their submission.
   */
  submitForm = (): void => {
    let request = {
      'usp': 'pp_url',
      'entry.1710756200': this.response['name'],
      'entry.1036644864': this.response['phone_number'],
      'entry.118019032':  this.response['email'],
      'entry.328842982':  this.response['usability'],
      'entry.1516275287': this.response['aesthetics'],
      'entry.2103220588': this.response['device'],
      'entry.1534649750': this.response['compatibility'],
      'entry.2041983297': this.response['comments']
    };

    /* POST the data to Google Forms API */
    $.ajax({
      'url': this.formsUrl,
      'data': request,
      'type': 'GET',
      'dataType': 'xml'
    });

    /* Clear the form */
    this.response['name'] = '';
    this.response['phone_number'] = '';
    this.response['email'] = '';
    this.response['usability'] = '';
    this.response['aesthetics'] = '';
    this.response['device'] = '';
    this.response['compatibility'] = '';
    this.response['comments'] = '';

    /* Thank the user */
    this.presentToast();
  }
}
