const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,'
});

export default function fetchCountries(countryName) {
    return fetch(`${BASE_URL}${countryName}?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response);
            }

            return response.json();
        });
}