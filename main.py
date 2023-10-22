import os
import tempfile
from flask import Flask, request, redirect, render_template, url_for
from skimage import io
import base64
from skimage.transform import resize
import numpy as np
from tensorflow.keras.models import load_model

model = load_model('modelo_entrenado.h5')
app = Flask(__name__, template_folder="templates/")

@app.route("/")
def main():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        img_data = request.form.get('myImage').replace("data:image/png;base64,", "")
        img_data2 = request.form.get('myImage2').replace("data:image/png;base64,", "")

        # print(img_data2)
        with tempfile.NamedTemporaryFile(delete=False, mode="w+b", suffix='.png', dir=str('prediccion')) as fh:
            fh.write(base64.b64decode(img_data))
            tmp_file_path = fh.name
  
        with tempfile.NamedTemporaryFile(delete=False, mode="w+b", suffix='.png', dir=str('prediccion')) as fh2:
            fh2.write(base64.b64decode(img_data2))
            tmp_file_path2 = fh2.name

        size = (28, 28)
                
        imagen = io.imread(tmp_file_path)
        imagen2 = io.imread(tmp_file_path2)

        imagen = imagen[:, :, 3]
        imagen2 = imagen2[:, :, 3]

        image = imagen / 255.0
        image2 = imagen2 / 255.0

        im = resize(image, size)
        im2 = resize(image2, size)

        im = im[:, :, np.newaxis]
        im = im.reshape(1, *im.shape)

        im2 = im2[:, :, np.newaxis]
        im2 = im2.reshape(1, *im2.shape)

        salida = model.predict(im)[0]
        salida2 = model.predict(im2)[0]

        os.remove(tmp_file_path)
        os.remove(tmp_file_path2)

        nums = salida*100
        nums2 = salida2*100

        numeros_formateados = [f'{numero:.2f}' for numero in nums]
        numeros_formateados2 = [f'{numero:.2f}' for numero in nums2]

        cadena_formateada = ', '.join(numeros_formateados)
        componentes = cadena_formateada.split(', ')

        cadena_formateada = ', '.join(numeros_formateados2)
        componentes2 = cadena_formateada.split(', ')

        nums = [float(componente) for componente in componentes]
        nums2 = [float(componente) for componente in componentes2]

        maxValue1 = max(nums)
        maxValue2 = max(nums2)

        indexVal1 = nums.index(maxValue1)
        indexVal2 = nums2.index(maxValue2)

        print(f'Indice I1: {indexVal1} - Max1: {maxValue1}')
        print(f'Indice I2: {indexVal2} - Max2: {maxValue2}')

        figura = ["Piedra", "Papel", "Tijera"]

        text = ""
        if figura[indexVal1] == figura[indexVal2]: text="DRAW"
        elif figura[indexVal1] == "Papel" and figura[indexVal2] == "Piedra": text="Player 1 wins"
        elif figura[indexVal2] == "Papel" and figura[indexVal1] == "Piedra": text="Player 2 wins"
        elif figura[indexVal2] == "Papel" and figura[indexVal1] == "Tijera": text="Player 1 wins"
        elif figura[indexVal1] == "Papel" and figura[indexVal2] == "Tijera": text="Player 2 wins"
        elif figura[indexVal1] == "Tijera" and figura[indexVal2] == "Piedra": text="Player 2 wins"
        elif figura[indexVal2] == "Tijera" and figura[indexVal1] == "Piedra": text="Player 1 wins"

        if img_data is not None and img_data2 is not None:
            return render_template('Prediccion.html', nums=nums, nums2=nums2, figuras=figura, img_data=img_data, img_data2=img_data2, wins=text)
        else:
            return redirect("/", code=302)
    except:
        print("Error occurred")

    return redirect("/", code=302)



if __name__ == "__main__":
    app.run()
