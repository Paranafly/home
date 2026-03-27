<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ParanaFly — Guía de Vadeo por Tierra - Integración Admin</title>

<!-- ADMIN INTEGRATION - AGREGAR ESTA LÍNEA -->
<script src="admin-integration.js"></script>

<!-- RESTO DE TU HEAD AQUÍ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Anton&display=swap" rel="stylesheet">

</head>
<body>

<!-- ENLACE AL ADMIN EN LA NAVBAR (OPCIONAL) -->
<script>
    // Agregar botón de admin en la navbar si está en modo edición
    document.addEventListener('DOMContentLoaded', () => {
        // Buscar el nav y agregar botón de admin
        const nav = document.querySelector('nav');
        if (nav && localStorage.getItem('paranafly_admin_data')) {
            // Crear botón flotante de admin
            const adminBtn = document.createElement('a');
            adminBtn.href = 'admin.html';
            adminBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
                z-index: 999;
                transition: all 0.3s;
                text-decoration: none;
            `;
            adminBtn.innerHTML = '⚙️';
            adminBtn.title = 'Ir a Panel Admin';
            adminBtn.addEventListener('mouseover', () => {
                adminBtn.style.transform = 'scale(1.1)';
                adminBtn.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
            });
            adminBtn.addEventListener('mouseout', () => {
                adminBtn.style.transform = 'scale(1)';
                adminBtn.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
            });
            document.body.appendChild(adminBtn);
        }
    });
</script>

<!-- TU CONTENIDO HTML AQUÍ -->

</body>
</html>
