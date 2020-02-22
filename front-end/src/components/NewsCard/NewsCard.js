import React from 'react';
import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";
import moment from 'moment';

const NewsCard = props => {
    return (
        <Card className='flex-row my-3 p-2'>
            <NewsThumbnail image={props.image}/>
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                <CardSubtitle className='text-secondary'>{moment(props.datetime).format('L')}</CardSubtitle>
                <Button onClick={props.onClick} color='primary'>Read Full Post</Button>
            </CardBody>
        </Card>

    );
};

export default NewsCard;
