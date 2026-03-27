# 🎛️ Panel de Administrador - Guía de Instalación

## ¿Qué es?

Un **panel de control** profesional donde puedes:
- ✅ Cargar fotos en cada sección
- ✅ Ver previsualización inmediata
- ✅ Cambiar imágenes cuando quieras
- ✅ Sincronizar con GitHub automáticamente
- ✅ Exportar/importar configuración
- ✅ Todo funciona en GitHub Pages (sin servidor)

---

## 📦 Archivos que recibiste

```
admin/
├── admin.html                 ← Panel de control (abre esto)
├── admin-integration.js       ← Conecta con tu página
└── README.md                  ← Esta guía
```

---

## 🚀 Instalación Rápida (3 pasos)

### Paso 1: Subir archivos a GitHub

Copia estos archivos a tu repositorio:

```
tu-repositorio/
├── index.html                 (tu página principal)
├── admin.html                 (nuevo - panel admin)
├── admin-integration.js       (nuevo - script de integración)
└── img/
    └── ... (tus imágenes)
```

**Comando:**
```bash
git add admin.html admin-integration.js
git commit -m "Agregar panel de administrador"
git push origin main
```

### Paso 2: Vincular admin.html en tu página principal

Abre `index.html` y busca la etiqueta `</head>`. Antes de cerrar, agrega:

```html
<!-- Admin Integration -->
<script src="admin-integration.js"></script>
```

**Ejemplo completo:**
```html
<head>
    <meta charset="UTF-8">
    <!-- ... otros tags ... -->
    <script src="admin-integration.js"></script>  <!-- ← AGREGAR AQUÍ -->
</head>
```

### Paso 3: Acceder al panel

Abre tu navegador y ve a:

```
https://tu-usuario.github.io/tu-repositorio/admin.html
```

¡Listo! El panel está abierto y funcionando.

---

## 📖 Cómo usar el Panel Admin

### 1️⃣ Cargar Imágenes

1. Haz click en una pestaña (Hero, Nosotros, Servicios, etc.)
2. Arrastra imágenes a la zona de carga o haz click para seleccionar
3. Las imágenes se cargan automáticamente

### 2️⃣ Ver Previsualización

- Haz click en cualquier imagen para verla en grande
- Usa la "X" roja para eliminar una imagen

### 3️⃣ Cambiar Imágenes

1. Abre el panel admin
2. Ve a la sección que quieres actualizar
3. Carga nuevas imágenes
4. Los cambios se guardan **automáticamente** en tu navegador

### 4️⃣ Sincronizar con GitHub (Opcional)

Para que tu sitio público se actualice:

#### Opción A: Sincronización Automática (Recomendado)

1. En el panel admin, haz click en "⚙️ Conectar GitHub"
2. Necesitas un **Personal Access Token** de GitHub:
   - Ve a: https://github.com/settings/tokens
   - Click en "Generate new token (classic)"
   - Dale permisos: `repo` (full)
   - Copia el token (¡guárdalo!)

3. En el panel admin completa:
   - **Token**: Tu personal access token
   - **Usuario**: Tu usuario de GitHub
   - **Repositorio**: Nombre del repo (ej: parana-fly)
   - **Rama**: main (o tu rama)

4. Click en "Conectar"

5. Ahora, cuando cargues imágenes y hagas click en "📤 Sincronizar con GitHub", se subirán automáticamente

#### Opción B: Sincronización Manual

1. Abre el panel admin
2. Click en "📥 Exportar Datos"
3. Se descargará un archivo `.json`
4. Sube ese archivo a tu repositorio en una carpeta `data/`
5. En tu página, carga ese JSON para obtener los datos

---

## 🔄 Flujo de Trabajo Completo

```
1. Abres admin.html
       ↓
2. Cargas imágenes en el panel
       ↓
3. Las imágenes se guardan en tu navegador (localStorage)
       ↓
4. Tu página index.html Lee esas imágenes automáticamente
       ↓
5. (Opcional) Sincronizas con GitHub para que otros vean los cambios
       ↓
6. ¡Tu página se actualiza automáticamente!
```

---

## 💾 Almacenamiento de Datos

### Donde se guardan tus imágenes

Las imágenes se guardan de **varias formas**:

1. **localStorage** (Tu navegador actual)
   - Automático
   - Hasta 5-10 MB
   - Funciona offline

2. **GitHub** (Tu repositorio)
   - Manual (click en sincronizar)
   - Accesible desde cualquier lado
   - Visible en tu repositorio

3. **Backup/Exportación**
   - Click en "📥 Exportar Datos"
   - Se descarga un `.json`
   - Puedes compartirlo o guardarlo

### Limpieza de datos

Si necesitas empezar de cero:

1. Abre DevTools (F12)
2. Ve a "Application" → "Local Storage"
3. Busca "paranafly_admin_data"
4. Elimina la entrada
5. Recarga la página

O usa el botón "🗑️ Limpiar Sección" en el admin

---

## 🔗 Integrando con tu Página

El archivo `admin-integration.js` **automáticamente**:

