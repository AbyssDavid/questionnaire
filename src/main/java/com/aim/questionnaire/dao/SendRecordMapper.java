package com.aim.questionnaire.dao;


import com.aim.questionnaire.dao.entity.SendRecord;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SendRecordMapper {

    void insertBatch(@Param("records") List<SendRecord> records);

    SendRecord queryByQuestionIdAndPersonId(@Param("questionId") String questionId, @Param("personId") String personId);

    List<SendRecord> queryListByQuestionId(@Param("questionId") String questionId);
}
