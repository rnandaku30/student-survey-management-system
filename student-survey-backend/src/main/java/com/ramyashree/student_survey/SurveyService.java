package com.ramyashree.student_survey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.ramyashree.student_survey.SurveyRepository;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    // Create a new survey
    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    // Get all surveys
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    // Get a survey by id
    public Optional<Survey> getSurveyById(Long id) {
        return surveyRepository.findById(id);
    }

    // Update a survey
    public Survey updateSurvey(Long id, Survey surveyDetails) {
        Survey survey = surveyRepository.findById(id).orElseThrow(() -> new RuntimeException("Survey not found"));
        survey.setFirstName(surveyDetails.getFirstName());
        survey.setLastName(surveyDetails.getLastName());
        survey.setEmail(surveyDetails.getEmail());
        survey.setTelephone(surveyDetails.getTelephone());
        survey.setDateOfSurvey(surveyDetails.getDateOfSurvey());
        survey.setZipCode(surveyDetails.getZipCode());
        survey.setStreetAddress(surveyDetails.getStreetAddress());
        survey.setCity(surveyDetails.getCity());
        survey.setState(surveyDetails.getState());
        survey.setWhatDoYouLikeAboutCampus(surveyDetails.getWhatDoYouLikeAboutCampus());
        survey.setHowDidYouHearAboutUs(surveyDetails.getHowDidYouHearAboutUs());
        survey.setAdditionalComments(surveyDetails.getAdditionalComments());
        survey.setWouldYouRecommendUs(surveyDetails.getWouldYouRecommendUs());
        survey.setGradMonth(surveyDetails.getGradMonth());
        survey.setGradYear(surveyDetails.getGradYear());
        survey.setData(surveyDetails.getData());
        survey.setMaximum(surveyDetails.getMaximum());
        survey.setAverage(surveyDetails.getAverage());
        // update other fields as well
        return surveyRepository.save(survey);
    }

    // Delete a survey
    public void deleteSurvey(Long id) {
        surveyRepository.deleteById(id);
    }
}
