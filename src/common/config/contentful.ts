import { createClient } from 'contentful';
import { publicConfig } from './constants';

const deliveryClient = createClient({
  space: publicConfig.contentful.space_id,
  environment: publicConfig.contentful.environment,
  accessToken: publicConfig.contentful.access_token,
});

export default deliveryClient;
