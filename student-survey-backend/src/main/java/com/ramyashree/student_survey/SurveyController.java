package com.ramyashree.student_survey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    // Get all surveys
    @GetMapping
    public List<Survey> getAllSurveys() {
        return surveyService.getAllSurveys();
    }

    // Get survey by id
    @GetMapping("/{id}")
    public Optional<Survey> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id);
    }

    // Create a new survey
    @PostMapping
    public Survey createSurvey(@RequestBody Survey survey) {
        return surveyService.createSurvey(survey);
    }

    // Update an existing survey
    @PutMapping("/{id}")
    public Survey updateSurvey(@PathVariable Long id, @RequestBody Survey survey) {
        return surveyService.updateSurvey(id, survey);
    }

    // Delete a survey
    @DeleteMapping("/{id}")
    public void deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
    }
}
