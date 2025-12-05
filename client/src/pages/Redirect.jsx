import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOriginalUrl } from "../services/api.js";

const RedirectPage = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const go = async () => {
            try {
                const data = await getOriginalUrl(shortCode);
                window.location.href = data.url;
            } catch (err) {
                navigate("/notFound");
            }
        };
        go();
    }, []);

    return <p className="text-center mt-20">Redirecting...</p>;
};

export default RedirectPage;
