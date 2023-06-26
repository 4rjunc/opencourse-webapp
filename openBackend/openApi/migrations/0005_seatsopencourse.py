# Generated by Django 4.2.1 on 2023-06-26 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openApi', '0004_rename_stud_details_opencoursechoice_reg_no_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeatsOpenCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sanskrit', models.IntegerField(blank=True, null=True)),
                ('commerce', models.IntegerField(blank=True, null=True)),
                ('cs', models.IntegerField(blank=True, null=True)),
                ('pe', models.IntegerField(blank=True, null=True)),
                ('botony', models.IntegerField(blank=True, null=True)),
                ('chemistry', models.IntegerField(blank=True, null=True)),
                ('physics', models.IntegerField(blank=True, null=True)),
                ('economics', models.IntegerField(blank=True, null=True)),
                ('politics', models.IntegerField(blank=True, null=True)),
                ('hindi', models.IntegerField(blank=True, null=True)),
                ('english', models.IntegerField(blank=True, null=True)),
                ('malayalam', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
