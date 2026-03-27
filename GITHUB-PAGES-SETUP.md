# 🔧 Admin en GitHub Pages - Guía Técnica

## ¿Por qué GitHub Pages?

GitHub Pages es perfecto para tu admin porque:

✅ **Gratuito** - Sin costo de hosting
✅ **Sin servidor** - Todo funciona en el navegador
✅ **Seguro** - Tus datos en tu máquina
✅ **Sincronización** - Sube cambios directamente a tu repo
✅ **Control de versiones** - Historial de cambios en GitHub

---

## 📋 Checklist de Instalación

```
[ ] Descargar todos los archivos
[ ] Copiar a tu repositorio GitHub
[ ] Agregar script a index.html
[ ] Hacer push a GitHub
[ ] Acceder a admin.html en GitHub Pages
[ ] Cargar imágenes de prueba
[ ] Verificar que index.html se actualice
[ ] (Opcional) Conectar token de GitHub para sincronización
```

---

## 📂 Estructura de Carpetas

Después de agregar el admin, tu repositorio debe verse así:

```
parana-fly/                    ← Tu repositorio
├── .git/                      ← Git (automático)
├── .github/
│   └── workflows/             ← (Opcional) CI/CD
├── index.html                 ← Tu página principal
├── admin.html                 ← Panel admin (NUEVO)
├── admin-integration.js       ← Script de integración (NUEVO)
├── README.md                  ← Documentación
├── img/
│   ├── img_01.jpg
│   ├── img_02.jpg
│   └── ...
└── data/                      ← (Opcional) Backup de datos
    ├── hero-images.json
    ├── servicios-images.json
    └── ...
```

---

## 🔌 Paso 1: Integración Básica

### Modificar tu index.html

Abre `index.html` y encuentra la etiqueta `</head>`:

**ANTES:**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ParanaFly</title>
    <!-- ... otros estilos ... -->
</head>
```

**DESPUÉS:**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ParanaFly</title>
    <!-- ... otros estilos ... -->
    
    <!-- ✅ AGREGAR ESTA LÍNEA -->
    <script src="admin-integration.js"></script>
</head>
```

**¡Eso es todo!** El script se conectará automáticamente.

---

## 🚀 Paso 2: Subir a GitHub

```bash
# 1. Agregar todos los archivos nuevos
git add admin.html admin-integration.js

# 2. Hacer commit
git commit -m "Agregar panel de administrador para imágenes"

# 3. Hacer push
git push origin main
```

Espera 1-2 minutos para que GitHub Pages se actualice.

---

## 🌐 Paso 3: Acceder al Admin

Una vez hecho el push, accede a:

```
https://tu-usuario.github.io/nombre-repo/admin.html
```

**Ejemplo:**
```
https://pepito.github.io/parana-fly/admin.html
```

---

## ⚙️ Paso 4: Configuración Básica

### Sin sincronización (Simple)

1. Abre admin.html
2. Carga imágenes en cada sección
3. Las imágenes se guardan automáticamente
4. Tu index.html las mostrará al recargar

**Ventajas:**
- Muy simple
- Sin necesidad de token
- Funciona offline

**Desventajas:**
- Solo funciona en tu navegador
- Si cambias de navegador, pierdes datos
- No se sincronizan en tiempo real

### Con sincronización (Avanzado)

Para que los cambios se guarden en GitHub automáticamente:

1. **Crear Personal Access Token en GitHub:**
   - Ve a: https://github.com/settings/tokens
   - Click en "Generate new token (classic)"
   - Dale estos permisos:
     - ✅ repo (full)
     - ✅ workflow (si quieres)
   - Copia el token (aparece una sola vez)

2. **En el panel admin:**
   - Click en "⚙️ Conectar GitHub"
   - Pega tu token en el campo
   - Ingresa tu usuario
   - Ingresa el nombre de tu repo
   - Click en "Conectar"

3. **Sincronizar:**
   - Cada vez que cargues imágenes
   - Click en "📤 Sincronizar con GitHub"
   - Se subirán a `/data/` en tu repo

---

## 💾 Cómo funcionan los datos

### Local Storage (Almacenamiento del navegador)

```javascript
// Cada navegador guarda datos así:
{
  "hero": {
    "title": "Hero",
    "images": ["data:image/jpeg;base64,...", "data:image/png;base64,..."]
  },
  "servicios": {
    "title": "Servicios",
    "images": ["data:image/jpeg;base64,..."]
  }
  // ... más secciones
}
```

**Límites:**
- ~5-10 MB por navegador
- Se elimina si limpias caché
- No sincronizado entre dispositivos

---

## 🔄 Sincronización con GitHub

Si conectas tu token, el admin guardará archivos JSON en GitHub:

**Estructura:**
```
data/
├── hero-images.json
├── nosotros-images.json
├── servicios-images.json
├── programas-images.json
├── imagenes-images.json
└── contacto-images.json
```

**Contenido de un archivo:**
```json
{
  "section": "hero",
  "title": "Sección Hero",
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
  ],
  "timestamp": "2025-03-27T22:30:45.123Z",
  "count": 2
}
```

---

## 🛡️ Seguridad y Privacidad

### ¿Dónde se guardan mis datos?

1. **localStorage de tu navegador** (Tu máquina)
   - Solo tú puedes acceder
   - Se elimina si borras caché

2. **GitHub (si sincronizas)**
   - Tu repositorio privado
   - Visible solo para ti
   - Historial de cambios en Git

### ¿Es seguro mi token de GitHub?

**Sí**, porque:
- El token se almacena **localmente** en tu navegador
- No se envía a servidores externos
- Solo se usa para comunicarse con GitHub
- Si se expone, puedes regenerarlo

