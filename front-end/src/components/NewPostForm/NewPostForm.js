import React, {useState} from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import axiosMyNews from "../../axiosMyNews";
const INITIAL_FORM = {
    title: '',
    text: '',
    image: ''
};
const NewPostForm = props => {
    const [postForm, setPostForm] = useState(INITIAL_FORM);
    const inputChangeHandler = event => {
        setPostForm({
            ...postForm,
            [event.target.name]: event.target.value
        })
    };
    const fileChangeHandler = event => {
        setPostForm({
            ...postForm,
            [event.target.name]: event.target.files[0]
        })
    };
    const formSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(postForm).forEach(key => {
            formData.append(key, postForm[key]);
        });
        try{
            await axiosMyNews.post('/news', formData);
            setPostForm(INITIAL_FORM);
            props.history.push('/');
        } catch (e) {
            console.error(e);
        }
        // this.props.onSubmit(formData);
    };
    return (
        <Container className='mt-5'>
            <Form onSubmit={formSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" value={postForm.title} onChange={inputChangeHandler} name="title" id="title" placeholder="Post Title" />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Content</Label>
                    <Input type="textarea" value={postForm.text} onChange={inputChangeHandler} name="text" id="content" placeholder="Post Text" />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="file" onChange={fileChangeHandler} name="image" id="image"/>
                </FormGroup>
                <Button color='primary' type='submit'>Submit</Button>
            </Form>
        </Container>
    );
};

export default NewPostForm;
