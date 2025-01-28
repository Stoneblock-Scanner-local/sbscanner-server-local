import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { publicConfig } from './constants';

const redisClient = createClient({
  url: publicConfig.redis_url,
  socket: {
    connectTimeout: 10000,
  },
});

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
});

export { redisClient, redisStore };
