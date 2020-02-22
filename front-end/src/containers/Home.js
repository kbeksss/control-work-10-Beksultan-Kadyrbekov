import React from 'react';
import NewsCard from "../components/NewsCard/NewsCard";
import {Container} from "reactstrap";

const Home = () => {
    return (
        <Container className='mt-5'>
            <NewsCard/>
        </Container>
    );
};

export default Home;
