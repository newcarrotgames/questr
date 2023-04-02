from flask import Flask, render_template

app = Flask(__name__, template_folder='./html')


@app.route('/')
def index():
    return render_template('index.html')