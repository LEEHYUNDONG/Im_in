from django.db import models


# 모델
class Data(models.Model):
    id = models.CharField(max_length=20, primary_key=True,default='B') # ID는 CHAR 필드를 가진다.
    image = models.ImageField(upload_to='face', default='../media/james.jpg') # IMAGE를 저장시킬 변수


    def __str__(self):  # DATA를 CALL할 때 그것의 ID값을 화면에 문자열로 출력시키기 위한 함수
        return self.id