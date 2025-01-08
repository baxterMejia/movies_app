import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  //Login
  username: string = "";
  password: string = "";
  rememberMe: boolean = false;
  isNewUser: boolean = false;


  //Register
  registerPassword: string = "";
  registerConfirmPassword: string = "";
  registerEmail: string = "";

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}

  onSubmit(): void {
    if (this.username && this.password) {
      this.spinner.show();
      this.spinner.hide();
      //valida el formato de correo
      if (this.validateEmail(this.username)) {
        this.spinner.hide();
        this.router.navigate(["/tables"]);
      }
      else {
        this.spinner.hide();
        Swal.fire({
          title: "Error",
          text: "Correo no valido",
          icon: "error",
        });
      }
    }
  }

  //metodo para validar email
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onRegister(): void {
    if (this.registerPassword != this.registerConfirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
      return;
    }
    if (this.registerPassword && this.registerConfirmPassword && this.registerEmail) {
      this.spinner.show();
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          console.log(response);
          this.spinner.hide();
          this.router.navigate(["/dashboard"]); // Navigate to dashboard after login success
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          Swal.fire({
            title: "Error",
            text: "Usuario o contraseña incorrectos",
            icon: "error",
          });
        }
      );
    }
  }

  onCreateAccount(value): void {
    this.isNewUser = value;
  }
}
