import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { socialKeys } from './../constants/config';

export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(socialKeys.FACEBOOK_APP_ID)
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(socialKeys.GOOGLE_CLIENT_ID)
          }
        ]
    );
}
