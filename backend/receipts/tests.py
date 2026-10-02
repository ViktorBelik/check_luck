from django.utils import timezone
from datetime import datetime
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import Client, TestCase

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


class ReceiptApiTest(TestCase):
    def setUp(self):
        self.client = Client()

        self.user = User.objects.create_user(
            username="user1",
            password="password123",
        )

        self.other_user = User.objects.create_user(
            username="user2",
            password="password123",
        )

    def create_receipt(self, user, number):
        return Receipt.objects.create(
            user=user,
            fn=f"fn-{number}",
            fd=f"fd-{number}",
            fp=f"fp-{number}",
            purchase_datetime=timezone.make_aware(datetime(2026, 10, 15, 12, 0)),
            amount=Decimal("1500.00"),
        )

    def test_unauthorized_user_cannot_get_receipts(self):
        response = self.client.get("/api/receipts/")

        self.assertEqual(response.status_code, 302)

    def test_user_sees_only_own_receipts(self):
        own_receipt = self.create_receipt(self.user, 1)
        self.create_receipt(self.other_user, 2)

        self.client.force_login(self.user)

        response = self.client.get("/api/receipts/")

        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertEqual(data["pagination"]["total"], 1)
        self.assertEqual(data["results"][0]["id"], own_receipt.id)

        self.assertIn(
            "registration_date",
            data["results"][0],
        )

    def test_user_id_parameter_does_not_break_isolation(self):
        self.create_receipt(self.user, 1)
        other_receipt = self.create_receipt(self.other_user, 2)

        self.client.force_login(self.user)

        response = self.client.get(f"/api/receipts/?user_id={self.other_user.id}")

        self.assertEqual(response.status_code, 200)

        data = response.json()

        receipt_ids = [receipt["id"] for receipt in data["results"]]

        self.assertNotIn(other_receipt.id, receipt_ids)

    def test_receipts_are_paginated_by_10(self):
        for number in range(1, 12):
            self.create_receipt(self.user, number)

        self.client.force_login(self.user)

        response = self.client.get("/api/receipts/")

        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertEqual(len(data["results"]), 10)
        self.assertEqual(data["pagination"]["total"], 11)
        self.assertTrue(data["pagination"]["has_next"])

    def test_receipts_can_be_sorted_by_amount(self):
        self.client.force_login(self.user)

        self.create_receipt(1, self.user)
        receipt = self.create_receipt(2, self.user)

        receipt.amount = Decimal("3000.00")
        receipt.save()

        response = self.client.get("/api/receipts/?sort=amount&order=asc")

        self.assertEqual(response.status_code, 200)

        results = response.json()["results"]

        self.assertEqual(
            results[0]["amount"],
            "1500.00",
        )

        self.assertEqual(
            results[1]["amount"],
            "3000.00",
        )

    def test_receipts_can_be_sorted_by_amount_desc(self):
        self.client.force_login(self.user)

        self.create_receipt(1, self.user)
        receipt = self.create_receipt(2, self.user)

        receipt.amount = Decimal("3000.00")
        receipt.save()

        response = self.client.get(
            "/api/receipts/?sort=amount&order=desc"
        )

        self.assertEqual(response.status_code, 200)

        results = response.json()["results"]

        self.assertEqual(
            results[0]["amount"],
            "3000.00",
        )

        self.assertEqual(
            results[1]["amount"],
            "1500.00",
        )
