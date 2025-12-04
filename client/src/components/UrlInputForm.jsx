import { useState } from "react";
import { createShortUrl } from "../services/api";
import { isValidUrl } from "../utils/validators";

const UrlInputForm = ({ onCreated, setToast }) => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidUrl(url)) {
            setToast({
                status: "error",
                message: "Please enter a valid URL (including protocol, e.g. https://)",
            });
            return;
        }
        setLoading(true);
        try {
            const data = await createShortUrl(url);
            onCreated(data);
            setToast({
                status: "success",
                message: "Short URL created",
            });
            setUrl("");
        } catch (err) {
            console.error(err);
            setToast({
                status: "error",
                message: err.message || "Failed to create short URL",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
            <div className="flex gap-2">
                <input
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        e.target.setCustomValidity(
                            isValidUrl(e.target.value) || e.target.value.trim() === ""
                                ? ""
                                : "Invalid URL"
                        );
                    }}
                    placeholder="https://example.com/very/long/url"
                    className="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-600 invalid:border-pink-500 invalid:border-red-500 focus:invalid:border-red-500"
                />
                <button
                    disabled={loading || !isValidUrl(url)}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60 hover:border-transparent hover:bg-blue-800 disabled:pointer-events-none"
                >
                    {loading ? "Shortening..." : "Shorten"}
                </button>
            </div>
        </form>
    );
};

export default UrlInputForm;
