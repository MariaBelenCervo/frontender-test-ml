import React from 'react';
import { Control, Form } from 'react-redux-form';
import './SearchBar.scss';

const SearchBar = ({ onSubmit }) => {
    return (
        <Form id="search-bar" model="search" onSubmit={onSubmit}>
            <Control.text model="search.input" id="search.input" placeholder="Nunca dejes de buscar" autoComplete="off"/>
            <button></button>
        </Form>
    )
}

export default SearchBar;