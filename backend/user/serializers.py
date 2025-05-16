from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField
from user.models import CustomUser


class CustomUserSerializer(ModelSerializer):
    courses = SerializerMethodField()
    submissions = SerializerMethodField()
    password = CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'role', 'first_name',
                  'last_name', 'date_joined', 'last_login', 'courses', 'submissions']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def get_courses(self, obj):
        return obj.enrollment_set.values_list('course_id', flat=True)

    def get_submissions(self, obj):
        return obj.submission_set.values_list('id', flat=True)
