export function showError(message) {
    const el = document.getElementById("responseMessage");
    el.textContent = `Ошибка: ${message}`;
    el.style.color = "red";
}

export function showSuccess(message) {
    const el = document.getElementById("responseMessage");
    el.textContent = message;
    el.style.color = "green";
}

