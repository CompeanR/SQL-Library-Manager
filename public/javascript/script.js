"use strict"

const paginateTable = () => {
    const table = document.getElementsByTagName("table")[0];
    const box = document.getElementById("page-buttons");

    if (table) {
        paginator({
            table: document.getElementsByTagName("table")[0],
            box: document.getElementById("page-buttons")
        });
    }
}

paginateTable();