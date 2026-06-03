'use client';

// 50 NEW UI COMPONENTS WITH PROMPTS
export const NEW_COMPONENTS = [
  {
    id: 'mega-menu',
    name: 'Mega Menu',
    tagline: 'Rich dropdown menu with categories and quick links',
    category: 'navigation',
    prompt: `Create a mega menu dropdown component with:
- Multiple columns showing categories
- Quick links section
- Featured components section
- Search bar inside the menu
- Smooth animations on hover
- Keyboard navigation support
- Responsive design for mobile
Use Tailwind CSS, Framer Motion, and Lucide React icons.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'pagination-advanced',
    name: 'Advanced Pagination',
    tagline: 'Pagination with page size selector and quick navigation',
    category: 'navigation',
    prompt: `Create an advanced pagination component with:
- Previous/Next buttons
- Page number buttons with ellipsis
- Current page indicator
- Page size selector (10, 25, 50 items)
- Jump to page input
- Total items display
- Responsive design
Use Tailwind CSS and Lucide React icons.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'scroll-to-top',
    name: 'Scroll to Top Button',
    tagline: 'Floating button to scroll to top of page',
    category: 'navigation',
    prompt: `Create a scroll-to-top button component with:
- Floating position (bottom-right)
- Only shows when scrolled down
- Smooth scroll animation
- Hover effects
- Keyboard shortcut (Ctrl+Home)
- Customizable position and colors
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'input-validation',
    name: 'Input with Validation',
    tagline: 'Text input with real-time validation feedback',
    category: 'forms',
    prompt: `Create an input component with validation:
- Real-time validation feedback
- Success/error/warning states
- Helper text display
- Icon indicators
- Animated state transitions
- Support for custom validators
- Accessible with proper labels
Use Tailwind CSS, Framer Motion, and Lucide React.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'custom-checkbox',
    name: 'Custom Checkbox',
    tagline: 'Styled checkbox with animation',
    category: 'forms',
    prompt: `Create a custom checkbox component with:
- Smooth check animation
- Indeterminate state support
- Disabled state
- Custom colors
- Accessible with proper ARIA labels
- Keyboard navigation
- Hover effects
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    tagline: 'On/off toggle switch component',
    category: 'forms',
    prompt: `Create a toggle switch component with:
- Smooth animation between states
- Disabled state
- Custom colors and sizes
- Accessible with proper ARIA labels
- Keyboard support (Space/Enter)
- Loading state option
- Customizable labels
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'range-slider',
    name: 'Range Slider',
    tagline: 'Slider for selecting a range of values',
    category: 'forms',
    prompt: `Create a range slider component with:
- Dual thumb for min/max selection
- Value labels above thumbs
- Track visualization
- Step increments
- Keyboard navigation
- Disabled state
- Custom colors
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    tagline: 'Calendar-based date selection',
    category: 'forms',
    prompt: `Create a date picker component with:
- Calendar view with month/year navigation
- Date selection
- Range selection support
- Today button
- Keyboard navigation
- Disabled dates support
- Custom date formats
Use Tailwind CSS, Framer Motion, and date-fns library.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'file-uploader',
    name: 'File Uploader',
    tagline: 'Drag-and-drop file upload with progress',
    category: 'forms',
    prompt: `Create a file uploader component with:
- Drag-and-drop area
- File input button
- File list display
- Upload progress bar
- File size validation
- Multiple file support
- Remove file option
- File type validation
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'multi-select',
    name: 'Multi-Select Dropdown',
    tagline: 'Dropdown allowing multiple selections',
    category: 'forms',
    prompt: `Create a multi-select dropdown with:
- Search/filter functionality
- Checkboxes for each option
- Selected items display
- Clear all button
- Select all option
- Keyboard navigation
- Custom rendering for items
Use Tailwind CSS, Framer Motion, and Lucide React.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'tags-input',
    name: 'Tags Input',
    tagline: 'Input field for adding tags with autocomplete',
    category: 'forms',
    prompt: `Create a tags input component with:
- Add tags by typing and pressing Enter
- Remove tags with backspace or X button
- Autocomplete suggestions
- Duplicate prevention
- Tag validation
- Custom styling for tags
- Keyboard navigation
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'rich-text-editor',
    name: 'Rich Text Editor',
    tagline: 'WYSIWYG text editor with formatting',
    category: 'forms',
    prompt: `Create a simple rich text editor with:
- Bold, italic, underline buttons
- Link insertion
- List formatting (ordered/unordered)
- Heading levels
- Code block support
- Text alignment
- Undo/redo functionality
- Markdown preview
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'rating-component',
    name: 'Rating Component',
    tagline: 'Star rating with hover effects',
    category: 'forms',
    prompt: `Create a rating component with:
- 5-star display
- Hover preview of rating
- Click to set rating
- Disabled state
- Custom colors
- Half-star support
- Animated transitions
- Accessibility support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'data-table',
    name: 'Data Table',
    tagline: 'Sortable and filterable data table',
    category: 'display',
    prompt: `Create a data table component with:
- Column headers with sort icons
- Sortable columns
- Filterable rows
- Pagination integration
- Row selection checkboxes
- Responsive design
- Hover row highlighting
- Custom cell rendering
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    tagline: 'Animated progress bar with percentage',
    category: 'display',
    prompt: `Create a progress bar component with:
- Smooth animation
- Percentage display
- Color states (success, warning, error)
- Striped pattern option
- Animated stripes option
- Custom height
- Label support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'badge-tag',
    name: 'Badge & Tag',
    tagline: 'Small indicator badges and tags',
    category: 'display',
    prompt: `Create badge and tag components with:
- Multiple color variants
- Sizes (sm, md, lg)
- Icon support
- Dismissible option
- Animated entrance
- Custom styling
- Status indicators
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'avatar-group',
    name: 'Avatar Group',
    tagline: 'Overlapping avatars display',
    category: 'display',
    prompt: `Create an avatar group component with:
- Overlapping avatars
- Maximum visible count
- +N indicator for overflow
- Tooltip on hover showing all
- Customizable size
- Border styling
- Animated entrance
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'tooltip-popover',
    name: 'Tooltip & Popover',
    tagline: 'Context information on hover or click',
    category: 'display',
    prompt: `Create tooltip and popover components with:
- Hover trigger for tooltip
- Click trigger for popover
- Arrow pointing to trigger
- Position auto-adjustment
- Dark/light theme support
- Animated entrance/exit
- Keyboard dismiss support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    tagline: 'Expandable/collapsible sections',
    category: 'display',
    prompt: `Create an accordion component with:
- Multiple sections
- Expand/collapse animation
- Single or multiple open sections
- Custom icons
- Disabled state
- Keyboard navigation
- Smooth transitions
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'tabs',
    name: 'Tabs',
    tagline: 'Tab navigation for content sections',
    category: 'display',
    prompt: `Create a tabs component with:
- Horizontal tab navigation
- Tab content display
- Active tab indicator
- Smooth content transition
- Keyboard navigation (arrow keys)
- Customizable colors
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'carousel',
    name: 'Carousel/Slider',
    tagline: 'Image carousel with navigation',
    category: 'display',
    prompt: `Create a carousel component with:
- Previous/Next buttons
- Dot indicators
- Auto-play option
- Pause on hover
- Smooth transitions
- Keyboard navigation
- Responsive design
- Touch support for mobile
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    tagline: 'Chronological event display',
    category: 'display',
    prompt: `Create a timeline component with:
- Vertical timeline layout
- Event items with dates
- Icons for events
- Alternating left/right layout
- Connecting line
- Customizable colors
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'stat-card',
    name: 'Statistic Card',
    tagline: 'Card displaying key metrics',
    category: 'display',
    prompt: `Create a statistic card component with:
- Large number display
- Label/description
- Icon support
- Trend indicator (up/down)
- Percentage change
- Custom colors
- Hover effects
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'modal-dialog',
    name: 'Modal Dialog',
    tagline: 'Advanced modal with animations',
    category: 'interaction',
    prompt: `Create a modal dialog component with:
- Backdrop overlay
- Close button
- Header, body, footer sections
- Smooth entrance/exit animation
- Keyboard dismiss (Escape)
- Focus trap
- Custom sizes
- Scrollable content
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'toast-notification',
    name: 'Toast Notification',
    tagline: 'Temporary notification messages',
    category: 'interaction',
    prompt: `Create a toast notification component with:
- Success, error, warning, info variants
- Auto-dismiss timer
- Manual dismiss button
- Stack positioning
- Smooth animations
- Custom duration
- Action button support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'skeleton-loader',
    name: 'Skeleton Loader',
    tagline: 'Placeholder while content loads',
    category: 'interaction',
    prompt: `Create a skeleton loader component with:
- Pulsing animation
- Multiple variants (text, card, avatar)
- Customizable dimensions
- Rounded corners option
- Shimmer effect option
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'loading-spinner',
    name: 'Loading Spinner',
    tagline: 'Animated loading indicator',
    category: 'interaction',
    prompt: `Create a loading spinner component with:
- Rotating animation
- Multiple sizes
- Color variants
- Overlay option
- Text label support
- Smooth animation
- Accessibility support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'empty-state',
    name: 'Empty State',
    tagline: 'Message when no data available',
    category: 'interaction',
    prompt: `Create an empty state component with:
- Icon display
- Title and description
- Action button
- Illustration support
- Customizable messaging
- Animated entrance
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'share-button',
    name: 'Share Button',
    tagline: 'Social media sharing options',
    category: 'interaction',
    prompt: `Create a share button component with:
- Dropdown menu with platforms
- Copy link option
- Social icons
- Custom share text
- Analytics tracking ready
- Keyboard navigation
- Mobile-friendly
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'copy-button',
    name: 'Copy to Clipboard',
    tagline: 'Button to copy text with feedback',
    category: 'interaction',
    prompt: `Create a copy button component with:
- Click to copy functionality
- Visual feedback (checkmark)
- Tooltip confirmation
- Custom copy text
- Keyboard shortcut support
- Accessibility labels
- Animated state change
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'like-button',
    name: 'Like/Favorite Button',
    tagline: 'Heart button for favoriting',
    category: 'interaction',
    prompt: `Create a like/favorite button component with:
- Heart icon animation
- Toggle on/off
- Count display
- Color change on like
- Smooth animation
- Disabled state
- Keyboard support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'component-search',
    name: 'Component Search Filter',
    tagline: 'Advanced search with filters',
    category: 'registry',
    prompt: `Create a component search filter with:
- Text search input
- Tag filter chips
- Author filter
- Date range filter
- Sort options
- Clear filters button
- Real-time results
- Keyboard shortcuts
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'author-profile',
    name: 'Author Profile Card',
    tagline: 'Profile card for component authors',
    category: 'registry',
    prompt: `Create an author profile card with:
- Avatar image
- Name and bio
- Contribution count
- Social links
- Follow button
- Components grid preview
- Hover effects
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'submit-form',
    name: 'Component Submission Form',
    tagline: 'Form for submitting new components',
    category: 'registry',
    prompt: `Create a component submission form with:
- Component name input
- Description textarea
- Category selection
- Code input with syntax highlighting
- Preview generation
- Tags input
- Validation feedback
- Submit button
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'code-sandbox',
    name: 'Code Sandbox Integration',
    tagline: 'Embedded code editor for testing',
    category: 'registry',
    prompt: `Create a code sandbox component with:
- Code editor pane
- Live preview pane
- Syntax highlighting
- Auto-save functionality
- Export code option
- Share sandbox link
- Error display
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'version-history',
    name: 'Version History Display',
    tagline: 'Show component version history',
    category: 'registry',
    prompt: `Create a version history component with:
- Timeline of versions
- Version numbers
- Release dates
- Change descriptions
- Changelog display
- Revert option
- Diff viewer
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'comments-section',
    name: 'Comment Section',
    tagline: 'Comments for components',
    category: 'registry',
    prompt: `Create a comments section with:
- Comment input field
- Comment list display
- User avatars
- Timestamps
- Reply functionality
- Like comments
- Delete own comments
- Nested replies
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'voting-system',
    name: 'Upvote/Downvote System',
    tagline: 'Vote on component quality',
    category: 'registry',
    prompt: `Create a voting system with:
- Upvote button
- Downvote button
- Vote count display
- User vote state tracking
- Animated transitions
- Disabled state
- Tooltip hints
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'divider',
    name: 'Separator/Divider',
    tagline: 'Styled divider line',
    category: 'utility',
    prompt: `Create a separator/divider component with:
- Horizontal and vertical options
- Custom colors
- Dashed/solid styles
- Text in middle option
- Margins customization
- Responsive design
Use Tailwind CSS.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'gradient-text',
    name: 'Gradient Text',
    tagline: 'Text with gradient color',
    category: 'utility',
    prompt: `Create a gradient text component with:
- Multiple gradient presets
- Custom gradient support
- Animation option
- Responsive sizing
- Text shadow option
- Accessibility support
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'blur-background',
    name: 'Blurry Background Effect',
    tagline: 'Blur effect for backgrounds',
    category: 'utility',
    prompt: `Create a blur background component with:
- Adjustable blur amount
- Color overlay option
- Opacity control
- Responsive design
- Animation support
- Performance optimized
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'parallax-scroll',
    name: 'Parallax Scroll Effect',
    tagline: 'Parallax effect on scroll',
    category: 'utility',
    prompt: `Create a parallax scroll component with:
- Scroll-based animation
- Multiple layers
- Customizable speed
- Mobile optimization
- Smooth transitions
- Performance optimized
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'responsive-image',
    name: 'Responsive Image',
    tagline: 'Optimized image component',
    category: 'utility',
    prompt: `Create a responsive image component with:
- Lazy loading
- Responsive srcset
- Aspect ratio preservation
- Placeholder support
- Error handling
- Loading state
- Accessibility alt text
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'video-player',
    name: 'Video Player',
    tagline: 'Simple video player',
    category: 'utility',
    prompt: `Create a video player component with:
- Play/pause controls
- Progress bar
- Volume control
- Fullscreen option
- Time display
- Keyboard shortcuts
- Mobile controls
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'audio-player',
    name: 'Audio Player',
    tagline: 'Simple audio player',
    category: 'utility',
    prompt: `Create an audio player component with:
- Play/pause button
- Progress bar
- Volume control
- Time display
- Playlist support
- Keyboard shortcuts
- Mobile friendly
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    tagline: 'Color selection component',
    category: 'utility',
    prompt: `Create a color picker component with:
- Color gradient selector
- Hue slider
- Opacity slider
- Hex/RGB input
- Color presets
- Copy color code
- Keyboard navigation
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    tagline: 'Animated countdown display',
    category: 'utility',
    prompt: `Create a countdown timer component with:
- Time display (days, hours, minutes, seconds)
- Auto-start option
- Pause/resume controls
- Completion callback
- Custom styling
- Sound notification option
- Responsive design
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
  {
    id: 'confetti-animation',
    name: 'Confetti Animation',
    tagline: 'Celebratory confetti effect',
    category: 'utility',
    prompt: `Create a confetti animation component with:
- Trigger button
- Customizable colors
- Particle count
- Duration control
- Physics simulation
- Sound effect option
- Performance optimized
Use Tailwind CSS and Framer Motion.`,
    preview: 'DefaultPreview',
  },
];

// Export by category
export const getComponentsByCategory = (category) => {
  return NEW_COMPONENTS.filter(c => c.category === category);
};

// Export all
export const getAllNewComponents = () => NEW_COMPONENTS;
