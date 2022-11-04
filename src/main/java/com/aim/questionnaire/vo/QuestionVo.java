package com.aim.questionnaire.vo;

import com.aim.questionnaire.dao.entity.QuestionnaireEntity;

import java.util.List;

public class QuestionVo extends QuestionnaireEntity {
    private List<ProblemVo> questionList;

    private Long count;

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public List<ProblemVo> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<ProblemVo> questionList) {
        this.questionList = questionList;
    }
}
