# Rilews - Frontend

## Descripción del Proyecto

**Rilews** es un sistema de alerta temprana para remociones en masa gatilladas por lluvia. La aplicación frontend permite visualizar las alertas de remoción en masa en tiempo real y estimaciones a 48 y 72 horas.

### Características

- **Visualización de Alertas de remociones en masa**: Visualización en tiempo real, estimación de 48 horas y estimación de 72 horas.
- **Gestión de Usuarios**: Próximamente.
- **Gestión de Alertas**: Próximamente.
- **Monitoreo de estaciones meteorológicas**: Próximamente.
- **Dependencias**: 
  - React para el frontend.
  - Material-UI para los componentes de la interfaz de usuario.
  - Docker para la contenedorización. (Próximamente)

## Uso del Proyecto

Para utilizar este proyecto, se debe clonar el repositorio y ejecutar los comandos necesarios para instalar las dependencias y correr la aplicación.

### Requisitos Previos

- Node.js y npm instalados en el sistema.
- Docker y Docker Compose instalados. (Próximamente)

### Instrucciones

1. Clona el repositorio:
   ```bash
   git clone https://github.com/bmunoz15/Rilews-frontend.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd Rilews-frontend
   ```

3. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

4. Inicializa git flow (opcional):
   ```bash
   git flow init
   ```

5. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

6. Accede a la aplicación desde tu navegador:
   ```
   http://localhost:3000
   ```
## Instrucciones para Nuevos Desarrolladores

Para contribuir al proyecto, seguimos la metodología **Git Flow**. A continuación, se detallan los pasos básicos para crear y cerrar *features*.

1. **Asegúrate de estar en la rama `develop`:**
   - Ejecuta el siguiente comando para cambiar a la rama `develop`:
     ```bash
     git switch develop
     ```

2. **Crear una nueva *feature*:**
   - Para comenzar a trabajar en una nueva funcionalidad, crea una rama de *feature*:
     ```bash
     git flow feature start nombre-de-la-feature
     ```
   - Esto creará una rama específica donde puedes desarrollar la nueva funcionalidad.

3. **Finalizar una *feature*:**
   - Cuando hayas terminado el desarrollo, finaliza la *feature* con el siguiente comando:
     ```bash
     git flow feature finish nombre-de-la-feature
     ```
   - Esto fusionará la rama de la *feature* en la rama `develop` y eliminará la rama local de la *feature*.

## Estructura del Proyecto

```bash
src/
│
├── assets/
├── components/
│   ├── features/
│   │   ├── component/
│   │   └── context/
│   │   └── http-client/
│   │   └── model/
│   │   └── service/
│   │   └── types/
│   │   └── view/
│   ├── router/
│   ├── shared/
```

### Descripción de Estructura

- **assets/**: Contiene los recursos multimedia, como imágenes y logos.
  
- **components/**: Agrupa los componentes de la aplicación según sus funcionalidades:
  - **component/**: Componentes individuales y reutilizables.
  - **context/**: Contextos para gestionar el estado global.
  - **http-client/**: Configuración para llamas a la API.
  - **model/**: Modelos de datos.
  - **service/**: Servicios específicos.
  - **types/**: Tipos de datos utilizados.
  - **views/**: Páginas principales y vistas para la interfaz de usuario.

- **router/**: Configuración de enrutamiento de la aplicación.

- **shared/**: Componentes reutilizables y comúnes entre las diferentes partes de la aplicación (por ejemplo, mapas, barra lateral, menú de usuario, etc.).

## Enlaces a Recursos

- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Material-UI](https://mui.com/)
- [Docker](https://www.docker.com/)

## Lista de Autores

- **Bayron Muñoz** - Desarrollador Frontend y Arquitectura
- **nombre - apellido** - Cargo
- **nombre - apellido** - Cargo

## Licencias

Próximamente.

## Contacto

Para cualquier consulta o reporte de errores, puedes contactarnos en:

- **Email**: b.munoz15@ufromail.cl
- **Email**: user@correo.cl
- **Sitio web**: próximamente.

















































































