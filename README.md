# Croper - Plataforma Agropecuaria

## 📝 Descripción
**Croper** es una plataforma para la gestión de productos agropecuarios. Permite a los usuarios listar, crear, editar y eliminar productos mediante una interfaz web moderna. El sistema está compuesto por:

- **Backend** desarrollado con Spring Boot y MySQL.
- **Frontend** desarrollado en Angular con NgRx para el manejo de estado.
- **Autenticación** implementada con JWT.

---

## 📁 Estructura del Proyecto

```
Croper/
├── backend/                    # Backend con Spring Boot y MySQL
│   ├── src/main/java/...      # Código fuente Java
│   ├── src/main/resources/    # Configuración (application.properties)
│   ├── src/main/java/com/croper/security/          # Seguridad con JWT y Spring Security
│   ├── src/main/java/com/croper/controllers/AuthController.java
│   ├── src/main/java/com/croper/models/User.java
│   ├── src/main/java/com/croper/repositories/UserRepository.java
│   ├── src/main/java/com/croper/services/AuthService.java
│   └── pom.xml                # Dependencias Maven
│
├── frontend/                  # Frontend con Angular y NgRx
│   ├── src/app/auth/                          # Módulo de autenticación
│   ├── src/app/services/auth.service.ts       # Servicio de autenticación
│   ├── src/app/components/login.component.ts  # Componente de login
│   ├── src/app/components/register.component.ts # Componente de registro
│   ├── src/app/store/auth.effects.ts          # Efectos de autenticación con NgRx
│   ├── src/app/store/auth.reducer.ts          # Reducer de autenticación
│   ├── angular.json
│   ├── package.json
│   └── ...
├── README.md
```

---

## 🎯 Objetivos del Proyecto

### 🔧 Backend
- Crear un API REST con Spring Boot para gestionar productos (`id`, `nombre`, `descripcion`, `precio`, `categoria`).
- Implementar operaciones **CRUD**.
- Usar **MySQL** como base de datos.
- Validaciones: `precio > 0`, `nombre` obligatorio, etc.
- Documentar con **Swagger**.
- Proteger endpoints con **JWT**.
- Endpoints de autenticación:
  - `POST /auth/register` – Registro de usuario.
  - `POST /auth/login` – Generación de token JWT.

### 🎨 Frontend
- Interfaz en **Angular** que consuma la API.
- CRUD de productos con **paginación**.
- Manejo de errores amigables.
- Uso de **NgRx** para estado global.
- Diseño **responsive**.
- Autenticación con **JWT**.

---

## 🚀 Instalación y Ejecución

### Backend
1. Configura **MySQL** y crea una base de datos llamada `croper_db`.
2. Ajusta el archivo `application.properties` con tus credenciales de MySQL.
3. Compila y ejecuta el backend:

```bash
cd backend
./mvnw spring-boot:run
```

> El backend estará disponible en: `http://localhost:8080`  

---

### Frontend
1. Instala dependencias:

```bash
cd frontend
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
ng serve
```

> Abre `http://localhost:4200` en el navegador.

---

## 📬 Uso y Pruebas con Postman

### Endpoints de Autenticación

| Método | Endpoint         | Descripción              |
|--------|------------------|--------------------------|
| POST   | /auth/register   | Crear nuevo usuario      |
| POST   | /auth/login      | Obtener token JWT        |

### Endpoints de Productos

| Método | Endpoint               | Descripción             |
|--------|------------------------|-------------------------|
| GET    | /api/productos         | Listar todos los productos |
| GET    | /api/productos/{id}    | Obtener producto por ID |
| POST   | /api/productos         | Crear un nuevo producto |
| PUT    | /api/productos/{id}    | Actualizar producto     |
| DELETE | /api/productos/{id}    | Eliminar producto       |

### Ejemplo de Petición – Crear Usuario

```json
{
  "username": "jaime_dev",
  "password": "securepassword123"
}
```

### Ejemplo de Petición – Login

```json
{
  "username": "jaime_dev",
  "password": "securepassword123"
}
```

> Autenticación: agrega el token en el encabezado:

```
Authorization: Bearer <tu_token_jwt>
```

---

## 🧪 Testing del Frontend

- El estado global se maneja con **NgRx**.
- Tabla de productos con **paginación**.
- Funcionalidad **CRUD completa**.
- Manejo de errores con mensajes visibles.
- Flujo de login/registro con JWT implementado.
- Diseño probado en dispositivos móviles y de escritorio.

---

## 🛠️ Tecnologías Utilizadas

| Área      | Tecnologías                          |
|-----------|--------------------------------------|
| Backend   | Spring Boot, MySQL, JWT, Swagger     |
| Frontend  | Angular, NgRx, HTML, CSS, TypeScript |

---

## 📫 Contacto

- **GitHub**: JaimeBarreraS
- **Email**:  Jaenba10@gamil.com

---

