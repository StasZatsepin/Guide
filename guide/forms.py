from django import forms
from .models import GuidePost
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class GuidePostForm(forms.ModelForm):
    class Meta:
        model = GuidePost
        exclude = ['created_at', 'updated_at']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Заголовок'}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Основное содержание', 'rows': 6}),
            'location': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Место'}),
            'category': forms.Select(attrs={'class': 'form-select'}),
            'is_published': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class RegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        label='Электронная почта',
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Электронная почта'})
    )

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Имя пользователя'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Пароль'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Повторите пароль'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].label = 'Имя пользователя'
        self.fields['username'].help_text = 'Только буквы, цифры и символы @/./+/-/_.'
        self.fields['password1'].label = 'Пароль'
        self.fields['password1'].help_text = ''  # Отключаем стандартные подсказки
        self.fields['password2'].label = 'Подтверждение пароля'
        self.fields['password2'].help_text = ''
        self.fields['email'].help_text = 'Введите ваш email.'
        self.fields['username'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Имя пользователя'})
        self.fields['password1'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Пароль'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Повторите пароль'})

    @property
    def password_requirements(self):
        return [
            'Пароль не должен быть похож на имя пользователя или email.',
            'Пароль должен содержать минимум 8 символов.',
            'Пароль не должен быть слишком простым.',
            'Пароль не должен состоять только из цифр.'
        ] 