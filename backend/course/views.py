import requests
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Course, Enrollment, Assignment, Submission
from user.models import CustomUser
from user.serializers import CustomUserSerializer
from .serializers import CourseSerializer, EnrollmentSerializer, AssignmentSerializer, SubmissionSerializer
from rest_framework import status


class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Course.objects.select_related('instructor').all()
    serializer_class = CourseSerializer

    @action(methods=["get"], detail=True, url_path='assignments')
    def get_assignments(self, request, pk=None):
        course = self.get_object()
        assignments = Assignment.objects.filter(course=course)
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='students')
    def get_students(self, request, pk=None):
        course = self.get_object()
        student_ids = Enrollment.objects.filter(
            course=course).values_list('student_id', flat=True)
        students = CustomUser.objects.filter(id__in=student_ids)
        serializer = CustomUserSerializer(students, many=True)
        return Response(serializer.data)


class EnrollmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Enrollment.objects.select_related('student', 'course').all()
    serializer_class = EnrollmentSerializer


class AssignmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Assignment.objects.select_related('course').all()
    serializer_class = AssignmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], url_path='submissions')
    def get_submissions(self, request, pk=None):
        assignment = self.get_object()
        submissions = Submission.objects.filter(assignment=assignment)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)


class SubmissionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Submission.objects.select_related('student', 'assignment').all()
    serializer_class = SubmissionSerializer

    @action(detail=True, methods=['PUT'], url_path='split')
    def get_splits(self, request, pk=None):
        submission = self.get_object()
        try:
            response = requests.post("http://localhost:8080/split/", json={
                "assignment_path": submission.assignment.assignment_file.path,
                "submission_path": submission.submission_file.path,
                "rubric": submission.assignment.rubric
            })
            response.raise_for_status()
            submission.splits = response.json()
            submission.save()
            return Response(SubmissionSerializer(submission).data, status=status.HTTP_200_OK)
        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
