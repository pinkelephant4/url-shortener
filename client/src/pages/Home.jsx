import { useEffect, useState } from "react";
import ShortUrlCard from "../components/ShortUrlCard";
import Toast from "../components/Toast";
import UpdateModal from "../components/UpdateModal";
import UrlInputForm from "../components/UrlInputForm";

const HISTORY_KEY = "url_shortener_recent";

const Home = () => {
    const [created, setCreated] = useState(null);
    const [recent, setRecent] = useState([]);
    const [editing, setEditing] = useState(null);
    const [toast, setToast] = useState({});

    useEffect(() => {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (raw) setRecent(JSON.parse(raw));
    }, []);

    const addToHistory = (item) => {
        const newRecent = [item, ...recent.filter((r) => r.shortCode !== item.shortCode)].slice(
            0,
            10
        );
        setRecent(newRecent);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newRecent));
    };

    const handleCreated = (item) => {
        setCreated(item);
        addToHistory(item);
    };

    const handleDelete = (shortCode) => {
        const next = recent.filter((r) => r.shortCode !== shortCode);
        setRecent(next);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        if (created?.shortCode === shortCode) setCreated(null);
    };

    const handleUpdated = (updatedRecord) => {
        const next = recent.map((r) =>
            r.shortCode === updatedRecord.shortCode ? updatedRecord : r
        );
        setRecent(next);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        if (created?.shortCode === updatedRecord.shortCode) setCreated(updatedRecord);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto center">
            <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>

            <UrlInputForm onCreated={handleCreated} setToast={setToast} />

            {created && (
                <ShortUrlCard
                    record={created}
                    onDelete={handleDelete}
                    onUpdateClick={(r) => setEditing(r)}
                    setToast={setToast}
                />
            )}

            <section className="mt-8 w-full">
                <div className="mx-auto max-w-xl">
                    <h2 className="text-xl font-semibold">Recent</h2>
                    <div className="mt-2 space-y-2">
                        {recent.length === 0 && (
                            <div className="text-gray-500">No recent short URLs</div>
                        )}
                        {recent.map((r) => (
                            <ShortUrlCard
                                key={r.shortCode}
                                record={r}
                                onDelete={handleDelete}
                                onUpdateClick={(rec) => setEditing(rec)}
                                setToast={setToast}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {editing && (
                <UpdateModal
                    record={editing}
                    onClose={() => setEditing(null)}
                    onUpdated={handleUpdated}
                    setToast={setToast}
                />
            )}

            <Toast toast={toast} onClose={() => setToast({})} />
        </div>
    );
};

export default Home;
