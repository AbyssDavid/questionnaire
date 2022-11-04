package com.aim.questionnaire.beans;

import com.aim.questionnaire.common.Constans;

import java.io.Serializable;

/**
 * 设置一个HTTp消息的实体，并且可以完成foreach
 * Created by myz on 2017/7/8.
 */
//@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
//@Data
public class HttpResponseEntity implements Serializable {

    private String code; //状态码
    private Object data; //内容
    private String message; //状态消息

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpResponseEntity(String code, Object data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public HttpResponseEntity() {
    }

    public static HttpResponseEntity ok(){
        return new HttpResponseEntity(Constans.SUCCESS_CODE,null,"ok");
    }

    public static <T> HttpResponseEntity ok(T data){
        return new HttpResponseEntity(Constans.SUCCESS_CODE,data,"ok");
    }

    public static HttpResponseEntity fail(String message){
        return new HttpResponseEntity(Constans.EXIST_CODE,null,message);
    }

    public static HttpResponseEntity unLogin(){
        return new HttpResponseEntity(Constans.LOGOUT_NO_CODE,null,Constans.LOGOUT_NO_MESSAGE);
    }

    public static HttpResponseEntity fail(){
        return new HttpResponseEntity(Constans.EXIST_CODE,null,"fail");
    }
}
