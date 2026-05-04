/**
 * Cache-bust an image URL by adding a timestamp query parameter
 * This forces the browser to fetch a fresh copy instead of using the cached version
 */
export function bustImageCache(url: string): string {
  if (!url) return url;
  
  // Don't bust cache for fallback/placeholder images
  if (url.includes('data:') || url.includes('favicon')) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
}
