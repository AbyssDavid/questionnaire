package com.aim.questionnaire.vo;

import com.aim.questionnaire.dao.entity.Student;
import com.aim.questionnaire.dao.entity.Teacher;

import java.util.Date;
import java.util.List;

public class SendVo {
    private String questionEndContent;
    private String questionId;
    private List<Student> studentList;
    private List<Teacher> teacherList;
    private Integer dataId;
    private Integer sendType;
    private Date releaseTime;
    private String emailContent;
    private String emailTitle;

    public Integer getDataId() {
        return dataId;
    }

    public void setDataId(Integer dataId) {
        this.dataId = dataId;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getEmailTitle() {
        return emailTitle;
    }

    public void setEmailTitle(String emailTitle) {
        this.emailTitle = emailTitle;
    }

    public Date getReleaseTime() {
        return releaseTime;
    }

    public void setReleaseTime(Date releaseTime) {
        this.releaseTime = releaseTime;
    }

    public String getQuestionEndContent() {
        return questionEndContent;
    }

    public void setQuestionEndContent(String questionEndContent) {
        this.questionEndContent = questionEndContent;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public List<Student> getStudentList() {
        return studentList;
    }

    public void setStudentList(List<Student> studentList) {
        this.studentList = studentList;
    }

    public List<Teacher> getTeacherList() {
        return teacherList;
    }

    public void setTeacherList(List<Teacher> teacherList) {
        this.teacherList = teacherList;
    }

    public Integer getSendType() {
        return sendType;
    }

    public void setSendType(Integer sendType) {
        this.sendType = sendType;
    }
}
