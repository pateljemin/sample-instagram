const { Sequelize, Model } = require('sequelize');
const { UserSchema, UserIndices } = require('./User');
const { PostSchema } = require('./Post');
const { MediaSchema } = require('./Media');
require('dotenv').config()

// Initialize Sequelize with the connection details
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSOWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const User = sequelize.define('User', UserSchema, UserIndices);
const Post = sequelize.define('Post', PostSchema);
const Media = sequelize.define('Media', MediaSchema);

// Define relationships here
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Media, { foreignKey: 'postId' });
Media.belongsTo(Post, { foreignKey: 'postId' });

const startDB = () => {
    // Synchronize the model with the database
    sequelize.sync()
        .then(() => {
            console.log('Database synchronized');
        })
        .catch((err) => {
            console.error('Error synchronizing database', err);
        });
}

module.exports = {
    startDB,
    User,
    Post,
    Media
}
