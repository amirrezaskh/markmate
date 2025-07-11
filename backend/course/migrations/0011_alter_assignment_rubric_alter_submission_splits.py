# Generated by Django 5.1.1 on 2025-06-11 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0010_alter_submission_splits'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='rubric',
            field=models.JSONField(max_length=10000),
        ),
        migrations.AlterField(
            model_name='submission',
            name='splits',
            field=models.JSONField(blank=True, default=list, max_length=30000, null=True),
        ),
    ]
