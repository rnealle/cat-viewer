import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { getCatInfo } from '../api/CatAPI';
import { CatInfo } from '../models/models';

const CatDetailsPage = () => {
    let params = useParams()
    const [catInfo, setCatInfo] = useState({} as CatInfo)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getCatInfoFromAPI = async () => {
            try {
                if (params.id) {
                    const result = await getCatInfo(params.id);
                    setCatInfo(result);
                }
            } catch (e: any) {
                setErrorMessage('Error (' + e.response.status + '): ' + e.code);
            }
        };

        getCatInfoFromAPI();
    }, [params.id])

    const displayError = () => {
        return (
            <Alert variant="danger">{errorMessage}</Alert>
        );
    }

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
            { errorMessage && displayError() }
            { displayCatDetails() }
        </React.Fragment>
    );
    
};

export default CatDetailsPage;