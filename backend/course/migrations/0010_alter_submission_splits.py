# Generated by Django 5.1.1 on 2025-06-11 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0009_submission_splits'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='splits',
            field=models.JSONField(blank=True, default=dict, max_length=3000, null=True),
        ),
    ]
