;
document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Собираем данные из формы
    const formData = new FormData(event.target);
    const data = {
        user_name: formData.get("name"), // В бэкенде это user_name
        mail: formData.get("username"), // В бэкенде это mail
        password: formData.get("password"), // В бэкенде это password
        phone: formData.get("phone") // В бэкенде это phone
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
                    throw new Error(message); // Вывод ошибки из тела ответа
                });
            }
            return response.text(); // Получить успешный текст
        })
        .then((message) => {
            console.log("Успешно зарегистрирован:", message);
        })
        .catch((error) => {
            console.error("Ошибка регистрации:", error.message);
        });
    
});
