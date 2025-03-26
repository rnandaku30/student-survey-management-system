package com.ramyashree.student_survey;

import jakarta.persistence.*;

@Entity
@Table(name = "survey")
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "date_of_survey")
    private String dateOfSurvey;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "what_do_you_like_about_campus")
    private String whatDoYouLikeAboutCampus;  // Updated here

    @Column(name = "how_did_you_hear_about_us")
    private String howDidYouHearAboutUs;

    @Column(name = "additional_comments")
    private String additionalComments;

    @Column(name = "would_you_recommend_us")
    private String wouldYouRecommendUs;

    @Column(name = "grad_month")
    private String gradMonth;

    @Column(name = "grad_year")
    private String gradYear;

    @Column(name = "data")
    private String data;

    @Column(name = "maximum")
    private double maximum;

    @Column(name = "average")
    private double average;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getDateOfSurvey() {
        return dateOfSurvey;
    }

    public void setDateOfSurvey(String dateOfSurvey) {
        this.dateOfSurvey = dateOfSurvey;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getWhatDoYouLikeAboutCampus() {
        return whatDoYouLikeAboutCampus;  // Updated here
    }

    public void setWhatDoYouLikeAboutCampus(String whatDoYouLikeAboutCampus) {
        this.whatDoYouLikeAboutCampus = whatDoYouLikeAboutCampus;  // Updated here
    }

    public String getHowDidYouHearAboutUs() {
        return howDidYouHearAboutUs;
    }

    public void setHowDidYouHearAboutUs(String howDidYouHearAboutUs) {
        this.howDidYouHearAboutUs = howDidYouHearAboutUs;
    }

    public String getAdditionalComments() {
        return additionalComments;
    }

    public void setAdditionalComments(String additionalComments) {
        this.additionalComments = additionalComments;
    }

    public String getWouldYouRecommendUs() {
        return wouldYouRecommendUs;
    }

    public void setWouldYouRecommendUs(String wouldYouRecommendUs) {
        this.wouldYouRecommendUs = wouldYouRecommendUs;
    }

    public String getGradMonth() {
        return gradMonth;
    }

    public void setGradMonth(String gradMonth) {
        this.gradMonth = gradMonth;
    }

    public String getGradYear() {
        return gradYear;
    }

    public void setGradYear(String gradYear) {
        this.gradYear = gradYear;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public double getMaximum() {
        return maximum;
    }

    public void setMaximum(double maximum) {
        this.maximum = maximum;
    }

    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = average;
    }
}
