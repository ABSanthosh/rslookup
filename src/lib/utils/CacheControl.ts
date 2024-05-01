// Cache is set to 3 hours and stale-while-revalidate is set to 30 seconds
// Every 3 hours, the cache is revalidated and the stale cache is served for 30 seconds
export const cacheConfig = {
  'cache-control': 'public, must-revalidate, max-age=10800, stale-while-revalidate=30'
};
