# Generated by Django 3.0.3 on 2021-01-09 23:12

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0006_auto_20210109_2248'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, db_index=True, default=datetime.datetime(2021, 1, 9, 23, 12, 52, 485669, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
