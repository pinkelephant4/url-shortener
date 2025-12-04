import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStats } from "../services/api";

const Stats = () => {
    const { shortCode } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await getStats(shortCode);
                setData(data);
            } catch (err) {
                setError(err?.response?.data?.error || "Failed to load stats");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [shortCode]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Stats for{" "}
                <span className="text-blue-600">{`${window.location.origin}/r/${data.shortCode}`}</span>
            </h1>

            <div className="border rounded p-4">
                <div className="mb-2">
                    <strong>Original URL:</strong> <div className="break-all">{data.url}</div>
                </div>
                <div className="mb-2">
                    <strong>Short URL:</strong> {`${window.location.origin}/r/${data.shortCode}`}
                </div>
                <div className="mb-2">
                    <strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}
                </div>
                <div className="mb-2">
                    <strong>Access Count:</strong> {data.accessCount ?? 0}
                </div>
            </div>
        </div>
    );
};

export default Stats;
