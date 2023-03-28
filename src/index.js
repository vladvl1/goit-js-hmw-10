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

    fetchCountries(validInput)
        .then(data => {
            console.log(data.length);

            if (data.length === 1) {
                refs.info.innerHTML = '';
                refs.list.classList.add("is-hidden");
                refs.info.classList.remove("is-hidden");
                data.map(dat => refs.info.innerHTML = countryDiv(dat));
            }
            else if (data.length > 10) {
                refs.list.classList.add("is-hidden");
                refs.info.classList.add("is-hidden");
                Notify.info('Too many matches found. Please enter a more specific name.');
            } else {
                refs.info.classList.add("is-hidden");
                refs.list.classList.remove("is-hidden");
                refs.list.innerHTML = '';
                data.forEach(dat => {
                    refs.list.insertAdjacentHTML("beforeend", countryList(dat));
                });
            };
        }).catch(err => {
            console.log(err);
            Notify.warning("Try again!)");
            refs.input = '';
        });
}