# Generated by Django 4.0.4 on 2022-06-01 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_userprofile_date_of_birth_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
