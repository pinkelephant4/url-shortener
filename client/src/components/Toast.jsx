import { useEffect } from "react";

const Toast = ({ toast, onClose, duration = 2500 }) => {
    useEffect(() => {
        const id = setTimeout(onClose, duration);
        return () => clearTimeout(id);
    }, [onClose, duration]);

    if (!toast?.message) return null;

    const colors = {
        neutral: "bg-gray-600",
        error: "bg-red-600",
        success: "bg-green-600",
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className={`${colors[toast.status]} text-white px-4 py-2 rounded shadow`}>
                {toast.message}
            </div>
        </div>
    );
};

export default Toast;
