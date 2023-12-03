import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { HttpClientModule } from '@angular/common/http';
import { Exercise } from '../../models/exercise.interface';
import { environment } from '../../environment/environment';
import Masonry from 'masonry-layout';

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
private masonry!: any;
  constructor(private exerciceSrvc: ExerciseService) { }

  async ngOnInit() {
    await this.exerciceSrvc.readExercises().then((data) => {
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

        // change the first character with assets
        exercise.imgs = exercise.imgs.map((img) => {
          const path = environment.api+`download/${img}`
          return path
        }
        );

        return exercise;
      }
      );
    }
    ).catch((error) => {
      console.log(error);
    }
    ).finally(() => {

    })
    this.masonry = new Masonry('.grid', {
      itemSelector: '.grid-item',
      columnWidth: 200,
      gutter: 10,

    })

    this.masonry.layout();


  }



}
