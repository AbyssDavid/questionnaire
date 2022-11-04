package com.aim.questionnaire.service;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.utils.QRCodeGenerator;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.*;
import com.aim.questionnaire.dao.entity.*;
import com.aim.questionnaire.vo.*;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;

import javax.annotation.Resource;
import java.io.*;
import java.lang.reflect.Array;
import java.text.DecimalFormat;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Created by wln on 2018\8\9 0009.
 */
@Service
public class QuestionnaireService {

    @Autowired
    private EmailService emailService;

    @Resource
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    @Resource
    private ProblemService problemService;

    @Resource
    private StudentMapper studentMapper;

    @Resource
    private TeacherMapper teacherMapper;

    @Resource
    private SendRecordMapper sendRecordMapper;

    @Resource
    private AnswerRecordMapper answerRecordMapper;

    @Resource
    private AnswerResultMapper answerResultMapper;

    @Transactional
    public String save(QuestionVo vo) {
        QuestionnaireEntity entity = new QuestionnaireEntity();
        BeanUtils.copyProperties(vo, entity);
        String id = UUIDUtil.getOneUUID();
        entity.setId(id);
        Date date = new Date();
        entity.setCreationDate(date);
        entity.setLastUpdateDate(date);
        entity.setLastUpdatedBy(entity.getCreatedBy());
        entity.setStatus(QuestionnaireEntity.RUN);
        entity.setReleaseTime(null);
        questionnaireEntityMapper.insert(entity);

        List<ProblemVo> list = vo.getQuestionList();
        problemService.batchSave(id, list);
        return id;
    }

    public QuestionVo queryQuestionnaireById(String id) {
        QuestionnaireEntity entity = questionnaireEntityMapper.selectById(id);
        if (entity == null) return null;
        QuestionVo vo = new QuestionVo();
        BeanUtils.copyProperties(entity, vo);
        vo.setQuestionList(problemService.queryListByQuestionId(id));
        return vo;
    }

