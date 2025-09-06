// Key for localStorage
const STORAGE_KEY = 'notesApp.notes';

// Get references to HTML elements
const noteInput = document.getElementById('newNote');
const notesList = document.getElementById('notesList');

var input = document.getElementById("newNote");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addNote").click();
  }
}); 

// Function to load notes from localStorage
function loadNotes() {
    const notesJSON = localStorage.getItem(STORAGE_KEY);
    // If no notes exist, return an empty array, else parse the JSON string.
    return notesJSON ? JSON.parse(notesJSON) : [];
}

// Function to save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Function to display notes in the HTML
function displayNotes() {
    const notes = loadNotes();
    notesList.innerHTML = ''; // Clear the current list

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.textContent = note;

        // Add a delete button for each note
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteNote(index);
        };

        noteElement.appendChild(deleteButton);
        notesList.appendChild(noteElement);
    });
}

// Function to add a new note
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === '') return; // Don't add empty notes

    const notes = loadNotes();
    notes.push(noteText); // Add the new note to the array
    saveNotes(notes); // Save the updated array
    noteInput.value = ''; // Clear the input field
    displayNotes(); // Refresh the displayed list
}

// Function to delete a note
function deleteNote(index) {
    const notes = loadNotes();
    notes.splice(index, 1); // Remove 1 item at the given index
    saveNotes(notes);
    displayNotes();
}

// Load and display notes when the page first loads
displayNotes();