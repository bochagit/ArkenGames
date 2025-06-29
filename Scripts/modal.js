document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todas las imágenes que quieras que se puedan agrandar
    document.querySelectorAll('.heroe__image, .gallery img, .box__box, .main__description-img').forEach(function(img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            document.getElementById('imageModal').style.display = 'flex';
            document.getElementById('modalImg').src = this.src;
            document.getElementById('modalImg').alt = this.alt;
        });
    });

    // Cierra el modal al hacer click en la X o fuera de la imagen
    document.querySelector('.image-modal__close').onclick = function() {
        document.getElementById('imageModal').style.display = 'none';
    };

    document.getElementById('imageModal').onclick = function(e) {
        if (e.target === this) this.style.display = 'none';
    };
});