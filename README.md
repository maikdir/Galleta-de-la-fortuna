Galleta de la Fortuna

Proyecto web desarrollado con Laravel (backend) y AngularJS (frontend).

La aplicación permite obtener frases de la fortuna, gestionar contenido mediante un panel de administrador y manejar sugerencias de usuarios.

Funcionalidades:

Usuario
- Iniciar sesión
- Abrir una galleta de la fortuna
- Obtener una frase aleatoria
- Enviar sugerencias de nuevas frases
  
Administrador
- Agregar frases
- Editar frases
- Eliminar frases
- Ver frases existentes
- Aprobar sugerencias
- Rechazar sugerencias
- Ver sugerencias aprobadas y rechazadas
  
Tecnologías
- Laravel
- PHP
- MySQL
- AngularJS
- Node.js
- Bootstrap
- HTML / CSS / JavaScript
- 
Estructura del proyecto

Galleta-de-la-fortuna/
├── backEnd/
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── composer.json
│   └── .env.example
│
├── frontEnd/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── img/
│   └── package.json
│
└── README.md

Archivos ignorados (gitignore)

Estos archivos NO están en el repositorio:

backEnd/vendor/
frontEnd/node_modules/
backEnd/.env
backEnd/storage/logs/

Por eso es necesario instalar dependencias al clonar el proyecto.

Instalación BACKEND

Ir a la carpeta: cd backEnd

Instalar dependencias: composer install

Crear archivo .env: copy .env.example .env

Generar key:php artisan key:generate

Configurar base de datos en .env:
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3307
DB_DATABASE=galleta
DB_USERNAME=root
DB_PASSWORD=
Base de datos

Crear base de datos en MySQL: 'galleta'

Luego ejecutar: php artisan migrate:fresh --seed

Seeders incluidos

El proyecto incluye seeders para cargar datos automáticamente: 

- Usuario administrador
  Email: admin@gmail.com
  Password: admin123
  Rol: admin

- Usuario común
  Email: user@gmail.com
  Password: user123
  Rol: user
  
Frases iniciales

Se cargan automáticamente mediante FortuneSeeder.

Ejecutar backend

Desde la carpeta backEnd: php artisan serve --port=8001

Disponible en: http://localhost:8001

Instalación y ejecución del frontend

1. Ir a la carpeta: cd frontEnd

2. Instalar dependencias: npm install

3. Ejecutar servidor: npx http-server -p 3000 -c-1

4. Abrir en: http://localhost:3000
   
Roles

Admin
Puede crear, editar, eliminar y administrar frases y sugerencias.

User
Puede abrir la galleta y enviar sugerencias, pero no puede agregar frases directamente.

Flujo principal

1. El usuario inicia sesión
2. Abre una galleta y recibe una frase
3. Puede enviar sugerencias
4. El admin aprueba o rechaza
5. Si aprueba → se convierte en frase disponible
   
Validaciones implementadas
- Login con email y contraseña
- Contraseñas con hash (bcrypt)
- Roles de usuario
- Frases no vacías
- Evita duplicados
- Manejo de errores
- Estados de sugerencias: pending, approved, rejected
  
Observaciones
Para ejecutar el proyecto correctamente:

composer install
npm install
Configurar .env
Crear base de datos
php artisan migrate:fresh --seed
Levantar backend y frontend

Autora
Mailen Ruiz Díaz
