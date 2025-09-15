# Backend Dashboard Ingresos

Backend de la aplicación **Dashboard de Ingresos y Gastos**, encargado de gestionar transacciones, reportes y exportación a CSV.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Node.js** | Entorno de ejecución del backend, rápido y eficiente. |
| **Express.js** | Framework web para crear rutas y middlewares HTTP. |
| **TypeScript** | Tipado estático y seguridad en tiempo de compilación. |
| **Prisma** | ORM para interactuar con la base de datos de manera tipada y segura. |
| **Zod** | Validación de datos de entrada mediante DTOs (Data Transfer Objects). |
| **JWT** | Autenticación y autorización segura de usuarios. |
| **Streams y json2csv** | Exportación de grandes volúmenes de datos a CSV de forma eficiente. |

---

## Arquitectura y Patrones de Diseño

1. **Separación por capas**
   - **Controller:** Maneja solicitudes HTTP, valida datos y retorna respuestas.
   - **Service:** Contiene la lógica de negocio (crear, listar, actualizar, eliminar transacciones).
   - **Repository:** Abstracción de la base de datos mediante Prisma.

2. **Patrones implementados**
   - **Repository Pattern:** Desacopla el acceso a datos del resto de la aplicación.
   - **Service Layer:** Centraliza la lógica de negocio y evita repetición.
   - **Middleware Pattern:** Para autenticación y validación de requests.
   - **DTO (Data Transfer Object):** Valida y transforma los datos de entrada con Zod.

3. **Principios de desarrollo**
   - **POO:** Clases `TransactionService` y `TransactionPrismaRepository` encapsulan comportamiento y estado.
   - **DRY:** Código reutilizable en servicios, repositorios y middlewares.
   - **SOLID:**
     - **S:** Cada clase tiene una única responsabilidad.
     - **O:** Clases extendibles sin modificar su implementación original.
     - **L:** Repositorios intercambiables mediante abstracciones.
     - **I:** Interfaces específicas y separadas para cada servicio/repositorio.
     - **D:** Controllers dependen de abstracciones (servicios), no de implementaciones concretas.

---

---

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/transactions` | Crear una nueva transacción |
| GET | `/transactions` | Listar transacciones con filtros y paginación |
| GET | `/transactions/:id` | Obtener una transacción específica |
| PUT | `/transactions/:id` | Actualizar transacción |
| DELETE | `/transactions/:id` | Eliminar transacción |
| GET | `/transactions/export` | Exportar transacciones a CSV |
| GET | `/transactions/summary` | Resumen de ingresos y gastos |

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/sebasam/backend-dashboard-ingresos
cd backend-dashboard-ingresos

npm install

```

2. Configurar el .env:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="tu_clave_secreta"
PORT=4000

3. # Backend Dashboard Ingresos

Backend de la aplicación **Dashboard de Ingresos y Gastos**, encargado de gestionar transacciones, reportes y exportación a CSV.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Node.js** | Entorno de ejecución del backend, rápido y eficiente. |
| **Express.js** | Framework web para crear rutas y middlewares HTTP. |
| **TypeScript** | Tipado estático y seguridad en tiempo de compilación. |
| **Prisma** | ORM para interactuar con la base de datos de manera tipada y segura. |
| **Zod** | Validación de datos de entrada mediante DTOs (Data Transfer Objects). |
| **JWT** | Autenticación y autorización segura de usuarios. |
| **Streams y json2csv** | Exportación de grandes volúmenes de datos a CSV de forma eficiente. |

---

## Arquitectura y Patrones de Diseño

1. **Separación por capas**
   - **Controller:** Maneja solicitudes HTTP, valida datos y retorna respuestas.
   - **Service:** Contiene la lógica de negocio (crear, listar, actualizar, eliminar transacciones).
   - **Repository:** Abstracción de la base de datos mediante Prisma.

2. **Patrones implementados**
   - **Repository Pattern:** Desacopla el acceso a datos del resto de la aplicación.
   - **Service Layer:** Centraliza la lógica de negocio y evita repetición.
   - **Middleware Pattern:** Para autenticación y validación de requests.
   - **DTO (Data Transfer Object):** Valida y transforma los datos de entrada con Zod.

3. **Principios de desarrollo**
   - **POO:** Clases `TransactionService` y `TransactionPrismaRepository` encapsulan comportamiento y estado.
   - **DRY:** Código reutilizable en servicios, repositorios y middlewares.
   - **SOLID:**
     - **S:** Cada clase tiene una única responsabilidad.
     - **O:** Clases extendibles sin modificar su implementación original.
     - **L:** Repositorios intercambiables mediante abstracciones.
     - **I:** Interfaces específicas y separadas para cada servicio/repositorio.
     - **D:** Controllers dependen de abstracciones (servicios), no de implementaciones concretas.

---

---

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/transactions` | Crear una nueva transacción |
| GET | `/transactions` | Listar transacciones con filtros y paginación |
| GET | `/transactions/:id` | Obtener una transacción específica |
| PUT | `/transactions/:id` | Actualizar transacción |
| DELETE | `/transactions/:id` | Eliminar transacción |
| GET | `/transactions/export` | Exportar transacciones a CSV |
| GET | `/transactions/summary` | Resumen de ingresos y gastos |

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/sebasam/backend-dashboard-ingresos
cd backend-dashboard-ingresos

npm install

```

2. Configurar el .env:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="tu_clave_secreta"
PORT=4000

3. Configurar el .env:
```bash
npx prisma migrate dev --name init

```

3. Levantar servidor:
```bash
npm run dev

```

