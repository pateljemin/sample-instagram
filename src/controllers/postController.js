const { addPostToDB, updatePostToDB, deletePostFromDB, getPostFromDB, getFeedFromDB } = require('../services/postService');

/**
 * Post add controller.
 *
 * @param req : Http Request with title and content.
 * @param res : Http Response
 */
const addPost = async (req, res) => {
    const { medias } = req.body;

    // Check that the request includes a content
    if (!medias) {
        return res.status(400).json({ message: 'Missing content' });
    }

    const postInfo = await addPostToDB(medias, req.user.id);
    if (!postInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    res.status(200).json({ ...postInfo.post });
};

/**
 * Post update controller.
 *
 * @param req : Http Request with updated content.
 * @param res : Http Response
 */
const updatePost = async (req, res) => {

    const id = parseInt(req.params.id);

    const { medias } = req.body;

    // Check that the request includes content
    if (!medias) {
        return res.status(400).json({ message: 'Missing content' });
    }

    const postInfo = await updatePostToDB(id, medias, req.user.id);
    if (!postInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (!postInfo.isAuthorized) {
        return res.status(403).json({ message: 'You are not authorized' })
    }

    res.status(200).json({ ...postInfo.post });
};

/**
 * Post delete controller.
 *
 * @param req : Http Request with id of post to be deleted.
 * @param res : Http Response
 */
const deletePost = async (req, res) => {

    const id = parseInt(req.params.id);
    const postInfo = await deletePostFromDB(id, req.user.id);

    if (!postInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (postInfo.isSuccess && !postInfo.isExists) {
        return res.status(404).json({ message: 'Invalid Id' })
    }

    if (!postInfo.isAuthorized) {
        return res.status(403).json({ message: 'You are not authorized' })
    }

    res.status(204).json({ message: "Success" });
};

/**
 * Post get controller.
 *
 * @param req : Http Request with id of post to get.
 * @param res : Http Response
 */
const getPost = async (req, res) => {

    const id = parseInt(req.params.id);

    const postInfo = await getPostFromDB(id);
    if (!postInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }
    if (!postInfo.post) {
        return res.status(404).json({ message: 'Invalid Id' });
    }
    res.status(200).json({ post: postInfo.post });
};

/**
 * Post get controller.
 *
 * @param req : Http Request 
 * @param res : Http Response
 */
const getFeed = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;

    const postInfo = await getFeedFromDB(skip, limit);
    if (!postInfo.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    res.status(200).json({ posts: postInfo.posts, total: postInfo.total });
};

module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPost,
    getFeed
}
