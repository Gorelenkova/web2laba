document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const data = {
        name: formData.get("name"),
        Email: formData.get("username"),
        Password: formData.get("password"),
        Phone: formData.get("phone")  // Capture the phone number from the form
    };

    fetch("http://localhost:5235/api/UserAuth/Register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.errors && result.errors.Email) {
            console.log("Ошибки валидации Email:", result.errors.Email);
        } else if (result) {
            console.log("Данные успешно добавлены в базу данных", result);
        } else {
            console.error("Произошла ошибка при добавлении данных в базу данных");
        }
    });
});
