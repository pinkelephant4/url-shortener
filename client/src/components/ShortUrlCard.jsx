import { useState } from "react";
import { deleteUrl } from "../services/api";

const ShortUrlCard = ({ record, onDelete, onUpdateClick, setToast }) => {
    const [loading, setLoading] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/r/${record.shortCode}`);
            setToast({
                status: "neutral",
                message: "Copied to Clipboard!",
            });
        } catch {
            setToast({
                status: "error",
                message: "Failed to copy",
            });
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this short URL?")) return;
        setLoading(true);
        try {
            await deleteUrl(record.shortCode);
            onDelete(record.shortCode);
            setToast({
                status: "success",
                message: "Deleted!",
            });
        } catch (err) {
            console.log(err);

            setToast({
                status: "error",
                message: "Failed to delete.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded p-4 mt-4 w-full max-w-xl mx-auto">
            <div className="flex gap-4 justify-between">
                <div>
                    <div className="text-sm text-gray-600">Original</div>
                    <div className="break-all">{record.url}</div>
                    <div className="mt-2 text-sm text-gray-600">Short</div>
                    <a
                        href={`/r/${record.shortCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 mr-4"
                    >
                        {window.location.origin}/r/{record.shortCode}
                    </a>
                    <div className="mt-2">
                        <span className="text-sm text-gray-600">See</span>{" "}
                        <a
                            href={`/stats/${record.shortCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 mr-3"
                        >
                            Stats
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2 justify-around">
                    <button
                        onClick={handleCopy}
                        className="px-3 py-1 border rounded hover:border-transparent hover:bg-gray-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                        disabled={loading}
                    >
                        Copy
                    </button>
                    <button
                        onClick={() => onUpdateClick(record)}
                        className="px-3 py-1 border rounded hover:border-transparent hover:bg-gray-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                        disabled={loading}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 border rounded text-red-600 hover:border-transparent hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShortUrlCard;
