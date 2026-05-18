# Prudential SAF - Portal de Gestión de Inversiones

Aplicación web moderna para la gestión integral de clientes, fondos de inversión y seguimiento de cuotas. Construida con Angular 20 y Tailwind CSS.

## 📋 Descripción del Proyecto

**Prudential SAF** es una plataforma destinada a asesores financieros para:

- Consultar y gestionar clientes
- Visualizar detalles de inversiones y fondos
- Monitorear el valor de cuotas en tiempo real
- Acceso rápido desde dispositivos móviles y desktop

### Características Principales

- 📱 **Diseño Responsivo** - Totalmente adaptado a mobile y desktop
- 🔐 **Interfaz Segura** - Header autenticado con información de asesor
- 📊 **Gestión de Clientes** - Listado, detalle, fondos e inversiones
- 💰 **Seguimiento de Cuotas** - Valores actualizados
- ⚡ **Navegación Eficiente** - Sidebar intuitivo

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Angular CLI v20+

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd prudential-app

# Instalar dependencias
npm install
```

### Servidor de Desarrollo

```bash
npm start
```

Abre tu navegador en `http://localhost:4200/`. La aplicación se recarga automáticamente al modificar archivos fuente.

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── features/
│   │   ├── clientes/              # Módulo de gestión de clientes
│   │   │   └── pages/
│   │   │       ├── listado/       # Lista de clientes
│   │   │       ├── detalle/       # Detalle del cliente
│   │   │       ├── fondos/        # Fondos del cliente
│   │   │       └── inversiones/   # Inversiones del cliente
│   │   └── valor-cuota/           # Módulo de seguimiento de cuotas
│   │       └── pages/
│   │           └── detalle/       # Detalles de cuotas
│   ├── layouts/
│   │   └── main-layout/           # Layout principal con header y sidebar
│   ├── services/                  # Servicios para consumir APIs del backend
│   │   ├── clientes.service.ts    # Servicio de gestión de clientes
│   │   └── valor-cuota.service.ts # Servicio de valores de cuota
│   ├── shared/                    # Componentes reutilizables
│   │   ├── header/                # Encabezado con datos de asesor
│   │   └── sidebar/               # Navegación principal
│   ├── assets/                    # Recursos e imágenes
│   └── app.config.ts              # Configuración global (HttpClient)
├── index.html
├── main.ts
└── styles.css

```

---

## 🛠️ Comandos Disponibles

| Comando         | Descripción                                                 |
| --------------- | ----------------------------------------------------------- |
| `npm start`     | Inicia el servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Compila la aplicación para producción en `dist/`            |
| `npm test`      | Ejecuta pruebas unitarias con Karma                         |
| `npm run watch` | Compila en modo observador                                  |

---

## 🎨 Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Tailwind CSS** - Estilos y utilidades CSS
- **RxJS** - Programación reactiva
- **Font Awesome** - Iconografía
- **Karma** - Test runner

---

## � Servicios y APIs

La aplicación consume datos del backend a través de servicios Angular ubicados en `src/app/services/`.

### Servicios Implementados

- **ClientesService** (`clientes.service.ts`)
  - `getClientes()` - Lista todos los clientes
  - `getCliente(id)` - Detalle de cliente específico
  - `crearCliente(cliente)` - Crear nuevo cliente
  - `actualizarCliente(id, cliente)` - Actualizar cliente
  - `eliminarCliente(id)` - Eliminar cliente

- **ValorCuotaService** (`valor-cuota.service.ts`)
  - `getValoresCuota()` - Lista valores de cuota
  - `getValorCuota(id)` - Detalle de valor específico
  - `getValoresPorFondo(fondoId)` - Valores por fondo
  - `getUltimoValor()` - Último valor registrado

### Configuración

Los servicios usan `HttpClient` configurado en `app.config.ts`. Para conectar con tu backend:

1. Actualiza la `apiUrl` en cada servicio con tu URL real
2. Define interfaces TypeScript para los modelos de datos
3. Implementa manejo de errores y loading states en componentes

---

## �📱 Características de Diseño

### Header

- Logo y nombre de la empresa
- Información del asesor (nombre y rol)
- Avatar y opciones de usuario
- Menú responsivo para móvil

### Sidebar

- Navegación principal
- Acceso a módulos: Clientes y Valor de Cuota
- Diseño colapsable

### Paleta de Colores

- **Primario**: `#0070c0` (Azul Prudential)
- **Fondo**: Blanco/Gris claro
- **Acentos**: Tonos azules y blancos

---

## 📦 Instalación de Dependencias

Las dependencias principales incluyen:

- `@angular/common` - Utilidades comunes de Angular
- `@angular/forms` - Manejo de formularios
- `@angular/platform-browser` - Plataforma web
- `tailwindcss` - Framework de CSS

```bash
npm install
```

---

## 🧪 Pruebas

### Ejecutar Tests Unitarios

```bash
npm test
```

Esto ejecutará todas las pruebas bajo la carpeta `src/**/*.spec.ts` usando Karma.

---

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos compilados se encontrarán en el directorio `dist/prudential-app/`.

### Optimizaciones Incluidas

- Minificación de código
- Tree-shaking de dependencias no utilizadas
- Hashing de archivos para caché busting
- Pre-renderizado (cuando aplique)

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea una rama para tu feature
2. Realiza los cambios y commits descriptivos
3. Push a tu rama
4. Abre un Pull Request

---

## 📝 Configuración de Estilos

El proyecto utiliza **Tailwind CSS** para estilos. La configuración se encuentra en `tailwind.config.js`.

### Personalización de Colores

Modifica `tailwind.config.js` para cambiar la paleta de colores global.

---

## 🐛 Solución de Problemas

### Imagen no se carga

- Verifica que los archivos estén en `src/assets/`
- Usa rutas absolutas: `/assets/icons/nombre.png`

### Puerto 4200 en uso

```bash
ng serve --port 4300
```

### Dependencias desactualizadas

```bash
npm install
npm audit fix
```

---

## 📞 Soporte

Para reportar bugs o sugerencias, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es propiedad de Prudential SAF.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
