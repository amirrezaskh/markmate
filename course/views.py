from django.shortcuts import render
from rest_framework import viewsets
from .models import Course, Enrollment, Assignment, Submission
from .serializers import CourseSerializer, EnrollmentSerializer, AssignmentSerializer, SubmissionSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.select_related('instructor').all()
    serializer_class = CourseSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.select_related('student', 'course').all()
    serializer_class = EnrollmentSerializer


class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.select_related('course').all()
    serializer_class = AssignmentSerializer


class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.select_related('student', 'assignment').all()
    serializer_class = SubmissionSerializer
