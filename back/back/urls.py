"""restAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter() # ROUTER를 사용하여 RESTAPI를 찾아가게 했었음. 현재 미사용.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('data.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #MEDIA 값을 SETTINGS에 추가 시켜놨기 때문에 SETTINGS에 있는 URL을 위 PATTERN에 더하게 되면 MEDIA값에 ACCESS 가능.
