package com.aim.questionnaire.dao;

import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.aim.questionnaire.vo.ProjectQueryVo;
import com.aim.questionnaire.vo.ProjectVo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProjectEntityMapper {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     *
     * @mbg.generated
     */
    int insert(ProjectEntity record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     *
     * @mbg.generated
     */
    int insertSelective(ProjectEntity record);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     *
     * @mbg.generated
     */
    int updateById(ProjectEntity record);


    /**
     * 根据项目id删除项目
     * @param id
     * @return
     */
    int deleteProjectById(String id);

    /**
     * 查询项目列表
     * @return
     */
    List<ProjectEntity> queryProjectList(ProjectQueryVo vo);

    /**
     * 查询全部项目的名字接口
     * @return
     */
//    List<Map<String,Object>> queryAllProjectName();

}