from django import forms
from django.conf import settings
from django.utils import timezone

from .models import Receipt


class ReceiptForm(forms.ModelForm):
    class Meta:
        model = Receipt
        fields = [
            "fn",
            "fd",
            "fp",
            "purchase_datetime",
            "amount",
        ]
        widgets = {
            "purchase_datetime": forms.DateTimeInput(
                attrs={
                    "type": "datetime-local",
                }
            ),
            "amount": forms.NumberInput(
                attrs={
                    "min": "1000",
                    "step": "0.01",
                }
            ),
        }

    def clean_purchase_datetime(self):
        value = self.cleaned_data["purchase_datetime"]

        if timezone.is_naive(value):
            value = timezone.make_aware(value)

        promo_start = settings.PROMO_START
        promo_end = settings.PROMO_END

        if value < promo_start or value > promo_end:
            raise forms.ValidationError(
                "Дата покупки должна находиться в периоде акции."
            )

        return value

    def clean_amount(self):
        amount = self.cleaned_data["amount"]

        if amount < 1000:
            raise forms.ValidationError(
                "Сумма покупки должна быть не менее 1000 рублей."
            )

        return amount

    def clean(self):
        cleaned_data = super().clean()

        fn = cleaned_data.get("fn")
        fd = cleaned_data.get("fd")
        fp = cleaned_data.get("fp")

        if fn and fd and fp:
            exists = Receipt.objects.filter(
                fn=fn,
                fd=fd,
                fp=fp,
            ).exists()

            if exists:
                raise forms.ValidationError(
                    "Чек с такими реквизитами уже зарегистрирован."
                )

        return cleaned_data
