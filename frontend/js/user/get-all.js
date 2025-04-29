import { showError, showSuccess } from 'http://localhost/js/utils.js';

let isRequestInProgress = false;
let usersInterval;

async function loadUsers() {
    // Если уже идет запрос - пропускаем
    if (isRequestInProgress) {
        console.log('Запрос уже выполняется, пропускаем...');
        return;
    }

    try {
        const response = await fetch('/api/users/get/all', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();

        // Получаем массив обращений (data.users)
        const users = data.users || []; // На случай, если users отсутствует
        
        const container = document.getElementById('listUsers');
        container.innerHTML = '';

        // Создаем таблицу
        const table = document.createElement('table');
        table.className = 'user-table';

        // Создаем заголовок таблицы
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Активен</th>
            </tr>
        `;
        table.appendChild(thead);

        // Создаем тело таблицы
        const tbody = document.createElement('tbody');
        users.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'user-item';
            
            row.innerHTML = `
                <td class="user-name">${item.name}</td>
                <td class="user-email">${item.email}</td>
                <td class="user-role">${item.role}</td>
                <td class="user-is_active">${item.is_active}</td>
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
    loadUsers();
    
    // Устанавливаем интервал для обновлений
    usersInterval = setInterval(loadUsers, 3000);
});