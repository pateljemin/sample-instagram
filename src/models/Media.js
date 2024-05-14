const { DataTypes } = require('sequelize');

const MediaSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Set as primary key
        autoIncrement: true, // Enable auto-increment
    },
    type: {
        type: DataTypes.ENUM('IMAGE', 'VIDEO', 'TEXT'),
        allowNull: false,
        default: "TEXT"
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

module.exports = {
    MediaSchema,
}
