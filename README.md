Proyecto de Frontend - GWL
Descripción
Este proyecto es una aplicación de películas que consulta la API de TMDB para mostrar información sobre películas, permitiendo a los usuarios buscar, visualizar detalles y calificar películas. La aplicación tiene un solo módulo llamado Películas que se conecta con TMDB para obtener los datos. Además, se genera una sesión de usuario visitante para guardar las calificaciones sin necesidad de autenticación.

Desarrollado por:
Johan Sebastian Mejia Carmona
Cargo al que aspiro: Front Developer Senior
Empresa: GWL

Requisitos de instalación
Para ejecutar la aplicación, sigue los pasos a continuación:

1. Instalación de dependencias
Dentro de la carpeta del proyecto, abre la terminal y ejecuta el siguiente comando:

npm i --force

Este comando instalará todas las dependencias necesarias para ejecutar la aplicación.

2. Ejecutar la aplicación
Una vez que se haya completado la instalación de las dependencias, inicia la aplicación con el siguiente comando:

npm start

Esto abrirá la aplicación en tu navegador.

Funcionamiento
Login:
En la página de inicio de sesión, puedes colocar cualquier correo electrónico y contraseña. La validación solo verifica que el correo esté en formato correcto, ya que el proceso de autenticación es solo visual.

Módulo de Películas:
La aplicación cuenta con un solo módulo llamado Películas, que permite lo siguiente:

Buscar películas: Puedes buscar películas por título. A medida que escribes, la búsqueda se realiza en la API de TMDB y se muestran los resultados con el título, año de lanzamiento y sinopsis.
Paginación: Los resultados de la búsqueda están paginados, por lo que puedes navegar entre las distintas páginas de resultados de la búsqueda.
Detalles de la película: Al seleccionar una película, puedes ver información detallada, como el elenco, la duración y la calificación.
Votación de películas: Como una característica adicional, los usuarios pueden calificar las películas en una escala de 1 a 10. Para hacerlo, se genera una sesión de usuario visitante que no requiere autenticación, lo que permite almacenar las calificaciones de manera temporal.
Requisitos cumplidos
Campo de búsqueda: Se incluye un campo de búsqueda donde los usuarios pueden buscar películas por título.
Lista de resultados: Al buscar una película, se muestra una lista con el título, año de lanzamiento y sinopsis de cada película.
Paginación: Se incluye un componente de paginación para navegar por las páginas de los resultados de búsqueda.
Página de detalles: Al seleccionar una película, se muestra una página con información detallada, incluyendo elenco, duración y calificación.
Extra:
Se ha añadido la capacidad de votar por películas, generando una sesión de usuario visitante para gestionar las calificaciones sin necesidad de autenticación completa.

Tecnologías utilizadas
Angular: Para la construcción de la aplicación frontend.
TMDB API: Para la consulta de películas y detalles relacionados.
ngx-star-rating: Para la implementación de estrellas para la calificación de las películas.
Swal (SweetAlert): Para mostrar alertas de confirmación y éxito al guardar calificaciones.
Plantilla Creative Tim Free: plantilla de angular para proyectos.