package com.aim.questionnaire.dao.entity;


import java.io.Serializable;

/**
 * 
 * @TableName answer_result
 */
public class AnswerResult implements Serializable {
    /**
     * 
     */
    private String id;

    /**
     * 
     */
    private String problemId;

    /**
     * 
     */
    private String personId;

    /**
     * 
     */
    private String value;

    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    public String getId() {
        return id;
    }

    /**
     * 
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 
     */
    public String getProblemId() {
        return problemId;
    }

    /**
     * 
     */
    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }

    /**
     * 
     */
    public String getPersonId() {
        return personId;
    }

    /**
     * 
     */
    public void setPersonId(String personId) {
        this.personId = personId;
    }

    /**
     * 
     */
    public String getValue() {
        return value;
    }

    /**
     * 
     */
    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        AnswerResult other = (AnswerResult) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getProblemId() == null ? other.getProblemId() == null : this.getProblemId().equals(other.getProblemId()))
            && (this.getPersonId() == null ? other.getPersonId() == null : this.getPersonId().equals(other.getPersonId()))
            && (this.getValue() == null ? other.getValue() == null : this.getValue().equals(other.getValue()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getProblemId() == null) ? 0 : getProblemId().hashCode());
        result = prime * result + ((getPersonId() == null) ? 0 : getPersonId().hashCode());
        result = prime * result + ((getValue() == null) ? 0 : getValue().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", problemId=").append(problemId);
        sb.append(", personId=").append(personId);
        sb.append(", value=").append(value);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}