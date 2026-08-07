import { cleanAndReseedDatabase } from './src/core/services/cleanAndReseedDatabase';

cleanAndReseedDatabase()
  .then((res) => {
    console.log('Done cleanAndReseedDatabase:', res);
    process.exit(res.success ? 0 : 1);
  })
  .catch((err) => {
    console.error('Error running cleanAndReseedDatabase:', err);
    process.exit(1);
  });
