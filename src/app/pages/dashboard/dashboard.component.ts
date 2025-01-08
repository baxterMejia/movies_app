import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { TaskService } from "src/app/services/task.service";
import { ReporteTareasPendientesDTO } from "src/app/services/Models/ReporteTareasPendientesDTO";
import { lastValueFrom } from "rxjs";
import * as XLSX from "xlsx"; // Importar SheetJS

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  tareasPendientes: ReporteTareasPendientesDTO[] = [];
  totalTareasPendientes: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {

    this.loadPendingTasks(); // Cargar las tareas pendientes al iniciar
  }

  async loadPendingTasks() {
    try {
      const response = await lastValueFrom(
        this.taskService.getAllTasksPending()
      );
      this.tareasPendientes = response;
      // Contar el total de tareas pendientes
      const totalTareas = this.tareasPendientes.reduce((count, reporte) => {
        return count + (reporte.tareas?.length || 0);
      }, 0);
      this.totalTareasPendientes = totalTareas;
    } catch (error) {
      console.error("Error al cargar las tareas pendientes:", error);
    }
  }

  descargarExcel() {
    // Estructurar los datos para Excel
    const datosExcel = this.tareasPendientes.flatMap(reporte =>
      reporte.tareas.map(tarea => ({
        "Empleado": reporte.empleadoNombre,
        "Título de la Tarea": tarea.titulo,
        "Estado de la Tarea": "Pendiente",
      }))
    );

    // Crear una hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);

    // Crear un libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte Tareas");

    // Exportar el archivo Excel
    XLSX.writeFile(wb, "Reporte_Tareas_Pendientes.xlsx");
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}

