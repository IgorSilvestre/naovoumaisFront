import { insertProducts, getProductsNear, insertSpinner, insertMoreProductsButton } from './utils.js';
let page = 0;
async function getproducts() {
    const data = await getProductsNear(page);
    return data;
}
async function insert(data) {
    await insertProducts(data);
    page = data.nextPage;
}
insertSpinner();
insert(await getproducts());
insertMoreProductsButton();
const moreProductsButton = document.querySelector('[more-products-button]');
if (!moreProductsButton)
    console.log('More products HTML button could no be fetched');
moreProductsButton?.addEventListener('click', async () => {
    insertSpinner();
    insert(await getproducts());
    console.log(page);
});
