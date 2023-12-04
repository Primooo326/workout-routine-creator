import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { HttpClientModule } from '@angular/common/http';
import { Exercise, ExerciseFilter } from '../../models/exercise.interface';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-maker',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './maker.component.html',
  styleUrl: './maker.component.scss'
})
export class MakerComponent implements OnInit{

  categories = [
    "strength",
    "stretching",
    "plyometrics",
    "strongman",
    "powerlifting",
    "cardio",
    "olympic weightlifting"
  ]

  forces = [
    "pull",
    "push",
    "static"
  ]

  levels = [
    "beginner",
    "intermediate",
    "expert"
  ]

  mechanics = [
    "compound",
    "isolation"
  ]

  muscles = [
  "abdominals",
  "hamstrings",
  "adductors",
  "quadriceps",
  "biceps",
  "shoulders",
  "chest",
  "middle back",
  "calves",
  "glutes",
  "lower back",
  "lats",
  "triceps",
  "traps",
  "forearms",
  "neck",
  "abductors",
  ]

  equipments = [
    "body only",
    "machine",
    "other",
    "foam roll",
    "kettlebells",
    "dumbbell",
    "cable",
    "barbell",
    "medicine ball",
    "bands",
    "exercise ball",
    "e-z curl bar"
  ]

  exercises:Exercise[] = [];

  exercieFilter:ExerciseFilter = {
    force: [],
    level: [],
    mechanic: [],
    category: [],
    muscles: [],
    equipments: []
  }

  constructor(private exerciceSrvc: ExerciseService) { }

  async ngOnInit() {
    this.filterExercises();
  }

  changeFilterItem(filter: string, item: any) {

    switch (filter) {
      case 'force': {
        if (this.exercieFilter.force.includes(item)) {
          this.exercieFilter.force = this.exercieFilter.force.filter((value) => value != item)
        } else {
          this.exercieFilter.force.push(item)
        }
        break;
      }
      case 'level': {
        if (this.exercieFilter.level.includes(item)) {
          this.exercieFilter.level = this.exercieFilter.level.filter((value) => value != item)
        } else {
          this.exercieFilter.level.push(item)
        }
        break;
      }
      case 'mechanic': {
        if (this.exercieFilter.mechanic.includes(item)) {
          this.exercieFilter.mechanic = this.exercieFilter.mechanic.filter((value) => value != item)
        } else {
          this.exercieFilter.mechanic.push(item)
        }
        break;
      }
      case 'category': {
        if (this.exercieFilter.category.includes(item)) {
          this.exercieFilter.category = this.exercieFilter.category.filter((value) => value != item)
        } else {
          this.exercieFilter.category.push(item)
        }
        break;
      }
      case 'muscles': {
        if (this.exercieFilter.muscles.includes(item)) {
          this.exercieFilter.muscles = this.exercieFilter.muscles.filter((value) => value != item)
        } else {
          this.exercieFilter.muscles.push(item)
        }
        break;
      }
      case 'equipments': {
        if (this.exercieFilter.equipments.includes(item)) {
          this.exercieFilter.equipments = this.exercieFilter.equipments.filter((value) => value != item)
        } else {
          this.exercieFilter.equipments.push(item)
        }
        break;
      }
      default: {
        break;
      }
    }
    this.filterExercises();
  }

  async filterExercises() {
    await this.exerciceSrvc.readFilteredExercises(this.exercieFilter).then((data) => {
      console.log(data);
      this.exercises = data!.map((exercise) => {

        if (typeof exercise.primaryMuscles === 'string') {
          exercise.primaryMuscles = JSON.parse(exercise.primaryMuscles);
        }
        if (typeof exercise.secondaryMuscles === 'string') {
          exercise.secondaryMuscles = JSON.parse(exercise.secondaryMuscles);
        }
        if (typeof exercise.instructions === 'string') {
          exercise.instructions = JSON.parse(exercise.instructions);
        }
        if (typeof exercise.imgs === 'string') {
          exercise.imgs = JSON.parse(exercise.imgs);
        }

        exercise.imgs = exercise.imgs.map((img:string) => {
          const path = environment.api+`download/${img}`
          return path
        }
        );

        return exercise;
      }
      );
    }
    ).catch((error:any) => {
      console.log(error);
    }
    ).finally(() => {

    })
  }

}
