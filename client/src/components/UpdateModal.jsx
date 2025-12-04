import { useState } from "react";
import { updateUrl } from "../services/api";
import { isValidUrl } from "../utils/validators";

const UpdateModal = ({ record, onClose, onUpdated, setToast }) => {
    const [url, setUrl] = useState(record?.url || "");
    const [loading, setLoading] = useState(false);

    if (!record) return null;

    const handleSave = async (e) => {
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
            const data = await updateUrl(record.shortCode, url);
            onUpdated(data);
            setToast({
                status: "success",
                message: "Updated!",
            });
            onClose();
        } catch (err) {
            setToast({
                status: "error",
                message: err.message || "Failed to update.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
            <form onSubmit={handleSave} className="bg-white p-6 rounded shadow w-full max-w-md">
                <h3 className="text-lg font-medium mb-3">Update URL</h3>
                <input
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-600 invalid:border-pink-500 invalid:border-red-500 focus:invalid:border-red-500"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        e.target.setCustomValidity(
                            isValidUrl(e.target.value) || e.target.value.trim() === ""
                                ? ""
                                : "Invalid URL"
                        );
                    }}
                />
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 border rounded hover:border-transparent hover:bg-gray-600 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:border-transparent hover:bg-blue-800 disabled:opacity-60 disabled:pointer-events-none"
                        disabled={loading || url === record?.url || !isValidUrl(url)}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateModal;
