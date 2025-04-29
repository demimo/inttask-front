import { showError, showSuccess  } from 'http://localhost/js/utils.js';
import { openSearchCompany } from 'http://localhost/js/company/search/openSearchCompany.js';

let isRequestInProgress = false;

async function searchCompany() {

    const inputValue = document.getElementById("formSearchCompany").value.trim();
    
    // Определяем тип данных (текст или цифры)
    const isDigitsOnly = /^\d+$/.test(inputValue);
    
    const formData = isDigitsOnly 
        ? { inn: inputValue } 
        : { name: inputValue };

    try {
        const response = await fetch("/api/company/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();
        const searchCompanies = data.search || [];
        const container = document.getElementById('listSearchCompany');
        container.innerHTML = '';

        searchCompanies.forEach(item => {
            const element = document.createElement('div');
            element.className = 'search-company-item';
            element.innerHTML = `
                <button type="submit" class="btn btn-open-search-company" data-company-id="${item._id}">
                    <span class="search-company-name">${item.name}/${item.inn}</span>
                </button>
            `;

            container.appendChild(element);
        });
        
        showSuccess(data.message || "Данные успешно загружены");

        // Обработчик клика на кнопку открытия компании
        // container.addEventListener('click', async (e) => {
        //     if (e.target.closest('.btn-open-search-company')) {
        //         const button = e.target.closest('.btn-open-search-company');
        //         const companyId = button.getAttribute('data-company-id');
        //         await openSearchCompany(companyId);

        //         // Показываем контейнер с информацией
        //         document.querySelector('.dialogue-container').classList.remove('hidden');
        //         document.querySelector('.info-search-company').classList.remove('hidden');
        //     }
        // });

    } catch (error) {
        showError(error.message || "Произошла ошибка");
    } finally {
        // В любом случае снимаем флаг выполнения запроса
        isRequestInProgress = false;
    }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("formSearchCompany");
    let interval;
    let timeout;
    const delayBeforeCancel = 5000; // Если в поле ввода 5 секунд ничего не вводилась прекращаем делать запросы на поиск
    
    // Функция для проверки и выполнения поиска
    const checkAndSearch = () => {
        if (searchInput.value.trim() !== "") {
            searchCompany();
        } else {
            // Очищаем результаты, если поле пустое
            document.getElementById('listSearchCompany').innerHTML = '';
        }
    };
    
    // Функция для сброса таймера отмены
    const resetCancelTimer = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clearInterval(interval);
            interval = null;
        }, delayBeforeCancel);
    };
    
    // Обработчик ввода
    searchInput.addEventListener('input', () => {
        // Сначала очищаем предыдущий интервал
        clearInterval(interval);
        resetCancelTimer();
        
        // Если есть текст, запускаем немедленный поиск и устанавливаем интервал
        if (searchInput.value.trim() !== "") {
            checkAndSearch();
            interval = setInterval(checkAndSearch, 3000);
        } else {
            // Если поле пустое, очищаем результаты
            document.getElementById('listSearchCompany').innerHTML = '';
        }
    });
    
    // Инициализация таймера отмены при первом запуске
    resetCancelTimer();
});

// Обработчик клика на кнопку открытия компании
document.getElementById('listSearchCompany').addEventListener('click', async (e) => {
    if (e.target.closest('.btn-open-search-company')) {
        if (isRequestInProgress) return; // Защита от повторных кликов
        isRequestInProgress = true;

        const button = e.target.closest('.btn-open-search-company');
        const companyId = button.getAttribute('data-company-id');
        await openSearchCompany(companyId);

        // Показываем контейнер с информацией
        document.querySelector('.dialogue-container').classList.remove('hidden');
        document.querySelector('.info-search-company').classList.remove('hidden');

    }
});