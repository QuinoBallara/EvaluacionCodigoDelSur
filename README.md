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

3. **Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:
    ```env
    PORT= Puerto del servidor (opcional, por defecto 3000)
    JWT_SECRET_KEY= Tu secret key para JWT
    TMDB_API_KEY= Tu API Key de [TMDB](https://www.themoviedb.org/documentation/api)
    USERS_FILE= Ruta al archivo de usuarios (opcional, por defecto `./data/users.txt`)
    FAVORITES_FILE= Ruta al archivo de favoritos (opcional, por defecto `./data/favorites.txt`)
    ```

## Ejecutar la API
Para iniciar el servidor, ejecuta:
```bash
npm start
```

De forma predeterminada, la API estará disponible en `http://localhost:3000`.