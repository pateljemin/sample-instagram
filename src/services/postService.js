const { Post, User, Media } = require('../models/index');

const addPostToDB = async (medias, userId) => {
    try {
        const post = await Post.create({
            userId
        });
        const mediasWithPost = medias.map((media) => {
            return {
                postId: post.id,
                type: media.type,
                content: media.content
            }
        });
        await Media.bulkCreate(mediasWithPost);

        return { isSuccess: true, post: { postId: post.id, medias } };
    } catch (err) {
        console.log(`[postService][addPostToDB] Error occurred while creating post: ${err}`)
        return { isSuccess: false };
    }
}

const updatePostToDB = async (id, medias, userId) => {
    try {

        // Find the post with the specified ID
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            return { isFound: false, isSuccess: true };
        }

        // Check that the user is authorized to update the post
        if (post.userId !== userId) {
            return { isAuthorized: false, isSuccess: true }
        }
        await Media.destroy({
            where: { postId: id }
        })

        // Save the updated medias
        const mediasWithPost = medias.map((media) => {
            return {
                postId: id,
                type: media.type,
                content: media.content
            }
        });
        await Media.bulkCreate(mediasWithPost);
        return { isFound: true, isAuthorized: true, isSuccess: true, post: { id, medias } };

    } catch (err) {
        console.log(`[postService][updatePostToDB] Error occurred while updating post: ${err}`)
        return { isSuccess: false }
    }
}

const deletePostFromDB = async (id, userId) => {
    try {

        // Find the post with the specified ID
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            return { isDeleted: false, isSuccess: true, isExists: false };
        }

        // Check that the user is authorized to update the post
        if (post.userId !== userId) {
            return { isAuthorized: false, isSuccess: true, isExists: true }
        }

        // delete the post
        await Post.destroy({ where: { id } });

        return { isDeleted: true, isAuthorized: true, isSuccess: true, isExists: true };

    } catch (err) {
        console.log(`[postService][deletePostFromDB] Error occurred while deleting post: ${err}`)
        return { isSuccess: false }
    }
}

const getPostFromDB = async (id) => {
    try {
        const post = await Post.findByPk(id)
        return { post, isSuccess: true };
    } catch (err) {
        console.log(`[postService][getPostFromDB] Error occurred while getting post: ${err}`)
        return { isSuccess: false };
    }
}

const getFeedFromDB = async (skip, limit) => {
    try {
        // Find all posts with user info and implement pagination
        const posts = await Post.findAndCountAll({
            include: [{
                model: User,
                attributes: ['firstName', 'lastName', 'country', 'state', 'address'], // Specify user attributes to include
            },
            {
                model: Media,
                attributes: ['type', 'content'],
            }],
            limit,
            offset: skip,
            order: [['updatedAt', 'DESC']],
            distinct: true
        });
        return { posts: posts.rows, total: posts.count, isSuccess: true };
    } catch (err) {
        console.log(`[postService][getFeedFromDB] Error occurred while getting feec: ${err}`)
        return { isSuccess: false };
    }
}

module.exports = {
    addPostToDB,
    updatePostToDB,
    deletePostFromDB,
    getPostFromDB,
    getFeedFromDB
}
