import {
  RequirementFormData,
  SavedRequirement,
  RequirementStats,
} from '../types/requirement';

function getApiBase(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined') {
    return '/api';
  }
  return 'http://localhost:5001/api';
}

function buildApiUrl(endpoint: string): string {
  const base = getApiBase();
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return `${base.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }
  // Relative URL in browser
  return `${base.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  errors?: Array<{ field: string; message: string }>;
}

export async function createRequirement(
  payload: RequirementFormData
): Promise<ApiResponse<SavedRequirement>> {
  const url = buildApiUrl('/requirements');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit requirement');
  }
  return data;
}

export async function getRequirements(params?: {
  category?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<SavedRequirement[]>> {
  const base = getApiBase();
  let url: URL;

  if (base.startsWith('http://') || base.startsWith('https://')) {
    url = new URL(`${base.replace(/\/$/, '')}/requirements`);
  } else if (typeof window !== 'undefined') {
    url = new URL(`${base.replace(/\/$/, '')}/requirements`, window.location.origin);
  } else {
    url = new URL('http://localhost:5001/api/requirements');
  }

  if (params?.category && params.category !== 'all') {
    url.searchParams.set('category', params.category);
  }
  if (params?.search) {
    url.searchParams.set('search', params.search);
  }
  if (params?.status) {
    url.searchParams.set('status', params.status);
  }
  if (params?.page) {
    url.searchParams.set('page', params.page.toString());
  }
  if (params?.limit) {
    url.searchParams.set('limit', params.limit.toString());
  }

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch requirements');
  }
  return data;
}

export async function getRequirementById(
  id: string
): Promise<ApiResponse<SavedRequirement>> {
  const url = buildApiUrl(`/requirements/${id}`);
  const res = await fetch(url, {
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to load requirement details');
  }
  return data;
}

export async function getStats(): Promise<ApiResponse<RequirementStats>> {
  const url = buildApiUrl('/requirements/stats');
  const res = await fetch(url, {
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch statistics');
  }
  return data;
}

export async function seedRequirements(): Promise<ApiResponse<SavedRequirement[]>> {
  const url = buildApiUrl('/requirements/seed');
  const res = await fetch(url, {
    method: 'POST',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to seed sample requirements');
  }
  return data;
}

export async function checkApiHealth(): Promise<{ healthy: boolean; status?: string }> {
  try {
    const url = buildApiUrl('/health');
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return { healthy: true, status: data.status };
    }
    return { healthy: false };
  } catch {
    return { healthy: false };
  }
}
