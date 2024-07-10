const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase client
const supabaseUrl = 'https://elmkwjmldefcynowezyk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbWt3am1sZGVmY3lub3dlenlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MTM3NTcsImV4cCI6MjAzNjA4OTc1N30.-xx9cti6EZxsALkES_MxvhG83GN6So_ni2YEOiKnqQA'

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