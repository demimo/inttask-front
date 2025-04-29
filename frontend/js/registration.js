import { showError, showSuccess } from './utils.js';

document.getElementById("formRegistration").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        company_name: document.getElementById("companyName").value,
        user_name: document.getElementById("userName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    if (!formData.company_name || !formData.user_name || !formData.email || !formData.password) {
        showError("Все поля обязательны!");
        return;
    }

    try {
        const response = await fetch("/api/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        
        if (response.ok) {
            showSuccess("Регистрация успешна!");
            window.location.href = "/";
        } else {
            // Исправлено: используем result.detail вместо result.message
            showError(result.detail || "Неизвестная ошибка");
        }
    } catch (error) {
        showError(`Ошибка сети: ${error.message}`);
    }
});