from django.db import models


class Data(models.Model):
    id = models.CharField(max_length=20, primary_key=True,default='B')
    image = models.ImageField(upload_to='face', default='../media/james.jpg')


    def __str__(self):
        return self.id