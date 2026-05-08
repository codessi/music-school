import { createClient, type QueryParams } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';
const useCdn = import.meta.env.PROD;

const hasSanityConfig = Boolean(projectId && dataset);

const client = hasSanityConfig
	? createClient({
			projectId,
			dataset,
			apiVersion,
			useCdn
		})
	: null;

export async function fetchSanity<T>(query: string, params: QueryParams = {}): Promise<T | null> {
	if (!client) return null;
	return client.fetch<T>(query, params);
}

export function sanityConfigured(): boolean {
	return hasSanityConfig;
}
