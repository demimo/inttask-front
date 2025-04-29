document.addEventListener('DOMContentLoaded', function() {
    // Кнопки меню
    const idButtonAppeals = document.getElementById('buttonAppeals');
    const idButtonUsers = document.getElementById('buttonUsers');
    const idButtonCompanies = document.getElementById('buttonCompanies');
    const idButtonSettings = document.getElementById('buttonSettings');

    // Контейнеры
    const classAppealContainer = document.querySelector('.appeal-container');
    const classDialogueContainer = document.querySelector('.dialogue-container');
    const classUserContainer = document.querySelector('.user-container');
    const classCompanyContainer = document.querySelector('.company-container');

    // Кнопки которые открывают/закрывают форму для "Создания обращения"
    const idButtonOpenFormCreateAppeal = document.getElementById('buttonOpenFormCreateAppeal');
    const idButtonCloseFormCreateAppeal = document.getElementById('buttonCloseFormCreateAppeal');

    const classFormCreateAppeal = document.querySelector('.form-create-appeal');
    const classButtonOpenFormCreateAppeal = document.querySelector('.button-open-form-create-appeal');
    const classButtonCloseFormCreateAppeal = document.querySelector('.button-close-form-create-appeal');

    // Кнопки которые открывают/закрывают форму для "Создания пользователя"
    const idButtonOpenFormCreateUser = document.getElementById('buttonOpenFormCreateUser');
    const idButtonCloseFormCreateUser = document.getElementById('buttonCloseFormCreateUser');

    const classFormCreateUser = document.querySelector('.form-create-user');
    const classButtonOpenFormCreateUser = document.querySelector('.button-open-form-create-user');
    const classButtonCloseFormCreateUser = document.querySelector('.button-close-form-create-user');






    // Кнопка "Обращения" в меню
    idButtonAppeals.addEventListener('click', function() {
        classAppealContainer.classList.remove('hidden');
        classUserContainer.classList.add('hidden');
        classCompanyContainer.classList.add('hidden');
        if (!classFormCreateAppeal.classList.contains('hidden')) {
            classDialogueContainer.classList.remove('hidden');
        } else {
            classDialogueContainer.classList.add('hidden');
        }  
    });

    // Кнопка "Пользователи" в меню
    idButtonUsers.addEventListener('click', function() {
        classAppealContainer.classList.add('hidden');
        classDialogueContainer.classList.add('hidden');
        classUserContainer.classList.remove('hidden');
        classCompanyContainer.classList.add('hidden');
    });

    // Кнопка "Компании" в меню
    idButtonCompanies.addEventListener('click', function() {
        classAppealContainer.classList.add('hidden');
        classDialogueContainer.classList.add('hidden');
        classUserContainer.classList.add('hidden');
        classCompanyContainer.classList.remove('hidden');
    });



    // Открытие/закрытие формы создания обращения
    idButtonOpenFormCreateAppeal.addEventListener('click', function() {
        classButtonCloseFormCreateAppeal.classList.remove('hidden');
        classDialogueContainer.classList.remove('hidden');
        classFormCreateAppeal.classList.remove('hidden');
        classButtonOpenFormCreateAppeal.classList.add('hidden');
    });
    idButtonCloseFormCreateAppeal.addEventListener('click', function() {
        classButtonOpenFormCreateAppeal.classList.remove('hidden');
        classButtonCloseFormCreateAppeal.classList.add('hidden');
        classDialogueContainer.classList.add('hidden');
        classFormCreateAppeal.classList.add('hidden');
    });

    // Открытие/закрытие формы создания пользователя
    idButtonOpenFormCreateUser.addEventListener('click', function() {
        classFormCreateUser.classList.remove('hidden')
        classButtonCloseFormCreateUser.classList.remove('hidden')
        classButtonOpenFormCreateUser.classList.add('hidden')
    });
    idButtonCloseFormCreateUser.addEventListener('click', function() {
        classFormCreateUser.classList.add('hidden')
        classButtonCloseFormCreateUser.classList.add('hidden')
        classButtonOpenFormCreateUser.classList.remove('hidden')
    });


});