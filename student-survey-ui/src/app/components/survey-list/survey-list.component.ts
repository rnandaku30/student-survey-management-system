import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey/survey.service';  // Make sure to import the service
import { Router } from '@angular/router';
import { Survey } from '../survey/survey.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';  // For confirmation dialog
import { ConfirmDeleteDialog } from '../survey/survey.delete.dialog';

@Component({
  selector: 'app-survey-list',
  imports:[CommonModule],
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
  
})
export class SurveyListComponent implements OnInit {

  surveys: Survey[] = [];  // Array to hold the surveys fetched from API


  constructor(private surveyService: SurveyService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadSurveys(); // Load surveys when the component initializes
  }

  // Fetch surveys from the API
  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe(
      (data: Survey[]) => {
        this.surveys = data;
      },
      (error: any) => {
        console.error('Error fetching surveys!', error);
      }
    );
  }

  // Show confirmation dialog for delete
  confirmDelete(surveyId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteSurvey(surveyId);
      }
    });
  }

  // Delete survey
  deleteSurvey(surveyId: number): void {
    this.surveyService.deleteSurvey(surveyId).subscribe(
      response => {
        this.surveys = this.surveys.filter(survey => survey.id !== surveyId);  // Update list after deletion
      },
      error => {
        console.error('Error deleting survey', error);
      }
    );
  }

  // Redirect to the insert survey page
  insertSurvey(): void {
    this.router.navigate(['/insert-survey']);
  }

   // View survey in read-only mode
  viewSurvey(surveyId: number): void {
    this.router.navigate(['/survey', surveyId], { queryParams: { readOnly: true } });
  }

  // Redirect to the update survey page with the survey details
  updateSurvey(id: number): void {
    this.router.navigate([`/survey/${id}`]);
  }
}
