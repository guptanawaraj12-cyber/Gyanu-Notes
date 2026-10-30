// Gyanu Notes — decorative subject glyphs for subject rows.
// Each icon is a small inline SVG using currentColor so it inherits the row's
// text colour in both themes, and aria-hidden="true" because the subject
// name beside it already carries the meaning. Lookups are keyed by the
// catalogue slug; unknown slugs render no icon (nothing is interpolated
// from user input — only these literal strings are used).

var ICONS = {
  // Σ
  mathematics:
    '<path d="M14.5 5.5h-9l4.5 4.5-4.5 4.5h9"/>' +
    '<path d="M4 16.5h2"/>' +
    '<path d="M14 16.5h2"/>',

  // atom
  physics:
    '<circle cx="10" cy="10" r="1.4" fill="currentColor" stroke="none"/>' +
    '<ellipse cx="10" cy="10" rx="8" ry="3.4"/>' +
    '<ellipse cx="10" cy="10" rx="8" ry="3.4" transform="rotate(60 10 10)"/>' +
    '<ellipse cx="10" cy="10" rx="8" ry="3.4" transform="rotate(120 10 10)"/>',

  // flask
  chemistry:
    '<path d="M8 2.8h4"/>' +
    '<path d="M9 2.8v5.1L5.4 15a1.9 1.9 0 0 0 1.7 2.9h5.8a1.9 1.9 0 0 0 1.7-2.9L11 7.9V2.8"/>' +
    '<path d="M7.2 12.4h5.6"/>' +
    '<circle cx="9.2" cy="14.4" r="0.9" fill="currentColor" stroke="none"/>' +
    '<circle cx="12" cy="15.6" r="0.7" fill="currentColor" stroke="none"/>',

  // leaf
  biology:
    '<path d="M4.5 15.5c-1-6 3.5-11 11-11 .5 7-3.5 11.5-11 11z"/>' +
    '<path d="M4.5 15.5c3-3.5 5.5-5.8 8.5-7.3"/>',

  // quill pen
  english:
    '<path d="M16.5 3.5c-6 0-10 3-11.5 8.5L3.5 16.5l4.5-1.5c5.5-1.5 8.5-5.5 8.5-11.5z"/>' +
    '<path d="M6.5 13.5l4-4"/>' +
    '<path d="M3.5 16.5h4"/>',

  // Devanagari "क" (falls back to a system Devanagari font)
  nepali:
    '<text x="10" y="14.5" text-anchor="middle" font-size="13" font-family="' +
    "Noto Sans Devanagari, Nirmala UI, Mangal, sans-serif" +
    '" fill="currentColor" stroke="none">क</text>',

  // globe
  social:
    '<circle cx="10" cy="10" r="7.5"/>' +
    '<path d="M2.5 10h15"/>' +
    '<path d="M10 2.5c2.2 2.1 3.3 4.6 3.3 7.5S12.2 15.4 10 17.5c-2.2-2.1-3.3-4.6-3.3-7.5S7.8 4.6 10 2.5z"/>',

  // terminal
  'computer-science':
    '<rect x="2.5" y="4" width="15" height="12" rx="2"/>' +
    '<path d="M6 8.5l2.8 2.5L6 13.5"/>' +
    '<path d="M10.8 13.5h3.7"/>'
};

// Returns SVG markup for a catalogue subject slug, or "" when unknown.
export function subjectIconSvg(slug) {
  var body = ICONS[slug];
  if (!body) return "";
  return (
    '<svg class="subject-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true" focusable="false">' + body + "</svg>"
  );
}
