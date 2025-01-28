require('dotenv').config();

export const publicConfig = {
  app_url: process.env.SBSCANNER_URL,
  cookie_domain: process.env.COOKIE_DOMAIN,
  crypto_secret: process.env.CRYPTO_SECRET_KEY,
  port: process.env.PORT,
  redis_url: process.env.REDIS_URL,
  session_secret: process.env.SESSION_SECRET_KEY!,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  contentful: {
    space_id: process.env.CONTENTFUL_SPACE_ID!,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    access_token: process.env.CONTENTFUL_ACCESS_TOKEN!,
  },
  email: {
    username: process.env.EMAIL_USERNAME,
    client_id: process.env.EMAIL_CLIENT_ID,
    client_secret: process.env.EMAIL_CLIENT_SECRET,
    refresh_token: process.env.EMAIL_REFRESH_TOKEN,
  },
};
