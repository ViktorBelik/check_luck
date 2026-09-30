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

    def clean_purchase_datetime(self):
        purchase_datetime = self.cleaned_data["purchase_datetime"]

        if timezone.is_naive(purchase_datetime):
            purchase_datetime = timezone.make_aware(purchase_datetime)

        if not (
            settings.PROMO_START
            <= purchase_datetime
            <= settings.PROMO_END
        ):
            raise forms.ValidationError(
                "Дата покупки находится вне периода акции."
            )

        return purchase_datetime

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
            receipt_exists = Receipt.objects.filter(
                fn=fn,
                fd=fd,
                fp=fp,
            ).exists()

            if receipt_exists:
                raise forms.ValidationError(
                    "Такой чек уже зарегистрирован."
                )

        return cleaned_data
