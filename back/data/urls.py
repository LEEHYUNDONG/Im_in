from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


# URLPATTERN 등록
urlpatterns = [
    path('data/', views.data_list), # URL에 /DATA 태그를 붙이면 DATA_LIST를 볼 수 있게 한다.
]

urlpatterns = format_suffix_patterns(urlpatterns) # 뒤에 후위 표현식으로 연결 시켜주는 함수