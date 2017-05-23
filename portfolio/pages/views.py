import pickle
from django.shortcuts import render
from django.http import JsonResponse
import os
# Create your views here.


def index(request):
    context_dict = {}
    return render(request, 'index.html', context_dict)


def tiles(request):
    context_dict = {}
    return render(request, 'TILES.html', context_dict)


def birthday(request):
    context_dict = {}
    return render(request, 'birthday_pi.html', context_dict)


def birthday_pull(request, num):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    with open(os.path.join(BASE_DIR, "static", "birthday_pi_dictionary.txt"), "rb") as repository:
        bd_dict = pickle.load(repository)

    num_string = str(num)
    theDigits = bd_dict.get(num_string, "error")

    digits = {
        num_string: theDigits
    }
    return JsonResponse(digits)
