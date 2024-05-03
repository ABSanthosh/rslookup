// Cache is set to 3 hours and stale-while-revalidate is set to 30 seconds
// Every 3 hours, the cache is revalidated and the stale cache is served for 30 seconds
export const cacheConfig = (hours = 3) => {
  return {
    'cache-control': `public, must-revalidate, max-age=${hours * 60 * 60}, stale-while-revalidate=30`
  };
};
