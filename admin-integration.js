/**
 * ParanaFly Admin Integration
 * Conecta el panel admin con la página principal
 * 
 * Uso: Agregar en el <head> de index.html:
 * <script src="admin-integration.js"></script>
 */

class ParanaflyAdmin {
    constructor() {
        this.storageKey = 'paranafly_admin_data';
        this.loadAdminImages();
    }

    // Cargar imágenes desde admin
    loadAdminImages() {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) return;

        const data = JSON.parse(saved);
        
        // Actualizar cada sección
        Object.keys(data).forEach(section => {
            const images = data[section].images;
            if (images.length > 0) {
                this.applyImagesToSection(section, images);
            }
        });
    }

    // Aplicar imágenes a cada sección
    applyImagesToSection(section, images) {
        switch(section) {
            case 'hero':
                this.updateHero(images);
                break;
            case 'nosotros':
                this.updateNosotros(images);
                break;
            case 'servicios':
                this.updateServicios(images);
                break;
            case 'programas':
                this.updateProgramas(images);
                break;
            case 'imagenes':
                this.updateGallery(images);
                break;
            case 'contacto':
                this.updateContacto(images);
                break;
        }
    }

    // ====== ACTUALIZACIONES POR SECCIÓN ======

    updateHero(images) {
        const heroImg = document.querySelector('.hero-bg img');
        if (heroImg && images[0]) {
            heroImg.src = images[0];
        }

        const heroLogo = document.querySelector('.hero-logo');
        if (heroLogo && images[1]) {
            heroLogo.src = images[1];
        }
    }

    updateNosotros(images) {
        const nosotrosImg = document.querySelector('.nosotros-visual img');
        if (nosotrosImg && images[0]) {
            nosotrosImg.src = images[0];
        }
    }

    updateServicios(images) {
        const servicioItems = document.querySelectorAll('.servicio-item img');
        servicioItems.forEach((item, idx) => {
            if (images[idx]) {
                item.src = images[idx];
            }
        });

        // Si no hay imágenes específicas, usar emojis como fallback
        if (images.length === 0) {
            document.querySelectorAll('.servicio-icon').forEach((icon, idx) => {
                const emojis = ['🎣', '🗺️', '👥', '📚', '🏆', '💼'];
                icon.textContent = emojis[idx] || '⭐';
            });
        }
    }

    updateProgramas(images) {
        // Actualizar imágenes en cada programa
        const programBodies = document.querySelectorAll('.programa-body');
        programBodies.forEach((body, idx) => {
            if (images[idx]) {
                let img = body.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    img.style.cssText = 'width:100%;border-radius:8px;margin-bottom:20px;max-height:300px;object-fit:cover;';
                    body.insertBefore(img, body.firstChild);
                }
                img.src = images[idx];
            }
        });
    }

    updateGallery(images) {
        const lightboxData = window.lightboxData;
        if (!lightboxData) return;

        // Actualizar galería
        images.forEach((img, idx) => {
            if (idx < lightboxData.length) {
                lightboxData[idx].src = img;
            } else {
                lightboxData.push({
                    src: img,
                    label: `Imagen ${idx + 1}`
                });
            }
        });

        // Actualizar grid visual
        const gallery = document.querySelector('[data-gallery]');
        if (gallery) {
            let html = '';
            images.forEach((img, idx) => {
                html += `
                    <div style="cursor:pointer;border-radius:8px;overflow:hidden;" onclick="abrirLightbox(${idx})">
                        <img src="${img}" alt="Galería ${idx}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                `;
            });
            gallery.innerHTML = html;
        }
    }

    updateContacto(images) {
        const contactImg = document.querySelector('.contact-hero img');
        if (contactImg && images[0]) {
            contactImg.src = images[0];
        }
    }

    // Agregar imagen dinámicamente a una sección
    addImageToSection(section, imageData) {
        const saved = localStorage.getItem(this.storageKey);
        let data = saved ? JSON.parse(saved) : {};

        if (!data[section]) {
            data[section] = { title: section, images: [] };
        }

        data[section].images.push(imageData);
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        // Aplicar cambio inmediatamente
        this.applyImagesToSection(section, data[section].images);
    }

    // Reemplazar imagen de una sección
    replaceImage(section, index, imageData) {
        const saved = localStorage.getItem(this.storageKey);
        let data = saved ? JSON.parse(saved) : {};

        if (data[section] && data[section].images[index]) {
            data[section].images[index] = imageData;
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            this.applyImagesToSection(section, data[section].images);
        }
    }

    // Obtener todas las imágenes de una sección
    getSectionImages(section) {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) return [];

        const data = JSON.parse(saved);
        return data[section]?.images || [];
    }

    // Exportar configuración
    exportConfig() {
        const saved = localStorage.getItem(this.storageKey);
        const config = {
            version: '1.0',
            sections: JSON.parse(saved || '{}'),
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `paranafly-config-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.paranaflyAdmin = new ParanaflyAdmin();
    });
} else {
    window.paranaflyAdmin = new ParanaflyAdmin();
}

// API pública para usar desde consola
window.updateSectionImage = (section, index, imageData) => {
    window.paranaflyAdmin.replaceImage(section, index, imageData);
};

window.addSectionImage = (section, imageData) => {
    window.paranaflyAdmin.addImageToSection(section, imageData);
};

window.getSectionImages = (section) => {
    return window.paranaflyAdmin.getSectionImages(section);
};
