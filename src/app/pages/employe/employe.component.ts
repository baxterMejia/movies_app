import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  empleados: any[] = [];

  newEmployee = { Nombre: '', Correo: '' };
  selectedEmployee: any = {};
  modalVisible = false;
  addModalVisible = false; // Control para el modal de agregar empleado

  empleadosPorPagina = 3; // Número de empleados por página
  currentPage = 1; // Página actual
  totalPages: number;
  empleadosParaMostrar: any[] = []; // Para almacenar los empleados a mostrar

  constructor(
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadEmployes();
  }

  async loadEmployes() {
    this.spinner.show();
    try {
      const response = await lastValueFrom(this.employeeService.getAllEmployees());
      this.empleados = response.map(tarea => {
        return {
          IdEmpleado: tarea.idEmpleado,
          Nombre: tarea.nombre,
          Correo: tarea.correo
        };
      }
      );
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los empleados',
        icon: 'error'
      });
    }
  }



  addEmployee() {
    this.newEmployee = { Nombre: '', Correo: '' }; // Reset the form
    this.addModalVisible = true; // Abre el modal de agregar
  }

  editEmployee(empleado: any) {
    this.selectedEmployee = { ...empleado };
    this.modalVisible = true; // Muestra el modal para editar
  }

  async saveEdit() {
    this.modalVisible = false;
    this.spinner.show();

    // Validar formato del correo
    if (!this.validateEmail(this.selectedEmployee.Correo)) {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'El correo electrónico no tiene un formato válido',
        icon: 'error'
      });
      return;
    }

    const data = {
      idEmpleado: this.selectedEmployee.IdEmpleado,
      nombre: this.selectedEmployee.Nombre,
      correo: this.selectedEmployee.Correo
    };

    try {
      const response = await lastValueFrom(this.employeeService.updateEmployee(this.selectedEmployee.IdEmpleado, data));
      this.spinner.hide();
      this.ngOnInit();
      Swal.fire({
        title: 'Éxito',
        text: 'Empleado actualizado correctamente',
        icon: 'success'
      });
    } catch (error) {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el empleado',
        icon: 'error'
      });
    }
  }

  async saveAdd() {
    this.addModalVisible = false;
    this.spinner.show();

    // Validar formato del correo
    if (!this.validateEmail(this.newEmployee.Correo)) {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'El correo electrónico no tiene un formato válido',
        icon: 'error'
      });
      return;
    }

    const data = {
      nombre: this.newEmployee.Nombre,
      correo: this.newEmployee.Correo,
      idEmpleado: 0
    };

    try {
      const response = await lastValueFrom(this.employeeService.addEmployee(data));
      this.spinner.hide();
      this.ngOnInit();
      Swal.fire({
        title: 'Éxito',
        text: 'Empleado agregado correctamente',
        icon: 'success'
      });
    } catch (error) {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar el empleado',
        icon: 'error'
      });
    }
  }

  // Método para validar el formato del correo electrónico
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
    return emailRegex.test(email);
  }




  deleteEmployee(id: number) {
    this.selectedEmployee = this.empleados.find(emp => emp.IdEmpleado === id);
    this.confirmDelete();
  }

  confirmDelete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.empleados.findIndex(emp => emp.IdEmpleado === this.selectedEmployee.IdEmpleado);
        if (index !== -1) {
          this.empleados.splice(index, 1);
          this.totalPages = Math.ceil(this.empleados.length / this.empleadosPorPagina); // Recalcular las páginas
          this.updatePage(); // Actualizar los empleados que se deben mostrar
          Swal.fire('Eliminado!', 'El empleado ha sido eliminado.', 'success');
        }
      } else {
        Swal.fire('Cancelado', 'El empleado no ha sido eliminado.', 'error');
      }
    });
  }

  // Método para actualizar la página y los empleados a mostrar
  updatePage() {
    const startIndex = (this.currentPage - 1) * this.empleadosPorPagina;
    const endIndex = startIndex + this.empleadosPorPagina;
    this.empleadosParaMostrar = this.empleados.slice(startIndex, endIndex);
  }

  // Método para cambiar de página
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

}
