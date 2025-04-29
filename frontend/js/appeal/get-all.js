import { showError, showSuccess } from 'http://localhost/js/utils.js';

let isRequestInProgress = false;
let appealsInterval;

async function loadAppeals() {
    // Если уже идет запрос - пропускаем
    if (isRequestInProgress) {
        console.log('Запрос уже выполняется, пропускаем...');
        return;
    }

    try {
        isRequestInProgress = true;
        
        const response = await fetch('/api/appeals/get/all', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();
        const appeals = data.appeals || [];
        
        const container = document.getElementById('listAppeals');
        container.innerHTML = '';
        
        appeals.forEach(item => {
            const element = document.createElement('div');
            element.className = 'appeal-item';
            
            const updatedAt = new Date(item.updated_at);
            const formattedDate = updatedAt.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            element.innerHTML = `
                <div class="appeal-subject">${item.subject}</div>
                <div class="appeal-priority">${item.priority}</div>
                <div class="appeal-date">${formattedDate}</div>
            `;
            
            container.appendChild(element);
        });
        
        showSuccess(data.message || "Данные успешно загружены");
        
    } catch (error) {
        showError(error.message || "Произошла ошибка");
    } finally {
        // В любом случае снимаем флаг выполнения запроса
        isRequestInProgress = false;
    }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Первая загрузка
    loadAppeals();
    
    // Устанавливаем интервал для обновлений
    appealsInterval = setInterval(loadAppeals, 3000);
});