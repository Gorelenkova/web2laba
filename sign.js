window.onload = function () {
    localStorage.clear(); // Очищаем localStorage при загрузке страницы
};
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем значения полей email и password
    const email = document.getElementById("email-field").value;
    const password = document.getElementById("password-field").value;

    // Формируем URL с параметрами для GET-запроса
    const url = `http://localhost:8080/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    // Отправка GET-запроса
    fetch("http://127.0.0.1:8080/auth/login?email=" + email + "&password=" + password)
    .then(response => response.json())
    .then(data => {
        if (data.userId) {
            // Сохраняем userId в localStorage
            localStorage.setItem("userId", data.userId);
            console.log("UserId сохранен:", data.userId);

            alert(data.message); // Показываем сообщение
            window.location.href = "index.html"; // Редирект
        } else {
            alert(data.message); // Показываем сообщение об ошибке
        }
    })
    .catch(error => {
        console.error("Ошибка при выполнении запроса:", error);
        alert("Произошла ошибка при входе.");
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
