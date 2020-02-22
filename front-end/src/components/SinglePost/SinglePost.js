import React, {useEffect} from 'react';
import {Button, Container} from "reactstrap";
import {connect} from "react-redux";
import moment from 'moment';
import {fetchPost} from "../../store/actions/newsActions";
import {NavLink} from "react-router-dom";
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";
import {fetchComments} from "../../store/actions/commentsActions";

const SinglePost = props => {
    const fetchSinglePost = async () => {
        await props.fetchPost(props.match.params.id);
        props.fetchComments(props.match.params.id);
    };
    useEffect(() => {
        fetchSinglePost().catch(e => console.error(e));
        // eslint-disable-next-line
    }, []);
    console.log(props.comments);
    return (
        <Container className='mt-5'>
            <Button color='primary' tag={NavLink} to='/'>All News</Button>
            {props.singlePost && (
                <div className='mt-3'>
                    <NewsThumbnail image={props.singlePost.image}/>
                    <h2>{props.singlePost.title}</h2>
                    <h3>{moment(props.singlePost.datetime).format('L')}</h3>
                    <p>{props.singlePost.text}</p>
                </div>
            )}
            <h2 className='mt-5'>Comments</h2>
        </Container>
    );
};

const mapStateToProps = state => ({
    singlePost: state.news.post,
    comments: state.comments.comments
});
const mapDispatchToProps = dispatch => ({
    fetchPost: id => dispatch(fetchPost(id)),
    fetchComments: id => dispatch(fetchComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
