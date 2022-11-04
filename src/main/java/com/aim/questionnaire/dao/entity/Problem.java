package com.aim.questionnaire.dao.entity;

import java.io.Serializable;

/**
 * (Problem)实体类
 *
 * @author makejava
 * @since 2022-06-21 11:33:06
 */
public class Problem implements Serializable {
    private static final long serialVersionUID = -31287541495637585L;
    
    private String id;
    
    private String questionTitle;
    
    private Integer questionType;
    
    private String questionOption;
    
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

    public String getQuestionOption() {
        return questionOption;
    }

    public void setQuestionOption(String questionOption) {
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

