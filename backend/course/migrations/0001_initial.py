# Generated by Django 5.1.1 on 2025-05-14 01:18

import course.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('assignment_file', models.FileField(upload_to=course.models.assignment_file_path)),
                ('public_test_file', models.FileField(upload_to=course.models.assignment_file_path)),
                ('private_test_file', models.FileField(upload_to=course.models.assignment_file_path)),
                ('deadline', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_file', models.FileField(upload_to=course.models.submission_file_path)),
                ('score', models.FloatField(default=0.0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
