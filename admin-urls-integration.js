/**
 * ParanaFly Admin Integration - URLs Version
 * Conecta el panel admin de URLs con la página principal
 * 
 * Este script carga las URLs de imágenes desde localStorage 
 * y las reemplaza directamente en el HTML
 */

class ParanaflyAdminURLs {
    constructor() {
        this.storageKey = 'paranafly_urls';
        this.loadImageUrls();
    }

    // Cargar URLs desde admin
    loadImageUrls() {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) return;

        const data = JSON.parse(saved);
        
        // Actualizar cada sección
        Object.keys(data).forEach(section => {
            const urls = data[section].urls;
            if (urls.length > 0) {
                this.applyUrlsToSection(section, urls);
            }
        });
    }

    // Aplicar URLs a cada sección
    applyUrlsToSection(section, urls) {
        switch(section) {
            case 'hero':
                this.updateHero(urls);
                break;
            case 'nosotros':
                this.updateNosotros(urls);
                break;
            case 'servicios':
                this.updateServicios(urls);
                break;
            case 'programas':
                this.updateProgramas(urls);
                break;
            case 'imagenes':
                this.updateGallery(urls);
                break;
            case 'contacto':
                this.updateContacto(urls);
                break;
        }
    }

    // ====== ACTUALIZACIONES POR SECCIÓN ======

    updateHero(urls) {
        // Imagen de fondo
        const heroImg = document.querySelector('.hero-bg img');
        if (heroImg && urls[0]) {
            heroImg.src = urls[0].url;
        }

        // Logo
        const heroLogo = document.querySelector('.hero-logo');
        if (heroLogo && urls[1]) {
            heroLogo.src = urls[1].url;
        }
    }

    updateNosotros(urls) {
        const nosotrosImg = document.querySelector('.nosotros-visual img');
        if (nosotrosImg && urls[0]) {
            nosotrosImg.src = urls[0].url;
        }
    }

    updateServicios(urls) {
        const servicioItems = document.querySelectorAll('.servicio-item img');
        servicioItems.forEach((item, idx) => {
            if (urls[idx]) {
                item.src = urls[idx].url;
            }
        });
    }

    updateProgramas(urls) {
        // Actualizar imágenes en cada programa
        const programBodies = document.querySelectorAll('.programa-body');
        programBodies.forEach((body, idx) => {
            if (urls[idx]) {
                let img = body.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    img.style.cssText = 'width:100%;border-radius:8px;margin-bottom:20px;max-height:300px;object-fit:cover;';
                    body.insertBefore(img, body.firstChild);
                }
                img.src = urls[idx].url;
            }
        });
    }

    updateGallery(urls) {
        const lightboxData = window.lightboxData;
        if (!lightboxData) return;

        // Actualizar galería
        urls.forEach((item, idx) => {
            if (idx < lightboxData.length) {
                lightboxData[idx].src = item.url;
            } else {
                lightboxData.push({
                    src: item.url,
                    label: item.label || `Imagen ${idx + 1}`
                });
            }
        });

        // Actualizar grid visual si existe
        const gallery = document.querySelector('[data-gallery]');
        if (gallery) {
            let html = '';
            urls.forEach((item, idx) => {
                html += `
                    <div style="cursor:pointer;border-radius:8px;overflow:hidden;" onclick="abrirLightbox(${idx})">
                        <img src="${item.url}" alt="${item.label}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                `;
            });
            gallery.innerHTML = html;
        }
    }

    updateContacto(urls) {
        const contactImg = document.querySelector('.contact-hero img');
        if (contactImg && urls[0]) {
            contactImg.src = urls[0].url;
        }
    }

    // ====== API PÚBLICA ======

    // Obtener todas las URLs de una sección
    getSectionUrls(section) {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) return [];

        const data = JSON.parse(saved);
        return data[section]?.urls || [];
    }

    // Agregar URL a una sección
    addUrlToSection(section, label, url) {
        const saved = localStorage.getItem(this.storageKey);
        let data = saved ? JSON.parse(saved) : {};

        if (!data[section]) {
            data[section] = { title: section, urls: [] };
        }

        data[section].urls.push({ label, url });
        localStorage.setItem(this.storageKey, JSON.stringify(data));

        // Aplicar cambio inmediatamente
        this.applyUrlsToSection(section, data[section].urls);
    }

    // Reemplazar URL en una sección
    updateUrl(section, index, url) {
        const saved = localStorage.getItem(this.storageKey);
        let data = saved ? JSON.parse(saved) : {};

        if (data[section] && data[section].urls[index]) {
            data[section].urls[index].url = url;
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            this.applyUrlsToSection(section, data[section].urls);
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.paranaflyAdminURLs = new ParanaflyAdminURLs();
    });
} else {
    window.paranaflyAdminURLs = new ParanaflyAdminURLs();
}

// API pública para usar desde consola
window.getSectionUrls = (section) => {
    return window.paranaflyAdminURLs.getSectionUrls(section);
};

window.addUrlToSection = (section, label, url) => {
    return window.paranaflyAdminURLs.addUrlToSection(section, label, url);
};

window.updateUrl = (section, index, url) => {
    return window.paranaflyAdminURLs.updateUrl(section, index, url);
};
