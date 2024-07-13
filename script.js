document.addEventListener('DOMContentLoaded', function() {
    const emojis = ['🧁', '🍩', '🍫', '🍬', '🍦', '🍔', '🍕', '⛺', '🏠', '🚜', '🚚', '🚴', '🚶', '🛌', '🛒', '🛝', '🛫', '🛴', '🛸', '🛶', '🛹', '🛼', '🐄', '🐅', '🐉', '🐋', '🐒', '🐕', '🐘', '🐝', '🐞', '🐧', '🐴', '🦄', '🦋', '🦑', '🦓', '🦒', '🦖', '🦜', '🦥', '🦩', '🦭', '⛄', '☔', '🌈', '🌅', '🌊', '🎀', '🎁', '🎂', '🎃', '🎄', '🎅', '🎈', '🎒', '🎢', '🎨', '🎪', '🎤', '🎧', '🎥', '🎸', '🎹', '⚽', '🏅', '🏊', '🎮', '🎲', '🧩', '🎳', '🌷', '🌳', '🍀', '🍄', '🍁', '🍉', '🍏', '🍓', '🍌', '💻', '📀', '📄', '📔', '🖉', '📱', '🦹', '🦸', '🧜', '🧚', '🧛'];

    const emojiPicker = document.getElementById('emoji-picker');
    const journalEntry = document.getElementById('journalEntry');
    const saveButton = document.getElementById('saveButton');
    const entriesContainer = document.getElementById('entriesContainer');
    const nameInput = document.getElementById('name-input');
    const setNameButton = document.getElementById('set-name-button');
    const journalHeading = document.getElementById('journal-heading');
    const nameDisplay = document.getElementById('name-display');
    const themeSelect = document.getElementById('theme-select');

    // Add emojis to the emoji picker
    emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.classList.add('emoji');
        span.textContent = emoji;
        span.addEventListener('click', () => {
            journalEntry.value += emoji;
        });
        emojiPicker.appendChild(span);
    });

    // Load entries and theme from local storage
    loadEntries();
    loadTheme();

    // Save the journal entry
    saveButton.addEventListener('click', () => {
        const entryText = journalEntry.value.trim();
        if (entryText) {
            const entry = {
                id: Date.now(),
                text: entryText,
                date: new Date().toLocaleString()
            };
            saveEntry(entry);
            displayEntry(entry);
            journalEntry.value = '';
        } else {
            alert('Please write something in the journal entry.');
        }
    });

    // Set the user's name in the heading
    setNameButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            journalHeading.textContent = `${name}'s Summer Journal`;
            nameDisplay.textContent = `Welcome, ${name}!`;
            nameDisplay.style.display = 'block';
            nameInput.value = '';
        } else {
            alert('Please enter a name.');
        }
    });

    // Change theme
    themeSelect.addEventListener('change', () => {
        const theme = themeSelect.value;
        document.body.className = theme;
        localStorage.setItem('selectedTheme', theme);
    });

    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push(entry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.forEach(displayEntry);
    }

    function displayEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.setAttribute('data-id', entry.id);

        const entryDate = document.createElement('div');
        entryDate.classList.add('entry-date');
        entryDate.textContent = entry.date;

        const entryText = document.createElement('div');
        entryText.textContent = entry.text;

        const entryActions = document.createElement('div');
        entryActions.classList.add('entry-actions');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editEntry(entry.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteEntry(entry.id));

        entryActions.appendChild(editButton);
        entryActions.appendChild(deleteButton);

        entryDiv.appendChild(entryDate);
        entryDiv.appendChild(entryText);
        entryDiv.appendChild(entryActions);

        entriesContainer.appendChild(entryDiv);
    }

    function editEntry(id) {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        const entry = entries.find(entry => entry.id === id);
        if (entry) {
            journalEntry.value = entry.text;
            deleteEntry(id, false); // Remove entry without updating the display
        }
    }

    function deleteEntry(id, updateDisplay = true) {
        if (confirm('Are you sure you want to delete this entry?')) {
            let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            entries = entries.filter(entry => entry.id !== id);
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            if (updateDisplay) {
                const entryDiv = document.querySelector(`.entry[data-id='${id}']`);
                if (entryDiv) {
                    entriesContainer.removeChild(entryDiv);
                }
            }
        }
    }

    function loadTheme() {
        const selectedTheme = localStorage.getItem('selectedTheme') || 'theme-default';
        document.body.className = selectedTheme;
        themeSelect.value = selectedTheme;
    }
});

