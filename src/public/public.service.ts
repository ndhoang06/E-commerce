import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContentEmail } from './public.dto';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PublicService {

    async sendEmail(dataUpdate: ContentEmail) {
        const CLIENT_ID = "768841587784-rdupa4jrh74ocmn8m9ghn9ct88etjv62.apps.googleusercontent.com";
        const CLIENT_SECRET = "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";
        const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
        const REFRESH_TOKEN = "1//04ivKmMiPWVrHCgYIARAAGAQSNwF-L9IrDg5pjUnYwwo9uZHquW2IzpuAca7Wej-_LKhqwqFPzGprL2J7x1lQURJGbIVrxmHRZXo";
        const oAuth2Client = new google.auth.OAuth2(
          CLIENT_ID,
          CLIENT_SECRET,
          REDIRECT_URI,
        );
        try {
          oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
          const accessToken = await oAuth2Client.getAccessToken();
    
          const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'tieuheadshot94@gmail.com',
              clientId: oAuth2Client._clientId,
              clientSecret: oAuth2Client._clientSecret,
              refreshToken: oAuth2Client.credentials.refresh_token,
              accessToken: accessToken,
            },
          });
          const mailOptions = {
            from: 'tieuheadshot94@gmail.com',
            to: dataUpdate.to,
            subject: dataUpdate.subject,
            text: dataUpdate.content,
            html: dataUpdate.content,
          };
    
          const result = await transport.sendMail(mailOptions);
          return result;
        } catch (error) {
          return new HttpException('Error sending mail', HttpStatus.BAD_REQUEST);
        }
      }
}
