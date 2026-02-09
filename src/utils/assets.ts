export const getAssetPath = (path: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    // Ensure we don't end up with double slashes
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normalizedBase}${normalizedPath}`;
};
