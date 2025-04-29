import { showError, showSuccess } from 'http://localhost/js/utils.js';

let isRequestInProgress = false;
let Interval;

async function loadCompanies() {
    // Если уже идет запрос - пропускаем
    if (isRequestInProgress) {
        console.log('Запрос уже выполняется, пропускаем...');
        return;
    }

    try {
        const response = await fetch('/api/companies/get/all', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();

        // Получаем массив обращений (data.users)
        const partners = data.partners || []; // На случай, если users отсутствует
        
        const container = document.getElementById('listCompanies');
        container.innerHTML = '';

        // Создаем таблицу
        const table = document.createElement('table');
        table.className = 'company-table';

        // Создаем заголовок таблицы
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Название</th>
                <th>ИНН</th>
            </tr>
        `;
        table.appendChild(thead);

        // Создаем тело таблицы
        const tbody = document.createElement('tbody');
        partners.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'company-item';
            
            row.innerHTML = `
                <td class="company-name">${item.name}</td>
                <td class="company-email">${item.inn}</td>
            `;
            
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        container.appendChild(table);
        
        showSuccess(data.message || "Данные успешно загружены");
        
    } catch (error) {
        console.error('Ошибка:', error);
        showError(error.message || "Произошла ошибка");
    }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Первая загрузка
    loadCompanies();
    
    // Устанавливаем интервал для обновлений
    Interval = setInterval(loadCompanies, 3000);
});