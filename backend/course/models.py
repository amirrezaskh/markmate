import os
from django.db import models
from user.models import CustomUser


class Course(models.Model):
    instructor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.course.title}: {self.student.username}"


def assignment_file_path(instance, filename):
    return os.path.join('files', 'assignments', str(instance.course.id), str(instance.title), filename)

def solution_file_path(instance, filename):
    return os.path.join('files', 'solutions', str(instance.course.id), str(instance.title), filename)

def submission_file_path(instance, filename):
    return os.path.join('files', 'submissions', str(instance.assignment.id), str(instance.student.id), filename)


class Assignment(models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=False, blank=False)
    rubric = models.JSONField(max_length=10000, blank=False, null=False)
    assignment_file = models.FileField(max_length=255, upload_to=assignment_file_path, blank=True, null=True)
    solution_file = models.FileField(max_length=255, upload_to=solution_file_path, blank=True, null=True)
    public_test_file = models.FileField(max_length=255, upload_to=assignment_file_path, blank=True, null=True)
    private_test_file = models.FileField(max_length=255, upload_to=assignment_file_path, blank=True, null=True)
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Submission(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    submission_file = models.FileField(max_length=255, upload_to=submission_file_path, blank=True, null=True)
    splits = models.JSONField(max_length=30000, blank=True, null=True, default=list)
    score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.assignment}"
