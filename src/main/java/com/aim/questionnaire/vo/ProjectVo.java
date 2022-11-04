package com.aim.questionnaire.vo;

import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;

import java.util.List;

public class ProjectVo extends ProjectEntity {
    private List<QuestionnaireEntity> questions;

    public List<QuestionnaireEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionnaireEntity> questions) {
        this.questions = questions;
    }
}
