package com.aim.questionnaire.vo;

import java.util.Date;
import java.util.List;

public class AnswerVo {
    private String personId;
    private String questionId;
    private List<AnswerItem> answerList;
    private String ipAddress;
    private Date endTime;
    private Date startTime;

    public static class AnswerItem{
        private String problemId;
        private String value;

        public String getProblemId() {
            return problemId;
        }

        public void setProblemId(String problemId) {
            this.problemId = problemId;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    public List<AnswerItem> getAnswerList() {
        return answerList;
    }

    public void setAnswerList(List<AnswerItem> answerList) {
        this.answerList = answerList;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
}
