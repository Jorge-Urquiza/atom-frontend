# Atom Frontend

Una aplicación de tareas minimalista desarrollada en **Angular 17**, con autenticación por correo, gestión de tareas y deploys en GitHub Pages.

---

## Características principales

- **Login por correo**: Registro y autenticación con confirmación dinámica.  
- **Listado de tareas**: Muestra solo las tareas pendientes, ordenadas de más recientes a más antiguas.  
- **CRUD de tareas**: crear, editar, eliminar y marcar como completadas con confirmaciones antes de cada acción.  
- **Responsive**: Diseño responsive con PrimeNG y PrimeFlex.
- **CI/CD**: pipeline con GitHub Actions que construye en modo producción y despliega automáticamente en GitHub Pages.

---

## Tecnologías

- **Angular 17**  
- **TypeScript**  
- **PrimeNG & PrimeFlex** (componentes UI y utilidades CSS)  
- **Firebase Firestore** (backend serverless)  
- **GitHub Actions** + [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

---

## Instalación y run

   ```bash
   git clone https://github.com/Jorge-Urquiza/atom-frontend.git
   cd atom-frontend
   npm install
   ng serve
   ```
## Aplicación desplegada:
**LINK** : [https://jorge-urquiza.github.io/atom-frontend
](https://jorge-urquiza.github.io/atom-frontend
)


