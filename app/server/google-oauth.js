import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: Meteor.settings.GOOGLE_CLIENT_ID,
      secret: Meteor.settings.GOOGLE_CLIENT_SECRET,
    },
  },
);
