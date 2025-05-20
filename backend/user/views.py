from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser
from course.models import Enrollment, Course, Assignment
from course.serializers import CourseSerializer, AssignmentSerializer
from .serializers import CustomUserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

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

    @action(methods=['get'], detail=True, url_path='courses')
    def get_classes(self, request, pk=True):
        student = request.user
        course_ids = Enrollment.objects.filter(student=student).values_list('course_id', flat=True)
        courses = Course.objects.filter(id__in=course_ids)
        serilizer = CourseSerializer(courses, many=True)
        return Response(serilizer.data)
    
    @action(methods=['get'], detail=True, url_path="assignments")
    def get_assignments(self, request, pk=None):
        student = request.user
        course_ids = Enrollment.objects.filter(student=student).values_list('course_id', flat=True)
        assignments = Assignment.objects.filter(course_id__in=course_ids)
        serilizer = AssignmentSerializer(assignments, many=True)
        return Response(serilizer.data)