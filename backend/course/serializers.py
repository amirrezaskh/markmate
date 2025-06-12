from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import *
from user.models import *


class CourseSerializer(ModelSerializer):
    students = SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'instructor', 'title', 'description', 'students']

    def get_students(self, obj):
        return obj.enrollment_set.values_list('student_id', flat=True)


class EnrollmentSerializer(ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course']


class AssignmentSerializer(ModelSerializer):
    submissions = SerializerMethodField()
    assignment_file = serializers.FileField(required=False, allow_null=True)
    public_test_file = serializers.FileField(required=False, allow_null=True)
    private_test_file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'course', 'rubric', 'assignment_file', 'solution_file',
                  'public_test_file', 'private_test_file', 'deadline', 'created_at', 'submissions']

    def get_submissions(self, obj):
        return obj.submission_set.values_list('id', flat=True)


class SubmissionSerializer(ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'student', 'assignment', 'submission_file', 'splits', 'score', 'created_at']

class AutoSubmissionSerializer(ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'student', 'assignment', 'submission_file', 'splits', 'score', 'created_at']
        read_only_fields = ['student']