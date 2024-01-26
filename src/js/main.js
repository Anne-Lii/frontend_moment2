/* kod skriven av Anne-Lii Hansen anha2324@student.miun.se*/

"use strict"

window.onload = init;

let toggleSort = 1;//global variabel som lagrar värdet 1 för toggling.

//fetch-anrop och konvertera till js
async function init() {

    const url = "https://dahlgren.miun.se/ramschema_ht23.php"; //API adressen

    try {
        const response = await fetch(url);//inväntas svar från fetchen
        let data = await response.json();//inväntar svar från konverteringen till js

        const headlines = document.getElementsByTagName("th");
        for (let i = 0; i < headlines.length; i++) {
            headlines[i].addEventListener("click", function () {
                sortData(data, i);
            });

            //skickar data från API vidare till andra funktioner
            filterInput(data);
            displayData(data);
        }
    } catch (error) {
        
    }
}

//filtrering från sökrutan
function filterInput(data) {
    let inputEl = document.getElementById("sok");
    inputEl.addEventListener("keyup", function () {
        let filter = inputEl.value.toUpperCase();
    
        let filteredData = data.filter(course => {
            return course.code.toUpperCase().includes(filter) ||
                course.coursename.toUpperCase().includes(filter) ||
                course.progression.toUpperCase().includes(filter);
    
        });    

        displayData(filteredData)    
    });
}

function sortData(data, headline) {
    //sparar datan så den inte ändras
    const sortedData = [...data];

    toggleSort *= -1;//multiplicerar variabeln med -1 för att toggla mellan 1 (true) och -1 (false).

    switch (headline) {
        case 0: //kurskoden index 0
            sortedData.sort((a, b) => toggleSort * a.code.localeCompare(b.code));
            break;

        case 1://kursnamnet index 1
            sortedData.sort((a, b) => toggleSort * a.coursename.localeCompare(b.coursename));
            break;

        case 2://progressionen index 2
            sortedData.sort((a, b) => toggleSort * a.progression.localeCompare(b.progression));
            break;

        default:
            break;
    }

    displayData(sortedData);  //skickar uppdaterade datan till displaydata funktionen
}

function displayData(data) {
    const listEl = document.getElementById("list");
    listEl.innerHTML = ""; //rensar tidigare lista 

    //Loopa igenom och skriv ut till sidan
    data.forEach((courses) => {

        listEl.innerHTML += `
        <tr>
            <td>${courses.code}</td>
            <td>${courses.coursename}</td>
            <td>${courses.progression}</td>
        </tr>
        `;
    });
}
