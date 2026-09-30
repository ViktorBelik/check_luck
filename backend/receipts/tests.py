from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import TestCase

from .forms import ReceiptForm
from .models import Receipt


User = get_user_model()


class ReceiptFormTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="test_user",
            password="test_password",
        )

        self.valid_data = {
            "fn": "123456789",
            "fd": "12345",
            "fp": "987654321",
            "purchase_datetime": "2026-10-15 12:00:00+03:00",
            "amount": "1500.00",
        }

    def test_valid_receipt(self):
        form = ReceiptForm(data=self.valid_data)

        self.assertTrue(form.is_valid())

    def test_amount_less_than_1000(self):
        data = self.valid_data.copy()
        data["amount"] = "999.99"

        form = ReceiptForm(data=data)

        self.assertFalse(form.is_valid())
        self.assertIn("amount", form.errors)

    def test_purchase_date_before_promo(self):
        data = self.valid_data.copy()
        data["purchase_datetime"] = "2026-09-31 12:00:00+03:00"

        form = ReceiptForm(data=data)

        self.assertFalse(form.is_valid())
        self.assertIn("purchase_datetime", form.errors)

    def test_purchase_date_after_promo(self):
        data = self.valid_data.copy()
        data["purchase_datetime"] = "2027-01-01 12:00:00+03:00"

        form = ReceiptForm(data=data)

        self.assertFalse(form.is_valid())
        self.assertIn("purchase_datetime", form.errors)

    def test_duplicate_receipt(self):
        Receipt.objects.create(
            user=self.user,
            fn="123456789",
            fd="12345",
            fp="987654321",
            purchase_datetime="2026-10-15T12:00:00+03:00",
            amount=Decimal("1500.00"),
        )

        form = ReceiptForm(data=self.valid_data)

        self.assertFalse(form.is_valid())
        self.assertIn("__all__", form.errors)
