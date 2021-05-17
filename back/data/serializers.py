from rest_framework import serializers
from .models import Data


class DataSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Data
        fields = ['id', 'image']
        #fields = ['title']

    def create(self, validated_data):
        return Data.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.image = validated_data.get('image', instance.image)

        instance.save()
        return instance