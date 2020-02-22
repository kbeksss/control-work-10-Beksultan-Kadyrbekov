import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem} from "reactstrap";
import {connect} from "react-redux";
import moment from 'moment';
import {fetchPost} from "../../store/actions/newsActions";
import {NavLink} from "react-router-dom";
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";
import {deleteComment, fetchComments, postComment} from "../../store/actions/commentsActions";

const SinglePost = props => {
    const [showForm, toggleForm] = useState(false);
    const [commentForm, setCommentForm] = useState({name: '', comment: ''});
    const fetchSinglePost = async () => {
        await props.fetchPost(props.match.params.id);
        props.fetchComments(props.match.params.id);
    };
    const inputChangeHandler = event => {
        setCommentForm({
            ...commentForm,
            [event.target.name]: event.target.value
        })
    };
    const onFormSubmit = async e => {
        e.preventDefault();
        await props.postComment(({author: commentForm.name, comment: commentForm.comment, news_id: props.match.params.id}), props.match.params.id)
    };
    useEffect(() => {
        fetchSinglePost().catch(e => console.error(e));
        // eslint-disable-next-line
    }, []);
    return (
        <Container className='mt-5 py-4'>
            <Button color='primary' tag={NavLink} to='/'>All News</Button>
            {props.singlePost && (
                <div className='mt-3'>
                    <NewsThumbnail image={props.singlePost.image}/>
                    <h2>{props.singlePost.title}</h2>
                    <h3>{moment(props.singlePost.datetime).format('L')}</h3>
                    <p>{props.singlePost.text}</p>
                </div>
            )}
            <Button color='info' onClick={() => toggleForm(true)}>Write Comment</Button>
            {showForm && (
                <Form onSubmit={onFormSubmit} className='my-4'>
                    <h3>Add comment</h3>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" value={commentForm.name} onChange={inputChangeHandler} name="name" id="name" placeholder="Your name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="comment">Comment</Label>
                        <Input type="textarea" value={commentForm.comment} onChange={inputChangeHandler} name="comment" id="comment" placeholder="Your comment" />
                    </FormGroup>
                    <Button color='info' type='submit'>Send</Button>
                    <Button className='ml-3' type='button' color='danger' onClick={() => toggleForm(false)}>Cancel</Button>
                </Form>
            )}

            <h2 className='mt-5'>Comments</h2>

            <ListGroup>
                {props.comments.map(comment => (
                    <ListGroupItem className="justify-content-between" key={comment.comment_id}>
                        <h5>Author: {comment.author}</h5>
                        <span>Comment: {comment.comment}</span>
                        <Button
                            onClick={() => props.deleteComment(comment.comment_id, props.match.params.id)}
                            className='ml-3' color='danger'>
                            delete
                        </Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
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
    deleteComment: (id, postId) => dispatch(deleteComment(id, postId)),
    postComment: (comment, postId) => dispatch(postComment(comment, postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
