# 🏆 FindMatch – Frontend

Este proyecto es la interfaz de usuario para la plataforma **FindMatch**, desarrollada con **Angular 16**. Permite a los usuarios registrarse, iniciar sesión, crear y unirse a partidos, gestionar equipos, consultar centros deportivos, y más.

---

## 🛠️ Tecnologías Utilizadas

- [Angular CLI 16.2.16](https://github.com/angular/angular-cli)
- TypeScript
- SCSS (Sass)
- Bootstrap (modales y estilos)
- HttpClient (para consumo de APIs REST PHP)
- LocalStorage & Cookies (para persistencia de sesión)
- Angular Routing

---

## ▶️ Cómo iniciar el servidor de desarrollo

```bash
npm install
ng serve

Una vez compilado, navega a http://localhost:4200/.
La aplicación se recarga automáticamente si se editan los archivos fuente.

## Estructura del pryecto

FindMatch-frontend/
│
src/app/
│
├── login/                      # Componentes y lógica del inicio de sesión
│
├── models/                    # Interfaces de datos (ej. user-response.model.ts)
│
├── partials/
│   ├── footer/                 # Footer general de la app
│   └── header/                 # Header con navegación
│
├── Players/                   # Funcionalidades relacionadas con jugadores
│
├── Matches/                   # Gestión de partidos (crear, ver, unirse, historial)
│
├── Profile/                   # Visualización y edición del perfil de usuario
│
├── Store/                     # Gestión de tienda o compras dentro de la app
│
├── Teams/                     # Gestión de equipos (crear, ver, unirse, etc.)
│
├── privacy-policy/            # Página de política de privacidad
│
├── register/                  # Página base para selección de tipo de registro
│   ├── register-user/         # Registro de usuarios normales
│   ├── register-referee/      # Registro de árbitros
│   ├── register-sport-center/ # Registro de centros deportivos
│   └── select-register/       # Selector de tipo de registro
│
├── services/                  # Servicios Angular (HTTP) para consumo de la API
│
├── styles/                    # Estilos globales en SCSS
│
├── terms-of-service/          # Página de términos de uso
│
├── app-routing.module.ts      # Configuración de rutas de la app
└── app.component.html         # Componente raíz

🧩 Funcionalidades
🔐 Autenticación
Registro y login de usuarios

Gestión de sesión con LocalStorage y cookies

Diferenciación por tipo de usuario (admin, jugador, invitado)

⚽ Gestión de Partidos
Crear nuevo partido (seleccionando centro, equipo, fecha)

Ver próximos partidos, historial y unirse a partidos

👥 Equipos
Crear equipo, editar información

Ver equipos propios y solicitudes de unión

Solicitar unirse a otros equipos

📍 Centros deportivos
Visualizar centros disponibles

Consultar pistas de cada centro

📨 Notificaciones y solicitudes
Enviar y responder solicitudes para unirse a equipos

Ver estado de las solicitudes pendientes o aceptadas
