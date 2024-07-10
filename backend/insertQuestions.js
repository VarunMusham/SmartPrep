const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseKey = 'YOUR_SUPABASE_PROJECT_API_KEY'

const supabase = createClient(supabaseUrl, supabaseKey);

// Load questions from a JSON file
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// Function to insert questions
const insertQuestions = async () => {
  // Add id parameter starting from 1 and incrementing
  questions.forEach((question, index) => {
    question.id = index + 1; // Assuming index starts from 0
  });

  const { data, error } = await supabase
    .from('questions')
    .insert(questions);

  if (error) {
    console.error("Error inserting questions:", error);
  } else {
    console.log("Successfully inserted questions:", data);
  }
};

// Call the function to insert questions
insertQuestions();