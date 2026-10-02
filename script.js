const bakeryItems = [
    { name: "Signature Loaf", type: "Bread" },
    { name: "Pastries", type: "Pastry" },
    { name: "Cake", type: "Dessert" }
];

function showSavedFavorite() {
    const result = document.getElementById("favorite-result");
    const select = document.getElementById("favorite-item");
    if (!result || !select) return;

    const savedFavorite = localStorage.getItem("northStarFavorite");
    if (savedFavorite) {
        select.value = savedFavorite;
        result.textContent = `Your saved favorite is ${savedFavorite}.`;
    }
}

function saveFavorite() {
    const select = document.getElementById("favorite-item");
    const result = document.getElementById("favorite-result");
    if (!select || !result) return;

    const selectedItem = bakeryItems.find(item => item.name === select.value);
    if (!selectedItem) {
        result.textContent = "Please choose an item first.";
        return;
    }

    localStorage.setItem("northStarFavorite", selectedItem.name);
    result.textContent = `You saved ${selectedItem.name} as your favorite.`;
}

function setError(fieldId, message) {
    const error = document.getElementById(fieldId);
    if (error) error.textContent = message;
}

function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const details = document.getElementById("item-details");
    const message = document.getElementById("form-message");
    if (!name || !email || !details || !message) return;

    let valid = true;
    setError("name-error", "");
    setError("email-error", "");
    setError("details-error", "");
    message.textContent = "";

    if (name.value.trim().length < 2) {
        setError("name-error", "Please enter your name.");
        valid = false;
    }

    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        setError("email-error", "Please enter a valid email address.");
        valid = false;
    }

    if (details.value.trim().length < 10) {
        setError("details-error", "Please enter at least 10 characters about your request.");
        valid = false;
    }

    if (valid) {
        localStorage.setItem("northStarCustomerName", name.value.trim());
        message.textContent = "Your request looks good and is ready to submit.";
    }
}

function loadSavedName() {
    const name = document.getElementById("name");
    if (!name) return;
    const savedName = localStorage.getItem("northStarCustomerName");
    if (savedName) name.value = savedName;
}

document.addEventListener("DOMContentLoaded", () => {
    showSavedFavorite();
    loadSavedName();

    const favoriteButton = document.getElementById("save-favorite");
    if (favoriteButton) favoriteButton.addEventListener("click", saveFavorite);

    const form = document.getElementById("contact-form");
    if (form) form.addEventListener("submit", validateForm);
});
