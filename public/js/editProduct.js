const editModal = document.getElementById("editProduct");

editModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const product = JSON.parse(button.getAttribute("data-info"));

    const title = document.getElementById("editTitle");
    const photoMin = document.getElementById("editPhotoMiniature");
    const photo = document.getElementById("editPhoto");
    const category = document.getElementById("editCategory");
    const price = document.getElementById("editPrice");
    const stock = document.getElementById("editStock");
    const form = document.getElementById("editForm");

    title.value = product.title;
    photoMin.src = product.photo;
    photoMin.alt = product.title;
    photo.value = product.photo;
    category.value = product.category;
    price.value = product.price;
    stock.value = product.stock;
    form.action = `/products/${product._id}?_method=PUT`;
});
