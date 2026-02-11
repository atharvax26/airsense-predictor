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

export interface StatsResponse {
  latest: {
    aqi: number;
    city: string;
    date: string;
  };
  historical_avg: {
    aqi: number;
    period: string;
  };
  best_recorded: {
    aqi: number;
    city: string;
    date: string;
  };
  improvement: {
    percentage: number;
    from_year: number;
    to_year: number;
  };
  city_stats: Array<{
    city: string;
    avg_aqi: number;
    min_aqi: number;
    max_aqi: number;
    records: number;
  }>;
  total_records: number;
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

/**
 * Get real statistics from the dataset
 */
export const getStats = async (): Promise<StatsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.error || 'Failed to fetch statistics');
    }

    const data: StatsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to statistics service');
  }
};
