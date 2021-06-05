from django.contrib import admin
from .models import Data

# Register your models here.
admin.site.register(Data) # 관리자 권한으로 DATA URL에 접속할 수 있게 함.