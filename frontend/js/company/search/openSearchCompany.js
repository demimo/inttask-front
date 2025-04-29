import { showError, showSuccess } from 'http://localhost/js/utils.js';

export async function openSearchCompany(companyId) {

    try {
        
        // Формируем и получаем данные
        const formData = {
            _id: companyId
        };

        // Отправляем запрос на получение данных
        const response = await fetch("/api/company/search/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }

        // Получили данные
        const data = await response.json();
        const company = data.company || {};
        const partnerships = data.company || {};

        // Отображаем данные
        const container = document.getElementById('infoSearchCompany');
        container.innerHTML = '';
        
        const element = document.createElement('div');
        element.className = 'company-item';
        
        element.innerHTML = `
            <div class="company-name">${company.name}</div>
            <div class="company-inn">${company.inn}</div>
            <div class="company-partnerships">${partnerships.partnerships}</div>
        `;
        
        container.appendChild(element);
        
        showSuccess(data.message || "Данные успешно загружены");
        
    } catch (error) {
        showError(error.message || "Произошла ошибка");
    }
}
