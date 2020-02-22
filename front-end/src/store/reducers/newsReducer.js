import {FETCH_ALL_NEWS_SUCCESS, FETCH_POST_SUCCESS} from "../actions/newsActions";

const initialState = {
    news: [],
    post: {}
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_NEWS_SUCCESS:
            return {
                ...state,
                news: action.news.reverse()
            };
        case FETCH_POST_SUCCESS:
            console.log(action.post);
            return {
                ...state,
                post: action.post[0]
            };
        default:
            return state;
    }
};

export default newsReducer;
