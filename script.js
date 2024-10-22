// Initialize an array to store all stories
let stories = [];

// Function to handle form submission and display story
function validateForm() {
    const titleInput = document.getElementById('title'); // Get title input
    const storyInput = document.getElementById('story'); // Get story input
    const errorMessage = document.getElementById('error-message');
    const errorTitle = document.getElementById('error-title'); // Get error message for title
    const storiesContainer = document.getElementById('stories-container');
    const storiesSection = document.getElementById('stories-section'); // Reference to the section to show

    // Clear previous error messages
    errorMessage.textContent = '';
    errorTitle.textContent = '';

    // Validate the title and story length
    if (titleInput.value.trim().length < 1) {
        errorTitle.textContent = 'Please provide a title for your story.';
        return false; // Prevent form submission
    }

    if (storyInput.value.trim().length < 3) {
        errorMessage.textContent = 'Your story must be at least 3 characters long.';
        return false; // Prevent form submission
    }

    // Create a new story object and add it to the stories array
    const newStory = {
        id: Date.now(), // Unique ID for the story
        title: titleInput.value, // Add title to the story
        content: storyInput.value // Add story content
    };
    
    stories.push(newStory);

    // Show the stories section after the first submission
    storiesSection.style.display = 'block';

    // Render the updated stories list
    renderStories();

    // Clear the input fields after submission
    titleInput.value = '';
    storyInput.value = '';

    return false; // Prevent actual form submission
}

// Function to render all stories
function renderStories() {
    const storiesContainer = document.getElementById('stories-container');
    storiesContainer.innerHTML = ''; // Clear the container before rendering

    // Loop through each story and create its card
    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.classList.add('col-md-4');
        storyCard.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title yellow">${story.title}</h5> <!-- Display story title -->
                    <p class="card-text">${story.content}</p>
                    <button class="btn btn-warning btn-sm" onclick="editStory(${story.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStory(${story.id})">Delete</button>
                </div>
            </div>
        `;
        storiesContainer.appendChild(storyCard);
    });
}

// Function to delete a story by its ID
function deleteStory(id) {
    // Filter out the story with the specified ID
    stories = stories.filter(story => story.id !== id);
    renderStories(); // Re-render the stories list
}

// Function to edit a story
function editStory(id) {
    // Find the story to edit by its ID
    const storyToEdit = stories.find(story => story.id === id);

    if (storyToEdit) {
        // Set the story title and content in the input fields for editing
        const titleInput = document.getElementById('title');
        const storyInput = document.getElementById('story');
        titleInput.value = storyToEdit.title;
        storyInput.value = storyToEdit.content;

        // Remove the story being edited from the list temporarily
        stories = stories.filter(story => story.id !== id);

        // Update the button to say 'Save Changes' instead of 'Submit'
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.textContent = 'Save Changes';  // Just change the button text
        
        // When the user clicks again, save the edited story and revert the button text
        submitButton.onclick = function() {
            validateForm();
            submitButton.textContent = 'Submit'; // Revert the button text
        };
    }
}
