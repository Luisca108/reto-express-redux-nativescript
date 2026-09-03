# Reto Express, Settings y Redux

Este proyecto contiene una API Express con SQLite y una app NativeScript Angular. La app consulta el backend por HTTP, guarda configuraciones locales con `ApplicationSettings`, lista favoritos y usa Redux/NgRx para la accion "Leer ahora".

## Ejecutar la API

```bash
npm install
npm run api
```

Endpoints:

```text
GET http://localhost:3000/api/books
GET http://localhost:3000/api/books?q=angular
GET http://localhost:3000/api/books?category=Backend
```

La base `api/database.sqlite` se crea automaticamente al levantar el servidor y se llena desde `api/books.seed.json`.

## Configurar Ngrok

1. Levanta la API con `npm run api`.
2. Expone el puerto 3000 con Ngrok.
3. Copia la URL publica en:

```ts
// src/app/config/app.config.ts
export const appConfig = {
  apiBaseUrl: "https://tu-url.ngrok-free.app"
};
```

Para emulador Android local se dejo por defecto `http://10.0.2.2:3000`.

## Ejecutar la app

```bash
npm run android
```

## Mapa de requisitos

1. Express GET con filtrado por querystring: `api/server.js`, endpoint `/api/books`.
2. Listado con caja de texto y boton de busqueda: `src/app/screens/search/search.component.html`.
3. Variable configurable para URL de Ngrok: `src/app/config/app.config.ts`.
4. Service Angular responsable del HTTP: `src/app/services/book-api.service.ts`.
5. Settings persistente con AppSettings: `src/app/services/settings.service.ts`.
6. Pantalla para editar nombre de usuario: `src/app/screens/settings`.
7. Boton para guardar favorito en busqueda: `src/app/screens/search/search.component.html`.
8. Favoritos listados: `src/app/screens/favorites`.
9. Boton "Leer ahora" despacha action Redux/NgRx: `src/app/screens/favorites/favorites.component.ts`.
10. Pantalla principal actualizada reactivamente con `store.select`: `src/app/screens/home/home.component.ts`.

