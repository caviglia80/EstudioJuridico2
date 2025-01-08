import { Component } from '@angular/core';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.css'],
})
export class SocialButtonsComponent {
  redirectToInstagram() {
    const appLink = 'instagram://user?username=cavigliayasociados';
    const webLink = 'https://www.instagram.com/cavigliayasociados';

    if (this.isInstagramAppInstalled()) window.location.href = appLink;
    else window.open(webLink, '_blank', 'noopener,noreferrer');
  }

  isInstagramAppInstalled(): boolean {
    const isInstagramSupported =
      window.navigator && window.navigator.userAgent.match(/instagram/i);
    return !!(
      isInstagramSupported && window.location.href.startsWith('instagram://')
    );
  }
}
