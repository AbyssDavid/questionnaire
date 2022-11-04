package com.aim.questionnaire.dao.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @TableName send_record
 */
public class SendRecord implements Serializable {
    /**
     * 
     */
    private String id;

    /**
     * 
     */
    private Integer dataId;

    /**
     * 
     */
    private Date releaseTime;

    /**
     * 
     */
    private Integer sendType;

    /**
     * 
     */
    private String personId;

    private String questionnaireId;

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

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
    public Integer getDataId() {
        return dataId;
    }

    /**
     * 
     */
    public void setDataId(Integer dataId) {
        this.dataId = dataId;
    }

    /**
     * 
     */
    public Date getReleaseTime() {
        return releaseTime;
    }

    /**
     * 
     */
    public void setReleaseTime(Date releaseTime) {
        this.releaseTime = releaseTime;
    }

    /**
     * 
     */
    public Integer getSendType() {
        return sendType;
    }

    /**
     * 
     */
    public void setSendType(Integer sendType) {
        this.sendType = sendType;
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
        SendRecord other = (SendRecord) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getDataId() == null ? other.getDataId() == null : this.getDataId().equals(other.getDataId()))
            && (this.getReleaseTime() == null ? other.getReleaseTime() == null : this.getReleaseTime().equals(other.getReleaseTime()))
            && (this.getSendType() == null ? other.getSendType() == null : this.getSendType().equals(other.getSendType()))
            && (this.getPersonId() == null ? other.getPersonId() == null : this.getPersonId().equals(other.getPersonId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getDataId() == null) ? 0 : getDataId().hashCode());
        result = prime * result + ((getReleaseTime() == null) ? 0 : getReleaseTime().hashCode());
        result = prime * result + ((getSendType() == null) ? 0 : getSendType().hashCode());
        result = prime * result + ((getPersonId() == null) ? 0 : getPersonId().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", dataId=").append(dataId);
        sb.append(", releaseTime=").append(releaseTime);
        sb.append(", sendType=").append(sendType);
        sb.append(", personId=").append(personId);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}