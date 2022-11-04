//package com.aim.questionnaire.client;
//
//import com.aim.questionnaire.beans.HttpResponseEntity;
//import com.aim.questionnaire.dao.entity.UserEntity;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//
///**
// * Created by Administrator.
// */
//@FeignClient(value = "user-server")
//public interface ProviderClient {
//
//    @RequestMapping(value = "/admin/userLogin", method = RequestMethod.POST, headers = "Accept=application/json")
//    HttpResponseEntity userLogin(@RequestBody UserEntity userEntity);
//}
//
