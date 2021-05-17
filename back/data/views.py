from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from snippets.models import Snippet
#from snippets.serializers import SnippetSerializer
from .models import Data
from .serializers import DataSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def data_list(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        images = Data.objects.all()
        serializer = DataSerializer(images, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)