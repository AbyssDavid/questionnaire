package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.ProjectEntityMapper;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.aim.questionnaire.vo.ProjectQueryVo;
import com.aim.questionnaire.vo.ProjectVo;
import com.aim.questionnaire.vo.QuestionVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by wln on 2018\8\6 0006.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectEntityMapper projectEntityMapper;


    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;
    /**
     * 添加项目
     *
     * @param projectEntity
     * @return
     */
    public int addProjectInfo(ProjectEntity projectEntity) {
        String id = UUIDUtil.getOneUUID();
        projectEntity.setId(id);
        String userid = UUIDUtil.getOneUUID();
        projectEntity.setUserId(userid);
        Date date = DateUtil.getCreateTime();
        projectEntity.setCreationDate(date);
        projectEntity.setLastUpdateDate(date);
        return projectEntityMapper.insert(projectEntity);
    }

    /**
     * 修改项目
     *
     * @param po
     * @return
     */
    public int modifyProjectInfo(ProjectEntity po) {
        po.setLastUpdateDate(new Date());
        return projectEntityMapper.updateById(po);
    }

    /**
     * 删除项目
     *
     * @return
     */
    @Transactional
    public int deleteProjectById(String id) {
        return projectEntityMapper.deleteProjectById(id);
    }

    /**
     * 查询项目列表
     *
     * @return
     */
    public List<ProjectVo> queryProjectList(ProjectQueryVo vo) {
        if (vo.getType()==null||vo.getType()==0) {
            //项目
            List<ProjectEntity> list = projectEntityMapper.queryProjectList(vo);
            List<ProjectVo> res = new ArrayList<>(list.size());
            Integer questionStatus = vo.getQuestionStatus();

            QuestionnaireEntity query = new QuestionnaireEntity();

            if (questionStatus!=null && questionStatus!=-1) {
                query.setStatus(questionStatus);
            }
            for (ProjectEntity entity : list) {
                ProjectVo p = new ProjectVo();
                BeanUtils.copyProperties(entity,p);
                query.setProjectId(entity.getId());
                List<QuestionnaireEntity> voList = questionnaireEntityMapper.select(query);
                p.setQuestions(voList);
                res.add(p);
            }
            return res;
        }else {
            //问卷
            String projectName = vo.getProjectName();
            vo.setProjectName(null);
            List<ProjectEntity> list = projectEntityMapper.queryProjectList(vo);
            List<ProjectVo> res = new ArrayList<>(list.size());
            Integer questionStatus = vo.getQuestionStatus();

            QuestionnaireEntity query = new QuestionnaireEntity();

            if (questionStatus!=null && questionStatus!=-1) {
                query.setStatus(questionStatus);
            }
            if(!StringUtils.isEmpty(projectName)){
                query.setQuestionName(projectName);
            }
            for (ProjectEntity entity : list) {
                ProjectVo p = new ProjectVo();
                BeanUtils.copyProperties(entity,p);
                query.setProjectId(entity.getId());
                List<QuestionnaireEntity> voList = questionnaireEntityMapper.select(query);
                p.setQuestions(voList);
                res.add(p);
            }
            return res;
        }
    }

    /**
     * 查询全部项目的名字接口
     *
     * @return
     */
    public List<Map<String, Object>> queryAllProjectName() {
        return null;
    }
}
