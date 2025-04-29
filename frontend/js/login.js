import { showError, showSuccess } from './utils.js';

document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    if (!formData.email || !formData.password) {
        showError("Все поля обязательны!");
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        
        if (response.ok) {
            showSuccess("Вход успешен!");
            window.location.href = "/";
        } else {
            // Исправлено: используем result.detail вместо result.message
            showError(result.detail || "Неизвестная ошибка");
        }
    } catch (error) {
        showError(`Ошибка сети: ${error.message}`);
    }
});