from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates("Web/")

app.mount("/static", StaticFiles(directory="Web/static/"), "Static Files" )

@app.get("/")
def return_landing(request: Request):
    return templates.TemplateResponse(request, "landing.html")

@app.get("/nosso_caminho")
def return_main(request: Request):
    return templates.TemplateResponse(request, "main.html")