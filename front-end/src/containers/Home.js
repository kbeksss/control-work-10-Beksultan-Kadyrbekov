import React, {useEffect} from 'react';
import NewsCard from "../components/NewsCard/NewsCard";
import {Button, Container, Row} from "reactstrap";
import {fetchAllNews} from "../store/actions/newsActions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const Home = props => {
    useEffect(() => {
        props.fetchAllNews();
        // eslint-disable-next-line
    }, []);
    const openSingle = id => {
        props.history.push('/post/' + id);
    };
    return (
        <Container className='mt-5 py-3'>
            <Row className='justify-content-between'>
                <h2>All posts</h2>
                <Button color='primary' tag={NavLink} to='/new-post'>Add new Post</Button>
            </Row>
            {props.allNews.map(news => (
                <NewsCard
                    key={news.id}
                    onClick={() => openSingle(news.id)}
                    image={news.image}
                    title={news.title}
                    datetime={news.datetime}
                />
            ))}
        </Container>
    );
};


const mapStateToProps = state => ({
    allNews: state.news.news,
});
const mapDispatchToProps = dispatch => ({
    fetchAllNews: () => dispatch(fetchAllNews())
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
