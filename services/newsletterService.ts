const apiKey = process.env.BEEHIIV_API_KEY || '';
const publicationId = process.env.BEEHIIV_PUBLICATION_ID || '';

export interface NewsletterSubscriptionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscriptionResponse> => {
  if (!publicationId) {
    return {
      success: false,
      error: "Publication ID is missing. Please set BEEHIIV_PUBLICATION_ID in your environment variables.",
    };
  }

  // Ensure publication ID has the pub_ prefix (required by Beehiiv API)
  const formattedPublicationId = publicationId.startsWith('pub_') 
    ? publicationId 
    : `pub_${publicationId}`;

  try {
    // Use proxy endpoint in development, or direct API in production
    // The proxy will handle the API key server-side
    const apiUrl = import.meta.env.DEV 
      ? `/api/beehiiv/v2/publications/${formattedPublicationId}/subscriptions`
      : `https://api.beehiiv.com/v2/publications/${formattedPublicationId}/subscriptions`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Only add API key if not using proxy (production)
    if (!import.meta.env.DEV && apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    // Start with minimal request body - just email
    const requestBody: any = {
      email,
    };

    console.log('Subscribing with:', { apiUrl, email, publicationId: formattedPublicationId });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      // If response is not JSON, get text
      const text = await response.text();
      console.error('Non-JSON response:', text);
      data = { message: text || 'Unknown error' };
    }

    console.log('API Response:', { status: response.status, data });

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 409) {
        return {
          success: false,
          error: "This email is already subscribed.",
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          error: "Invalid API key. Please check your BEEHIIV_API_KEY.",
        };
      }

      if (response.status === 400) {
        // Log detailed error for debugging
        console.error('Bad Request Error:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          url: apiUrl,
          requestBody: requestBody,
        });
        
        // Try to extract more specific error message
        const errorMsg = data?.message || data?.error || data?.errors?.[0]?.message || JSON.stringify(data);
        return {
          success: false,
          error: errorMsg || "Invalid request. Please check your email address and try again.",
        };
      }

      return {
        success: false,
        error: data?.message || data?.error || `Subscription failed with status ${response.status}.`,
      };
    }

    return {
      success: true,
      message: "Successfully subscribed to the newsletter",
    };
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    
    // Handle network errors
    if (error?.message === 'Failed to fetch' || error?.name === 'TypeError') {
      return {
        success: false,
        error: "Network error. Please check your internet connection and try again.",
      };
    }

    return {
      success: false,
      error: error?.message || "Failed to subscribe. Please try again later.",
    };
  }
};

