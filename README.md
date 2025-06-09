# Evaluación Codigo del Sur
Joaquín Ballara

## Requisitos
- Node.js (versión 18 o superior)
- npm

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/QuinoBallara/EvaluacionCodigoDelSur.git
   cd EvaluacionCodigoDelSur
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:
    ```env
    PORT= Puerto del servidor (opcional, por defecto 3000)
    JWT_SECRET_KEY= Tu secret key para JWT
    TMDB_API_KEY= Tu API Key de TMDB
    USERS_FILE= Ruta al archivo de usuarios (opcional, por defecto `./data/users.txt`)
    FAVORITES_FILE= Ruta al archivo de favoritos (opcional, por defecto `./data/favorites.txt`)
    BLACKLIST_FILE= Ruta al archivo de blacklist de jti's (opcional, por defecto `./data/blacklist.txt`)
    MOVIES_FILE= Ruta al archivo de películas (opcional, por defecto `./data/movies.txt`)
    ```

> [!TIP]
> Solo es necesario definir `JWT_SECRET_KEY` y `TMDB_API_KEY`.

## Ejecutar la API
Para iniciar el servidor, ejecuta:
```bash
npm start
```

De forma predeterminada, la API estará disponible en `http://localhost:3000`.

## Postman

Puedes importar la colección de Postman desde el archivo `endpoints.postman_collection` incluido en el proyecto.
Esta colección contiene ejemplos de todas las rutas disponibles en la API. La colección no incluye un token de autenticación, por lo que deberás generar uno utilizando la ruta de login.