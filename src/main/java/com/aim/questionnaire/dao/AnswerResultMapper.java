package com.aim.questionnaire.dao;


import com.aim.questionnaire.dao.entity.AnswerResult;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AnswerResultMapper{


    void insertBatch(@Param("list") List<AnswerResult> list);

    List<AnswerResult> queryListByProblemId(String id);
}
