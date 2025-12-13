# Quick Customization Guide

## Change Brand Colors

Open `assets/css/main.css` and find this section (around line 30):

```css
:root { 
  --background-color: #ffffff;
  --default-color: #272829;
  --heading-color: #050d18;
  --accent-color: #149ddd;  /* ← Your main brand color (cyan blue) */
  --surface-color: #ffffff;
  --contrast-color: #ffffff;
}
```

Change `--accent-color` to your desired color. This will update:
- Links and hover effects
- Buttons and interactive elements
- Progress bars
- Accent borders and highlights
- Theme toggle button

---

## Adjust Animation Speed

### Scroll Animation Duration
Find in `main.js`:
```javascript
AOS.init({
  duration: 600,  // ← Change this (milliseconds)
  easing: 'ease-in-out',
  once: true,
  mirror: false
});
```

### Progress Bar Fill Speed
Find in `main.css`:
```css
.progress-bar {
  transition: width 0.8s cubic-bezier(...);  /* ← Change 0.8s */
}
```

### Button Hover Lift Distance
Find in `main.css`:
```css
.service-item:hover {
  transform: translateY(-8px);  /* ← Change -8px to any value */
}
```

---

## Customize Dark Mode Colors

Find this section in `main.css` (around line 1340):

```css
body.dark-theme {
  --background-color: #0a0e27;  /* Main background */
  --default-color: #e4e4e7;     /* Text color */
  --heading-color: #ffffff;     /* Heading color */
  --surface-color: #1a1f3a;     /* Card background */
  --contrast-color: #ffffff;    /* Text on accent */
}
```

Adjust these to match your brand in dark mode.

---

## Enable/Disable Features

### Disable Dark Mode Toggle
In `main.js`, comment out:
```javascript
createThemeToggleButton();  // Add // at beginning
initThemeToggle();          // Add // at beginning
```

### Disable Scroll Progress Bar
In `main.js`, comment out:
```javascript
initScrollProgressBar();  // Add // at beginning
```

### Disable Parallax Effect
In `main.js`, comment out:
```javascript
initParallaxEffect();  // Add // at beginning
```

### Disable Animations on Hover
In `main.css`, comment out or reduce opacity of card hover effects:
```css
.portfolio-content:hover {
  /* transform: translateY(-8px); */
  /* box-shadow: 0 15px 40px rgba(...); */
}
```

---

## Customize Animation Easing

### Change Button Hover Animation
Find in `main.css`:
```css
button,
.service-item,
.resume-item {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        /* ↑ Change these numbers for different feels */
}
```

Common easing presets:
- `ease` - Natural, default
- `ease-in-out` - Smooth start and end
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Snappy (current)
- `cubic-bezier(0.34, 1.56, 0.64, 1)` - Bounce effect

---

## Add More Floating Elements

In `main.css`, find:
```css
.profile-img img {
  animation: float 3s ease-in-out infinite;
}
```

Apply this class to other elements:
```html
<div class="profile-img">
  <img src="..." alt="">
</div>
```

---

## Customize Form Styling

Find in `main.css`:
```css
.form-control,
textarea.form-control {
  border-radius: 8px;        /* ← Change corner radius */
  border: 2px solid ...;     /* ← Change border */
  padding: 12px 16px;        /* ← Change padding */
  font-size: 15px;          /* ← Change font size */
}
```

---

## Change Navigation Highlight Style

Find in `main.css`:
```css
.navmenu a.active::before {
  height: 2px;              /* ← Change underline thickness */
  border-radius: 1px;       /* ← Change shape */
  animation: slideIn 0.3s ease;  /* ← Change animation */
}
```

---

## Customize Portfolio Filter Buttons

Find in `main.css`:
```css
.portfolio-filters li {
  border-radius: 25px;      /* ← Change to 0 for square buttons */
  padding: 8px 20px;        /* ← Adjust size */
  font-weight: 600;         /* ← Adjust text weight */
  letter-spacing: 0.5px;    /* ← Adjust letter spacing */
}
```

---

## Add Custom Fonts

Add to `<head>` in `index.html`:
```html
<!-- Google Fonts Example -->
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet">
```

Update CSS variables in `main.css`:
```css
:root {
  --default-font: "YourFont", sans-serif;
  --heading-font: "YourFont", sans-serif;
  --nav-font: "YourFont", sans-serif;
}
```

---

## Performance Tips

1. **Reduce Animation Durations**: Lower values = faster, snappier feel
2. **Use `transform` and `opacity`**: These are GPU-accelerated
3. **Minimize Animations on Mobile**: Add to your CSS:
```css
@media (max-width: 768px) {
  * {
    animation-duration: 0.3s !important;
  }
}
```

4. **Lazy Load Images**: Images already use AOS library
5. **Compress Images**: Reduce image file sizes

---

## Browser Compatibility

- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- IE 11: Basic support (no CSS variables)

---

## Common Issues & Solutions

### "Theme toggle button not appearing"
- Check if JavaScript is enabled
- Open browser console (F12) for errors
- Ensure `main.js` is loaded

### "Animations are choppy/laggy"
- Reduce animation duration
- Disable parallax effect
- Check if GPU acceleration is enabled
- Clear browser cache

### "Colors don't change in dark mode"
- Clear cache (Ctrl+Shift+Delete)
- Make sure CSS variables are updated
- Check dark mode class is applied

### "Form not submitting"
- Check `forms/contact.php` is accessible
- Ensure PHP is enabled on server
- Check browser console for CORS errors

---

## Need Help?

Refer to `WEBSITE_ENHANCEMENTS.md` for complete feature documentation!
