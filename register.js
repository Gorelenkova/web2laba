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
    .then((response) => {
        if (!response.ok) {
            return response.text().then((message) => {
                throw new Error(message || "Неизвестная ошибка");
            });
        }
        return response.text(); // Возвращает текст успешной регистрации
    })
    .then((message) => {
        console.log("Успешно зарегистрирован:", message);

        // Убираем сообщение об ошибке, если оно есть
        document.getElementById("error-message").style.display = "none";

        // Показываем сообщение об успехе
        const successMessageElement = document.getElementById("success-message");
        successMessageElement.textContent = "Регистрация прошла успешно! Добро пожаловать!";
        successMessageElement.style.display = "block";

        // Очищаем поля формы
        document.getElementById("registration-form").reset();
    })
    .catch((error) => {
        console.error("Ошибка регистрации:", error.message);

        // Убираем сообщение об успехе, если оно есть
        const successMessageElement = document.getElementById("success-message");
        successMessageElement.style.display = "none";

        // Показываем сообщение об ошибке
        const errorMessageElement = document.getElementById("error-message");
        if (error.message.includes("already in use")) {
            errorMessageElement.textContent = "Этот email уже зарегистрирован. Пожалуйста, используйте другой.";
        } else {
            errorMessageElement.textContent = "Этот email уже зарегистрирован. Пожалуйста, используйте другой.";
        }
        errorMessageElement.style.display = "block";

        // Очищаем поля формы
        document.getElementById("registration-form").reset();
    });
});
