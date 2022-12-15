import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

import { Cat } from '../models/models';

const CatEntry = (data: Cat) => {
    return <Card className='h-100 w-100'>
        <Card.Body className='m-auto'> 
            <Card.Img src={data.url} className='rounded mx-auto d-block' />
        </Card.Body>
        <Card.Footer className='text-center'>
            <Button href={'/'+data.id} variant='primary'> View Details </Button>
        </Card.Footer>
    </Card>
};

export default CatEntry;