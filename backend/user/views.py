from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser
from course.models import Enrollment, Course, Assignment, Submission
from course.serializers import CourseSerializer, AssignmentSerializer, SubmissionSerializer
from .serializers import CustomUserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        return Response({
            'token': token.key,
            'username': user.username,
            'role': user.role
        })

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_course_ids(self, user):
        course_ids = []
        if user.role == "student":
            course_ids = Enrollment.objects.filter(student=user).values_list('course_id', flat=True)
        elif user.role == "instructor": 
            course_ids = Course.objects.filter(instructor=user).values_list('id', flat=True)
        else:
            course_ids = Course.objects.values_list('id', flat=True)
        return course_ids


    @action(methods=['get'], detail=False, url_path='courses')
    def get_classes(self, request, pk=None):
        user = request.user
        course_ids = self.get_course_ids(user)
        courses = Course.objects.filter(id__in=course_ids)
        serilizer = CourseSerializer(courses, many=True)
        return Response(serilizer.data)
    
    @action(methods=['post'], detail=False, url_path="course")
    def post_course(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['get'], detail=False, url_path="assignments")
    def get_assignments(self, request, pk=None):
        user = request.user
        course_ids = self.get_course_ids(user)
        assignments = Assignment.objects.filter(course_id__in=course_ids)
        serilizer = AssignmentSerializer(assignments, many=True)
        return Response(serilizer.data)
    
    @action(methods=['get'], detail=False, url_path="submissions")
    def get_submissions(self, request, pk=None):
        student = request.user
        submissions = Submission.objects.filter(student=student)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)