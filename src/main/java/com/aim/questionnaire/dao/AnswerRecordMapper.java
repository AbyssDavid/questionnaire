package com.aim.questionnaire.dao;


import com.aim.questionnaire.dao.entity.AnswerRecord;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AnswerRecordMapper {


    AnswerRecord selectByQuestionIdAndPersonId(@Param("questionId") String questionId, @Param("personId") String personId);

    void insert(AnswerRecord record);

    List<AnswerRecord> queryListByQuestionId(@Param("questionId") String questionId);
}
