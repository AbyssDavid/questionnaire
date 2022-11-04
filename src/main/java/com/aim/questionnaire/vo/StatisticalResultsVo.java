package com.aim.questionnaire.vo;

import com.aim.questionnaire.dao.entity.QuestionnaireEntity;

import java.util.List;

public class StatisticalResultsVo extends QuestionnaireEntity {
    private List<ProblemVo> problemList;

    public List<ProblemVo> getProblemList() {
        return problemList;
    }

    public void setProblemList(List<ProblemVo> problemList) {
        this.problemList = problemList;
    }
}
