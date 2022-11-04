package com.aim.questionnaire.vo;

import java.io.Serializable;

public class QuestionOptionVo implements Serializable {
    private static final long serialVersionUID = -312871495637585L;
    private String lineTitle;
    private String optionGrade;
    private String optionWord;
    private Long value = 0L;

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public String getLineTitle() {
        return lineTitle;
    }

    public void setLineTitle(String lineTitle) {
        this.lineTitle = lineTitle;
    }

    public String getOptionGrade() {
        return optionGrade;
    }

    public void setOptionGrade(String optionGrade) {
        this.optionGrade = optionGrade;
    }

    public String getOptionWord() {
        return optionWord;
    }

    public void setOptionWord(String optionWord) {
        this.optionWord = optionWord;
    }
}
