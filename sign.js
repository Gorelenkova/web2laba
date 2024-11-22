document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем значения полей email и password
    const email = document.getElementById("email-field").value;
    const password = document.getElementById("password-field").value;

    // Формируем URL с параметрами для GET-запроса
    const url = `http://localhost:8080/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    // Отправка GET-запроса
    fetch(url, {
        method: "GET", // Используем GET вместо POST
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Если успешный ответ, получаем текстовое сообщение
        } else {
            throw new Error("Неверный email или пароль.");
        }
    })
    .then(data => {
        // Выводим сообщение об успешном входе
        console.log("Вы вошли!");
        updateLoginMessage(data, true); // Отображаем сообщение из ответа сервера
    })
    .catch(error => {
        console.error("Ошибка:", error.message);
        updateLoginMessage(error.message, false); // Выводим ошибку на экран
    });
});

// Функция для отображения сообщений
function updateLoginMessage(message, success) {
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    // Скрываем оба сообщения перед обновлением
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    if (success) {
        // Отображаем сообщение об успешном входе
        successMessage.textContent = message;
        successMessage.style.display = "block";
    } else {
        // Отображаем сообщение об ошибке
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }
}
