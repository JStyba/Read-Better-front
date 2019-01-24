import {NgcCookieConsentConfig} from 'ngx-cookieconsent';


const cookieConfig: NgcCookieConsentConfig = {
  'cookie': {
    'domain': 'read-better.pl'
  },
  'position': 'bottom',
  'theme': 'classic',
  'palette': {
    'popup': {
      'background': '#4a7a62',
      'text': '#ffffff',
      'link': '#ffffff'
    },
    'button': {
      'background': '#f1d600',
      'text': '#000000',
      'border': 'transparent'
    }
  },
  'type': 'info',
  'content': {
    'message': 'This website uses cookies to ensure you get the best experience on our website.',
    'dismiss': 'Got it!',
    'deny': 'Refuse cookies',
    'link': 'Learn more',
    'href': 'https://cookiesandyou.com'
  }
};
