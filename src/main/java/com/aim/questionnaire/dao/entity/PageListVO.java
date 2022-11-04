package com.aim.questionnaire.dao.entity;;

import java.io.Serializable;
import java.util.List;

public class PageListVO implements Serializable {

    private Long total;
    private List list;

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }
}


