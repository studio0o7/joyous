export default async (request, context) => {
  // Skip edge function for admin routes to prevent OAuth interference
  const url = new URL(request.url);
  if (url.pathname.startsWith('/admin')) {
    console.log(`[Edge Function] Skipping admin route: ${url.pathname}`);
    return context.next();
  }
  
  // Get country code from Netlify's geo data
  const countryCode = context.geo?.country?.code || 'US';
  
  // Log for debugging
  console.log(`[Edge Function] Detected country: ${countryCode}`);
  
  // Clone the original request and proceed with normal handling
  const response = await context.next();
  
  // Set cookie with country information
  response.headers.set('Set-Cookie', `country=${countryCode}; path=/; max-age=3600; SameSite=Lax`);
  
  // Add debug header (optional, helps with troubleshooting)
  response.headers.set('X-Detected-Country', countryCode);
  
  return response;
} 