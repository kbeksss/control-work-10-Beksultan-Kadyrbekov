import axiosMyNews from "../../axiosMyNews";

export const FETCH_ALL_NEWS_SUCCESS = 'FETCH_ALL_NEWS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

const fetchAllNewsSuccess = news => ({type: FETCH_ALL_NEWS_SUCCESS, news});
const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});

export const fetchAllNews = () => {
    return async dispatch => {
        try {
            const response = await axiosMyNews.get('/news');
            dispatch(fetchAllNewsSuccess(response.data));
        } catch(e) {
            console.error(e);
        }
    }
};

export const fetchPost = id => {
    return async dispatch => {
        try {
            const response = await axiosMyNews.get('/news/' + id);
            console.log(response.data[0]);
            dispatch(fetchPostSuccess(response.data));
        } catch(e) {
            console.error(e);
        }
    }
};
