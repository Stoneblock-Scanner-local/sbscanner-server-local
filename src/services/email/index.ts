import { User } from '@prisma/client';
import createTransporter from '../../common/config/nodemailer';
import prisma from '../../common/config/prisma';
import { generateVerificationToken } from '../../common/utils/helpers';
import { publicConfig } from '../../common/config/constants';

const sendUserVerificationEmail = async (user: User) => {
  let updatedUser;

  if (!user.verificationToken) {
    updatedUser = await prisma.user.update({
      data: {
        verificationToken: generateVerificationToken(),
        isEmailVerified: false,
      },
      where: {
        id: user.id,
      },
    });
  }

  const body = `
    <h3>Welcome to SBScanner</h3>
    <p>Verify email by click the link</p>
    <button style="padding: 8px; width:80px; cursor: pointer;">
      <a href=${publicConfig.app_url}/login?verificationToken=${updatedUser?.verificationToken} style="text-decoration: none; color: #000;">Verify</a>
    </button>
  `;

  const message = {
    from: publicConfig.email.username,
    to: updatedUser?.email,
    subject: 'Email verification',
    html: body,
  };

  return await sendEmail(message);
};

const sendForgotPasswordEmail = async (email: string, token: string) => {
  const body = `
    <h3>SBScanner reset password</h3>
    <p>Click bellow for password reset</p>
    <button style="padding: 8px; width:200px; cursor: pointer;">
      <a href=${publicConfig.app_url}/reset-password/reset?token=${token} style="text-decoration: none; color: #000;">Reset password</a>
    </button>
  `;

  const message = {
    from: publicConfig.email.username,
    to: email,
    subject: 'Reset password',
    html: body,
  };

  return await sendEmail(message);
};

const sendEmail = async (message: any) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(message);
    console.log('Email sent');
  } catch (err) {
    console.log('ERROR: ', err);
  }
};

export default { sendUserVerificationEmail, sendForgotPasswordEmail };
