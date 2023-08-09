# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Absentee(models.Model):
    hour = models.OneToOneField(
        "HoursTaken", models.DO_NOTHING, primary_key=True
    )  # The composite primary key (hour_id, stud_id) found, that is not supported. The first column is selected.
    stud = models.ForeignKey("StudMaster", models.DO_NOTHING)
    status_id = models.IntegerField(blank=True, null=True)
    grace = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = "absentee"
        unique_together = (("hour", "stud"),)

    def __str__(self):
        return self.hour


class Caste(models.Model):
    caste_id = models.AutoField(primary_key=True)
    caste_name = models.CharField(max_length=50, blank=True, null=True)
    religion = models.ForeignKey("Religion", models.DO_NOTHING, blank=True, null=True)
    cat = models.ForeignKey("Category", models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "caste"


class Category(models.Model):
    cat_id = models.AutoField(primary_key=True)
    cat_name = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "category"


class CommonCourse(models.Model):
    course = models.OneToOneField("Course", models.DO_NOTHING, primary_key=True)
    common_course_type = models.ForeignKey(
        "CommonCourseType", models.DO_NOTHING, blank=True, null=True
    )

    class Meta:
        managed = False
        db_table = "common_course"


class CommonCourseType(models.Model):
    common_course_type_id = models.IntegerField(primary_key=True)
    common_course_type_dec = models.CharField(max_length=30, blank=True, null=True)
    dept = models.ForeignKey("Department", models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "common_course_type"


class Course(models.Model):
    course_id = models.IntegerField(primary_key=True)
    course_title = models.CharField(max_length=100, blank=True, null=True)
    course_code = models.CharField(max_length=12, blank=True, null=True)
    lab_theory = models.CharField(max_length=1, blank=True, null=True)
    course_type = models.ForeignKey(
        "CourseType", models.DO_NOTHING, blank=True, null=True
    )
    dept = models.ForeignKey("Department", models.DO_NOTHING, blank=True, null=True)
    semester = models.IntegerField(blank=True, null=True)
    syllabus_intro_year = models.IntegerField(blank=True, null=True)
    credits = models.IntegerField(blank=True, null=True)
    total_internal = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    total_external = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    grad_level = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "course"

    # added today show example
    def __str__(self):
        return self.course_title


class CourseType(models.Model):
    course_type_id = models.IntegerField(primary_key=True)
    course_type_desc = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "course_type"

    def __str__(self):
        return self.course_type_desc


class Department(models.Model):
    dept_id = models.IntegerField(primary_key=True)
    dept_name = models.CharField(max_length=80, blank=True, null=True)
    stream = models.ForeignKey("Stream", models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "department"

    def __str__(self):
        return self.dept_name


class Designation(models.Model):
    designation_id = models.IntegerField(primary_key=True)
    designation_name = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "designation"


class District(models.Model):
    dist_id = models.IntegerField(primary_key=True)
    state_id = models.IntegerField(blank=True, null=True)
    dist_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "district"


class Examboard(models.Model):
    board_id = models.IntegerField(primary_key=True)
    board_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "examboard"


class FbAnswer(models.Model):
    ans_id = models.IntegerField(primary_key=True)
    type = models.ForeignKey("FbQuestionType", models.DO_NOTHING, blank=True, null=True)
    answer_desc = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_answer"


class FbCollegeDesc(models.Model):
    fb = models.OneToOneField(
        "FbFeedback", models.DO_NOTHING, primary_key=True
    )  # The composite primary key (fb_id, q_id) found, that is not supported. The first column is selected.
    q = models.ForeignKey("FbQuestion", models.DO_NOTHING)
    answer_desc = models.CharField(max_length=100, blank=True, null=True)
    answer_comment = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_college_desc"
        unique_together = (("fb", "q"),)


class FbCollegeMcq(models.Model):
    fb = models.OneToOneField(
        "FbFeedback", models.DO_NOTHING, primary_key=True
    )  # The composite primary key (fb_id, q_id) found, that is not supported. The first column is selected.
    q = models.ForeignKey("FbQuestion", models.DO_NOTHING)
    ans = models.ForeignKey(FbAnswer, models.DO_NOTHING, blank=True, null=True)
    answer_comment = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_college_mcq"
        unique_together = (("fb", "q"),)


class FbCollegeTeacher(models.Model):
    fb = models.OneToOneField(
        "FbFeedback", models.DO_NOTHING, primary_key=True
    )  # The composite primary key (fb_id, q_id) found, that is not supported. The first column is selected.
    q = models.ForeignKey("FbQuestion", models.DO_NOTHING)
    teacher = models.ForeignKey("Teacher", models.DO_NOTHING, blank=True, null=True)
    answer_comment = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_college_teacher"
        unique_together = (("fb", "q"),)


class FbFeedback(models.Model):
    fb_id = models.CharField(primary_key=True, max_length=50)
    pgm = models.ForeignKey("Programme", models.DO_NOTHING, blank=True, null=True)
    year_of_admn = models.IntegerField(blank=True, null=True)
    fb_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_feedback"


class FbLogin(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(unique=True, max_length=20, blank=True, null=True)
    pwd = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_login"


class FbQuestion(models.Model):
    q_id = models.IntegerField(primary_key=True)
    q_desc = models.CharField(max_length=400, blank=True, null=True)
    cat = models.ForeignKey(
        "FbQuestionCategory", models.DO_NOTHING, blank=True, null=True
    )
    type = models.ForeignKey("FbQuestionType", models.DO_NOTHING, blank=True, null=True)
    additional_answer = models.IntegerField(blank=True, null=True)
    mandatory = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_question"


class FbQuestionCategory(models.Model):
    cat_id = models.IntegerField(primary_key=True)
    cat_desc = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_question_category"


class FbQuestionType(models.Model):
    type_id = models.IntegerField(primary_key=True)
    type_desc = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_question_type"


class FbTeacherDesc(models.Model):
    fb = models.OneToOneField(
        FbFeedback, models.DO_NOTHING, primary_key=True
    )  # The composite primary key (fb_id, teacher_id, q_id) found, that is not supported. The first column is selected.
    teacher = models.ForeignKey("Teacher", models.DO_NOTHING)
    q = models.ForeignKey(FbQuestion, models.DO_NOTHING)
    answer_desc = models.CharField(max_length=100, blank=True, null=True)
    answer_comment = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_teacher_desc"
        unique_together = (("fb", "teacher", "q"),)


class FbTeacherMcq(models.Model):
    fb = models.OneToOneField(
        FbFeedback, models.DO_NOTHING, primary_key=True
    )  # The composite primary key (fb_id, teacher_id, q_id) found, that is not supported. The first column is selected.
    teacher = models.ForeignKey("Teacher", models.DO_NOTHING)
    q = models.ForeignKey(FbQuestion, models.DO_NOTHING)
    ans = models.ForeignKey(FbAnswer, models.DO_NOTHING, blank=True, null=True)
    answer_comment = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_teacher_mcq"
        unique_together = (("fb", "teacher", "q"),)


class FbTeacherNumeric(models.Model):
    fb = models.OneToOneField(
        FbFeedback, models.DO_NOTHING, primary_key=True
    )  # The composite primary key (fb_id, teacher_id, q_id) found, that is not supported. The first column is selected.
    teacher = models.ForeignKey("Teacher", models.DO_NOTHING)
    q = models.ForeignKey(FbQuestion, models.DO_NOTHING)
    answer_value = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )
    answer_comment = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "fb_teacher_numeric"
        unique_together = (("fb", "teacher", "q"),)


class FeedbackUrls(models.Model):
    teacher_id = models.AutoField(
        primary_key=True
    )  # The composite primary key (teacher_id, part) found, that is not supported. The first column is selected.
    name = models.CharField(max_length=50, blank=True, null=True)
    feedback_url = models.CharField(max_length=500, blank=True, null=True)
    active = models.IntegerField()
    part = models.IntegerField()
    department = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "feedback_urls"
        unique_together = (("teacher_id", "part"),)


class GraceAttType(models.Model):
    id = models.SmallIntegerField(primary_key=True)
    description = models.CharField(max_length=30)
    max = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = "grace_att_type"


class HoursTaken(models.Model):
    hour_id = models.AutoField(primary_key=True)
    hour_date = models.DateField(blank=True, null=True)
    section = models.ForeignKey(
        "Takes",
        models.DO_NOTHING,
        to_field="section_id",
        blank=True,
        null=True,
        unique=True,
    )
    teacher = models.ForeignKey(
        "Takes",
        models.DO_NOTHING,
        related_name="hourstaken_teacher_set",
        blank=True,
        null=True,
    )
    status = models.ForeignKey("Status", models.DO_NOTHING, blank=True, null=True)
    time_slot = models.ForeignKey("TimeSlot", models.DO_NOTHING, blank=True, null=True)
    pgm = models.ForeignKey("Programme", models.DO_NOTHING, blank=True, null=True)
    regular = models.TextField(
        db_column="Regular"
    )  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = "hours_taken"

        constraints = [
            models.UniqueConstraint(fields=["section"], name="unique_section"),
        ]


class InternalExam(models.Model):
    exam_id = models.CharField(primary_key=True, max_length=10)
    pgm_id = models.IntegerField()
    section = models.ForeignKey("Section", models.DO_NOTHING, blank=True, null=True)
    max_marks = models.DecimalField(
        max_digits=4, decimal_places=2, blank=True, null=True
    )
    exam_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "internal_exam"


class InternalExamMarks(models.Model):
    exam = models.OneToOneField(
        InternalExam, models.DO_NOTHING, primary_key=True
    )  # The composite primary key (exam_id, stud_id) found, that is not supported. The first column is selected.
    stud = models.ForeignKey("StudMaster", models.DO_NOTHING)
    marks = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "internal_exam_marks"
        unique_together = (("exam", "stud"),)


class OpenAllotment(models.Model):
    stud = models.OneToOneField("StudMaster", models.DO_NOTHING, primary_key=True)
    section = models.ForeignKey("Section", models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "open_allotment"


class PgmCourse(models.Model):
    pgm = models.ForeignKey("Programme", models.DO_NOTHING, blank=True, null=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "pgm_course"


class Programme(models.Model):
    pgm_id = models.IntegerField(primary_key=True)
    pgm_name = models.CharField(max_length=100, blank=True, null=True)
    dept = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    no_of_sems = models.IntegerField(blank=True, null=True)
    grad_level = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "programme"

    def __str__(self):
        return self.pgm_name


class Quota(models.Model):
    quota_id = models.IntegerField(primary_key=True)
    quota_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "quota"


class Religion(models.Model):
    religion_id = models.IntegerField(primary_key=True)
    religion_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "religion"


class Role(models.Model):
    role_id = models.IntegerField(primary_key=True)
    role_name = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "role"


class Section(models.Model):
    section_id = models.AutoField(primary_key=True, unique=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    part = models.SmallIntegerField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    active = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "section"


class StaffLogin(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(unique=True, max_length=20, blank=True, null=True)
    pwd = models.CharField(max_length=40, blank=True, null=True)
    role = models.ForeignKey(Role, models.DO_NOTHING, blank=True, null=True)
    teacher = models.ForeignKey("Teacher", models.DO_NOTHING, blank=True, null=True)
    pwd_sl_no = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "staff_login"


class State(models.Model):
    state_id = models.IntegerField(primary_key=True)
    state_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "state"


class Status(models.Model):
    status_id = models.IntegerField(primary_key=True)
    status_desc = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "status"


class Stream(models.Model):
    stream_id = models.IntegerField(primary_key=True)
    stream_name = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "stream"

    def __str__(self):
        return self.stream_name


class StudMaster(models.Model):
    stud_id = models.AutoField(primary_key=True)
    admn_no = models.IntegerField(unique=True, blank=True, null=True)
    roll_no = models.IntegerField(blank=True, null=True)
    uty_reg_no = models.CharField(
        max_length=12, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    name = models.CharField(max_length=50, db_collation="utf8mb3_general_ci")
    year_of_admn = models.IntegerField(blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    sex = models.CharField(max_length=1, db_collation="utf8mb3_general_ci")
    caste = models.ForeignKey(Caste, models.DO_NOTHING, blank=True, null=True)
    religion = models.ForeignKey(Religion, models.DO_NOTHING, blank=True, null=True)
    email = models.CharField(
        unique=True,
        max_length=100,
        db_collation="utf8mb3_general_ci",
        blank=True,
        null=True,
    )
    contact_no = models.CharField(
        max_length=20, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    parent_name = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    parent_occupation = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    parent_mob = models.CharField(
        max_length=20, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    parent_land = models.CharField(
        max_length=20, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    house_name = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    street = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    place = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    dist = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    state = models.CharField(
        max_length=50, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    pincode = models.CharField(
        max_length=6, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    pgm = models.ForeignKey(Programme, models.DO_NOTHING, blank=True, null=True)
    marks_sslc = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    marks_twelth = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    board_twelth = models.IntegerField(blank=True, null=True)
    quota = models.CharField(
        max_length=10, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    photo = models.CharField(
        max_length=100, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    status = models.CharField(
        max_length=10, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    comments = models.CharField(
        max_length=100, db_collation="utf8mb3_general_ci", blank=True, null=True
    )
    current_sem = models.IntegerField(blank=True, null=True)
    language = models.ForeignKey(
        CommonCourseType, models.DO_NOTHING, blank=True, null=True
    )
    annual_income = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    differently_abled = models.TextField(
        blank=True, null=True
    )  # This field type is a guess.
    date_of_admission = models.DateField()
    date_of_leaving = models.DateField(blank=True, null=True)
    egrantz = models.TextField(blank=True, null=True)  # This field type is a guess.
    fish_egrantz = models.TextField(
        blank=True, null=True
    )  # This field type is a guess.

    class Meta:
        managed = False
        db_table = "stud_master"

    def __str__(self):
        return f"{self.name} , {self.uty_reg_no}"
    #def __str__(self):
     #   return f"Stud ID: {self.stud_id}, Admn No: {self.admn_no}, Roll No: {self.roll_no}, UTY Reg No: {self.uty_reg_no}, Name: {self.name}, Year of Admn: {self.year_of_admn}, DOB: {self.dob}, Sex: {self.sex}, Caste: {self.caste}, Religion: {self.religion}, Email: {self.email}, Contact No: {self.contact_no}, Parent Name: {self.parent_name}, Parent Occupation: {self.parent_occupation}, Parent Mob: {self.parent_mob}, Parent Land: {self.parent_land}, House Name: {self.house_name}, Street: {self.street}, Place: {self.place}, Dist: {self.dist}, State: {self.state}, Pincode: {self.pincode}, PGM: {self.pgm}, Marks SSLC: {self.marks_sslc}, Marks Twelth: {self.marks_twelth}, Board Twelth: {self.board_twelth}, Quota: {self.quota}, Photo: {self.photo}, Status: {self.status}, Comments: {self.comments}, Current Sem: {self.current_sem}, Language: {self.language}, Annual Income: {self.annual_income}, Differently Abled: {self.differently_abled}, Date of Admission: {self.date_of_admission}, Date of Leaving: {self.date_of_leaving}, Egrantz: {self.egrantz}, Fish Egrantz: {self.fish_egrantz}"


class Takes(models.Model):
    teacher = models.OneToOneField(
        "Teacher", models.DO_NOTHING, primary_key=True
    )  # The composite primary key (teacher_id, section_id) found, that is not supported. The first column is selected.
    section_id = models.IntegerField(unique=True)

    class Meta:
        managed = False
        db_table = "takes"
        unique_together = (("teacher", "section_id"),)


class Tc(models.Model):
    tc_no = models.PositiveSmallIntegerField(
        primary_key=True
    )  # The composite primary key (tc_no, year) found, that is not supported. The first column is selected.
    year = models.PositiveSmallIntegerField()
    stud = models.ForeignKey(StudMaster, models.DO_NOTHING, blank=True, null=True)
    tc_app_date = models.DateField()
    tc_issue_date = models.DateField()
    reason = models.ForeignKey("TcReasons", models.DO_NOTHING)
    date_of_leaving = models.DateField()
    exam_month = models.DateField(blank=True, null=True)
    scholarship = models.CharField(max_length=3, blank=True, null=True)
    dues_cleared = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = "tc"
        unique_together = (("tc_no", "year"),)


class TcReasons(models.Model):
    reason_id = models.IntegerField(primary_key=True)
    reason_desc = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = "tc_reasons"


class Teacher(models.Model):
    teacher_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=60, blank=True, null=True)
    designation = models.ForeignKey(
        Designation, models.DO_NOTHING, blank=True, null=True
    )
    dept = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True)
    mob = models.CharField(max_length=15, blank=True, null=True)
    land = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(max_length=60, blank=True, null=True)
    caste = models.ForeignKey(Caste, models.DO_NOTHING, blank=True, null=True)
    religion = models.ForeignKey(Religion, models.DO_NOTHING, blank=True, null=True)
    house_name = models.CharField(max_length=50, blank=True, null=True)
    street = models.CharField(max_length=50, blank=True, null=True)
    place = models.CharField(max_length=50, blank=True, null=True)
    dist = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    pincode = models.CharField(max_length=6, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    doj = models.DateField(blank=True, null=True)
    sex = models.CharField(max_length=1, blank=True, null=True)
    photo = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "teacher"


class TimeSlot(models.Model):
    time_slot_id = models.IntegerField(primary_key=True)
    start_time = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    end_time = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True
    )
    session = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "time_slot"


class Tutor(models.Model):
    teacher_id = models.IntegerField(blank=True, null=True)
    pgm_id = models.IntegerField(blank=True, null=True)
    year_of_admn = models.IntegerField(blank=True, null=True)
    semester = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "tutor"


class WorkingDays(models.Model):
    year = models.IntegerField(blank=True, null=True)
    sem = models.IntegerField(blank=True, null=True)
    work_day = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "working_days"


# Table to store data of students on their Course Priority
class OpenCourseChoice(models.Model):
    course_code = models.CharField(blank=True, null=True, max_length=20)
    choice = models.IntegerField(blank=True, null=True)
    stud_id = models.ForeignKey(StudMaster, models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{str(self.stud_id.name)}, {self.stud_id.uty_reg_no}"


# Add table to list out seats in each dept. for opencourse
class SeatsOpenCourse(models.Model):
    id = models.AutoField(primary_key=True)
    BOT = models.IntegerField(blank=True, null=True, verbose_name="Botany")
    CHE = models.IntegerField(blank=True, null=True, verbose_name="Chemistry")
    COM = models.IntegerField(blank=True, null=True, verbose_name="Commerce")
    CSC = models.IntegerField(blank=True, null=True, verbose_name="Computer Science")
    ECO = models.IntegerField(blank=True, null=True, verbose_name="Economics")
    MAT = models.IntegerField(blank=True, null=True, verbose_name="Maths")
    PED = models.IntegerField(blank=True, null=True, verbose_name="Physical Education")
    PHY = models.IntegerField(blank=True, null=True, verbose_name="Physics")
    POL = models.IntegerField(blank=True, null=True, verbose_name="Politics")
    SKT = models.IntegerField(blank=True, null=True, verbose_name="Sanskrit")
    STA = models.IntegerField(blank=True, null=True, verbose_name="Statistics")
    ZLG = models.IntegerField(blank=True, null=True, verbose_name="Zoology")
    HIS = models.IntegerField(blank=True, null=True, verbose_name="History")
    ENG = models.IntegerField(blank=True, null=True, verbose_name="English")
    MAL = models.IntegerField(blank=True, null=True, verbose_name="Malayalam")

    def __str__(self):
        return "Seating"

    class Meta:
        # Add a unique constraint to ensure only one row is stored
        constraints = [
            models.UniqueConstraint(
                fields=["id"],
                name="unique_seats_open_course",
            ),
        ]

    def save(self, *args, **kwargs):
        # Override the save method to ensure only one instance is saved
        self.id = 1  # Set the id to 1
        super().save(*args, **kwargs)
