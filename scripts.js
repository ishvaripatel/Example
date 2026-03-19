document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("products")) {
        fetchProducts();
    }
    if (document.getElementById("store-info")) {
        fetchStoreInfo();
    }
});

function fetchProducts() {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            let output = "<ul>";
            data.forEach(product => {
                output += `<li>
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price}</p>
                </li>`;
            });
            output += "</ul>";
            document.getElementById("products").innerHTML = output;
        })
        .catch(error => console.error("Error loading products:", error));
}

function fetchStoreInfo() {
    fetch("contact.xml")
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const store = data.getElementsByTagName("store")[0];
            const name = store.getElementsByTagName("name")[0].textContent;
            const address = store.getElementsByTagName("address")[0].textContent;
            const phone = store.getElementsByTagName("phone")[0].textContent;
            const email = store.getElementsByTagName("email")[0].textContent;

            document.getElementById("store-info").innerHTML = `
                <p><strong>${name}</strong></p>
                <p>Address: ${address}</p>
                <p>Phone: ${phone}</p>
                <p>Email: ${email}</p>`;
        })
        .catch(error => console.error("Error loading store info:", error));
}