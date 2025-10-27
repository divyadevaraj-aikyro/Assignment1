class NoteApp {
    constructor() {
        this.notes = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.editingNoteId = null;
        this.deletingNoteId = null;

        this.initializeApp();
    }

    initializeApp() {
        this.loadNotesFromStorage();
        this.loadThemeFromStorage();
        this.setupEventListeners();
        this.renderNotes();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderNotes();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.filter);
            });
        });

        // Add note button
        document.getElementById('addNoteBtn').addEventListener('click', () => {
            this.openNoteModal();
        });

        // Modal controls
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeNoteModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeNoteModal();
        });

        // Note form submission
        document.getElementById('noteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNote();
        });

        // Delete modal controls
        document.getElementById('closeDeleteModalBtn').addEventListener('click', () => {
            this.closeDeleteModal();
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            this.closeDeleteModal();
        });

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.confirmDelete();
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeNoteModal();
                    this.closeDeleteModal();
                }
            });
        });

        // Export/Import functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportNotes();
        });

        document.getElementById('importInput').addEventListener('change', (e) => {
            this.importNotes(e);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N: New note
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openNoteModal();
            }

            // Ctrl/Cmd + S: Save note (when modal is open)
            if ((e.ctrlKey || e.metaKey) && e.key === 's' && document.getElementById('noteModal').classList.contains('active')) {
                e.preventDefault();
                this.saveNote();
            }

            // Ctrl/Cmd + F: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }

            // Escape: Close modals
            if (e.key === 'Escape') {
                this.closeNoteModal();
                this.closeDeleteModal();
            }

            // Ctrl/Cmd + D: Toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleDarkMode();
            }
        });
    }

    // Theme management
    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';

        this.showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`);
    }

    loadThemeFromStorage() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Filter management
    setActiveFilter(filter) {
        this.currentFilter = filter;

        // Update button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.renderNotes();
    }

    // Modal management
    openNoteModal(noteId = null) {
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('noteForm');

        if (noteId) {
            const note = this.notes.find(n => n.id === noteId);
            if (note) {
                modalTitle.textContent = 'Edit Note';
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteCategory').value = note.category;
                document.getElementById('noteContent').value = note.content;
                document.getElementById('noteTags').value = note.tags.join(', ');
                document.getElementById('submitBtnText').textContent = 'Update Note';
                this.editingNoteId = noteId;
            }
        } else {
            modalTitle.textContent = 'Create New Note';
            form.reset();
            document.getElementById('submitBtnText').textContent = 'Create Note';
            this.editingNoteId = null;
        }

        modal.classList.add('active');
        document.getElementById('noteTitle').focus();
    }

    closeNoteModal() {
        const modal = document.getElementById('noteModal');
        modal.classList.remove('active');
        document.getElementById('noteForm').reset();
        this.editingNoteId = null;
    }

    openDeleteModal(noteId) {
        const modal = document.getElementById('deleteModal');
        modal.classList.add('active');
        this.deletingNoteId = noteId;
    }

    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        modal.classList.remove('active');
        this.deletingNoteId = null;
    }

    // Note CRUD operations
    saveNote() {
        try {
            const title = document.getElementById('noteTitle').value.trim();
            const category = document.getElementById('noteCategory').value;
            const content = document.getElementById('noteContent').value.trim();
            const tagsInput = document.getElementById('noteTags').value.trim();

            if (title && category && content) {
                this.showToast('Please fill in all required fields', 'error');
                return;
            }

            // Parse tags
            const tags = tagsInput
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const now = new Date().toISOString();

            if (this.editingNoteId) {
                // Update existing note
                const noteIndex = this.notes.findIndex(n => n.id === this.editingNoteId);
                if (noteIndex !== -1) {
                    this.notes[noteIndex] = {
                        ...this.notes[noteIndex],
                        title,
                        category,
                        content,
                        tags,
                        updatedAt: now
                    };
                    this.showToast('Note updated successfully');
                }
            } else {
                // Create new note
                const newNote = {
                    id: this.generateId(),
                    title,
                    category,
                    content,
                    tags,
                    createdAt: now,
                    updatedAt: now
                };
                this.notes.unshift(newNote);
                this.showToast('Note created successfully');
            }

            this.saveNotesToStorage();
            this.renderNotes();
            this.closeNoteModal();

        } catch (error) {
            console.error('Error saving note:', error);
            this.showToast('Error saving note', 'error');
        }
    }

    editNote(noteId) {
        this.openNoteModal(noteId);
    }

    deleteNote(noteId) {
        this.openDeleteModal(noteId);
    }

    confirmDelete() {
        if (this.deletingNoteId) {
            try {
                this.notes = this.notes.filter(note => note.id !== this.deletingNoteId);
                this.saveNotesToStorage();
                this.renderNotes();
                this.closeDeleteModal();
                this.showToast('Note deleted successfully');
            } catch (error) {
                console.error('Error deleting note:', error);
                this.showToast('Error deleting note', 'error');
            }
        }
    }

    // Data persistence
    saveNotesToStorage() {
        try {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        } catch (error) {
            console.error('Error saving notes to storage:', error);
            this.showToast('Error saving notes', 'error');
        }
    }

    loadNotesFromStorage() {
        try {
            const storedNotes = localStorage.getItem('notes');
            if (storedNotes) {
                this.notes = JSON.parse(storedNotes);
            }
        } catch (error) {
            console.error('Error loading notes from storage:', error);
            this.notes = [];
        }
    }

    // Export/Import functionality
    exportNotes() {
        try {
            const dataStr = JSON.stringify(this.notes, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `notes-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
            this.showToast('Notes exported successfully');
        } catch (error) {
            console.error('Error exporting notes:', error);
            this.showToast('Error exporting notes', 'error');
        }
    }

    importNotes(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedNotes = JSON.parse(e.target.result);
                    if (Array.isArray(importedNotes)) {
                        // Validate imported notes
                        const validNotes = importedNotes.filter(note =>
                            note.id && note.title && note.category && note.content
                        );

                        if (validNotes.length > 0) {
                            // Merge with existing notes, avoiding duplicates
                            const existingIds = new Set(this.notes.map(n => n.id));
                            const newNotes = validNotes.filter(note => !existingIds.has(note.id));

                            this.notes = [...newNotes, ...this.notes];
                            this.saveNotesToStorage();
                            this.renderNotes();
                            this.showToast(`${newNotes.length} notes imported successfully`);
                        } else {
                            this.showToast('No valid notes found in file', 'error');
                        }
                    } else {
                        this.showToast('Invalid file format', 'error');
                    }
                } catch (parseError) {
                    console.error('Error parsing imported file:', parseError);
                    this.showToast('Error parsing file', 'error');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error importing notes:', error);
            this.showToast('Error importing notes', 'error');
        }

        // Reset file input
        event.target.value = '';
    }

    // Rendering and search
    getFilteredNotes() {
        let filteredNotes = [...this.notes];

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filteredNotes = filteredNotes.filter(note => note.category === this.currentFilter);
        }

        // Apply search filter
        if (this.searchTerm) {
            filteredNotes = filteredNotes.filter(note => {
                const searchFields = [
                    note.title.toLowerCase(),
                    note.content.toLowerCase(),
                    ...note.tags.map(tag => tag.toLowerCase())
                ];
                return searchFields.some(field => field.includes(this.searchTerm));
            });
        }

        // Sort by date (newest first)
        return filteredNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    renderNotes() {
        const container = document.getElementById('notesContainer');
        const emptyState = document.getElementById('emptyState');
        const filteredNotes = this.getFilteredNotes();

        if (filteredNotes.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        emptyState.style.display = 'none';

        container.innerHTML = filteredNotes.map(note => this.createNoteCard(note)).join('');

        // Add event listeners to note cards
        container.querySelectorAll('.note-card').forEach(card => {
            const noteId = card.dataset.noteId;

            // Edit button
            const editBtn = card.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.editNote(noteId);
                });
            }

            // Delete button
            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteNote(noteId);
                });
            }

            // Card click (view note)
            card.addEventListener('click', () => {
                this.viewNote(noteId);
            });
        });
    }

    createNoteCard(note) {
        const date = new Date(note.updatedAt);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return `
            <div class="note-card" data-note-id="${note.id}">
                <div class="note-header">
                    <div>
                        <h3 class="note-title">${this.escapeHtml(note.title)}</h3>
                        <span class="note-category ${note.category}">${note.category}</span>
                    </div>
                    <div class="note-actions">
                        <button class="note-action-btn edit-btn" title="Edit note">✏️</button>
                        <button class="note-action-btn delete-btn" title="Delete note">🗑️</button>
                    </div>
                </div>
                <div class="note-content">
                    ${this.escapeHtml(note.content)}
                </div>
                <div class="note-footer">
                    <div class="note-tags">
                        ${note.tags.map(tag => `<span class="note-tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                    <div class="note-date">${formattedDate}</div>
                </div>
            </div>
        `;
    }

    viewNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            this.openNoteModal(noteId);
        }
    }

    // Utility methods
    generateId() {
        return 'note-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        toastMessage.textContent = message;
        toast.className = 'toast show';

        if (type === 'error') {
            toast.style.backgroundColor = 'var(--danger-color)';
        } else {
            toast.style.backgroundColor = 'var(--text-primary)';
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

//const noteApp = new NoteApp();