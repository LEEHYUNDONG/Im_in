from rest_framework import serializers
from .models import Data


# 모델에서 지정해준 DATA 쿼리 즉 테이블생성 시키는 것과 같은 기능 왜냐하면 데이터를 직렬화 하려면 데이터 각각의 구성 요소의 PROPERTY들을 지정해줘야 한다.
class DataSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta: # META 값
        model = Data # 모델에 즉 데이터를 모델로 받는다.
        fields = ['id', 'image'] #ID와 IMAGE 필드를 가진다.
        #fields = ['title']

    # 데이터 생성시
    def create(self, validated_data):
        return Data.objects.create(**validated_data)

    # 데이터 업데이트 시
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.image = validated_data.get('image', instance.image)

        instance.save() # UPDATE 시킨 인스턴스들을 저장한다.
        return instance