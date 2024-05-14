const { DataTypes } = require('sequelize');

const PostSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Set as primary key
        autoIncrement: true, // Enable auto-increment
    }
}

module.exports = {
    PostSchema,
}
