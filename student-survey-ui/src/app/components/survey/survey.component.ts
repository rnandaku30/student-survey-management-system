import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SurveyService } from './survey.service';
import { ActivatedRoute, Router } from '@angular/router';  // Import ActivatedRoute
import { Survey } from './survey.model';  // Import the Survey model


@Component({
  selector: 'app-survey',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit, AfterViewInit {
  surveyForm: FormGroup;
  surveyId: number | null = null;  // Declare surveyId as number or null
  surveyData: Survey | null = null;
  errors: string[] = [];
  isGreetingDone: boolean = false;
  storedName: string | null = '';
  readOnly: boolean = false;

  constructor(private cookieService: CookieService, private renderer: Renderer2, private surveyService: SurveyService, private route: ActivatedRoute, private router: Router) {
    this.surveyForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', Validators.required),
      dateOfSurvey: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      streetAddress: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9\\s]+$')]),
      city: new FormControl({ value: '', disabled: false }),
      state: new FormControl({ value: '', disabled: false }),
      whatDoYouLikeAboutCampus: new FormArray([]),
      howDidYouHearAboutUs: new FormControl(''),
      additionalComments: new FormControl(''),
      wouldYouRecommendUs: new FormControl(''),
      data: new FormControl(''),
      average: new FormControl({ value: '', disabled: false }),
      maximum: new FormControl({ value: '', disabled: false }),
      gradMonth: new FormControl(''),
      gradYear: new FormControl(''),
      acknowledgment: new FormControl(false, [Validators.requiredTrue])

    });
  }

  // ngOnInit(): void {
  //   this.displayGreeting();  // Optional, to show greeting


  //   if (this.readOnly) {
  //     this.surveyForm.disable();  // Disable all fields if in read-only mode
  //   }
  //   // Get survey ID from the route parameters
  //   this.route.paramMap.subscribe(params => {
  //     this.surveyId = +params.get('id')!;  // Ensure the ID is a number
  //     this.loadSurveyData(this.surveyId);  // Load the survey data based on the ID
  //   });
  // }

  ngOnInit(): void {
    this.displayGreeting();  // Optional, to show greeting
    // Get the survey ID from the route parameters

    this.route.queryParams.subscribe(params => {
      this.readOnly = params['readOnly'] === 'true';  // Read readOnly query parameter
    });


    this.route.paramMap.subscribe(params => {
      this.surveyId = +params.get('id')!;  // Ensure the ID is a number


      // If in read-only mode, disable the form
      if (this.readOnly) {
        this.surveyForm.disable();
      }

      this.loadSurveyData(this.surveyId);  // Load the survey data based on the ID
    });
  }

  // Load survey data based on the ID
  loadSurveyData(surveyId: number): void {
    this.surveyService.getSurveyById(surveyId).subscribe(
      (survey: Survey) => {
        this.surveyData = survey;

        const whatDoYouLikeAboutCampus = this.surveyData.whatDoYouLikeAboutCampus
          ? String(this.surveyData.whatDoYouLikeAboutCampus).split(',').map(item => item.trim()) // Trim spaces
          : [];

        const formArray = this.surveyForm.get('whatDoYouLikeAboutCampus') as FormArray;
        formArray.clear(); // Clear existing values before updating

        whatDoYouLikeAboutCampus.forEach(value => {
          formArray.push(new FormControl(value)); // Push selected values
        });

        if (this.surveyData) {
          this.surveyForm.patchValue({
            firstName: this.surveyData.firstName,
            lastName: this.surveyData.lastName,
            email: this.surveyData.email,
            telephone: this.surveyData.telephone,
            dateOfSurvey: this.surveyData.dateOfSurvey,
            zipCode: this.surveyData.zipCode,
            streetAddress: this.surveyData.streetAddress,
            city: this.surveyData.city,
            state: this.surveyData.state,
            whatDoYouLikeAboutCampus: whatDoYouLikeAboutCampus,
            howDidYouHearAboutUs: this.surveyData.howDidYouHearAboutUs,
            additionalComments: this.surveyData.additionalComments,
            wouldYouRecommendUs: this.surveyData.wouldYouRecommendUs,
            data: this.surveyData.data,
            gradMonth: this.surveyData.gradMonth,
            gradYear: this.surveyData.gradYear,
            average: this.surveyData.average,
            maximum: this.surveyData.maximum,
          });
        }
      },
      (error) => {
        console.error('Error loading survey data', error);
        // Handle the error, possibly display an error message to the user
      }
    );

  }



  ngAfterViewInit(): void {
    // Ensure `resetName` is available after the view is initialized
    const notYouLink = document.getElementById('notYouLink');
    if (notYouLink) {
      notYouLink.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default link behavior
        this.resetName();
      });
    }
  }

  resetForm(): void {
    this.surveyForm.reset(); // This resets the form fields
  }

  onCheckboxChange(event: any) {
    const formArray = this.surveyForm.get('whatDoYouLikeAboutCampus') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      const index = formArray.controls.findIndex(control => control.value === event.target.value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }




  setCookie(name: string, value: string, days: number): void {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expires in X days
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  }

  getCookie(name: string): string | null {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      let [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }

  getGreeting(): string {
    let hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    else return "Good Evening";
  }

  showGreeting(name: string): void {
    const greetingMessage = `${this.getGreeting()}, ${name}! Welcome to SWE642 Survey 
      <a href="#" id="notYouLink" (click)="resetName($event)" style="font-size: 1.5rem; color: #007bff; margin-left: 5px;">Not you?</a>`;

    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
      this.renderer.setProperty(greetingElement, 'innerHTML', greetingMessage);
    }
  }

  displayGreeting(): void {
    let storedName = this.getCookie("username");

    if (storedName) {
      this.showGreeting(storedName);
    } else {
      this.resetName();
    }
  }

  handleZipCodeBlur(): void {
    const zipInput = document.getElementById("zipCode") as HTMLInputElement;
    const zipError = document.getElementById("zip-error") as HTMLElement;
    const cityField = document.getElementById("city") as HTMLInputElement;
    const stateField = document.getElementById("state") as HTMLInputElement;

    if (!zipInput) return;

    let zipCode = zipInput.value.trim();

    // Reset previous values
    if (cityField) cityField.value = "";
    if (stateField) stateField.value = "";
    if (zipError) zipError.textContent = "";

    // Validate ZIP Code Format (Must be 5 digits)
    if (!/^\d{5}$/.test(zipCode)) {
      if (zipError) zipError.textContent = "Invalid ZIP Code!";
      return;
    }

    // Fetch data from AWS Elastic Beanstalk Web Service
    fetch(`http://swe642-webservice.us-east-1.elasticbeanstalk.com/zipcodes/${zipCode}`)
      .then(response => response.ok ? response.json() : Promise.reject("Invalid ZIP"))
      .then(data => {
        if (cityField) cityField.value = data.city;
        if (stateField) stateField.value = data.state;
      })
      .catch(error => {
        if (zipError) zipError.textContent = "Invalid ZIP Code!";
      });
  }


  computeAverageAndMax() {
    const inputData = this.surveyForm.get('data')?.value; // Get the input value


    // Split the input by commas and convert to an array of numbers
    const numbers = inputData.split(',').map(Number);

    // Validate the length to be 10 numbers
    if (numbers.length === 10 && numbers.every((num: number) => !isNaN(num))) {
      const average = numbers.reduce((sum: any, num: any) => sum + num, 0) / numbers.length;
      const max = Math.max(...numbers);

      // Set the computed values into the corresponding fields
      this.surveyForm.get('average')?.setValue(average);
      this.surveyForm.get('maximum')?.setValue(max);
    } else {
      // Handle invalid input case, clear the fields or show an error
      this.surveyForm.get('average')?.setValue('');
      this.surveyForm.get('maximum')?.setValue('');
      console.error('Invalid input: Please enter exactly 10 comma-separated numbers');
    }
  }


  resetName(event?: Event): void {
    event?.preventDefault();  // Prevents the link from redirecting
    const modal = this.renderer.createElement('div');
    this.renderer.setStyle(modal, 'position', 'fixed');
    this.renderer.setStyle(modal, 'top', '50%');
    this.renderer.setStyle(modal, 'left', '50%');
    this.renderer.setStyle(modal, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(modal, 'background', 'white');
    this.renderer.setStyle(modal, 'padding', '20px');
    this.renderer.setStyle(modal, 'box-shadow', '0px 4px 10px rgba(0,0,0,0.3)');
    this.renderer.setStyle(modal, 'border-radius', '10px');
    this.renderer.setStyle(modal, 'text-align', 'center');
    this.renderer.setStyle(modal, 'z-index', '1000');

    modal.innerHTML = `
      <p style="margin-bottom:15px;">Please enter your correct name:</p>
      <input type="text" id="newNameInput" style="padding:10px; width:80%; margin-bottom:10px; border:1px solid #ccc; border-radius:5px;">
      <br>
      <button id="saveBtn" style="margin-right:10px; padding:10px 15px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">
          Save
      </button>
      <button id="cancelBtn" style="padding:10px 15px; background:#6c757d; color:white; border:none; border-radius:5px; cursor:pointer;">
          Cancel
      </button>
    `;

    document.body.appendChild(modal);

    this.renderer.listen(document.getElementById("saveBtn"), 'click', () => {
      let newName = (<HTMLInputElement>document.getElementById("newNameInput")).value.trim();
      if (newName !== "") {
        this.setCookie("username", newName, 7);
        document.body.removeChild(modal);
        this.showGreeting(newName);
      }
    });

    this.renderer.listen(document.getElementById("cancelBtn"), 'click', () => {
      document.body.removeChild(modal);
    });
  }

  validateForm(): boolean {
    this.errors = [];

    const formValues = this.surveyForm.value;

    // Validate name fields (first and last name)
    if (!/^[A-Za-z\s]+$/.test(formValues.firstName)) {
      this.errors.push("- First Name must contain only alphabets.");
    }
    if (!/^[A-Za-z\s]+$/.test(formValues.lastName)) {
      this.errors.push("- Last Name must contain only alphabets.");
    }

    // Validate ZIP Code format
    if (!/^\d{5}$/.test(formValues.zip)) {
      this.errors.push("- Invalid ZIP Code format.");
    }

    // Validate Telephone format
    const phonePattern = /^(\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/;
    if (!phonePattern.test(formValues.telephone)) {
      this.errors.push("- Enter a valid phone number (e.g., 123-456-7890).");
    }

    // Validate Address, City, and State fields
    ["address", "city", "state"].forEach(field => {
      if (!/^[A-Za-z0-9\s]+$/.test(formValues[field])) {
        this.errors.push(`- ${field.charAt(0).toUpperCase() + field.slice(1)} should contain only letters, numbers, and spaces.`);
      }
    });

    // Validate Checkbox (at least 2 selected)
    const checkedCount = [formValues.students, formValues.location, formValues.atmosphere, formValues.dorms, formValues.sports].filter(Boolean).length;
    if (checkedCount < 2) {
      this.errors.push("- Select at least two options.");
    }

    // Validate Radio Button (how did you hear about us?)
    if (!formValues.interest) {
      this.errors.push("- Select one option for how you heard about us.");
    }

    // Display errors in a dialog
    if (this.errors.length > 0) {
      this.showErrorDialog();
      return false;
    }
    return true;
  }

  showErrorDialog(): void {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
                background:white; padding:20px; box-shadow:0px 4px 10px rgba(0,0,0,0.3); 
                border-radius:10px; text-align:center; z-index:1000;">
        <h3>Form Validation Errors</h3>
        <ul style="text-align:left; padding-left:20px;">
          ${this.errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <button id="closeBtn" style="padding:10px 15px; background:#dc3545; color:white; border:none; border-radius:5px; cursor:pointer;">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("closeBtn")?.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  }

  onSubmit(): void {
    // Trigger the validation first
    if (this.surveyForm.invalid) {
      this.errors = [];
      for (const control of Object.keys(this.surveyForm.controls)) {
        const formControl = this.surveyForm.get(control);
        if (formControl?.invalid) {
          this.errors.push(`- ${control.charAt(0).toUpperCase() + control.slice(1)} is invalid.`);
        }
      }
      this.showErrorDialog();
      return;
    }

    // Prepare the survey data from the form
    const surveyData = this.surveyForm.value;

    // Convert the 'whatDoYouLikeAboutCampus' array to a string
    if (Array.isArray(surveyData.whatDoYouLikeAboutCampus)) {
      surveyData.whatDoYouLikeAboutCampus = surveyData.whatDoYouLikeAboutCampus.join(', ');
    }


    // Call the appropriate service method based on whether we are inserting or updating
    if (this.surveyId) {
      surveyData.id = this.surveyId; // Ensure the ID is set, even if updating

      // Edit: Call the updateSurvey method from SurveyService
      this.surveyService.updateSurvey(surveyData).subscribe({
        next: (response) => {
          alert('Survey updated successfully!');
          this.router.navigate(['/survey-list']); // Navigate to the survey list page
          this.surveyForm.reset(); // Clear the form contents
        },
        error: (error) => {
          console.error('Error updating survey:', error);
          alert('An error occurred while updating the survey. Please try again.');
        }
      });
    } else {
      // Insert: Call the createSurvey method from SurveyService
      this.surveyService.createSurvey(surveyData).subscribe({
        next: (response) => {
          alert('Survey submitted successfully!');
          this.router.navigate(['/survey-list']); // Navigate to the survey list page
          this.surveyForm.reset(); // Clear the form contents
        },
        error: (error) => {
          console.error('Error inserting survey:', error);
          alert('An error occurred while submitting the survey. Please try again.');
        }
      });
    }
  }

  // Close the form and navigate to survey list page
  closeForm(): void {
    this.router.navigate(['/survey-list']);
  }


}
