import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { getCatInfo } from '../api/CatAPI';
import { CatInfo } from '../models/models';

const CatDetailsPage = () => {
    let params = useParams()
    const [catInfo, setCatInfo] = useState({} as CatInfo)

    useEffect(() => {
        const getCatInfoFromAPI = async () => {
            if (params.id) {
                const result = await getCatInfo(params.id);
                setCatInfo(result);
            }
        };

        getCatInfoFromAPI();
    }, [params.id])

    const displayCatDetails = () => {
        if (catInfo && catInfo.breeds && catInfo.breeds.length) {
            return (
                <Card>
                    <Card.Header>
                        <Button href={`/?breed=${catInfo.breeds[0].id}`} variant='primary'> Back </Button>
                    </Card.Header>
                    <Card.Img src={catInfo.url} />
                    <Card.Body>
                    <h4>{catInfo.breeds[0].name}</h4>
                    <h5>Origin: {catInfo.breeds[0].origin}</h5>
                    <h6>{catInfo.breeds[0].temperament}</h6>
                    <p>{catInfo.breeds[0].description}</p>
                    </Card.Body>
                </Card>
            );
        } else {
            return (
            <React.Fragment>
                None
            </React.Fragment>
            );
        }
    };

    return (
        <React.Fragment>
            { displayCatDetails() }
        </React.Fragment>
    );
    
};

export default CatDetailsPage;