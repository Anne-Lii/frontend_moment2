/* kod skriven av Anne-Lii Hansen anha2324@student.miun.se*/

"use strict"

window.onload = init;

let toggleSort = 1;

//fetch-anrop och konvertera till js
async function init() {
    const url = "https://dahlgren.miun.se/ramschema_ht23.php"; //API adressen

    try{        
        const response = await fetch(url); 
        let data = await response.json();
        
        const headlines = document.getElementsByTagName("th");
        for (let i=0; i<headlines.length;i++) {
        headlines[i].addEventListener("click", function() {
            sortData(data, i);
        });  
        displayData(data);   
    }
    } catch (error) {
        console.log("nu blev de knasigt", error);
    }
}

function sortData (data, headline){
    //sparar datan så den inte ändras
    const sortedData = [...data]; 

    toggleSort *= -1;

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
