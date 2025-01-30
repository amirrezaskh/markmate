from rest_framework.serializers import ModelSerializer, SerializerMethodField
from user.models import CustomUser


class CustomUserSerializer(ModelSerializer):
    courses = SerializerMethodField()
    submissions = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'first_name',
                  'last_name', 'date_joined', 'last_login', 'courses', 'submissions']

    def get_courses(self, obj):
        return obj.enrollment_set.values_list('course_id', flat=True)

    def get_submissions(self, obj):
        return obj.submission_set.values_list('id', flat=True)