**Mejores prácticas:**
- 🚫 Nunca compartas tu token
- 🚫 No lo subas a GitHub públicamente
- ✅ Usa permisos específicos (solo "repo")
- ✅ Regenera tokens viejos

---

## 📱 Usando Admin en Diferentes Dispositivos

### En tu desktop/laptop (Donde crease el token)

```
Tu navegador → localStorage
           ↓
         admin.html
           ↓
GitHub API → Sincroniza
```

### En tu tablet/móvil

```
Tu navegador → localStorage
           ↓
         admin.html
           ↓
Lee datos guardados localmente
```

**Nota:** Si quieres acceder desde múltiples dispositivos, sincroniza con GitHub.

---

## 🔍 Verificar que todo funciona

### Checklist:

1. **Admin carga:**
   ```
   https://tu-usuario.github.io/tu-repo/admin.html
   ```
   ✅ Debe mostrar el panel con 6 pestañas

2. **Cargas imágenes:**
   - Arrastra una imagen a la sección Hero
   - ✅ Debe mostrarse en "Vista Previa"

3. **Página se actualiza:**
   - Recarga: `https://tu-usuario.github.io/tu-repo/index.html`
   - ✅ La imagen debe aparecer en tu página

4. **localStorage funciona:**
   - F12 → Application → Local Storage
   - ✅ Debe haber una entrada: `paranafly_admin_data`

---

## 🐛 Troubleshooting

### Admin no carga

**Problema:** admin.html muestra error 404

**Solución:**
```bash
# Verificar que el archivo existe
git ls-files | grep admin.html

# Si no existe, agregar:
git add admin.html
git commit -m "Agregar admin"
git push
```

---

### Imágenes no aparecen en la página

**Problema:** Cargo imágenes en admin pero no aparecen en index.html

**Solución:**
1. Verifica que `admin-integration.js` está en el `<head>` de index.html
2. Abre DevTools (F12) → Console
3. Busca errores rojos
4. Recarga la página (Ctrl+Shift+Delete para limpiar caché)

**Debug:**
```javascript
// En la consola (F12):
localStorage.getItem('paranafly_admin_data')

// Debe mostrar tus datos guardados
```

---

### No puedo sincronizar con GitHub

**Problema:** "Error al sincronizar con GitHub"

**Solución:**
1. Verifica que el token sea válido
2. Copia un token nuevo desde: https://github.com/settings/tokens
3. Reconecta en el admin

**Verificar token:**
```bash
curl -H "Authorization: token TU_TOKEN" \
     https://api.github.com/user
```

Debe mostrar tu usuario.

---

### He limpiado el caché y perdí mis imágenes

**Prevención:**
1. Antes de limpiar caché, exporta datos
2. Panel Admin → "📥 Exportar Datos"
3. Se descargará un `.json`
4. Guarda en un lugar seguro

**Recuperación:**
1. Si sincronizaste con GitHub:
   - Abre panel admin
   - Importa desde GitHub (próximamente)

2. Si no sincronizaste:
   - Importa el `.json` que descargaste
   - O vuelve a cargar las imágenes

---

## 🚀 Funciones Avanzadas

### Exportar configuración completa

```javascript
// En la consola:
window.paranaflyAdmin.exportConfig()

// Se descargará: paranafly-config-[timestamp].json
```

### Acceder a datos desde la consola

```javascript
// Ver todas las imágenes de hero:
getSectionImages('hero')

// Agregar una imagen:
addSectionImage('servicios', 'https://ejemplo.com/imagen.jpg')

// Reemplazar una imagen:
updateSectionImage('hero', 0, 'data:image/jpeg;base64,...')
```

---

## 📊 Monitoring y Logs

Ver qué está pasando:

```javascript
// En la consola:
localStorage.getItem('paranafly_admin_data')

// Mostrará algo como:
{
  "hero": {
    "images": [...]
  },
  ...
}
```

---

## 🔄 Workflows Recomendados

### Workflow 1: Editor Casual

```
1. Abre admin.html
2. Carga algunas imágenes
3. Recarga index.html
4. Listo, ¡cambios visibles!
```

### Workflow 2: Múltiples Dispositivos

```
1. Conecta GitHub (token)
2. Carga imágenes en admin
3. Click "Sincronizar"
4. En otro dispositivo, accede admin.html
5. Los cambios aparecen automáticamente
```

### Workflow 3: Control de Versiones

```
1. Sincroniza con GitHub regularmente
2. En tu repo, ves el historio en /data/
3. Cada cambio queda registrado
4. Puedes revertir si necesitas
```

---

## 📚 Recursos

**GitHub Pages:**
- Documentación: https://pages.github.com
- Configurar dominio: https://docs.github.com/pages

**Personal Access Token:**
- Crear: https://github.com/settings/tokens
- Docs: https://docs.github.com/authentication/tokens

**Git Basics:**
```bash
git status        # Ver cambios
git add .         # Agregar todo
git commit -m ""  # Describir cambios
git push          # Subir a GitHub
git pull          # Bajar cambios
```

---

## ✅ Checklist Final

```
[ ] Admin.html funciona en GitHub Pages
[ ] admin-integration.js está en index.html
[ ] Cargué imágenes de prueba
[ ] Las imágenes aparecen en index.html
[ ] Exporté mis datos como backup
[ ] (Opcional) Conecté GitHub para sincronización
[ ] He creado un commit con los cambios
```

---

## 🎉 ¡Listo!

Tu panel admin está completamente funcional en GitHub Pages. Ahora puedes:

✅ Cambiar imágenes sin tocar código
✅ Todo sincronizado automáticamente
✅ Acceso desde cualquier navegador
✅ Datos respaldados en GitHub
✅ Historial de cambios

**Cualquier duda, abre la consola (F12) y busca mensajes de error.**

¡Éxito! 🚀
