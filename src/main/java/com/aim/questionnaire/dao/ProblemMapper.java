package com.aim.questionnaire.dao;

import com.aim.questionnaire.dao.entity.Problem;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * (Problem)表数据库访问层
 *
 * @author makejava
 * @since 2022-06-21 11:33:04
 */
public interface ProblemMapper {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Problem queryById(String id);

    /**
     * 查询指定行数据
     *
     * @param problem 查询条件
     * @param pageable         分页对象
     * @return 对象列表
     */
    List<Problem> queryAllByLimit(Problem problem, @Param("pageable") Pageable pageable);

    /**
     * 统计总行数
     *
     * @param problem 查询条件
     * @return 总行数
     */
    long count(Problem problem);

    /**
     * 新增数据
     *
     * @param problem 实例对象
     * @return 影响行数
     */
    int insert(Problem problem);

    /**
     * 批量新增数据（MyBatis原生foreach方法）
     *
     * @param entities List<Problem> 实例对象列表
     * @return 影响行数
     */
    int insertBatch(@Param("entities") List<Problem> entities);

    /**
     * 批量新增或按主键更新数据（MyBatis原生foreach方法）
     *
     * @param entities List<Problem> 实例对象列表
     * @return 影响行数
     * @throws org.springframework.jdbc.BadSqlGrammarException 入参是空List的时候会抛SQL语句错误的异常，请自行校验入参
     */
    int insertOrUpdateBatch(@Param("entities") List<Problem> entities);

    /**
     * 修改数据
     *
     * @param problem 实例对象
     * @return 影响行数
     */
    int update(Problem problem);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(String id);

    int deleteByQuestionnaireId(String questionnaireId);

    List<Problem> queryListByQuestionId(String id);
}

