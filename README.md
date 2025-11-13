# Product-Manager – Control de productos, ventas y analíticas

**Product Manager** es una aplicación web desarrollada con **Vite**, **React** y **TypeScript**, pensada para la gestión de comercios locales.  
Permite controlar productos, manejar carritos, registrar ventas y visualizar analíticas, con la posibilidad futura de convertirse en una **app de escritorio offline**.

---

## 🚀 Objetivo del proyecto
Crear una plataforma simple y eficiente para negocios locales que necesiten:
- Controlar inventario y precios.
- Registrar ventas y movimientos.
- Consultar estadísticas de rendimiento.
- Poder usar el sistema sin depender de una conexión constante a Internet.

---

## 🧩 Tecnologías principales
- **Vite** – Framework React con soporte para SSR y API Routes.  
- **React + TypeScript** – Interfaz moderna, segura y escalable.  
- **Tailwind CSS** – Estilos rápidos y personalizables.  
- **SQLite / IndexedDB** – Almacenamiento local (modo offline).  
- *(Futuro)* **Tauri o Electron** – Empaquetado como aplicación de escritorio.

---

## ⚙️ Funcionalidades (en desarrollo)
- [ ] Sistema de productos (crear, editar, eliminar).  
- [ ] Carrito de compras local.  
- [ ] Registro de ventas.  
- [ ] Dashboard de analíticas.  
- [ ] Soporte para modo offline.  
- [ ] Sincronización opcional con servidor remoto.  
- [ ] Versión de escritorio (Tauri / Electron).

---

## 🧱 Estructura inicial del proyecto
```bash
/localcommerce
 ├── /src
 │   ├── /app
 │   ├── /components
 │   ├── /lib
 │   ├── /types
 │   └── /styles
 ├── package.json
 ├── tsconfig.json
 └── README.md
