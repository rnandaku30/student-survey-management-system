import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Adjust this path based on your environment
import { Survey } from './survey.model'; 


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = `${environment.apiBaseUrl}/surveys`; // Ensure you have an API base URL in environment.ts

  private http = inject(HttpClient);

  // Get all surveys
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  // Fetch a single survey by ID
  getSurveyById(id: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.apiUrl}/${id}`);
  }


  // Create a new survey
  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, survey);
  }

  // Update an existing survey
  updateSurvey(survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${this.apiUrl}/${survey.id}`, survey);
  }

  // Delete a survey
  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
