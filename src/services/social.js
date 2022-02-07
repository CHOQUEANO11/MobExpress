import OAuthManager from 'react-native-social-login';

const social = new OAuthManager('MobExpress');

social.configure({
  facebook: {
    client_id: '1030613007794216',
    client_secret: 'dc154aea25937602da4f1a9aa9b89935',
  },
});

export default social;
