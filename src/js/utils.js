function numberToMoney(productPrice) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return formatter.format(productPrice);
}
function fixDate(date) {
    const fixedDate = new Date(date).toLocaleString('pt-BR').split(' ');
    return fixedDate[0];
}
async function getProductsNear(page = 1) {
    const response = await fetch(`get/nearProducts/?page=${page}`);
    const data = await response.json();
    return data;
}
function insertSpinner() {
    const spinnerArea = document.getElementById('spinner-area');
    const spinnerHTML = `<div id="spinner"></div>`;
    if (spinnerArea != null)
        spinnerArea.innerHTML = spinnerHTML;
    else
        console.log(`spinner area HTML div couldn't be fetched`);
}
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode?.removeChild(elements[0]);
    }
}
async function insertProducts(data) {
    const products = data.products;
    const page = data.nextPage - 1;
    let productCardArea = document.getElementById('product-card-area');
    document.getElementById('spinner')?.remove();
    if (products.length == 0) {
        if (page > 0) {
            if (productCardArea)
                productCardArea.innerHTML += `<h3>Não há mais produtos para serem carregados</h3>`;
            else
                console.log(`product card area HTML div coudn't be fetched`);
            document.querySelector('[more-products-button]')?.remove();
            return;
        }
        if (productCardArea)
            productCardArea.innerHTML = `<h3>Nenhum produto encontrado, tente pesquisar por outra coisa!</h3>`;
        else
            console.log(`product card area HTML div coudn't be fetched`);
        return;
    }
    try {
        products.forEach((product) => {
            let description = product.description;
            if (description.length > 120) {
                product.description = description.slice(0, 120) + '...';
            }
            if (productCardArea)
                productCardArea.innerHTML += `
                <a href="" class="product-card">
                    <img src="" alt="product image">
                    <div class="product-first-info">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                    </div>
                    <div class="product-second-info">
                        <p class="product-price">${numberToMoney(product.price)}</p>
                        <p>${product.city}</p>
                        <p>${fixDate(product.date)}</p>
                    </div>
                </a>
            `;
        });
    }
    catch (err) {
        console.log(err);
    }
    return data.nextPage;
}
function insertMoreProductsButton() {
    const button = '<button more-products-button>Mais produtos</button>';
    const productArea = document.getElementsByClassName('product-area')[0];
    productArea.innerHTML += button;
}
export { numberToMoney, getProductsNear, fixDate, insertProducts, insertSpinner, removeElementsByClass, insertMoreProductsButton };
