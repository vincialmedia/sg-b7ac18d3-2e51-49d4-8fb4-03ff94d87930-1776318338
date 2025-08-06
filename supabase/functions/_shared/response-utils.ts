// Shared response utilities for Supabase Edge Functions
import { corsHeaders } from "./cors.ts";

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  emailId?: string;
}

// Create standardized JSON response
export function createResponse(
  data: ApiResponse,
  status = 200
): Response {
  return new Response(
    JSON.stringify(data),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status,
    }
  );
}

// Create error response
export function createErrorResponse(
  error: string,
  status = 500
): Response {
  return createResponse(
    { 
      success: false, 
      error 
    },
    status
  );
}

// Create success response
export function createSuccessResponse(
  message: string,
  emailId?: string
): Response {
  return createResponse({
    success: true,
    message,
    emailId
  });
}

// Handle CORS preflight
export function handleCorsOptions(): Response {
  return new Response('ok', { headers: corsHeaders });
}