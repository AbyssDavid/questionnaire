package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
//import com.aim.questionnaire.config.shiro.SysUserService;
//import com.aim.questionnaire.config.shiro.entity.UserOnlineBo;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.entity.UserEntity;
//import com.alibaba.fastjson.JSONArray;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import javax.xml.ws.Action;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by wln on 2018\8\9 0009.
 */
@Service
public class UserService {

    @Autowired
    private UserEntityMapper userEntityMapper;

    //@Autowired
    //private SysUserService sysUserService;

    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    /**
     * 查询用户列表（模糊搜索）
     * @param map
     * @return
     */
    public PageInfo queryUserList(Map<String,Object> map) {

        return null;
    }

    /**
     * 创建用户的基本信息
     * @param map
     * @return
     */
    public int addUserInfo(Map<String,Object> map) {
        String id = UUIDUtil.getOneUUID();
        map.put("id",id);
        //创建时间
        int result = userEntityMapper.addUserInfo(map);
        return result;
    }

    /**
     * 编辑用户的基本信息
     * @param map
     * @return
     */
    public int modifyUserInfo(Map<String, Object> map) {

        try{
            String startTimeStr = map.get("startTime").toString();
            String endTimeStr = map.get("stopTime").toString();
//            Date startTime = DateUtil.getMyTime(startTimeStr);
//            Date endTime = DateUtil.getMyTime(endTimeStr);
//            map.put("startTime",startTime);
//            map.put("stopTime",endTime);
            int result =userEntityMapper.modifyUserInfo(map);
            System.out.println("startTimeStr="+startTimeStr);
            return result;
        }catch (Exception e){
            System.out.println("service 创建用户的基本信息>>>>>>>>>>>" + e.getLocalizedMessage());
        }
        return 0;

    }

    public int updateUserpassword(Map<String, Object> map) {

        try{

            int result =userEntityMapper.updateUserpassword(map);
            return result;
        }catch (Exception e){
            System.out.println("change password service 创建用户的基本信息>>>>>>>>>>>" + e.getLocalizedMessage());
        }
        return 0;

    }

    /**
     * 修改用户状态
     * @param map
     * @return
     */
    public int modifyUserStatus(Map<String, Object> map) {
        return 0;
    }

    /**
     * 根据id查询用户信息
     * @param userEntity
     * @return
     */
    public Map<String,Object> selectUserInfoById(UserEntity userEntity) {

        return null;
    }

    /**
     * 删除用户信息
     * @param userEntity
     * @return
     */
    public int deteleUserInfoById(UserEntity userEntity) {

        return 0;
    }

    public UserEntity selectUserInfoByUsername(String username) {

        UserEntity userEntity = userEntityMapper.selectAllByName(username);

        return userEntity;

    }

    public void deleteUserByUsername(String username) {
        userEntityMapper.deleteUserByUsername(username);
    }
}
