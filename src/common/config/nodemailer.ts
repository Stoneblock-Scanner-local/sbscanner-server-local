require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
import { publicConfig } from './constants';

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      publicConfig.email.client_id,
      publicConfig.email.client_secret,
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: publicConfig.email.refresh_token,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err: any, token: string) => {
        if (err) {
          console.log('*ERR: ', err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: publicConfig.email.username,
        accessToken,
        clientId: publicConfig.email.client_id,
        clientSecret: publicConfig.email.client_secret,
        refreshToken: publicConfig.email.refresh_token,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};

export default createTransporter;
