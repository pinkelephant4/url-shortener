import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOriginalUrl } from "../services/api.js";

const RedirectPage = () => {
    const { shortCode } = useParams();

    useEffect(() => {
        const go = async () => {
            try {
                const data = await getOriginalUrl(shortCode);
                window.location.href = data.url;
            } catch (err) {
                alert("Invalid or expired URL");
            }
        };
        go();
    }, []);

    return <p className="text-center mt-20">Redirecting...</p>;
};

export default RedirectPage;
