# Generated by Django 4.2.1 on 2023-06-26 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openApi', '0006_alter_seatsopencourse_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seatsopencourse',
            name='malayalam',
        ),
        migrations.AddField(
            model_name='seatsopencourse',
            name='MAL',
            field=models.IntegerField(blank=True, null=True, verbose_name='Malayalam'),
        ),
    ]
