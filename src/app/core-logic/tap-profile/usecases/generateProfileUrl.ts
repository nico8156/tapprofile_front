export const generateProfileUrl = (origin: string, slug: string): string => {
	const normalizedOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin;
	return `${normalizedOrigin}/p/${slug}`;
};
