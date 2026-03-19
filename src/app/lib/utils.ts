export type ApiErrorItem = {
  code: string;
  message: string;
  field?: string | null;
};

export type ApiErrorResponse = {
  errors?: ApiErrorItem[];
};

export async function readApiErrors(response: Response): Promise<ApiErrorItem[]> {
  try {
    const json = (await response.json()) as ApiErrorResponse;
    return Array.isArray(json.errors) ? json.errors : [];
  } catch {
    return [];
  }
}
