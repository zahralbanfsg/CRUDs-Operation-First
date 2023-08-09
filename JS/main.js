var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var searchInput = document.getElementById("search");
var indexnumber;
var productList = [];
var isSearching = false;
var listFoundedBySearch = [];


if (localStorage.getItem("productList") !== null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
};


function addProduct() {
    if (validationProductName() === true && validationProductPrice() === true && validationProductModel() === true && validationDescModel() === true) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            model: productModel.value,
            desc: productDesc.value
        }
        productList.push(product);
        setProductsInLocalStorage(productList);
        displayProduct(productList);
        clearValues();
    }

}


function displayProduct(products) {
    var list = "";
    for (let i = 0; i < products.length; i++) {
        list += ` <tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${products[i].newName ? products[i].newName : products[i].name}</td>
        <td>${products[i].price}</td>
        <td class="text-capitalize">${products[i].model}</td>
        <td class="text-capitalize">${products[i].desc}</td>
        <td><button onclick="getProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("list").innerHTML = list;
}


function setProductsInLocalStorage(productList) {
    window.localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
}


function clearValues() {
    productName.value = "";
    productPrice.value = "";
    productModel.value = "";
    productDesc.value = "";
}


function searchByName(term) {
    listFoundedBySearch = [];
    isSearching = true;
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            productList[i].oldIndex = i;
            productList[i].newName = (productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`));
            listFoundedBySearch.push(productList[i]);
        }
    }
    displayProduct(listFoundedBySearch);
    searchInput.addEventListener("blur", searchClear)
}


function searchClear() {
    searchInput.value = "";
}


function deleteProduct(index) {
    if (isSearching) {
        let { oldIndex } = listFoundedBySearch[index];
        productList.splice(oldIndex, 1);

    } else {
        productList.splice(index, 1);
    }
    setProductsInLocalStorage(productList);
}


function getProduct(indexForGetValues) {
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.replace("d-none", "d-block");
    productName.value = productList[indexForGetValues].name;
    productPrice.value = productList[indexForGetValues].price;
    productModel.value = productList[indexForGetValues].model;
    productDesc.value = productList[indexForGetValues].desc;
    indexnumber = indexForGetValues;
}


function updateProduct() {
    addProductBtn.classList.replace("d-none", "d-block");
    updateProductBtn.classList.replace("d-block", "d-none");
    var product = {
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        desc: productDesc.value
    }
    productList.splice(indexnumber, 1, product)
    window.localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
    clearValues();
}


// ************************ V A L I D A T I O N ************************
productName.addEventListener("blur", validationProductName)
function validationProductName() {
    var regex = /^\w{3,8}$/
    if (regex.test(productName.value) === true) {
        productName.style = "border:none";
        document.getElementById("productNameInvalid").classList.replace("d-block", "d-none");
        return true;
    } else {
        productName.style = "border:5px solid red";
        document.getElementById("productNameInvalid").classList.replace("d-none", "d-block");
        return false;
    }
}


productPrice.addEventListener("blur", validationProductPrice)
function validationProductPrice() {
    var regex = /^([1-9][0-9]{3}|10000)\$$/
    if (regex.test(productPrice.value) === true) {
        productPrice.style = "border:none";
        document.getElementById("productPriceInvalid").classList.replace("d-block", "d-none");
        return true;
    } else {
        productPrice.style = "border:5px solid red";
        document.getElementById("productPriceInvalid").classList.replace("d-none", "d-block");
        return false;
    }
}


productModel.addEventListener("blur", validationProductModel)
function validationProductModel() {
    var regex = /^(Television|television|Mobile|mobile|laptop|Laptop)$/
    if (regex.test(productModel.value) === true) {
        productModel.style = "border:none";
        document.getElementById("productModelInvalid").classList.replace("d-block", "d-none");
        return true;
    } else {
        productModel.style = "border:5px solid red";
        document.getElementById("productModelInvalid").classList.replace("d-none", "d-block");
        return false;
    }
}


productDesc.addEventListener("blur", validationDescModel)
function validationDescModel() {
    var regex = /^\w{3,8}(\s\w{1,}){0,19}$/
    if (regex.test(productDesc.value) === true) {
        productDesc.style = "border:none";
        document.getElementById("productDescInvalid").classList.replace("d-block", "d-none");
        return true;
    } else {
        productDesc.style = "border:5px solid red";
        document.getElementById("productDescInvalid").classList.replace("d-none", "d-block");
        return false;
    }
}