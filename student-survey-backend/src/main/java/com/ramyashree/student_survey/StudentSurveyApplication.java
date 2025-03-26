package com.ramyashree.student_survey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EntityScan(basePackages = "com.ramyashree.student_survey")

public class StudentSurveyApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.out.println(dotenv.get("DB_URL")+"heelooooo");
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

		SpringApplication.run(StudentSurveyApplication.class, args);
	}

}