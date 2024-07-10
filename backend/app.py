from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

# Supabase credentials
supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
supabaseKey = 'YOUR_SUPABASE_PROJECT_API_KEY'

# Endpoint for your Supabase table
endpoint = '/rest/v1/questions'

def question_exists(question_id):
    try:
        # Send GET request to check if the question exists
        response = requests.get(f"{supabaseUrl}{endpoint}?id=eq.{question_id}", headers={'apikey': supabaseKey})
        
        # Check response status
        if response.status_code == 200:
            questions = response.json()
            return len(questions) > 0  # True if question with ID exists, False otherwise
        else:
            return False  # Failed to fetch data, assume question doesn't exist

    except requests.exceptions.RequestException as e:
        print(f"Error checking question existence: {e}")
        return False

# Route to serve the form and handle form submission
@app.route('/submit-question', methods=['GET', 'POST'])
def submit_question():
    if request.method == 'GET':
        return render_template('index.html', submitted=False, error=False, id_exists=False)  # Render the form initially

    elif request.method == 'POST':
        try:
            # Get data from form submission
            question_id = request.form['id']
            questionData = {
                "id": question_id,
                "question": request.form['question'],
                "a": request.form['a'],
                "b": request.form['b'],
                "c": request.form['c'],
                "d": request.form['d'],
                "answer": request.form['answer']
            }

            # Check if question with given ID already exists
            if question_exists(question_id):
                return render_template('index.html', submitted=False, error=False, id_exists=True)  # ID already exists

            # Headers for the API request
            headers = {
                'apikey': supabaseKey,
                'Content-Type': 'application/json'
            }

            # Send POST request to Supabase
            response = requests.post(supabaseUrl + endpoint, headers=headers, json=questionData)

            # Check response status
            if response.status_code == 201:
                return render_template('index.html', submitted=True, error=False, id_exists=False)  # Submission success
            else:
                return render_template('index.html', submitted=False, error=True, id_exists=False)  # Submission failed

        except Exception as e:
            return jsonify({'error': f'Error submitting question: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)