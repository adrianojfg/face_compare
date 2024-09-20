import face_recognition
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from waitress import serve

# You can change this to any folder on your system
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['POST'])
def upload_image():
    # Check if a valid image files was uploaded
        if 'file1' and 'file2' not in request.files:
            return jsonify({"message": "Missing file(s)."}), 400

        file1 = request.files['file1']
        file2 = request.files['file2']

        if file1.filename == '' or file2.filename == '':
            return jsonify({"message": "Missing file(s)."}), 400

        if (file1 and allowed_file(file1.filename)) and (file2 and allowed_file(file2.filename)):
            # The image files seems valid! Compare faces and return the result.
            return compare_faces(file1, file2)

        return jsonify({"message": "File(s) must be images (.png, .jpg, .jpeg or gif formats)."}), 400

def compare_faces(file1_stream, file2_stream):
    # Load the uploaded image files
    img1 = face_recognition.load_image_file(file1_stream)
    img2 = face_recognition.load_image_file(file2_stream)

    # Get face encodings for any faces in the uploaded images
    img1_face_encodings = face_recognition.face_encodings(img1, None, 1, 'large')
    img2_face_encodings = face_recognition.face_encodings(img2, None, 1, 'large')

    if len(img1_face_encodings) > 0 and len(img2_face_encodings) > 0:
        try:
            # Calculate the face distance between images
            face_distance = face_recognition.face_distance(img1_face_encodings, img2_face_encodings[0])

            # Return the result as json
            result = {
                "face_distance": round(face_distance[0], 2)
            }
            return jsonify(result)
        except:
            return 'Error while calculating face distance. Check files and try again.', 400

    result = {
        "message": "Not found faces in files. Check files and try again.",
        "Found face(s) in file 1?": len(img1_face_encodings) > 0,
        "Found face(s) in file 2?": len(img2_face_encodings) > 0,
    }
    return jsonify(result), 400

if __name__ == "__main__":
    # app.run(host='0.0.0.0', port=5001, debug=False)
    serve(app, host="0.0.0.0", port=5001)
