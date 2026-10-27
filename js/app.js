const API = "https://countries-api-steel-theta.vercel.app/api/countries";

const wrapperEl = document.querySelector("#countries");
const searchEl = document.querySelector("#search");
const regionEl = document.querySelector("#region-filter");
const darkModeBtn = document.querySelector("#dark-mode");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀️ Light Mode";
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});


function allCountries(countries) {
    wrapperEl.innerHTML = "";

    countries.forEach((country) => {
        wrapperEl.innerHTML += `
            <div class="country">
                <img src="${country.flag}" alt="${country.name}">
                <h2>${country.name}</h2>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital}</p>
            </div>
        `;
    });
}

async function getCountries() {
    const name = searchEl.value;
    const region = regionEl.value.toLowerCase();

    const res = await fetch(`${API}?name=${name}&region=${region}`);
    const data = await res.json();

    allCountries(data.data);
}

searchEl.addEventListener("input", getCountries);
regionEl.addEventListener("change", getCountries);