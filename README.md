# Note Taking App

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
- ✅ Export/import notes functionality
- ✅ Keyboard shortcuts support

## 📋 Setup Instructions

### 1. Install Dependencies

No additional dependencies required - uses vanilla HTML, CSS, and JavaScript.

### 2. Run the Application

```bash
cd "weather dashboard"
python3 -m http.server 8000
```

Or using Node.js:
```bash
npx serve .
```

3. Open `http://localhost:8000` in your browser

## 🎯 Learning Objectives

This application is designed to help you practice:

- Debug JavaScript syntax and logical errors
- Fix CSS display and styling issues
- Troubleshoot DOM manipulation problems
- Use browser developer tools for systematic debugging
- Practice modular debugging techniques
- Understand localStorage data persistence issues

## 🔍 Debugging Approach

### Step 1: Initial Assessment
1. Open the application in your browser
2. Check the browser console (F12 → Console tab) for JavaScript errors
3. Test basic functionality: try to add a note, switch themes, use search

### Step 2: Systematic Debugging Process

1. **JavaScript Errors First**:
   - Fix any syntax errors preventing initialization
   - Check console for runtime errors
   - Verify all methods are properly defined

2. **Core Functionality**:
   - Fix note creation and display
   - Resolve modal issues
   - Test CRUD operations (Create, Read, Update, Delete)

3. **UI/UX Issues**:
   - Fix CSS display problems
   - Resolve theme switching
   - Test responsive design

4. **Data Persistence**:
   - Verify localStorage operations
   - Test data saving and loading
   - Check theme persistence

### Step 3: Comprehensive Testing
1. Create, edit, and delete notes
2. Test search and filter functionality
3. Verify theme switching and persistence
4. Test mobile responsiveness
5. Check error handling for edge cases




## ✅ Success Criteria

Your application should be able to:

### Functionality
- [ ] Initialize properly without JavaScript errors
- [ ] Create new notes with title, content, category, and tags
- [ ] Edit existing notes
- [ ] Delete notes with confirmation
- [ ] Search notes by title, content, or tags
- [ ] Filter notes by category
- [ ] Switch between light and dark themes
- [ ] Persist notes and theme preferences across sessions

### User Experience
- [ ] Clean, intuitive interface
- [ ] Responsive design on mobile devices
- [ ] Smooth transitions and interactions
- [ ] Proper error handling and user feedback
- [ ] Accessible design with keyboard navigation

### Code Quality
- [ ] No JavaScript errors in console
- [ ] Clean, organized code structure
- [ ] Proper error handling
- [ ] Efficient DOM manipulation
- [ ] Consistent coding style

## 🧪 Testing Checklist

- **Note Creation**: Add new note with all fields
- **Note Editing**: Modify existing note and save changes
- **Note Deletion**: Delete note with confirmation dialog
- **Search Functionality**: Search by title, content, and tags
- **Category Filtering**: Filter by Personal, Work, Ideas
- **Theme Switching**: Toggle between light and dark modes
- **Data Persistence**: Refresh page and verify data is saved
- **Empty States**: Verify empty state displays correctly
- **Responsive Design**: Test on mobile and tablet viewports
- **Error Handling**: Test edge cases and invalid inputs

## 💡 Tips for Success

1. **Use Browser DevTools**: Console, Elements, and Application tabs are essential
2. **Check Console First**: JavaScript errors often point directly to the problem
3. **Test Incrementally**: Fix one issue at a time and test each fix
4. **Use Claude Code Effectively**: Ask specific questions about errors you're seeing
5. **Understand the Code Flow**: Read through the code to understand how it should work
6. **Check CSS and JavaScript**: Some issues may be in styling rather than logic

## 📁 File Structure

```
weather dashboard/
├── index.html      # HTML structure
├── style.css       # CSS styles
├── script.js       # JavaScript logic
├── CLAUDE.md       # Technical documentation
└── README.md       # This documentation file
```

## 🔗 Common Debugging Commands

**Browser Console**:
- `document.querySelectorAll('.note-card')` - Check if note cards exist
- `localStorage.getItem('notes')` - Check stored notes
- `noteApp` - Check if app object exists
- `noteApp.notes` - View current notes array



Good luck, and enjoy the debugging process! 🐛➡️✅