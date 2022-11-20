package com.aim.questionnaire.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.aim.questionnaire.dao.entity.PageListVO;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.entity.UserEntity;
import com.aim.questionnaire.service.UserService;


/**
 * Created by wln on 2018\8\9 0009.
 */
@RestController
@RequestMapping("/admin")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserEntityMapper userEntityMapper;


    /**
     * 删除用户
     * */

    @RequestMapping(value="/deleteUserByUsername",method= RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteUserByUsername(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        userService.deleteUserByUsername(userEntity.getUsername());
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        return httpResponseEntity;
    }

    /**
     * 用户登录
     * @param userEntity
     * @return
     */
    @RequestMapping(value="/userLogin",method= RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity userLogin(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
          //有改动
            List<UserEntity> hasUser = userEntityMapper.selectUserInfo(userEntity);
            if(CollectionUtils.isEmpty(hasUser) ) {
            	httpResponseEntity.setCode(Constans.EXIST_CODE);
            	httpResponseEntity.setData(null);
            	httpResponseEntity.setMessage(Constans.LOGIN_USERNAME_PASSWORD_MESSAGE);
            }else {
            	httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            	httpResponseEntity.setData(hasUser);
            	httpResponseEntity.setMessage(Constans.LOGIN_MESSAGE);
            }

        } catch (Exception e) {
            logger.info("userLogin 用户登录>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }

    /**
     * 查询用户列表（模糊搜索）
     * @param map
     * @return
     */
    @RequestMapping(value = "/queryUserList",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryUserList(@RequestBody Map<String,Object> map) {
        System.out.println("sssssssssss");
        PageHelper.startPage((int)map.get("pageNum"), (int)map.get("pageSize"));

//        System.out.println(map);
        if(map.get("username").toString()=="")
                 map.put("username",null);
        List<Map<String, Object>> hasUser = userEntityMapper.queryUserList(map);
        for (Map<String, Object> m: hasUser
             ) {
            int l = m.get("username").toString().length();
            m.put("groups",l);
            m.put("space",l*3-2);
        }
        PageInfo<Map<String, Object>>pageInfo = new PageInfo(hasUser);
//        System.out.println(pageInfo);
        PageListVO pageListVO = new PageListVO();
        pageListVO.setList(pageInfo.getList());
        pageListVO.setTotal(pageInfo.getTotal());
//        for (Map<String, Object> map1 : hasUser) {
//            System.out.println(map1);
//        }
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        if(CollectionUtils.isEmpty(hasUser) ) {
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setData(null);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }else {
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            httpResponseEntity.setData(pageListVO);
            httpResponseEntity.setMessage(Constans.STATUS_MESSAGE);
        }
        return httpResponseEntity;
    }
    /**
     * 创建用户的基本信息
     * @param map
     * @return
     */
    @RequestMapping(value = "/addUserInfo",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addUserInfo(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        System.out.println("begin");
        System.out.println(map);
        System.out.println("ssssss");
        try {
            int result = userService.addUserInfo(map);
            System.out.println(result);
            if(result == 3) {
                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            }else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
            }
        } catch (Exception e) {
            logger.info("addUserInfo 创建用户的基本信息>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }

    /**
     * 编辑用户的基本信息
     * @param map
     * @return
     */
    @RequestMapping(value = "/modifyUserInfo",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyUserInfo(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        return httpResponseEntity;
    }


    /**
     *  根据用户id查询用户基本信息
     * @param userEntity
     * @return
     */
    @RequestMapping(value = "/selectUserInfoById",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity selectUserInfoById(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        return httpResponseEntity;
    }



    /**
     * 修改用户状态
     * @param map
     * @return
     */
    @RequestMapping(value = "/modifyUserStatus",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyUserStatus(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        return httpResponseEntity;
    }
    /**
     *  删除用户信息
     * @param userEntity
     * @return
     */
    @RequestMapping(value = "/deleteUserInfoById",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deteleUserInfoById(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        return httpResponseEntity;
    }


    /**
     * 用户没有权限
     * @return
     */
    @RequestMapping(value = "/error")
    public HttpResponseEntity logout() {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        return httpResponseEntity;
    }

    @RequestMapping(value = "/register")
    public HttpResponseEntity registerUser(@RequestBody Map<String , String > map){

        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        Map<String , Object > map1 = new HashMap<>();
        map1.put("username",map.get("registerName"));
        map1.put("phone",map.get("registerPhone"));
        map1.put("password",map.get("registerPwd"));

        if (userService.addUserInfo(map1)==3){
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }else {
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        }

        return httpResponseEntity;

    }

    /**
     * 查询用户列表（模糊搜索）
     * @param map
     * @return
     */
    @RequestMapping(value = "/queryCost",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryCost(@RequestBody Map<String,Object> map) {
        System.out.println("sssssssssss");
        PageHelper.startPage((int) map.get("pageNum"), (int) map.get("pageSize"));

//        System.out.println(map);
        if (map.get("username").toString() == "")
            map.put("username", null);
        List<Map<String, Object>> hasUser = new ArrayList<>();
        Map<String, Object> map1 = new HashMap<>();
        map1.put("id", 1);
        map1.put("username", "单炟崴");
        map1.put("useTime", "无效问卷");
        map1.put("totalCost", "80");
        hasUser.add(map1);
        Map<String, Object> map2 = new HashMap<>();
        map2.put("id", 2);
        map2.put("username", "冯佳慧");
        map2.put("useTime", "已作答");
        map2.put("totalCost", "50");
        hasUser.add(map2);
        Map<String, Object> map3 = new HashMap<>();
        map3.put("id", 3);
        map3.put("username", "黄子宁");
        map3.put("useTime", "未作答");
        map3.put("totalCost", "200");
        hasUser.add(map3);
//        Map<String, Object> map4 = new HashMap<>();
//        map4.put("id",4);
//        map4.put("username","虞书欣");
//        map4.put("useTime","未作答");
//        map4.put("totalCost","30");
//        hasUser.add(map4);

        PageInfo<Map<String, Object>> pageInfo = new PageInfo(hasUser);
//        System.out.println(pageInfo);
        PageListVO pageListVO = new PageListVO();
        pageListVO.setList(pageInfo.getList());
        pageListVO.setTotal(pageInfo.getTotal());
//        for (Map<String, Object> map1 : hasUser) {
//            System.out.println(map1);
//        }
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        if(CollectionUtils.isEmpty(hasUser) ) {
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setData(null);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }else {
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            httpResponseEntity.setData(pageListVO);
            httpResponseEntity.setMessage(Constans.STATUS_MESSAGE);
        }
        return httpResponseEntity;
    }


}
