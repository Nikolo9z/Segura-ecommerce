# Segura Ecommerce

Este proyecto utiliza la API **AuthSegura**, diseñada para gestionar funcionalidades esenciales de un ecommerce. La API proporciona módulos para la administración de usuarios, CRUD de productos, creación de órdenes, entre otras características clave.

## Características

- **Gestión de usuarios**: Registro, inicio de sesión, recuperación de contraseñas y administración de perfiles.
- **CRUD de productos**: Crear, leer, actualizar y eliminar productos.
- **Creación de órdenes**: Gestión de pedidos y su estado.
- **Seguridad**: Autenticación y autorización robustas mediante la API AuthSegura que usa JWT.

## Requisitos previos

- Node.js >= 14.x
- API AuthSegura configurada y en funcionamiento
- Base de datos compatible (por ejemplo, MongoDB, PostgreSQL)

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/Nikolo9z/Segura-ecommerce
    cd segura-ecommerce
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno en un archivo `.env`:
    ```env
    AUTHSEGURA_API_KEY=tu-api-key
    DATABASE_URL=tu-url-de-base-de-datos
    ```

4. Inicia el servidor:
    ```bash
    npm start
    ```

## Uso

- **Usuarios**: Accede a los endpoints de autenticación para registrar y gestionar usuarios.
- **Productos**: Utiliza los endpoints del CRUD para administrar el catálogo de productos.
- **Órdenes**: Crea y gestiona órdenes a través de los endpoints correspondientes.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
    ```bash
    git checkout -b mi-nueva-funcionalidad
    ```
3. Realiza tus cambios y haz un commit:
    ```bash
    git commit -m "Agrega nueva funcionalidad"
    ```
4. Envía tus cambios:
    ```bash
    git push origin mi-nueva-funcionalidad
    ```
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme en [sanchez.nicolas.9917@gmail.com](mailto:sanchez.nicolas.9917@gmail.com).