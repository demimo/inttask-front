import { showError, showSuccess  } from 'http://localhost/js/utils.js';

document.getElementById("formCreateAppeal").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        subject: document.getElementById("subject").value,
        priority: document.getElementById("priority").value,
        responsible_company_id: document.getElementById("responsibleCompanyId").value,
    };

    if (!formData.subject || !formData.priority || !formData.responsible_company_id) {
        showError("Все поля обязательны!");
        return;
    }

    try {
        const response = await fetch("/api/appeal/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        const result = await response.json();
        
        if (response.ok) {
            showSuccess("Обращение создано!");
        } else {
            // Исправлено: используем result.detail вместо result.message
            showError(result.detail || "Неизвестная ошибка");
        }
    } catch (error) {
        showError(`Ошибка сети: ${error.message}`);
    }
});