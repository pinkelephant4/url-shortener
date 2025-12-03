import urlService from "../services/urlService.js";

export const createShortUrl = async (req, res, next) => {
    const { url } = req.body;
    try {
        const data = await urlService.create(url);
        return res.status(201).json({
            success: true,
            data,
        });
    } catch (err) {
        next(err);
    }
};

export const getOriginalUrl = async (req, res, next) => {
    const { shortUrl } = req.params;
    try {
        const data = await urlService.getAndIncCount(shortUrl);
        if (!data)
            return res.status(404).json({
                success: false,
                message: "No URL Found for this short URL.",
            });

        return res.status(200).json({
            success: true,
            data: data.dataValues,
        });
    } catch (err) {
        next(err);
    }
};

export const updateOriginalUrl = async (req, res, next) => {
    const { url } = req.body;
    const { shortUrl } = req.params;
    try {
        const data = await urlService.update(shortUrl, url);

        if (!data)
            return res.status(404).json({
                success: false,
                message: "No URL Found for this short URL.",
            });

        return res.status(200).json({
            success: true,
            data: data.dataValues,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteUrl = async (req, res, next) => {
    const { shortUrl } = req.params;
    try {
        const data = await urlService.delete(shortUrl);
        if (!data)
            return res.status(404).json({
                success: false,
                message: "No URL Found for this short URL.",
            });
        return res.status(204).json({ success: true });
    } catch (err) {
        next(err);
    }
};

export const getShortUrlStats = async (req, res, next) => {
    const { shortUrl } = req.params;
    try {
        const data = await urlService.getByShortCode(shortUrl);

        if (!data)
            return res.status(404).json({
                success: false,
                message: "No URL Found for this short URL.",
            });
        return res.status(200).json({
            success: true,
            data: data.dataValues,
        });
    } catch (err) {
        next(err);
    }
};
