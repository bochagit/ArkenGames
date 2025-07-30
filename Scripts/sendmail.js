document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el reload

            let parms = {
                name: document.getElementById("name").value,
                company: document.getElementById("company").value,
                tel: document.getElementById("tel").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            emailjs.send("service_2dmptqg", "template_8mbch1a", parms)
            .then(function() {
                alert("¡Mensaje enviado!");
                form.reset();
            }, function(error) {
                alert("Error al enviar el mensaje.");
            });
        });
    }
});