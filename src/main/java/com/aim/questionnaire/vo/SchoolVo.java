package com.aim.questionnaire.vo;

public class SchoolVo {
    private String id;
    private String answerBelong;
    private String answerRate;
    private Long effectiveAnswer;
    private Long answerTotal;
    private Integer pageSize;
    private Integer pageNum;
    private String sortName;
    private String sortOrder;
    private String questionId;

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnswerBelong() {
        return answerBelong;
    }

    public void setAnswerBelong(String answerBelong) {
        this.answerBelong = answerBelong;
    }

    public String getAnswerRate() {
        return answerRate;
    }

    public void setAnswerRate(String answerRate) {
        this.answerRate = answerRate;
    }

    public Long getEffectiveAnswer() {
        return effectiveAnswer;
    }

    public void setEffectiveAnswer(Long effectiveAnswer) {
        this.effectiveAnswer = effectiveAnswer;
    }

    public Long getAnswerTotal() {
        return answerTotal;
    }

    public void setAnswerTotal(Long answerTotal) {
        this.answerTotal = answerTotal;
    }
}
