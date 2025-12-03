import Url from "../models/Url.js";
import { getRandomCode } from "../utils/codeGenerator.js";

class UrlService {
    async create(url) {
        return await Url.create({ url, shortCode: getRandomCode() });
    }

    async getAndIncCount(shortCode) {
        const record = await Url.findOne({ where: { shortCode } });
        if (!record) return null;

        record.accessCount++;
        await record.save();

        return record;
    }

    async update(shortCode, url) {
        const record = await Url.findOne({ where: { shortCode } });

        if (!record) return null;

        record.url = url;
        await record.save();

        return record;
    }

    async delete(shortCode) {
        const record = await Url.findOne({ where: { shortCode } });

        if (!record) return null;

        await record.destroy();

        return record;
    }

    async getByShortCode(shortCode) {
        return await Url.findOne({ where: { shortCode } });
    }
}

export default new UrlService();
