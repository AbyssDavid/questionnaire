package com.aim.questionnaire.vo;

public class QuestionnaireCountVo {
    private String dataName;
    private Integer questionCount;
    private Integer answerTotal;
    private String answerRate;
    private Integer effectiveAnswer;

    public String getDataName() {
        return dataName;
    }

    public void setDataName(String dataName) {
        this.dataName = dataName;
    }

    public Integer getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(Integer questionCount) {
        this.questionCount = questionCount;
    }

    public Integer getAnswerTotal() {
        return answerTotal;
    }

    public void setAnswerTotal(Integer answerTotal) {
        this.answerTotal = answerTotal;
    }

    public String getAnswerRate() {
        return answerRate;
    }

    public void setAnswerRate(String answerRate) {
        this.answerRate = answerRate;
    }

    public Integer getEffectiveAnswer() {
        return effectiveAnswer;
    }

    public void setEffectiveAnswer(Integer effectiveAnswer) {
        this.effectiveAnswer = effectiveAnswer;
    }
}
