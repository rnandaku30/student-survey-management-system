package com.ramyashree.student_survey;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    // You can add custom query methods here if necessary
}
