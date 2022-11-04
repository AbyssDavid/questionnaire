package com.aim.questionnaire.controller;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.aim.questionnaire.service.ProjectService;
import com.aim.questionnaire.service.QuestionnaireService;
import com.aim.questionnaire.vo.ProjectQueryVo;
import com.aim.questionnaire.vo.ProjectVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by wln on 2018\8\6 0006.
 */
@RestController
public class ProjectController {

    private final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private ProjectService projectService;

    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;


    /**
     * 查询全部项目的信息
     *
     * @return
     */
    @RequestMapping(value = "/queryProjectList", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryProjectList(@RequestBody(required = false) ProjectQueryVo vo) {
        if (vo != null && StringUtils.isEmpty(vo.getProjectName())) {
            vo.setProjectName(null);
        }
        List<ProjectVo> list = projectService.queryProjectList(vo);
        return HttpResponseEntity.ok(list);
    }

    /**
     * 根据id删除项目
     *
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/deleteProjectById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteProjectById(@RequestBody ProjectEntity projectEntity) {
        String id = projectEntity.getId();
        if (!StringUtils.isEmpty(id)) {
            QuestionnaireEntity entity = new QuestionnaireEntity();
            entity.setProjectId(id);
            List<QuestionnaireEntity> select = questionnaireEntityMapper.select(entity);
            if (select.size() > 0) {
                return HttpResponseEntity.fail("有发布中的问卷，不能删除");
            }
            projectService.deleteProjectById(id);
        }
        return HttpResponseEntity.ok();
    }

    /**
     * 添加项目
     *
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/addProjectInfo", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addProjectInfo(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            ProjectQueryVo entity = new ProjectQueryVo();
            entity.setProjectName(projectEntity.getProjectName());
            List<ProjectVo> list = projectService.queryProjectList(entity);
            if (list.size() > 0) {
                return HttpResponseEntity.fail("项目已经存在");
            }
            int result = projectService.addProjectInfo(projectEntity);
            System.out.println(result);
            if (result == 3) {
                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            } else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
            }
        } catch (Exception e) {
            logger.info("addProjectInfo 创建项目的基本信息>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }

    /**
     * 根据项目id修改项目
     *
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/modifyProjectInfo", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyProjectInfo(@RequestBody ProjectEntity projectEntity) {
        String id = projectEntity.getId();
        if (!StringUtils.isEmpty(id)) {
            QuestionnaireEntity entity = new QuestionnaireEntity();
            entity.setProjectId(id);
            List<QuestionnaireEntity> select = questionnaireEntityMapper.select(entity);
            if (select.size() > 0) {
                return HttpResponseEntity.fail(Constans.QUESTION_EXIST_MESSAGE);
            }
            projectService.modifyProjectInfo(projectEntity);
        }
        return HttpResponseEntity.ok();
    }


    /**
     * 查询全部项目的名字接口
     *
     * @return
     */
    @RequestMapping(value = "/queryAllProjectName", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryAllProjectName() {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        return httpResponseEntity;
    }
}
