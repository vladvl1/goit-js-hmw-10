import './css/styles.css';
import countryList from './templates/list.hbs';
import countryDiv from './templates/div.hbs';
import fetchCountries from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 1000;

const refs = {
 input: document.querySelector("#search-box"),
 list :document.querySelector(".country-list"),
 info :document.querySelector(".country-info"),
}

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
const validInput = refs.input.value.trim();

fetchCountries(refs.input.value)
    .then(data => {
        if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        }
        refs.info.innerHTML = countryDiv(refs.input.value);
    })
}