    public LinkVo getShortUrlForLink(String questionId) throws Exception {
        ApplicationHome applicationHome = new ApplicationHome(this.getClass());

        // 保存目录位置根据项目需求可随意更改
        String fileName = questionId + ".png";
        String url = "/img/" + fileName;
        String s = applicationHome.getDir().getParentFile()
                .getParentFile().getAbsolutePath() + "\\src\\main\\resources\\static\\img\\" + fileName;
        File file = new File(s);
        String link = "http://localhost:8085/pages/previewQuestionnaire.html?questionId=" + questionId + "&l";
        LinkVo vo = new LinkVo();
        vo.setLink(link);
        if (file.exists()) {
            vo.setImgUrl(url);
            return vo;
        }
        BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(s));
        QRCodeGenerator
                .generateQRCodeImage(questionId, 350, 350, stream);
        vo.setImgUrl(url);
        return vo;
    }

    @Transactional
    public HttpResponseEntity updateQuestionStatusById(QuestionnaireEntity entity) {
        QuestionnaireEntity entity1 = questionnaireEntityMapper.selectById(entity.getId());
        if (entity.getStatus() == QuestionnaireEntity.DELETE && entity1.getReleaseTime() != null) {
            return HttpResponseEntity.fail("问卷已经发送过");
        }
        if (entity.getStatus() == QuestionnaireEntity.STOP) {
            entity.setEndTime(new Date());
        }
        questionnaireEntityMapper.updateStatusById(entity);
        return HttpResponseEntity.ok();
    }

    @Transactional
    public void editQuestionnaire(QuestionVo vo) {
        QuestionnaireEntity entity = new QuestionnaireEntity();
        BeanUtils.copyProperties(vo, entity);
        Date date = new Date();
        entity.setLastUpdateDate(date);
        entity.setLastUpdatedBy(entity.getCreatedBy());
        entity.setStatus(QuestionnaireEntity.RUN);
        questionnaireEntityMapper.updateById(entity);

        problemService.deleteByQuestionnaireId(vo.getId());

        List<ProblemVo> list = vo.getQuestionList();
        problemService.batchSave(vo.getId(), list);
    }

    public List<QuestionVo> queryDeletedListByCreatedBy(QuestionnaireEntity entity) {
        entity.setStatus(QuestionnaireEntity.DELETE);
        return questionnaireEntityMapper.select(entity).stream().map(po -> {
            QuestionVo vo = new QuestionVo();
            BeanUtils.copyProperties(po, vo);
            //todo 答卷数
            vo.setCount(0L);
            return vo;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void modifyHistoryQuestionnaireStatus(QuestionnaireEntity entity) {
        questionnaireEntityMapper.updateStatusById(entity);
    }

    @Transactional
    public void deleteQuestionnaireById(String questionId) {
        questionnaireEntityMapper.deleteById(questionId);
        problemService.deleteByQuestionnaireId(questionId);
    }

    public List<QuestionnaireEntity> queryHistoryQuestionnaire(QuestionnaireEntity entity) {
        entity.setDataId(null);
        entity.setStatus(null);
        entity.setDataId(null);
        return questionnaireEntityMapper.queryDeletedListByCreatedBy(entity);
    }

    public List<QuestionnaireEntity> queryQuestionnaireMould(QuestionnaireEntity entity) {
        entity.setStatus(QuestionnaireEntity.DELETE);
        return questionnaireEntityMapper.queryDeletedListByCreatedBy(entity);
    }


    public static final Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");

    public static void main(String[] args) {
        System.out.println(emailPattern.matcher("qianyangblog@qq.com").matches());
    }

    @Transactional
    public void addSendQuestionnaire(SendVo vo) {
        List<Student> studentList = vo.getStudentList();
        List<Teacher> teacherList = vo.getTeacherList();
        Date releaseTime = new Date();
        QuestionnaireEntity entity = new QuestionnaireEntity();
        String questionId = vo.getQuestionId();
        entity.setId(questionId);
        entity.setQuestionEndContent(vo.getQuestionEndContent());
        String emailTitle = vo.getEmailTitle();
        entity.setEmailTitle(emailTitle);
        String emailContent = vo.getEmailContent();
        entity.setEmailContent(emailContent);
        entity.setReleaseTime(releaseTime);
        questionnaireEntityMapper.updateById(entity);
        if (vo.getSendType() == 1) {
            LinkedList<SendRecord> records = new LinkedList<>();
            if (vo.getDataId() == 1 && studentList != null) {
                for (Student student : studentList) {
                    String email = student.getEmail().trim();
                    student.setEmail(email);
                    String id = student.getId();
                    SendRecord sendRecord = sendRecordMapper.queryByQuestionIdAndPersonId(questionId, id);
                    if (sendRecord != null) continue;
                    if (emailPattern.matcher(email).matches()) {
                        SendRecord record = new SendRecord();
                        record.setDataId(1);
                        record.setId(UUIDUtil.getOneUUID());
                        record.setPersonId(id);
                        record.setQuestionnaireId(questionId);
                        record.setReleaseTime(releaseTime);
                        record.setSendType(1);
                        emailContent = emailContent.replaceFirst("【填写问卷地址】", "http://localhost:8085/pages/previewQuestionnaire.html?questionId=" + questionId + "&personId=" + id);
                        emailContent = emailContent.replaceFirst("【填写问卷地址】", "请点击这里");
                        emailContent = emailContent.replaceFirst("【联系人姓名】", student.getName());
                        records.add(record);
                        emailService.sendHtmlMail(email, emailTitle, emailContent);
                    }
                    if (studentMapper.queryById(id) == null) {
                        studentMapper.insert(student);
                    } else {
                        studentMapper.update(student);
                    }
                }
            } else if (vo.getDataId() == 2 && teacherList != null) {
                for (Teacher teacher : teacherList) {
                    String email = teacher.getEmail().trim();
                    teacher.setEmail(email);
                    String id = teacher.getId();
                    SendRecord sendRecord = sendRecordMapper.queryByQuestionIdAndPersonId(questionId, id);
                    if (sendRecord != null) continue;
                    if (emailPattern.matcher(email).matches()) {
                        SendRecord record = new SendRecord();
                        record.setDataId(1);
                        record.setId(UUIDUtil.getOneUUID());
                        record.setPersonId(id);
                        record.setQuestionnaireId(questionId);
                        record.setReleaseTime(releaseTime);
                        record.setSendType(1);
                        records.add(record);
                        emailContent = emailContent.replaceFirst("【填写问卷地址】", "http://localhost:8085/pages/previewQuestionnaire.html?questionId=" + questionId + "&personId=" + id);
                        emailContent = emailContent.replaceFirst("【填写问卷地址】", "请点击这里");
                        emailContent = emailContent.replaceFirst("【联系人姓名】", teacher.getName());
                        emailService.sendHtmlMail(email, emailTitle, emailContent);
                    }
                    if (teacherMapper.queryById(id) == null) {
                        teacherMapper.insert(teacher);
                    } else {
                        teacherMapper.update(teacher);
                    }
                }
            }
            if (records.size() > 0) {
                sendRecordMapper.insertBatch(records);
            }
        }
    }

    @Transactional
    public void saveQuestionnaireInfo(SendVo vo) {
        QuestionnaireEntity entity = new QuestionnaireEntity();
        entity.setId(vo.getQuestionId());
        entity.setQuestionEndContent(vo.getQuestionEndContent());
        entity.setEmailTitle(vo.getEmailTitle());
        entity.setEmailContent(vo.getEmailContent());
        questionnaireEntityMapper.updateById(entity);
    }


    public HttpResponseEntity checkFillAuth(String questionId, String personId) {
        QuestionVo vo = this.queryQuestionnaireById(questionId);
        //问卷是否在运行
        long cur = System.currentTimeMillis();
        long startTime = vo.getStartTime().getTime();
        long endTime = vo.getEndTime().getTime();
        if (cur < startTime || vo.getStatus() != QuestionnaireEntity.RUN) {
            return HttpResponseEntity.fail("问卷还没开始");
        }
        if (cur > endTime) {
            QuestionnaireEntity entity = new QuestionnaireEntity();
            entity.setId(vo.getId());
            entity.setStatus(QuestionnaireEntity.END);
            questionnaireEntityMapper.updateStatusById(entity);
            return HttpResponseEntity.fail("问卷已经结束");
        }
        if (vo.getReleaseTime() == null) {
            return HttpResponseEntity.fail("问卷还没发布");
        }
        SendRecord sr = sendRecordMapper.queryByQuestionIdAndPersonId(questionId, personId);
        if (sr == null) {
            return HttpResponseEntity.fail("你不在答题名额里面");
        }
        AnswerRecord answerRecord = answerRecordMapper.selectByQuestionIdAndPersonId(questionId, personId);
        if (answerRecord != null) {
            return HttpResponseEntity.fail("你已经答过了");
        }
        return HttpResponseEntity.ok();
    }

    @Transactional
    public void addAnswerQuestionnaire(AnswerVo vo) {
        AnswerRecord record = new AnswerRecord();
        BeanUtils.copyProperties(vo, record);
        record.setId(UUIDUtil.getOneUUID());
        answerRecordMapper.insert(record);
        List<AnswerResult> list = vo.getAnswerList().stream().map(item -> {
            AnswerResult result = new AnswerResult();
            BeanUtils.copyProperties(item, result);
            result.setId(UUIDUtil.getOneUUID());
            result.setPersonId(vo.getPersonId());
            return result;
        }).collect(Collectors.toList());
        answerResultMapper.insertBatch(list);
    }

    public HttpResponseEntity statisticalResults(String questionId) throws IOException {
        QuestionnaireEntity entity = questionnaireEntityMapper.selectById(questionId);
        if (entity.getReleaseTime() == null) {
            return HttpResponseEntity.fail("问卷还没有发布");
        }
        StatisticalResultsVo vo = new StatisticalResultsVo();
        BeanUtils.copyProperties(entity, vo);
        List<ProblemVo> problemVos = problemService.queryListByQuestionId(questionId);
        vo.setProblemList(problemVos);
        for (ProblemVo problemVo : problemVos) {
            List<AnswerResult> answerResults = answerResultMapper.queryListByProblemId(problemVo.getId());

            Integer type = problemVo.getQuestionType();
            List<QuestionOptionVo> list = problemVo.getQuestionOption();
            switch (type) {
                case 1:
                    multipleSelection(list, answerResults);
                    break;
                case 2:
                    problemVo.setQuestionOption(wordFrequencyCount(answerResults));
                    break;
                case 0:
                case 3:
                case 4:
                    singleChoice(list, answerResults);
                    break;
            }
        }
        return HttpResponseEntity.ok(vo);
    }

    private void singleChoice(List<QuestionOptionVo> list, List<AnswerResult> answerResults) {
        for (AnswerResult result : answerResults) {
            String value = result.getValue();
            for (QuestionOptionVo optionVo : list) {
                if (value.equals(optionVo.getOptionWord())) {
                    optionVo.setValue(optionVo.getValue() + 1);
                }
            }
        }
    }

    private void multipleSelection(List<QuestionOptionVo> list, List<AnswerResult> answerResults) {
        for (AnswerResult result : answerResults) {
            String[] split = result.getValue().split("@@");
            for (String value : split) {
                for (QuestionOptionVo optionVo : list) {
                    if (value.equals(optionVo.getOptionWord())) {
                        optionVo.setValue(optionVo.getValue() + 1);
                    }
                }
            }
        }
    }

    private List<QuestionOptionVo> wordFrequencyCount(List<AnswerResult> answerResults) throws IOException {
        StringBuilder builder = new StringBuilder();
        for (AnswerResult result : answerResults) {
            builder.append(result.getValue());
        }

        HashMap<String, Long> map = new HashMap<>();
        StringReader sr = new StringReader(builder.toString());
        IKSegmenter ik = new IKSegmenter(sr, true);
        Lexeme lex = null;
        while ((lex = ik.next()) != null) {
            String s = lex.getLexemeText();
            Long aLong = map.get(s);
            if (aLong == null) {
                aLong = 1L;
            } else {
                aLong += 1;
            }
            map.put(s, aLong);
        }
        List<QuestionOptionVo> questionOptionVos = new ArrayList<>(map.size());
        for (Map.Entry<String, Long> entry : map.entrySet()) {
            QuestionOptionVo vo = new QuestionOptionVo();
            vo.setOptionWord(entry.getKey());
            vo.setValue(entry.getValue());
            questionOptionVos.add(vo);
        }
        if (questionOptionVos.size() > 50) {
            questionOptionVos.sort((a, b) -> -a.getValue().compareTo(b.getValue()));
            return questionOptionVos.subList(0, 50);
        }
        return questionOptionVos;
    }

    public HttpResponseEntity queryQuestionnaireAboutSchool(SchoolVo schoolVo) {
        String questionId = schoolVo.getQuestionId();
        List<SendRecord> sendRecords = sendRecordMapper.queryListByQuestionId(questionId);
        if (sendRecords == null || sendRecords.size() == 0) {
            return HttpResponseEntity.fail("问卷没有发送过");
        }
        List<AnswerRecord> answerRecords = answerRecordMapper.queryListByQuestionId(questionId);
        Set<String> set = answerRecords.stream().map(AnswerRecord::getPersonId).collect(Collectors.toSet());
        List<String> ids = sendRecords.stream().map(SendRecord::getPersonId).collect(Collectors.toList());
        QuestionnaireEntity entity = questionnaireEntityMapper.selectById(questionId);
        List<SchoolVo> res = new ArrayList<>();
        String answerBelong = schoolVo.getAnswerBelong();
        boolean f = !StringUtils.isEmpty(answerBelong);
//        DecimalFormat format = new DecimalFormat("#.00");
        if ("1".equals(entity.getDataId())) {
            List<Student> students = studentMapper.queryListById(ids);
            HashMap<String, int[]> map = new HashMap<>();
            for (Student student : students) {
                String college = student.getCollege();
                if (f && !answerBelong.equals(college)) {
                    continue;
                }
                int[] ints = map.get(college);
                if (ints == null) {
                    if (set.contains(student.getId())) {
                        ints = new int[]{1, 1};
                    } else {
                        ints = new int[]{1, 0};
                    }
                    map.put(college, ints);
                } else {
                    ints[0] += 1;
                    if (set.contains(student.getId())) {
                        ints[1] += 1;
                    }
                    map.put(college, ints);
                }
            }
            int count = 1;
            for (Map.Entry<String, int[]> entry : map.entrySet()) {
                String key = entry.getKey();
                int[] value = entry.getValue();
                SchoolVo vo = new SchoolVo();
                vo.setAnswerBelong(key);
                vo.setAnswerTotal((long) value[0]);
                int i = value[0] - value[1];
                vo.setEffectiveAnswer((long) i);
                vo.setAnswerRate((i * 100.0 / (value[0])) + "%");
                vo.setId(String.valueOf(count++));
                res.add(vo);
            }
        } else {
            List<Teacher> Teachers = teacherMapper.queryListById(ids);
            HashMap<String, int[]> map = new HashMap<>();
            for (Teacher teacher : Teachers) {
                String college = teacher.getCollege();
                if (f && !answerBelong.equals(college)) {
                    continue;
                }
                int[] ints = map.get(college);
                if (ints == null) {
                    if (set.contains(teacher.getId())) {
                        ints = new int[]{1, 1};
                    } else {
                        ints = new int[]{1, 0};
                    }
                    map.put(college, ints);
                } else {
                    ints[0] += 1;
                    if (set.contains(teacher.getId())) {
                        ints[1] += 1;
                    }
                    map.put(college, ints);
                }
            }
            int count = 1;
            for (Map.Entry<String, int[]> entry : map.entrySet()) {
                String key = entry.getKey();
                int[] value = entry.getValue();
                SchoolVo vo = new SchoolVo();
                vo.setAnswerBelong(key);
                vo.setAnswerTotal((long) value[0]);
                int i = value[0] - value[1];
                vo.setEffectiveAnswer((long) i);
                vo.setAnswerRate((i * 100.0 / value[0]) + "%");
                vo.setId(String.valueOf(count++));
                res.add(vo);
            }
        }
        String sortOrder = schoolVo.getSortOrder();
        String sortName = schoolVo.getSortName();
        if (!StringUtils.isEmpty(sortName)) {
            f = "asc".equals(sortOrder);
            switch (sortName) {
                case "answerBelong":
                    if (f) {
                        res.sort(Comparator.comparing(SchoolVo::getAnswerBelong));
                    } else {
                        res.sort((a, b) -> -a.getAnswerBelong().compareTo(b.getAnswerBelong()));
                    }
                    break;
                case "answerRate":
                    if (f) {
                        res.sort(Comparator.comparing(SchoolVo::getAnswerRate));
                    } else {
                        res.sort((a, b) -> -a.getAnswerRate().compareTo(b.getAnswerRate()));
                    }
                    break;
                case "effectiveAnswer":
                    if (f) {
                        res.sort(Comparator.comparing(SchoolVo::getEffectiveAnswer));
                    } else {
                        res.sort((a, b) -> -a.getEffectiveAnswer().compareTo(b.getEffectiveAnswer()));
                    }
                    break;
                case "answerTotal":
                    if (f) {
                        res.sort(Comparator.comparing(SchoolVo::getAnswerTotal));
                    } else {
                        res.sort((a, b) -> -a.getAnswerTotal().compareTo(b.getAnswerTotal()));
                    }
                    break;
            }

        }
        return HttpResponseEntity.ok(res);
    }

    public HttpResponseEntity queryQuestionnaireCount(String questionId) {
        QuestionnaireEntity entity = questionnaireEntityMapper.selectById(questionId);
        if (entity.getReleaseTime() == null) {
            return HttpResponseEntity.fail("问卷还没有发布");
        }
        List<SendRecord> sendRecords = sendRecordMapper.queryListByQuestionId(questionId);
        List<AnswerRecord> answerRecords = answerRecordMapper.queryListByQuestionId(questionId);
        QuestionnaireCountVo vo = new QuestionnaireCountVo();
        String dataId = entity.getDataId();
        if ("1".equals(dataId)) {
            vo.setDataName("学生");
        } else {
            vo.setDataName("教师");
        }
        int size = answerRecords.size();
        vo.setQuestionCount(size);
        int size1 = sendRecords.size();
        vo.setAnswerTotal(size1);
        if (size1 == 0) {
            vo.setAnswerRate("0%");
        } else {
            vo.setAnswerRate((size * 100.0 / size1) + "%");
        }
        vo.setEffectiveAnswer(size);
        return HttpResponseEntity.ok(vo);
    }

    public List<QuestionnaireEntity> queryAllQuestionnaireByCreated(String createdBy) {
        return questionnaireEntityMapper.queryAllQuestionnaireByCreated(createdBy);
    }

    public HttpResponseEntity issuedQuestionnaire(String questionId) {
        List<SendRecord> sendRecords = sendRecordMapper.queryListByQuestionId(questionId);
        QuestionnaireEntity entity = questionnaireEntityMapper.selectById(questionId);
        if (sendRecords.size()==0 || entity.getReleaseTime()==null) {
            return HttpResponseEntity.fail("问卷还没有发送过");
        }
        String dataId = entity.getDataId();
        List<String> list = sendRecords.stream().map(SendRecord::getPersonId).collect(Collectors.toList());
        if ("1".equals(dataId)) {
            List<Student> students = studentMapper.queryListById(list);
            return HttpResponseEntity.ok(students);
        } else {
            List<Teacher> teachers = teacherMapper.queryListById(list);
            return HttpResponseEntity.ok(teachers);
        }
    }
}