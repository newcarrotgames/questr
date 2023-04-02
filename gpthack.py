import json
from flask import Flask, render_template
import openai

app = Flask(__name__, template_folder='./html')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tools')
def tools():
    return render_template('tools.html')


@app.route('/models')
def models():
    models = openai.Model.list().data
    model_ids = map(lambda m: m.id, models)
    return json.dumps(list(model_ids))


@app.route('/prompt')
def prompt():
    completion = openai.Completion.create(model="ada", prompt="Welcome to gpthack!")
    return completion.choices[0].text