1. Lee los datos guardados en localStorage
2. Encuentra las imágenes en tu HTML
3. Las reemplaza con las imágenes del admin
4. Todo ocurre al cargar la página

### Secciones soportadas

| Sección | Qué actualiza |
|---------|---------------|
| **Hero** | Imagen de fondo y logo |
| **Nosotros** | Imagen del lado derecho |
| **Servicios** | Imágenes de las tarjetas de servicio |
| **Programas** | Imágenes dentro de cada programa |
| **Galería** | Todas las imágenes del lightbox |
| **Contacto** | Imagen de la sección contacto |

---

## 🛠️ Casos de Uso Avanzados

### Usar datos de un CDN

Si quieres usar un CDN externo (Cloudinary, etc.):

```javascript
// En la consola del navegador:
addSectionImage('hero', 'https://res.cloudinary.com/tu-usuario/image/upload/img_01.jpg');

// O reemplazar una imagen específica:
updateSectionImage('servicios', 0, 'https://tu-cdn.com/imagen.jpg');
```

### Exportar datos

```javascript
// En la consola:
window.paranaflyAdmin.exportConfig();

// Se descargará un archivo JSON con toda la configuración
```

### Obtener todas las imágenes de una sección

```javascript
// En la consola:
getSectionImages('hero')

// Retorna un array con todas las imágenes base64
```

---

## ⚠️ Solución de Problemas

### "Las imágenes no aparecen en mi página"

✓ Verifica que `admin-integration.js` esté en el `<head>` de index.html
✓ Abre la consola (F12) y busca errores
✓ Abre admin.html y carga las imágenes nuevamente
✓ Recarga la página principal (Ctrl+Shift+Delete para limpiar cache)

### "El panel admin carga pero está vacío"

✓ Es normal - el panel empieza vacío
✓ Carga imágenes en la primera pestaña (Hero)
✓ Verifica que el navegador permita localStorage

### "Quiero cambiar una sección específica"

1. Abre admin.html
2. Haz click en la pestaña de esa sección
3. Carga nuevas imágenes
4. Listo, la página se actualiza automáticamente

### "¿Cómo sincronizo con GitHub?"

1. Panel Admin → "⚙️ Conectar GitHub"
2. Pega tu personal access token (desde https://github.com/settings/tokens)
3. Ingresa tu usuario, repo y rama
4. Click en "Conectar"
5. Ahora puedes usar "📤 Sincronizar con GitHub"

---

## 📱 Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome/Edge | ✅ Sí |
| Firefox | ✅ Sí |
| Safari | ✅ Sí |
| Internet Explorer | ❌ No (demasiado viejo) |

**Dispositivos:**
- ✅ Desktop
- ✅ Tablet
- ✅ Móvil (vista responsiva)

---

## 🔐 Seguridad

### Token de GitHub

⚠️ **IMPORTANTE:** Tu personal access token es como una contraseña

- **NUNCA** lo compartas públicamente
- Guárdalo en un lugar seguro
- Si lo expones, elimínalo en GitHub Settings
- El token se guarda **localmente en tu navegador**, no se envía a servidores

### Datos

- Las imágenes se guardan en **Base64** (encoded)
- No se envían a servidores externos
- Solo GitHub (si sincronizas) recibe los datos

---

## 📞 Soporte y Troubleshooting

### ¿Puedo usar esto sin GitHub?

**Sí**, pero solo en tu navegador local:
- Cargas imágenes en admin.html
- Se guardan en localStorage
- Funcionan en tu máquina
- Para compartir públicamente, necesitas GitHub o un servidor

### ¿Qué pasa si cambio de navegador?

Los datos se pierden (porque están en localStorage de ese navegador).

**Solución:** Usa "📥 Exportar Datos" en un navegador y "📤 Importar Datos" en otro

### ¿Puedo editar HTML desde el admin?

No, pero puedes cambiar imágenes. Para editar texto, modifica `index.html` directamente.

---

## 🎯 Próximos Pasos

1. ✅ Sube admin.html y admin-integration.js a GitHub
2. ✅ Agrega el script a tu index.html
3. ✅ Abre admin.html y carga imágenes
4. ✅ Verifica que tu página se actualice automáticamente
5. ✅ (Opcional) Conecta GitHub para sincronización automática

---

## 📚 Referencias Rápidas

**URLs importantes:**
- Panel Admin: `https://tu-usuario.github.io/tu-repo/admin.html`
- GitHub Tokens: https://github.com/settings/tokens
- Documentación GitHub API: https://docs.github.com/es/rest

**Comandos útiles:**
```bash
# Subir cambios a GitHub
git add .
git commit -m "Actualizar imágenes"
git push origin main

# Ver logs de GitHub Pages
git log --oneline
```

---

## 🎉 ¡Listo!

Tu panel admin está funcionando. Ahora puedes:

✅ Cambiar imágenes sin tocar código
✅ Actualizar tu página instantáneamente
✅ Sincronizar con GitHub automáticamente
✅ Exportar/importar configuración
✅ Todo funciona sin servidores

**¡Que disfrutes tu nuevo panel de admin! 🚀**
