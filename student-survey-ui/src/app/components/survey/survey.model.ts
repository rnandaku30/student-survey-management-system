export interface Survey {
    id: number;
    firstName: string | null;  // Nullable if the value is optional or missing
    lastName: string | null;
    email: string;
    telephone: string;
    dateOfSurvey: Date | null;  // Nullable if the date is not available
    zipCode: string | null;
    streetAddress: string | null;
    city: string;
    state: string;
    whatDoYouLikeAboutCampus: string | null;  // Nullable if this answer is missing
    howDidYouHearAboutUs: string | null;
    additionalComments: string | null;
    wouldYouRecommendUs: string | null;  // Changed to string as it is now stored as a string in the database
    gradMonth: string | null;
    gradYear: number | null;
    data: any | null;  // Assuming `data` is dynamic or complex (could be an object, array, etc.)
    maximum: number;
    average: number;
    acknowledgment?:any
  }

  