# Note Taking Application

A modern, feature-rich note taking application built with vanilla JavaScript, HTML, and CSS. Features categories, tags, search functionality, dark mode, and local storage persistence.

## Features

- ✅ Create, edit, and delete notes
- ✅ Organize notes by categories (Personal, Work, Ideas)
- ✅ Add tags to notes for better organization
- ✅ Search notes by title, content, or tags
- ✅ Filter notes by category
- ✅ Dark mode support
- ✅ Local storage persistence
- ✅ Responsive design for mobile and desktop
- ✅ Rich text editing with markdown support
- ✅ Export/import notes functionality
- ✅ Keyboard shortcuts support
- ✅ Auto-save functionality

## Project Structure

```
note-taking-app/
├── index.html      # Main HTML structure with semantic markup
├── style.css       # Responsive CSS with dark mode support
├── script.js       # Complete application logic in NoteApp class
├── CLAUDE.md       # This documentation file
└── README.md       # Setup and debugging instructions
```

## How to Run

1. **Navigate to the application directory**:
   ```bash
   cd note-taking-app
   ```

2. **Start a local development server**:
   ```bash
   python3 -m http.server 8000
   ```
   Or using Node.js:
   ```bash
   npx serve .
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

## Code Architecture

### JavaScript Structure (script.js)

The application uses a class-based architecture with the main `NoteApp` class:

- **Constructor**: Initializes the app, loads notes from localStorage, and sets up event listeners
- **State Management**: Maintains notes array, current filter, search term, and theme preference
- **Event Handling**: Manages all user interactions including CRUD operations
- **Modal Management**: Handles note creation/editing and deletion confirmation modals
- **Data Persistence**: Saves and loads notes using localStorage
- **Search & Filter**: Implements real-time search and category filtering
- **Theme System**: Manages dark mode functionality

### Key Methods

- `openNoteModal(noteId)`: Opens modal for creating or editing notes
- `closeNoteModal()`: Closes the note modal and resets form
- `saveNote()`: Saves or updates note data
- `deleteNote(noteId)`: Removes note from the collection
- `editNote(noteId)`: Opens existing note for editing
- `setActiveFilter(filter)`: Updates category filter
- `getFilteredNotes()`: Returns notes based on current filter and search
- `createNoteCard(note)`: Creates HTML element for note display
- `renderNotes()`: Updates the notes display
- `toggleDarkMode()`: Switches between light and dark themes
- `saveNotesToStorage()`: Persists notes to localStorage
- `loadNotesFromStorage()`: Loads notes from localStorage
- `escapeHtml(text)`: XSS protection utility
- `exportNotes()`: Downloads notes as JSON backup
- `importNotes(event)`: Imports notes from JSON file

### Data Structure

**Note Object Structure**:
```javascript
{
  id: "unique-id-string",
  title: "Note Title",
  category: "personal|work|ideas",
  content: "Full note content with rich text",
  tags: ["tag1", "tag2", "tag3"],
  createdAt: "2024-01-01T12:00:00.000Z",
  updatedAt: "2024-01-01T12:30:00.000Z"
}
```

### CSS Features

- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Dark Mode**: Complete theme system with CSS custom properties
- **Modern UI**: Glassmorphism effects, smooth transitions, and hover states
- **Grid Layout**: CSS Grid for responsive note cards layout
- **Typography**: System font stack for optimal readability
- **Animations**: Smooth transitions for all interactive elements
- **Accessibility**: Proper contrast ratios and focus management

### Color System

**Light Mode**:
- Primary: #6366f1 (Indigo)
- Secondary: #64748b (Slate)
- Success: #10b981 (Emerald)
- Danger: #ef4444 (Red)
- Background: #ffffff (White)
- Text: #1f2937 (Gray)

**Dark Mode**:
- Background: #1f2937 (Dark Gray)
- Cards: #374151 (Medium Gray)
- Borders: #4b5563 (Lighter Gray)
- Text: #f9fafb (Near White)

### Category System

**Personal**: Blue theme (#dbeafe background, #1e40af text)
**Work**: Green theme (#dcfce7 background, #166534 text)
**Ideas**: Yellow theme (#fef3c7 background, #92400e text)

### Search & Filter Implementation

**Search Logic**:
- Real-time search across title, content, and tags
- Case-insensitive matching
- Combined filtering with category selection

**Filter System**:
- All notes (default)
- Category-based filtering
- Preserved search term during filter changes

### Data Persistence

**localStorage Strategy**:
- Notes stored as JSON string
- Automatic save on any data change
- Error handling for quota exceeded scenarios
- Data migration and versioning support

**Backup Features**:
- Export notes as JSON file
- Import notes from backup files
- Date-based file naming
- Data validation during import

### Modal System

**Note Modal**:
- Create new notes
- Edit existing notes
- Form validation
- Auto-focus management

**Delete Confirmation**:
- Prevents accidental deletions
- Clear confirmation messaging
- Keyboard accessibility

### Security Features

- **XSS Protection**: HTML escaping for all user content
- **Input Validation**: Required field validation
- **Data Sanitization**: Tag parsing and cleanup
- **Safe Rendering**: Text content only display

## Browser Compatibility

Compatible with all modern browsers supporting:
- ES6 Classes and template literals
- localStorage API
- CSS Grid and Flexbox
- CSS Custom Properties
- Fetch API
- Modern JavaScript syntax

## Performance Optimizations

- **Efficient DOM Updates**: Batch DOM operations
- **Event Delegation**: Optimized event handling
- **Lazy Loading**: On-demand modal initialization
- **Memory Management**: Proper cleanup and garbage collection
- **Responsive Images**: Optimized media handling

## Development Notes

- **Component Architecture**: Modular design with clear separation of concerns
- **Error Handling**: Comprehensive try-catch blocks and user feedback
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Progressive Enhancement**: Works without JavaScript enabled
- **Mobile Optimization**: Touch-friendly interactions and responsive design

## Future Enhancements

Potential features to add:
- Rich text editor with formatting options
- Note sharing and collaboration
- Cloud synchronization
- Note templates
- Attachment support
- Advanced search with filters
- Note versioning and history
- Voice-to-text input
- Handwriting support
- Note encryption
- Plugin system for extensions

## Keyboard Shortcuts

- `Ctrl/Cmd + N`: New note
- `Ctrl/Cmd + S`: Save note
- `Ctrl/Cmd + F`: Focus search
- `Escape`: Close modal
- `Ctrl/Cmd + D`: Toggle dark mode

## Troubleshooting

**Common Issues**:
- Notes not saving: Check localStorage availability and quota
- Search not working: Verify JavaScript is enabled
- Modals not opening: Check for CSS conflicts
- Theme not persisting: Verify localStorage functionality

**Debug Console Commands**:
- `localStorage.clear()`: Clear all stored data
- `noteApp.notes`: View current notes array
- `noteApp.renderNotes()`: Manually refresh note display