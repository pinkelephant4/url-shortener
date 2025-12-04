export function isValidUrl(value) {
    if (!value || typeof value !== "string") return false;
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}
