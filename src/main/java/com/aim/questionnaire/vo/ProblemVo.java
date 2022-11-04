package com.aim.questionnaire.vo;

import java.util.List;

public class ProblemVo {

    private String id;

    private String questionTitle;

    private Integer questionType;

    private List<QuestionOptionVo> questionOption;

    private String questionnaireId;

    private Integer required;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public Integer getQuestionType() {
        return questionType;
    }

    public void setQuestionType(Integer questionType) {
        this.questionType = questionType;
    }

    public List<QuestionOptionVo> getQuestionOption() {
        return questionOption;
    }

    public void setQuestionOption(List<QuestionOptionVo> questionOption) {
        this.questionOption = questionOption;
    }

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public Integer getRequired() {
        return required;
    }

    public void setRequired(Integer required) {
        this.required = required;
    }
}
