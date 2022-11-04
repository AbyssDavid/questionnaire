package com.aim.questionnaire.controller;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.aim.questionnaire.dao.entity.Student;
import com.aim.questionnaire.service.QuestionnaireService;
import com.aim.questionnaire.vo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


/**
 * Created by yfc 0612
 */
@RestController
public class QuestionnaireController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private QuestionnaireService questionnaireService;

    @RequestMapping(value = "/addQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addQuestionnaire(@RequestBody QuestionVo vo){
        String id = questionnaireService.save(vo);
        return HttpResponseEntity.ok(id);
    }

    @RequestMapping(value = "/queryQuestionnaireById/{questionId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireById(@PathVariable String questionId){
        QuestionVo vo = questionnaireService.queryQuestionnaireById(questionId);
        return HttpResponseEntity.ok(vo);
    }

    @RequestMapping(value = "/queryQuestionnaireCount/{questionId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireCount(@PathVariable String questionId){
        return questionnaireService.queryQuestionnaireCount(questionId);
    }

    @RequestMapping(value = "/queryDeletedQuestionnaireList",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryDeletedQuestionnaireList(@RequestBody QuestionnaireEntity vo){
        if (StringUtils.isEmpty(vo.getCreatedBy())){
            return HttpResponseEntity.unLogin();
        }
        List<QuestionVo> list = questionnaireService.queryDeletedListByCreatedBy(vo);
        return HttpResponseEntity.ok(list);
    }

    @RequestMapping(value = "/queryAllQuestionnaireByCreated",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryAllQuestionnaireByCreated(@RequestBody QuestionnaireEntity vo){
        if (StringUtils.isEmpty(vo.getCreatedBy())){
            return HttpResponseEntity.unLogin();
        }
        List<QuestionnaireEntity> list = questionnaireService.queryAllQuestionnaireByCreated(vo.getCreatedBy());
        return HttpResponseEntity.ok(list);
    }

    @RequestMapping(value = "/queryHistoryQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryHistoryQuestionnaire(@RequestBody QuestionnaireEntity vo){
        if (StringUtils.isEmpty(vo.getCreatedBy())){
            return HttpResponseEntity.unLogin();
        }
        List<QuestionnaireEntity> list = questionnaireService.queryHistoryQuestionnaire(vo);
        return HttpResponseEntity.ok(list);
    }

    @RequestMapping(value = "/queryQuestionnaireAboutSchool",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireAboutSchool(@RequestBody SchoolVo schoolVo){
        return questionnaireService.queryQuestionnaireAboutSchool(schoolVo);
    }

    @RequestMapping(value = "/queryQuestionnaireMould",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireMould(@RequestBody QuestionnaireEntity vo){
        if (StringUtils.isEmpty(vo.getCreatedBy())){
            return HttpResponseEntity.unLogin();
        }
        List<QuestionnaireEntity> list = questionnaireService.queryQuestionnaireMould(vo);
        return HttpResponseEntity.ok(list);
    }

    @RequestMapping(value = "/getShortUrlForLink/{questionId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity getShortUrlForLink(@PathVariable String questionId) throws Exception {
        LinkVo linkVo = questionnaireService.getShortUrlForLink(questionId);
        return HttpResponseEntity.ok(linkVo);
    }

    @RequestMapping(value = "/deleteQuestionnaireById/{questionId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteQuestionnaireById(@PathVariable String questionId )  {
        questionnaireService.deleteQuestionnaireById(questionId);
        return HttpResponseEntity.ok();
    }

    @RequestMapping(value = "/updateQuestionStatus",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity updateQuestionStatus(@RequestBody QuestionnaireEntity entity) {
        return questionnaireService.updateQuestionStatusById(entity);
    }

    @RequestMapping(value = "/editQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity editQuestionnaire(@RequestBody QuestionVo entity)  {
        questionnaireService.editQuestionnaire(entity);
        return HttpResponseEntity.ok(entity.getId());
    }

    @RequestMapping(value = "/modifyHistoryQuestionnaireStatus",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyHistoryQuestionnaireStatus(@RequestBody QuestionnaireEntity entity) {
        questionnaireService.modifyHistoryQuestionnaireStatus(entity);
        return HttpResponseEntity.ok();
    }

    @RequestMapping(value = "/addSendQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addSendQuestionnaire(@RequestBody SendVo vo) {
        questionnaireService.addSendQuestionnaire(vo);
        return HttpResponseEntity.ok();
    }

    @RequestMapping(value = "/saveQuestionnaireInfo",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity saveQuestionnaireInfo(@RequestBody SendVo vo) {
        questionnaireService.saveQuestionnaireInfo(vo);
        return HttpResponseEntity.ok();
    }

    @RequestMapping(value = "/checkWhetherItCanBeFilledIn/{questionId}/{personId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity checkWhetherItCanBeFilledIn(@PathVariable String questionId,@PathVariable String personId) {
        return questionnaireService.checkFillAuth(questionId,personId);
    }

    @RequestMapping(value = "/addAnswerQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addAnswerQuestionnaire(@RequestBody AnswerVo vo) {
        questionnaireService.addAnswerQuestionnaire(vo);
        String questionId = vo.getQuestionId();
        QuestionVo vo1 = questionnaireService.queryQuestionnaireById(questionId);
        return HttpResponseEntity.ok(vo1.getQuestionEndContent());
    }

    @RequestMapping(value = "/statisticalResults/{questionId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity statisticalResults(@PathVariable String questionId) throws IOException {
        return questionnaireService.statisticalResults(questionId);
    }

    @RequestMapping(value = "/issuedQuestionnaire/{questionId}",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity issuedQuestionnaire(@PathVariable String questionId) throws IOException {
        return questionnaireService.issuedQuestionnaire(questionId);
    }



}
