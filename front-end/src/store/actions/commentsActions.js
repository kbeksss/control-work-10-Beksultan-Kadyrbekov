import axiosMyNews from "../../axiosMyNews";

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});

export const fetchComments = id => {
    return async dispatch => {
        const result = await axiosMyNews.get('/comments?news_id=' + id);
        dispatch(fetchCommentsSuccess(result.data));
    }
};
export const deleteComment = (id, postId) => {
    return async dispatch => {
        await axiosMyNews.delete('/comments/' + id);
        const result = await axiosMyNews.get('/comments?news_id=' + postId);
        dispatch(fetchCommentsSuccess(result.data));
    }
};
export const postComment = (comment, postId) => {
    return async dispatch => {
        await axiosMyNews.post('/comments', comment);
        const result = await axiosMyNews.get('/comments?news_id=' + postId);
        dispatch(fetchCommentsSuccess(result.data));
    }
};
