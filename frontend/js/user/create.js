import { showError, showSuccess  } from 'http://localhost/js/utils.js';

document.getElementById("formCreateUser").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
    };

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
        showError("Все поля обязательны!");
        return;
    }

    try {
        const response = await fetch("/api/create/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        const result = await response.json();
        
        if (response.ok) {
            showSuccess("Пользователь создан!");
        } else {
            // Исправлено: используем result.detail вместо result.message
            showError(result.detail || "Неизвестная ошибка");
        }
    } catch (error) {
        showError(`Ошибка сети: ${error.message}`);
    }
});