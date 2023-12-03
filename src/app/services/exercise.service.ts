import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Exercise, ExerciseFilter } from '../models/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  api = environment.api + 'exercise/';
  constructor(private http:HttpClient) { }

  async readExercises() {
    return this.http.get<Exercise[]>(this.api).toPromise();
  }

  async readExercise(id:number) {
    return this.http.get<Exercise[]>(this.api + id).toPromise();
  }

  async readFilteredExercises(filter:ExerciseFilter) {
    return this.http.post<Exercise[]>(this.api + 'filter', filter).toPromise();
  }

  async createExercise(exercise:Exercise) {
    return this.http.post<any>(this.api, exercise).toPromise();
  }

  async updateExercise(exercise:Exercise) {
    return this.http.put<any>(this.api + exercise.id, exercise).toPromise();
  }

  async deleteExercise(id:number) {
    return this.http.delete<any>(this.api + id).toPromise();
  }

}
