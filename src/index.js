import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imagesource: 'Wikimedia Commons',
        books: [
            'The Adventures of Huckleberry Finn',
            'Life on the Mississipi',
            'Roughing It'
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imagesource: 'Wikimedia Commons',
        books: [
            'Heart of Darkness'
        ]
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imagesource: 'Wikimedia Commons',
        books: [
            'Harry Pootter and the Sorcerers Stone'
        ]
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imagesource: 'Pinguino',
        books: [
            'The Shining',
            'IT'
        ]
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imagesource: 'Wikimedia Commons',
        books: [
            'David Copperfield',
            'A Tale of Tow Cities',
            'Roughing It'
        ]
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/shakespeare.jpg',
        imagesource: 'Wikimedia Commons',
        books: [
            'Hamlet',
            'Macbeth',
            'Romeo and Juliet'
        ]
    },
];

function getTurnData(authors) {
    const allBooks = authors.reduce( function(p,c,i) {
        return p.concat(c.books)
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer ))
    }
}



function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, action) {

    switch (action.type) 
    {
        // onAnswerSelected
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign(
                {},
                state, {
                    highlight: isCorrect ? 'correct' : 'right'
                }
            );
        
        // onContinue
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });


        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
               authors: state.authors.concat([action.author]) 
            });

        // resetState
        default: 
            return state;
    }
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
