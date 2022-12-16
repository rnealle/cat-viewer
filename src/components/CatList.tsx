import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { getAllBreeds, getCatsOfBreed } from '../api/CatAPI';
import { Breed, Cat } from '../models/models'
import CatEntry from './CatEntry'

const CatList = () => {
    const LIMIT = 10;

    const [listBreeds, setBreeds] = useState([] as Breed[])
    const [selectedBreed, setSelectedBreed] = useState('')
    const [listCats, setCats] = useState([] as Cat[])

    const [page, setPage] = useState(1)
    const [shouldShowLoadMoreButton, setShouldShowLoadMoreButton] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const getBreedsFromAPI = async () => {
            try {
                const result = await getAllBreeds();
                setBreeds(result);
                setErrorMessage('');
            } catch (e: any) {
                setErrorMessage('Error (' + e.response.status + '): ' + e.code);
            }
        };

        getBreedsFromAPI()
    }, []);

    useEffect(() => {
        selectedBreed && fetchCatPage(selectedBreed, 1);
    }, [selectedBreed]);

    useEffect(() => {
        let breed = searchParams.get('breed')
        breed && setSelectedBreed(breed)
    }, [searchParams]);

    const fetchCatPage = (breed: string, page: number) => {
        const getPage = async () => {
            try {
                const result = await getCatsOfBreed(breed, LIMIT, page);
                const filteredCats = result.filter((cat: any) => listCats.map(i => i.id).indexOf(cat.id) < 0 );
                setCats([...listCats, ...filteredCats])
                setPage(page)
                !filteredCats.length && setShouldShowLoadMoreButton(false);
                setErrorMessage('');
            } catch (e: any) {
                setErrorMessage('Error (' + e.response.status + '): ' + e.code);
            }
        };

        getPage()
    };

    const onDropdownChange = (e: any) => {
        setCats([])
        setSelectedBreed(e.target.value)
        setSearchParams({breed: e.target.value})
        setShouldShowLoadMoreButton(true);
    }

    const onClickLoadMore = (e: any) => {
        fetchCatPage(selectedBreed, page + 1)
    }

    const displayError = () => {
        return (
            <Alert variant="danger">{errorMessage}</Alert>
        );
    }

    const displayDropdown = () => {
        return (
            <Row xxl={18} xl={15} lg={12} md={9} sm={6} xs={3} className='g-2 mb-2'>
                <Col>
                    <Form.Select onChange={onDropdownChange} value={selectedBreed}>
                    <option value=''>Select Breed</option>
                    {
                        listBreeds.map( breed =><option key={breed.id} value={breed.id}>{breed.name}</option> )
                    }
                    </Form.Select>
                </Col>
            </Row>  
        );
    };

    const displayCats = () => {
        return !listCats.length ? <p>No cats available</p> : (
            <Row xxl={18} xl={15} lg={12} md={9} sm={6} xs={3} className='g-2'>
            {
                listCats.map((cat) => <Col key={cat.id}>{ CatEntry(cat) }</Col>)
            }
            </Row>
        );
    };

    const displayMoreButton = () => {
        return (
            <Row xxl={18} xl={15} lg={12} md={9} sm={6} xs={3} className='g-2 mt-1'>
                <Col>
                    <Button onClick={onClickLoadMore} disabled={!selectedBreed}> Load More </Button>
                </Col>
            </Row>
        );
    };

    return (
        <React.Fragment>
            <h1> Cat Browser </h1>
            { errorMessage && displayError() }
            { displayDropdown() }
            { displayCats() }
            { shouldShowLoadMoreButton && displayMoreButton() }
        </React.Fragment>
    )
};

export default CatList;