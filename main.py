from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

templates = Jinja2Templates("Web/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem
    allow_credentials=True,
    allow_methods=["*"],  # Permite qualquer método (GET, POST, etc.)
    allow_headers=["*"],  # Permite qualquer cabeçalho
)


app.mount("/static", StaticFiles(directory="Web/static/"), "Static Files" )

@app.get("/")
def return_landing(request: Request):
    return templates.TemplateResponse(request, "landing.html")

@app.get("/nosso_caminho")
def return_main(request: Request):
    return templates.TemplateResponse(request, "main.html")

@app.get("/final")
def return_end(request: Request):
    return templates.TemplateResponse(request, "end.html")