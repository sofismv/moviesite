from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'birth_dt', 'bio', 'photo', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': False}} # Make password optional in your serializer

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(UserSerializer, self).__init__(*args, **kwargs)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        # If password is provided, hash it and update user instance.
        if password:
            user.password = make_password(password)
            user.save()
        
        return user
