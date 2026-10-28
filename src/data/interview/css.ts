import { InterviewQA } from './types'

export const CSS_INTERVIEW_QA: InterviewQA[] = [
  // --- Fundamentals ---
  {
    id: 'css-int-1',
    category: 'Fundamentals',
    question: 'What is CSS, and what problem does it solve?',
    answer:
      'CSS (Cascading Style Sheets) describes how HTML elements should be presented - colors, layout, fonts, spacing. It separates content (HTML) from presentation, so the same markup can be styled differently across pages or themes without duplicating structure.',
  },
  {
    id: 'css-int-2',
    category: 'Fundamentals',
    question: 'What does the "cascade" in Cascading Style Sheets actually mean?',
    answer:
      "The cascade is the algorithm that resolves conflicts when multiple rules target the same element and property. It considers origin (browser default vs author vs `!important`), specificity (how precise a selector is), and source order (later rules win ties) to decide which declaration ultimately applies.",
  },
  {
    id: 'css-int-3',
    category: 'Fundamentals',
    question: 'What are the three main ways to add CSS to an HTML page?',
    answer:
      'Inline (a `style` attribute directly on an element), internal (a `<style>` block in the document `<head>`), and external (a separate `.css` file linked via `<link rel="stylesheet">`). External stylesheets are generally preferred since they\'re cacheable and keep styling out of the markup.',
  },
  {
    id: 'css-int-4',
    category: 'Fundamentals',
    question: 'What is the CSS box model?',
    answer:
      'Every element is a rectangular box made of four layers, from the inside out: content, padding, border, and margin. Padding adds space inside the border, margin adds space outside it, and understanding this model is essential for predicting how big an element actually renders and how it spaces itself from neighbors.',
  },
  {
    id: 'css-int-5',
    category: 'Fundamentals',
    question: 'What is the difference between `box-sizing: content-box` and `box-sizing: border-box`?',
    answer:
      "With the default `content-box`, `width`/`height` set only the content area's size - padding and border are added on top, so the element ends up larger than the declared width. `border-box` makes `width`/`height` include padding and border, so the element's final rendered size matches what you set, which is why many resets apply `border-box` globally.",
  },

  // --- Selectors & specificity ---
  {
    id: 'css-int-6',
    category: 'Selectors & specificity',
    question: 'What is CSS specificity, and roughly how is it calculated?',
    answer:
      'Specificity determines which rule wins when multiple selectors match the same element with equal source order. It\'s commonly summarized as a tuple of (inline styles, ID selectors, class/attribute/pseudo-class selectors, element/pseudo-element selectors) - more IDs beats more classes, which beats more element selectors, compared left to right.',
  },
  {
    id: 'css-int-7',
    category: 'Selectors & specificity',
    question: 'What is the difference between a class selector and an ID selector?',
    answer:
      "A class (`.name`) can be applied to any number of elements and has moderate specificity; an ID (`#name`) should be unique per page and has much higher specificity, making its rules harder to override. Because of that specificity weight, most style authoring favors classes and reserves IDs for things like anchor links or JS hooks.",
  },
  {
    id: 'css-int-8',
    category: 'Selectors & specificity',
    question: 'What is the difference between a pseudo-class and a pseudo-element?',
    answer:
      "A pseudo-class (single colon, e.g. `:hover`, `:first-child`) selects an element based on a state or position it's already in. A pseudo-element (double colon, e.g. `::before`, `::first-line`) targets a sub-part of an element that isn't a real DOM node, like generated content or the first line of text.",
  },
  {
    id: 'css-int-9',
    category: 'Selectors & specificity',
    question: 'What is the difference between a descendant combinator and a child combinator?',
    answer:
      'A descendant combinator (a space, `div p`) matches a `<p>` anywhere inside a `<div>`, no matter how deeply nested. A child combinator (`>`, `div > p`) matches only a `<p>` that is a direct child of the `<div>`.',
  },
  {
    id: 'css-int-10',
    category: 'Selectors & specificity',
    question: 'Why is `!important` generally discouraged?',
    answer:
      "`!important` overrides normal specificity/cascade rules, forcing a declaration to win regardless of how specific the competing selector is. Overusing it makes styles hard to override predictably later, often leading to an escalating chain of more `!important` rules to fix the last one - it's better used sparingly, e.g. for narrow utility overrides.",
  },

  // --- Layout ---
  {
    id: 'css-int-11',
    category: 'Layout',
    question: 'What is the difference between Flexbox and CSS Grid, and when would you use each?',
    answer:
      "Flexbox lays items out along a single axis (row or column) and excels at distributing space among items in that one direction, like a navbar or a row of cards. Grid lays items out in two dimensions (rows and columns at once) and is better for overall page or component layouts where you need precise control over both axes simultaneously.",
  },
  {
    id: 'css-int-12',
    category: 'Layout',
    question: 'What does `position: relative` do on its own, without `top`/`left`/etc.?',
    answer:
      "By itself, `position: relative` changes nothing visually - the element stays in normal flow. Its real purpose is to establish a positioning context: any descendant with `position: absolute` will now position itself relative to this element instead of the page, which is why `position: relative` is so often paired with an absolutely positioned child.",
  },
  {
    id: 'css-int-13',
    category: 'Layout',
    question: 'What is the difference between `position: absolute` and `position: fixed`?',
    answer:
      "`absolute` positions an element relative to its nearest positioned ancestor (or the page if there isn't one), and it scrolls along with the page. `fixed` positions it relative to the viewport itself, so it stays in the same visual spot even as the page scrolls - the mechanism behind sticky headers or floating action buttons.",
  },
  {
    id: 'css-int-14',
    category: 'Layout',
    question: 'What does `z-index` control, and why does it sometimes not work as expected?',
    answer:
      "`z-index` controls stacking order among elements that overlap - higher values render on top. It only has an effect on positioned elements (not `position: static`), and it's compared only against siblings within the same stacking context; a `z-index: 9999` inside a low-z-index parent still stays behind everything outside that parent, which is the most common reason it 'doesn't work.'",
  },
  {
    id: 'css-int-15',
    category: 'Layout',
    question: 'What is the difference between `display: none` and `visibility: hidden`?',
    answer:
      "`display: none` removes the element from layout entirely, as if it weren't there - it takes up no space and other elements shift to fill the gap. `visibility: hidden` hides the element visually but keeps its space reserved in the layout.",
  },

  // --- Responsive & modern CSS ---
  {
    id: 'css-int-16',
    category: 'Responsive & modern CSS',
    question: 'What is a media query, and what is mobile-first design?',
    answer:
      'A media query (`@media (min-width: 768px) { ... }`) applies a block of CSS only when a condition, usually about viewport size, is met. Mobile-first design means writing the base styles for small screens first, then using `min-width` media queries to progressively add or adjust styles for larger screens, rather than starting from desktop and overriding downward.',
  },
  {
    id: 'css-int-17',
    category: 'Responsive & modern CSS',
    question: 'What is the difference between relative units like `em`/`rem` and absolute units like `px`?',
    answer:
      "`px` is a fixed, absolute size. `em` is relative to the font size of the current element (compounding when nested), and `rem` is relative to the root (`<html>`) font size, so it stays predictable regardless of nesting. Using `rem` for font sizes and spacing makes a layout scale consistently if a user changes their browser's base font size.",
  },
  {
    id: 'css-int-18',
    category: 'Responsive & modern CSS',
    question: 'What are CSS custom properties (variables), and what is one advantage over Sass variables?',
    answer:
      "Custom properties (`--main-color: blue;`, read with `var(--main-color)`) are variables defined and read directly in CSS. Unlike Sass variables, which are compiled away, custom properties are live in the browser - they can be read and changed at runtime (e.g. with JavaScript, or automatically inherited/overridden per element via the cascade), which is what makes them useful for things like runtime theme switching.",
  },
  {
    id: 'css-int-19',
    category: 'Responsive & modern CSS',
    question: 'What does `object-fit: cover` do on an `<img>`?',
    answer:
      "`object-fit` controls how a replaced element's content (like an image) fills its box when the box's aspect ratio differs from the content's. `cover` scales the image to fill the entire box while preserving aspect ratio, cropping any overflow - commonly used to make images of varying dimensions fill a fixed-size container without distortion.",
  },
  {
    id: 'css-int-20',
    category: 'Responsive & modern CSS',
    question: 'What is the CSS `calc()` function used for?',
    answer:
      '`calc()` lets you compute a CSS value from a mix of units, e.g. `width: calc(100% - 40px)`. It\'s useful whenever a size needs to combine a flexible portion (like a percentage of the container) with a fixed portion (like padding or a fixed sidebar width) that can\'t be expressed as a single static value.',
  },

  // --- Practical ---
  {
    id: 'css-int-21',
    category: 'Practical',
    question: 'What is a CSS reset (or a modern alternative like Normalize.css) for?',
    answer:
      "Different browsers ship slightly different default styles for elements (margins on `<p>`, list bullet styles, form control fonts, etc.). A reset strips most of that out so you start from a consistent, predictable baseline; a 'normalize' approach instead makes those defaults consistent across browsers rather than removing them entirely.",
  },
  {
    id: 'css-int-22',
    category: 'Practical',
    question: 'What causes margin collapsing, and when does it happen?',
    answer:
      "When two vertical margins meet with nothing between them - e.g. the bottom margin of one block element and the top margin of the next sibling, or a parent and its first/last child with no border/padding separating them - the browser collapses them into a single margin equal to the larger of the two, rather than adding them together.",
  },
  {
    id: 'css-int-23',
    category: 'Practical',
    question: "Why might a container with only floated children end up with zero height?",
    answer:
      "Floated elements are taken out of normal document flow, so a parent that contains only floats has nothing left inside it to size against, and collapses to zero height. The classic fix is a 'clearfix' (adding a pseudo-element with `clear: both`) or, in modern CSS, simply using Flexbox or Grid on the parent instead of floats for layout.",
  },
]
