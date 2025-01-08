import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TaskService } from "src/app/services/task.service";
import Swal from "sweetalert2";
import { lastValueFrom } from "rxjs"; // Importar lastValueFrom para convertir el Observable en una Promesa
import { EmployeeService } from "src/app/services/empleado.service";
import { TaskDTO } from "src/app/services/Models/TaskDTO";
import { MovieService } from "src/app/services/movie.service";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  empleados: any = [];
  estados: any = [];

  movies: any[] = [];
  modalVisible = false;
  addModalVisible = false;
  currentPage = 1;
  totalPages = 0;
  totalResults = 0;
  selectedTask = {
    IdTarea: 0,
    Titulo: "",
    Descripcion: "",
    FechaLimite: "",
    IdEmpleado: 0,
    IdEstado: 0,
  };
  newTask = {
    Titulo: "",
    Descripcion: "",
    FechaLimite: "",
    IdEmpleado: 0,
    IdEstado: 0,
  };
  searchText = "";
  pageNumbers: number[] = []; // Páginas a mostrar en el paginador
  filteredMovies: any[] = []; // Películas filtradas por búsqueda
  modalDetailsVisible: boolean = false; // Controla la visibilidad del modal
  selectedMovie: any = {}; // Almacena la película seleccionada
  rating: number = 5; // Calificación entre 1 y 10

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  // Método para cargar movies usando async/await
  async loadTasks(page: number = 1) {
    this.spinner.show();
    try {
      const response = await lastValueFrom(this.movieService.getMovies(page));
      this.movies = response.results;
      this.totalPages = response.total_pages;
      this.totalResults = response.total_results;
      this.filteredMovies = this.movies;
      this.updatePageNumbers();
      console.log(this.movies);
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      Swal.fire({
        title: "Error",
        text: "No se pudieron consultar las películas",
        icon: "error",
      });
    }
  }

  addTask() {
    this.addModalVisible = true;
  }

  editTask(tarea) {
    this.selectedTask = {
      ...tarea,
      IdEmpleado: tarea.Empleado.IdEmpleado,
      IdEstado: tarea.Estado.IdEstado,
    };
    this.modalVisible = true;
  }

  //metodo para actualizar tarea
  async saveTaskEdit() {
    this.modalVisible = false;
    this.spinner.show();
    const data: TaskDTO = {
      idTarea: this.selectedTask.IdTarea,
      titulo: this.selectedTask.Titulo,
      descripcion: this.selectedTask.Descripcion,
      fechaLimite: this.selectedTask.FechaLimite,
      idEmpleado: this.selectedTask.IdEmpleado,
      idEstado: this.selectedTask.IdEstado,
      empleadoNombre: "",
      estadoNombre: "",
    };
    try {
      const response = await lastValueFrom(
        this.taskService.updateTask(this.selectedTask.IdTarea, data)
      );
      this.spinner.hide();
      this.ngOnInit();
      Swal.fire({
        title: "Tarea actualizada",
        text: "La tarea ha sido actualizada exitosamente",
        icon: "success",
      });
    } catch (error) {
      this.spinner.hide();
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la tarea",
        icon: "error",
      });
    }
  }

  async addNewTask() {
    this.addModalVisible = false;
    this.spinner.show();
    const data: TaskDTO = {
      idTarea: 0,
      titulo: this.newTask.Titulo,
      descripcion: this.newTask.Descripcion,
      fechaLimite: this.newTask.FechaLimite,
      idEmpleado: this.newTask.IdEmpleado,
      idEstado: this.newTask.IdEstado,
      empleadoNombre: "",
      estadoNombre: "",
    };
    try {
      const response = await lastValueFrom(this.taskService.addTask(data));
      this.spinner.hide();
      this.ngOnInit();
      Swal.fire({
        title: "Tarea agregada",
        text: "La tarea ha sido agregada exitosamente",
        icon: "success",
      });
    } catch (error) {
      this.spinner.hide();
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar la tarea",
        icon: "error",
      });
    }
  }

  // Función para obtener las estrellas completas según el valor de la calificación
  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.round(rating / 2); // Redondeamos la calificación a la estrella más cercana

    // Llenar el arreglo con las estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push("fa-star"); // Estrella llena
    }

    return stars;
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    // Realizar búsqueda si hay un texto de búsqueda
    if (this.searchText) {
      this.searchMovies(this.searchText);
    } else {
      this.loadTasks(page); // Si no hay búsqueda, cargar todas las películas
    }
  }

  updatePageNumbers(): void {
    const firstPage = 1;
    const lastPage = this.totalPages;
    const pagesToShow = 5; // Número total de páginas a mostrar

    if (this.totalPages <= pagesToShow) {
      this.pageNumbers = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );
    } else {
      // Muestra siempre la primera y la última página
      this.pageNumbers = [firstPage];

      // Calcula las páginas intermedias
      const middlePages = [];
      for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
        if (i > 1 && i < lastPage) {
          middlePages.push(i);
        }
      }

      // Añadir las páginas intermedias al array de páginas
      this.pageNumbers = this.pageNumbers.concat(middlePages);

      // Añadir la última página si no está ya en el array
      if (this.pageNumbers[this.pageNumbers.length - 1] !== lastPage) {
        this.pageNumbers.push(lastPage);
      }
    }
  }

  /**
   * Realiza una búsqueda de películas por nombre
   */
  async searchMovies(query: string): Promise<void> {
    if (query === "") {
      this.filteredMovies = this.movies; // Si no hay texto de búsqueda, mostrar todas las películas
    } else {
      try {
        this.spinner.show();
        const response = await lastValueFrom(
          this.movieService.searchMovies(query, this.currentPage)
        );
        this.filteredMovies = response.results;
        this.totalResults = response.total_results;
        this.totalPages = response.total_pages;
        this.updatePageNumbers();
        this.spinner.hide();
      } catch (error) {
        console.error("Error al realizar la búsqueda de películas", error);
      }
    }
  }

  /**
   * Llama a la función de búsqueda cada vez que se escribe algo en el campo de búsqueda
   */
  onSearch(): void {
    console.log(this.searchText);
    this.searchMovies(this.searchText);
  }

  // Función para abrir el modal con la información de la película
  async openMovieDetails(movie: any) {
    this.spinner.show();
    const response = await lastValueFrom(
      this.movieService.getMovieDetails(movie.id)
    );
    this.spinner.hide();
    this.selectedMovie = response;
    this.modalDetailsVisible = true;
  }

  // Función para guardar la calificación
  async saveMovieRating() {

    // Mostrar una alerta de confirmación antes de guardar la calificación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta calificación se guardará en la página oficial de TMDB.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar calificación",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        // 1. Crear una sesión de invitado
        const guestSessionResponse = await lastValueFrom(
          this.movieService.createGuestSession()
        );

        // 2. Guardar la calificación usando la sesión de invitado
        const ratingResponse = await lastValueFrom(
          this.movieService.rateMovieAsGuest(
            guestSessionResponse.guest_session_id, // ID de la sesión de invitado
            this.selectedMovie.id, // ID de la película
            this.rating // La calificación que el usuario ha dado (entre 1 y 10)
          )
        );

        // Mostrar respuesta de éxito
        Swal.fire(
          "Calificación guardada",
          "Tu calificación ha sido guardada exitosamente.",
          "success"
        );
        this.modalDetailsVisible = false; // Cerrar el modal
        this.rating = 5; // Reiniciar la calificación
      } catch (error) {
        // Manejo de errores
        console.error("Error al guardar la calificación:", error);
        Swal.fire(
          "Error",
          "Hubo un error al guardar la calificación. Inténtalo de nuevo más tarde.",
          "error"
        );
      }
    }
  }
}
