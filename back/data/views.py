from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Data
from .serializers import DataSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def data_list(request, format=None):
    
    # List all properties, or create a new snippet.
    # GET 방식으로 SERIALIZER로 부터 데이터를 불러온다.
    if request.method == 'GET':
        images = Data.objects.all() # DATA에 들어 있는 OBJECT들을 IMAGES라는 변수에 저장한다.
        serializer = DataSerializer(images, many=True) # SERIALIZER와 IMAGE OBJECT들을 연결 시킴.
        return Response(serializer.data) # 에러가 없다면 RESPONSE 값으로 SERIALIZED 데이터를 RETURN 해준다.

    # POST일때
    elif request.method == 'POST':
        serializer = DataSerializer(data=request.data) # SERIALIZER와 IMAGE OBJECT들을 연결 시킴.
        if serializer.is_valid(): # SERIALIZER가 유효하다면 아래 코드를 실행한다.
            serializer.save() # SERIALIZER 데이터를 저장한다.
            return Response(serializer.data, status=status.HTTP_201_CREATED) # 데이터를 불러오지 못한다면 에러 상태를 RETURN한다.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # 커넥션이 안된 에러 상태