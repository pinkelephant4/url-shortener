import { DataTypes } from "sequelize";
import { sequilize } from "../config/db.js";

const Url = sequilize.define(
    "Url",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        shortCode: {
            type: DataTypes.STRING(8),
            unique: true,
            allowNull: false,
        },
        accessCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    { timestamps: true }
);

export default Url;
