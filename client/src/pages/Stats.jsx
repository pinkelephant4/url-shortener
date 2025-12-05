import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStats } from "../services/api";

const Stats = () => {
    const { shortCode } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await getStats(shortCode);
                setData(data);
            } catch (err) {
                setError(err.message || "Failed to load stats");
                // alert(err.message || "Failed to load stats");
                // navigate("/notFound");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [shortCode]);

    useEffect(() => {
        if (!error) return;
        const id = setTimeout(() => navigate("/"), 4000);
        return () => clearTimeout(id);
    }, [error, navigate]);

    if (error)
        return (
            <div className="mt-30 p-6 text-red-600 text-center text-xl">
                Error: {error}
                <div>Redirecting to Homepage</div>
            </div>
        );

    return (
        !loading && (
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
                        <strong>Short URL:</strong>{" "}
                        {`${window.location.origin}/r/${data.shortCode}`}
                    </div>
                    <div className="mb-2">
                        <strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}
                    </div>
                    <div className="mb-2">
                        <strong>Access Count:</strong> {data.accessCount ?? 0}
                    </div>
                </div>
            </div>
        )
    );
};

export default Stats;
