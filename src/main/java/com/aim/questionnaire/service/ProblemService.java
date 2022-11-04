package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.ProblemMapper;
import com.aim.questionnaire.dao.entity.Problem;
import com.aim.questionnaire.vo.ProblemVo;
import com.aim.questionnaire.vo.QuestionOptionVo;
import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Service("problemService")
public class ProblemService {

    @Resource
    private ProblemMapper problemMapper;

    @Transactional
    public void batchSave(String questionId,List<ProblemVo> vos) {
        for (ProblemVo vo : vos) {
            Problem po = new Problem();
            BeanUtils.copyProperties(vo,po);
            po.setQuestionnaireId(questionId);
            po.setId(UUIDUtil.getOneUUID());
            List<QuestionOptionVo> ops = vo.getQuestionOption();
            po.setQuestionOption(JSONArray.toJSONString(ops));
            problemMapper.insert(po);
        }
    }

    public List<ProblemVo> queryListByQuestionId(String id) {
        return problemMapper.queryListByQuestionId(id).stream().map(item->{
            ProblemVo vo = new ProblemVo();
            BeanUtils.copyProperties(item,vo);
            vo.setQuestionOption(JSONArray.parseArray(item.getQuestionOption(),QuestionOptionVo.class));
            return vo;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void deleteByQuestionnaireId(String questionId) {
        problemMapper.deleteByQuestionnaireId(questionId);
    }
}
