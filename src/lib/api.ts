// API service for communicating with Flask backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface PredictionRequest {
  city: string;
  year: number;
  month: number;
}

export interface PredictionResponse {
  aqi: number;
  category: string;
  city: string;
  year: number;
  month: number;
}

export interface ErrorResponse {
  error: string;
}

/**
 * Call the Flask backend to get AQI prediction
 */
export const predictAQI = async (
  request: PredictionRequest
): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.error || 'Prediction failed');
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to prediction service');
  }
};

/**
 * Check if the backend is healthy
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
