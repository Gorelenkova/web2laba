document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const formData = new FormData(event.target);
    const data = {
        user_name: formData.get("name"),
        mail: formData.get("username"),
        password: formData.get("password"),
        phone: formData.get("phone"),
    };

    fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(message => {
                throw new Error(message.message || "Произошла ошибка");
            });
        }
        return response.json(); // Обрабатываем JSON-ответ от сервера
    })
    .then(data => {
        console.log("Успешно зарегистрирован:", data.message);

        // Сохраняем userId в localStorage
        localStorage.setItem("userId", data.userId);
        console.log("UserId сохранен:", data.userId);

        // Показываем сообщение об успешной регистрации
        alert("Регистрация прошла успешно! Добро пожаловать!");

        // Перенаправляем на главную страницу
        window.location.href = "index.html"; // Укажите путь к главной странице
    })
    .catch(error => {
        console.error("Ошибка регистрации:", error);

        // Показываем сообщение об ошибке
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = error.message || "Произошла ошибка. Попробуйте еще раз.";
        errorMessageElement.style.display = "block";
    });
});
