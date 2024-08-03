# Prueba SuperHero Finder

Repositorio de prueba final del módulo 4 para Bootcamp de Programación Front-End Trainee de Desafío Latam. Consiste en una aplicación web que consulta datos de [Superhero API](https://www.superheroapi.com/index.html) para mostrarlos en una interfaz basada en Bootstrap y CanvasJS.

## Lenguajes y frameworks utilizados

- HTML 5
- CSS 3
- Javascript con jQuery
- Bootstrap 5.3.3
- CanvasJS 
 
## Caracteristicas

- Interfaz basada en framework Bootstrap.
- Buscador de superheroes basado en los indices de la API de superhero API, con validaciones en caso de que valor enviado no es un número o está fuera del rango de indices.
- Datos de superheroe se muestran mediante una card de Bootstrap con datos básicos, apariencia, ocupación y relaciones. También incluye una imagen con su apariencia.
- Retorna estadisticas de poder del superheroe usando una instancia de grafico de pastel/torta de CanvasJS
- Filtros para mostrar u ocultar contenido en caso de que falten datos en el superheroe consultado. 

## Estructura de archivos

```
.
├───assets/
│   ├───css/
│   │   └───main.css
│   ├───img/
│   │   ├───favicon.ico
│   │   ├───sh1.jpg
│   │   └───sh2.jpg
│   └───js/
│       ├───jQuery.filtroInfoCardInvalido.js
│       ├───jQuery.filtroInfoCardVacio.js
│       ├───jQuery.filtroRemoverTituloVacio.js
│       ├───jQuery.generateCard.js
│       ├───jQuery.graficoCanvasJS.js
│       ├───jQuery.limpiar.js
│       └───scripts.js
└───index.html
└───README.md

```
## Instalacion

1. Clona el repositorio:
```
git clone git@github.com:pabl-cruz/PruebaSuperHeroFinder.git
```
2. Navega hacia el directorio del proyecto con terminal
```
cd PruebaSuperHeroFinder
```
3. Abre **index.html** en tu navegador para ver el sitio web. Es necesario tener internet para acceder a SuperHero API, Bootstrap y CanvasJS
