from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
from django.views.decorators.http import require_http_methods

from .forms import ReceiptForm
from .models import Receipt


@login_required
@require_http_methods(["GET", "POST"])
def register_receipt(request):
    if request.method == "GET":
        form = ReceiptForm()

        return render(
            request,
            "receipts/register.html",
            {
                "form": form,
                "promo_start": settings.PROMO_START.isoformat(),
                "promo_end": settings.PROMO_END.isoformat(),
            },
        )

    form = ReceiptForm(request.POST)

    if form.is_valid():
        receipt = form.save(commit=False)
        receipt.user = request.user
        receipt.status = receipt.Status.PENDING
        receipt.save()

        return JsonResponse(
            {
                "success": True,
                "receipt_id": receipt.id,
            }
        )

    errors = {}

    for field, field_errors in form.errors.items():
        errors[field] = field_errors.get_json_data()

    return JsonResponse(
        {
            "success": False,
            "errors": errors,
        },
        status=400,
    )


@login_required
def cabinet_page(request):
    return render(
        request,
        "receipts/cabinet.html",
    )


@login_required
def receipt_list(request):
    receipts = Receipt.objects.filter(user=request.user).order_by(
        "-purchase_datetime", "-created_at"
    )

    paginator = Paginator(receipts, 10)

    page_number = request.GET.get("page", 1)
    page = paginator.get_page(page_number)

    results = [
        {
            "id": receipt.id,
            "purchase_date": receipt.purchase_datetime.strftime("%d.%m.%Y %H:%M"),
            "amount": str(receipt.amount),
            "status": receipt.status,
            "status_display": receipt.get_status_display(),
            "rejection_reason": receipt.rejection_reason,
        }
        for receipt in page.object_list
    ]

    return JsonResponse(
        {
            "results": results,
            "pagination": {
                "page": page.number,
                "pages": paginator.num_pages,
                "total": paginator.count,
                "has_next": page.has_next(),
                "has_previous": page.has_previous(),
            },
        }
    )
