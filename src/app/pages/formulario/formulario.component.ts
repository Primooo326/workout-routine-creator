import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {


  step = 1;

  formulario1 = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    genero: new FormControl('Selecciona una opción', [Validators.required]),
    cmFt: new FormControl('Cm', [Validators.required]),
    altura: new FormControl('0', [Validators.required]),
    kgLb: new FormControl('Kg', [Validators.required]),
    peso: new FormControl('0', [Validators.required]),
    objetivo: new FormControl('', [Validators.required]),
  })

  formulario2 = new FormGroup({
    frecuencia: new FormControl('Selecciona una opción', [Validators.required]),
    intensidad: new FormControl('Selecciona una opción', [Validators.required]),
    actividad: new FormControl('', [Validators.required]),
  })

  formulario3 = new FormGroup({
    preferencia: new FormControl('Selecciona una opción', [Validators.required]),
    alergias: new FormControl('', [Validators.required]),
    Restricciones: new FormControl('', [Validators.required]),
  })

  nextStep() {

    console.log(this.formulario1.value);

    this.step++;

  }

  prevStep() {

    this.step--;

  }

  guardarInfo() {
    const info = {
      ...this.formulario1.value,
      ...this.formulario2.value,
      ...this.formulario3.value
    }
    console.log("🚀 ~ file: formulario.component.ts:53 ~ FormularioComponent ~ guardarInfo ~ info:", info)

  }

}
