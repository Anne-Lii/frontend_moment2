"use strict"

const url = "https://dahlgren.miun.se/ramschema_ht23.php";

async function getData() {

   try {
        const respons = await fetch(url);
        const data = await respons.json();
        console.table(data);

        const courses = [data];      

        data.forEach((courses)=>{
            document.getElementById("kurser").innerHTML += "<li>" + courses.code + "</li>"
        });

        data.forEach((courses)=>{
            document.getElementById("namn").innerHTML += "<li>" + courses.coursename + "</li>"
        });

        data.forEach((courses)=>{
            document.getElementById("progression").innerHTML += "<li>" + courses.progression + "</li>"
        });

        

    } catch (error) {
        document.getElementById("kurser").innerHTML = "Det gick inte att hämta kurser";
    }
}

getData();
