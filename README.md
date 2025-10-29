# Dog Viewer

Dog Viewer es una aplicación web para explorar y buscar razas de perros. Construida con React, TypeScript y Vite, esta aplicación obtiene datos de [Dog CEO API](https://dog.ceo/dog-api/) y [The Dog API](https://api.thedogapi.com/) para proporcionar una experiencia interactiva para los amantes de los perros.

## Características

- **Explorar razas de perros**: Ver una lista completa de razas de perros con su información básica
- **Funcionalidad de búsqueda**: Encuentra rápidamente razas específicas por nombre
- **Paginación**: Navega fácilmente por la gran colección de razas de perros
- **Vista detallada**: Haz clic en cualquier raza para ver su información detallada, incluyendo:
  - Imágenes aleatorias de la raza
  - Sub-razas disponibles
  - Información adicional cuando esté disponible
- **Diseño responsivo**: Optimizado para dispositivos de escritorio y móviles
- **Alto rendimiento**: Construido con React Query para una obtención y almacenamiento en caché de datos eficiente

## Tecnologías

- **React**: Biblioteca de interfaz de usuario
- **TypeScript**: Para seguridad de tipos
- **Vite**: Herramienta de construcción rápida
- **React Query**: Gestión de obtención de datos y caché
- **CSS**: Estilos personalizados
- **Jest & React Testing Library**: Para pruebas completas

## Comenzando

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/maoworshipper/dog-viewer.git
   cd dog-viewer
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador y navega a `http://localhost:5173`

## Despliegue a producción

La aplicación se encuentra desplegada en [Vercel](https://dog-viewer.vercel.app/).

## Ejecutando pruebas

```bash
# Ejecutar todas las pruebas
npm test
# o
yarn test
```

## Estructura del proyecto

```text
dog-viewer/
├── src/
│   ├── components/          # Componentes de interfaz de usuario
│   │   ├── ItemDetailModal/ # Modal para mostrar información detallada de razas
│   │   ├── ItemTableRow/    # Fila individual de raza en la tabla principal
│   │   ├── MainTable/       # Componente de tabla principal para listar razas
│   │   ├── Pagination/      # Controles de paginación
│   │   └── SearchBar/       # Funcionalidad de búsqueda
│   ├── context/             # Contexto de React para estado global
│   ├── hooks/               # Hooks personalizados de React
│   ├── services/            # Funciones de servicio de API
│   ├── types/               # Definiciones de tipos de TypeScript
│   ├── App.tsx              # Componente principal de la aplicación
│   └── main.tsx             # Punto de entrada de la aplicación
└── ...                      # Archivos de configuración
```

## Hooks personalizados

- `useAppContext`: Proporciona acceso al contexto de la aplicación
- `useDogBreedList`: Obtiene la lista de todas las razas de perros
- `useDogDetails`: Obtiene información detallada de una raza específica
- `useDogImage`: Obtiene imágenes de una raza de perro
- `usePagination`: Maneja la lógica de paginación

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.
