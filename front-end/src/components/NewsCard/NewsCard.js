import React from 'react';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";

const NewsCard = props => {
    return (
        <Card className='flex-row my-3 p-2'>
            <NewsThumbnail image={props.image}/>
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                <CardSubtitle className='text-secondary'>{props.datetime}</CardSubtitle>
                <Button>Read Full Post</Button>
            </CardBody>
        </Card>

    );
};

export default NewsCard;
