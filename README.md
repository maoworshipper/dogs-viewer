# PK Viewer

PK Viewer es una aplicación web para explorar y buscar personajes de Pokémon. Está construida con React, TypeScript y Vite, esta aplicación obtiene datos de [PokéAPI](https://pokeapi.co/) para proporcionar una experiencia interactiva para los fanáticos de Pokémon.

## Características

- **Explorar Pokémones**: Ver una lista completa de Pokémones con su información básica
- **Funcionalidad de búsqueda**: Encuentra rápidamente Pokémones específicos por nombre
- **Paginación**: Navega fácilmente por la gran colección de Pokémones
- **Vista detallada**: Haz clic en cualquier Pokémon para ver su información detallada, incluyendo:
  - Tipo
  - Peso
  - Habilidades con descripciones detalladas
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
   git clone https://github.com/maoworshipper/pk-viewer.git
   cd pk-viewer
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

La aplicación se encuentra desplegada en [Vercel](https://pk-viewer.vercel.app/).

## Ejecutando pruebas

```bash
# Ejecutar todas las pruebas
npm test
# o
yarn test
```

## Estructura del proyecto

```
pk-viewer/
├── src/
│   ├── components/          # Componentes de interfaz de usuario
│   │   ├── AbilityDetail/   # Muestra información de habilidades de Pokémon
│   │   ├── ItemDetailModal/ # Modal para mostrar información detallada de Pokémon
│   │   ├── ItemTableRow/    # Fila individual de Pokémon en la tabla principal
│   │   ├── MainTable/       # Componente de tabla principal para listar Pokémones
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
- `usePokemonList`: Obtiene la lista de todos los Pokémones
- `usePokemonDetails`: Obtiene información detallada de un Pokémon específico
- `useAbilityDetails`: Obtiene información detallada sobre una habilidad de Pokémon
- `usePokemonSprite`: Obtiene el sprite (imagen) de un Pokémon
- `usePagination`: Maneja la lógica de paginación

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.
