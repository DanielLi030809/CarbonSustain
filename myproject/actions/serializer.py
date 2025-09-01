from rest_framework import serializers

class ActionSerializer(serializers.Serializer):
    action = serializers.CharField(max_length=255)
    date = serializers.DateField()
    points = serializers.IntegerField()