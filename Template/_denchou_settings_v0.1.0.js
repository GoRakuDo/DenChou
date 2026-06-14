/* _denchou_settings_v0.1.0.js */
(function () {
  const ANKI_CONNECT_URL = "http://127.0.0.1:8765";
  const PRESET_FILENAME = "_denchou_presets.js";
  const DECK_PRESETS_FILENAME = "_denchou_deck_presets.js";

  // CONFIGURATION
  // =========================================================================
  const groups = {
    "Visibility": [
      { type: "header", label: "Desktop / Global" },
      { label: "Settings Toggle", var: "--settings-visibility", type: "switch-int", desc: "Show the gear icon to open the settings.", mobileHidden: true },
      { label: "Main Card Background", var: "--main-bg-visibility", type: "switch-int", desc: "Show the main card background.", mobileHidden: true },
      { label: "Card Shadow", var: "--main-bg-shadow-visibility", type: "switch-int", desc: "Show a drop shadow around the main card background.", mobileHidden: true },
      { label: "Dark Mode Toggle", var: "--custom-dark-mode-visibility", type: "switch-int", desc: "Show the Sun/Moon icon to toggle the custom dark mode.", mobileHidden: true },
      { label: "Audio Buttons", var: "--audio-visibility", type: "switch-int", desc: "Show replay buttons for Word/Sentence audio.", mobileHidden: true },
      { label: "Frequency", var: "--freq-visibility", type: "switch-int", desc: "Show the frequency rank indicator.", mobileHidden: true },
      { label: "Tags", var: "--tag-visibility", type: "switch-int", desc: "Show tags in the bottom-left area of the card footer." },
      { label: "External Links", var: "--external-links-visibility", type: "switch-int", desc: "Show icons for external links such as Jisho, JPDB, Immersion Kit, etc." },

      { type: "header", label: "Smaller Screens (≤ 1050px)" },
      { label: "Settings Toggle", var: "--settings-visibility-header", type: "switch-int", desc: "Show the gear icon in the header to open the settings." },
      { label: "Main Card Background", var: "--main-bg-1050-visibility", type: "switch-int", desc: "Show the main card background on smaller screens." },
      { label: "Card Shadow", var: "--main-bg-shadow-1050-visibility", type: "switch-int", desc: "Show a drop shadow around the main card background on smaller screens." },
      { label: "Dark Mode Toggle", var: "--custom-dm-header-visibility", type: "switch-int", desc: "Show the sun/moon icon to toggle the custom dark mode in the header." },
      { label: "Audio Buttons", var: "--audio-header-visibility", type: "switch-int", desc: "Show audio buttons in the header." },
      { label: "Frequency", var: "--freq-header-visibility", type: "switch-int", desc: "Show the frequency rank in the header." }
    ],
    "Card Behavior": [
      { type: "header", label: "General Settings" },
      { label: "Enable Animations", var: "--enable-animations", type: "switch-bool", desc: "Enable transition animations." },
      { label: "Auto Optimize", var: "--ankidroid-auto-optimize", type: "switch-bool", desc: "Automatically reduce shadows and blur on small screens." },
      { label: "AnkiDroid Lite Mode", var: "--ankidroid-lite", type: "switch-bool", desc: "Force lite mode regardless of screen size." },

      { type: "header", label: "Front" },
      { label: "Expand Sentence (Word)", var: "--word-sentence-default-expanded", type: "switch-bool", desc: "Show sentence on word cards immediately." },
      { label: "Expand Sentence (Audio)", var: "--audio-sentence-default-expanded", type: "switch-bool", desc: "Show sentence on audio cards immediately." },
      { label: "Expand Hint", var: "--hint-default-expanded", type: "switch-bool", desc: "Show hint on cards immediately." },

      { type: "header", label: "Back" },
      { label: "Expand Translation", var: "--translation-default-expanded", type: "switch-bool", desc: "Show translation immediately." },
      { label: "Expand Notes", var: "--notes-default-expanded", type: "switch-bool", desc: "Show notes immediately." },
      { label: "No Duplicate Kana", var: "--no-duplicate-kana", type: "switch-bool", desc: "Hide the reading for words written entirely in kana." },
      { label: "Mute Sentence Audio", var: "--mute-sentence-audio", type: "switch-bool", desc: "Disable automatic sentence audio playback." },
      { label: "Auto Play Video", var: "--auto-play-video", type: "switch-bool", desc: "Automatically play videos when shown." },
      { label: "Mute Video", var: "--mute-video", type: "switch-bool", desc: "Mute video audio playback." }
    ],
    "Typography": [
      { type: "header", label: "General Settings" },
      { label: "Base Size", var: "--base-size", type: "text", desc: "Controls the font size of all text." },
      { label: "Definition / Glossary Line Height", var: "--base-line-height", type: "text", desc: "Line spacing within definition and glossary entries." },
      { label: "Bold Highlights", var: "--bold-highlight", type: "switch-int", desc: "Make highlighted text bold." },
      { label: "Custom Font", var: "--custom-font", type: "text", desc: "Custom font family name." },
      {
        label: "Serif", var: "--serif", type: "segment", desc: "Target word font family.", options: [
          { label: "Klee", val: '"Klee One", klee, "Hiragino Mincho ProN", "Noto Serif CJK JP", notoserifjp, "Yu Mincho", serif' },
          { label: "Hiragino", val: '"Hiragino Mincho ProN", "Klee One", klee, "Noto Serif CJK JP", notoserifjp, "Yu Mincho", serif' },
          { label: "Noto", val: '"Noto Serif CJK JP", notoserifjp, "Klee One", klee, "Hiragino Mincho ProN", "Yu Mincho", serif' },
          { label: "Yu", val: '"Yu Mincho", "Klee One", klee, "Hiragino Mincho ProN", "Noto Serif CJK JP", notoserifjp, serif' },
          { label: "Custom", val: "var(--custom-font)" }
        ]
      },
      {
        label: "Sans", var: "--sans", type: "segment", desc: "General font family.", options: [
          { label: "Gen", val: '"Gen Interface JP", "Hiragino Kaku Gothic ProN", "Noto Sans CJK JP", notosansjp, "Segoe UI", sans-serif' },
          { label: "Hiragino", val: '"Hiragino Kaku Gothic ProN", "Noto Sans CJK JP", notosansjp, "Segoe UI", sans-serif' },
          { label: "Noto", val: '"Noto Sans CJK JP", notosansjp, "Hiragino Kaku Gothic ProN", "Segoe UI", sans-serif' },
          { label: "Segoe", val: '"Segoe UI", "Hiragino Kaku Gothic ProN", "Noto Sans CJK JP", notosansjp, sans-serif' },
          { label: "Custom", val: "var(--custom-font)" }
        ]
      },
      
      { label: "Wrapped Sentence Alignment", var: "--sentence-alignment", type: "segment", options: [{ val: "left", label: "Left" }, { val: "center", label: "Center" }, { val: "right", label: "Right" }], desc: "Alignment for multi-line sentences." },

      { type: "sub-header", label: "Word Scaling" },
      { label: "Base", var: "--word-size-base", type: "text", desc: "1-3 chars." },
      { label: "4 Chars", var: "--word-size-4", type: "text" },
      { label: "5 Chars", var: "--word-size-5", type: "text" },
      { label: "6 Chars", var: "--word-size-6", type: "text" },
      { label: "7 Chars", var: "--word-size-7", type: "text" },
      { label: "8 Chars", var: "--word-size-8", type: "text" },
      { label: "9+ Chars", var: "--word-size-9", type: "text" },

      { type: "header", label: "Reading / Furigana" },
      { label: "Reading Position", var: "--reading-position", type: "segment", options: [{ val: "above", label: "Above" }, { val: "below", label: "Below" }], desc: "Display the reading above or below the target word." },
      { label: "Dynamic Furigana Size", var: "--dynamic-furigana-size", type: "switch-int", desc: "Use automatic sizing for furigana." },
      { label: "Word Furigana Size", var: "--furigana-size", type: "text", desc: "Size relative to the target word." },
      { label: "Word Furigana Height", var: "--furigana-height", type: "text", desc: "Vertical distance from the word; a negative value moves it up (e.g., -0.05rem)." },
      { label: "Show Sentence Furigana", var: "--sentence-furigana-display", type: "switch-int" },
      { label: "Sentence Furigana Height", var: "--sentence-furigana-height", type: "text", desc: "Vertical distance for sentence furigana; a negative value moves it up (e.g., -0.05rem)." },

      { type: "sub-header", label: "Font Sizes" },
      { label: "Sentence", var: "--sentence-size", type: "text" },
      { label: "Sentence Translation", var: "--sentence-eng-size", type: "text" },
      { label: "Definition / Glossary", var: "--definition-size", type: "text" },
      { label: "Misc Info", var: "--misc-info-size", type: "text" },
      { label: "Tags", var: "--tag-font-size", type: "text" },
      { label: "Frequency", var: "--frequency-size", type: "text" },
      { label: "Frequency Content", var: "--frequency-content-size", type: "text" }
    ],
    "Dimensions": [
      { type: "header", label: "Structure & Layout" },
      { label: "Radius Small", var: "--border-radius-sm", type: "text" },
      { label: "Radius Medium", var: "--border-radius-ms", type: "text" },
      { label: "Radius Large", var: "--border-radius-md", type: "text" },
      { label: "Radius XL", var: "--border-radius-lg", type: "text" },
      { label: "Tag Radius", var: "--tag-border-radius", type: "text" },

      { type: "sub-header", label: "Dimensions" },
      { label: "Card Max Width", var: "--card-max-width", type: "text", desc: "Maximum width of the content area." },
      { label: "Front Offset", var: "--front-top-offset", type: "text", desc: "Vertical positioning for the front card." },
      { label: "Back Offset", var: "--back-top-offset", type: "text", desc: "Vertical positioning for the back card." },

      { type: "header", label: "Spacing Scale" },
      { label: "XS", var: "--spacing-xs", type: "text" },
      { label: "SM", var: "--spacing-sm", type: "text" },
      { label: "MS", var: "--spacing-ms", type: "text" },
      { label: "MD", var: "--spacing-md", type: "text" },
      { label: "LG", var: "--spacing-lg", type: "text" },
      { label: "XL", var: "--spacing-xl", type: "text" },
      { label: "XXL", var: "--spacing-xxl", type: "text" },
      { label: "XXXL", var: "--spacing-xxxl", type: "text" },
      { label: "Base Padding", var: "--base-padding", type: "text", desc: "Padding inside the main card container." },

      { type: "header", label: "UI & Effects" },
      { label: "Button Size", var: "--button-size", type: "text" },
      { label: "Lightbox Nav", var: "--lightbox-nav-width", type: "text" },
      { label: "External Links Icon", var: "--external-links-icon-size", type: "text" },
      { label: "Freq List Height", var: "--frequency-max-height", type: "text" },

      { type: "sub-header", label: "Transitions" },
      { label: "Base", var: "--base-transition", type: "text" },
      { label: "Fast", var: "--fast-transition", type: "text" }
    ],
    "Dictionary": [
      { type: "header", label: "General" },
      { label: "Collapse Entries", var: "--dictionary-collapse", type: "switch-int", desc: "Allows dictionary entries to be collapsed." },
      { label: "Max Height", var: "--dictionary-max-height", type: "text", desc: "Maximum height before entries collapse." },
      { label: "Show Definition Titles", var: "--definition-title-visibility", type: "switch-int", desc: "Show dictionary titles (e.g., 'Jitendex', '大辞泉') in the definition box." },
      { label: "Show Glossary Titles", var: "--glossary-title-visibility", type: "switch-int", desc: "Show dictionary titles (e.g., 'Jitendex', '大辞泉') in the glossary box." },
      { label: "Dictionary Counter", var: "--dictionary-counter-visibility", type: "segment", options: [{ val: "1", label: "Always" }, { val: "0", label: "Toggle" }], desc: "Show always or only after toggling." },

      { type: "header", label: "Colorizer" },
      { label: "Enable Colorizer", var: "--dictionary-colorizer", type: "switch-int", desc: "Automatically applies a unique color to each dictionary entry." },
      { label: "Show Background", var: "--dict-bg-enabled", type: "switch-int", desc: "Adds a background color to individual dictionary boxes." },
      { label: "Full Card Background", var: "--dict-back-bg", type: "switch-int", desc: "Applies the dictionary background to the entire card." },
      { label: "Background Opacity", var: "--dict-bg-opacity", type: "text" },
      { label: "Border Width", var: "--dict-border-width", type: "text" },

      { type: "header", label: "Jitendex" },
      { label: "Enable POS Header", var: "--pos-header", type: "switch-int", desc: "Extracts Jitendex POS tags into a centered sticky header." },
      { label: "Hide Numbered Definitions", var: "--jitendex-hide-numbers", type: "switch-int" },
      { label: "Hide Example Sentences", var: "--jitendex-hide-examples", type: "switch-int" },
      { label: "Hide Explanations", var: "--jitendex-hide-info-gloss", type: "switch-int" },
      { label: "Hide Cross References", var: "--jitendex-hide-xref", type: "switch-int" },
      { label: "Hide Graphics", var: "--jitendex-hide-graphic", type: "switch-int" },
      { label: "Hide Notes", var: "--jitendex-hide-notes", type: "switch-int" },
      { label: "Hide Antonyms", var: "--jitendex-hide-antonyms", type: "switch-int" },
      { label: "Hide Forms", var: "--jitendex-hide-forms", type: "switch-int" },
      { label: "Hide Attribution", var: "--jitendex-hide-attribution", type: "switch-int" }
    ],
    "Pitch Accent": [
      { type: "header", label: "Word" },
      { label: "Pitch Style", var: "--pitch-style", type: "segment", options: [{ val: "default", label: "Default" }, { val: "alt", label: "Alt" }], desc: "Determines whether only the pitch downstep or the entire word is colored according to its pitch pattern." },
      { label: "Pitch Position", var: "--pitch-position-visibility", type: "switch-int", desc: "Show pitch downstep position." },
      { label: "Pitch Colors", var: "--pitch-colors", type: "switch-bool", desc: "Enables pitch downstep coloring." },
      { label: "Sentence Highlight", var: "--sentence-pitch-highlight", type: "switch-bool", desc: "Highlights the target word in the sentence using pitch colors." },
      { label: "Kana-Only Pitch Size", var: "--only-kana-pitch-size", type: "text", desc: "Border thickness for kana-only words." }
    ],
    "Kanji Hover": {
      mobileHidden: true,
      items: [
        { type: "header", label: "General" },
        { label: "Enable Kanji Hover", var: "--enable-kanji-hover", type: "switch-bool", desc: "Enable Kanji Hover." },
        { label: "Show Example Sentences", var: "--kanji-hover-sentence-visibility", type: "switch-int", desc: "Display context sentences within the hover tooltip." },
        { label: "Auto-Quote Example Sentences", var: "--kanji-hover-auto-quote", type: "switch-bool", desc: "Wrap the example sentences in quotation marks." },
        { label: "Word Font", var: "--kanji-hover-word-font", type: "segment", options: [{ val: "var(--serif)", label: "Serif" }, { val: "var(--sans)", label: "Sans" }, { val: "var(--custom-font)", label: "Custom" }], desc: "Select the font style for the word." },
        { label: "Word Size", var: "--kanji-hover-word-size", type: "slider", min: "1", max: "2", step: "0.1", unit: "rem", desc: "Adjust the scale of the word." },
        { label: "Reading Size", var: "--kanji-hover-word-reading-size", type: "slider", min: "0.65", max: "1.25", step: "0.1", unit: "rem", desc: "Adjust the scale of the reading." },

        { type: "header", label: "Pitch Accent" },
        { label: "Pitch Colors", var: "--kanji-hover-pitch-colors", type: "switch-bool", desc: "Enables pitch downstep coloring." },
        { label: "Word / Sentence Highlight", var: "--kanji-hover-pitch-highlight", type: "switch-bool", desc: "Highlights the target kanji and word in the sentence using pitch colors." }
      ]
    },
    "Grid Control": [
      { type: "header", label: "Global" },
      {
        label: "Grid Gap",
        var: "--grid-gap",
        type: "segment",
        desc: "Spacing between word and picture containers.",
        options: [
          { label: "XS", val: "var(--spacing-xs)" },
          { label: "SM", val: "var(--spacing-sm)" },
          { label: "MS", val: "var(--spacing-ms)" },
          { label: "MD", val: "var(--spacing-md)" },
          { label: "LG", val: "var(--spacing-lg)" },
          { label: "XL", val: "var(--spacing-xl)" },
          { label: "XXL", val: "var(--spacing-xxl)" },
          { label: "XXXL", val: "var(--spacing-xxxl)" }
        ]
      },
      { label: "Min Column Width", var: "--grid-column-min-width", type: "text", desc: "Minimum width before wrapping occurs." },

      { type: "header", label: "Default Desktop", mobileHidden: true },
      { label: "Order", var: "--grid-order", type: "segment", options: [{ val: "1", label: "Normal" }, { val: "2", label: "Flip" }], desc: "Swaps the word and picture container positions horizontally.", mobileHidden: true },
      { label: "Vertical", var: "--vertical-grid-order", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }], desc: "Force vertical layout.", mobileHidden: true },

      { type: "header", label: "Large Screens", mobileHidden: true },
      { label: "Horizontal", var: "--horizontal-grid-large", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }], mobileHidden: true },
      { label: "Vertical", var: "--vertical-grid-large", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }], mobileHidden: true },

      { type: "header", label: "Medium Screens", mobileHidden: true },
      { label: "Horizontal", var: "--horizontal-grid-medium", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }], mobileHidden: true },
      { label: "Vertical", var: "--vertical-grid-medium", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }], mobileHidden: true },

      { type: "header", label: "Small Screens" },
      { label: "Horizontal", var: "--horizontal-grid-small", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }] },
      { label: "Vertical", var: "--vertical-grid-small", type: "segment", options: [{ val: "0", label: "Off" }, { val: "1", label: "On" }, { val: "2", label: "Flip" }] }
    ],
    "Backdrop Layout": [
      { type: "header", label: "Depth Control" },
      { label: "Enable Layout", var: "--enable-backdrop-layout", type: "switch-int", desc: "Layers the image behind the text instead of placing it beside it." },
      { label: "Backdrop Mode", var: "--backdrop-style", type: "segment", options: [{ val: "0", label: "Card BG" }, { val: "1", label: "Word BG" }], desc: "Determines if the image fills the whole card or just the word box." },
      { label: "Dynamic Card Height", var: "--backdrop-dynamic-height", type: "switch-int", desc: "Forces the card height to fit the entire image (only for Card BG).", mobileHidden: true },

      { type: "header", label: "Visual Adjustments" },
      { label: "Card BG Offset", var: "--bd-card-bg-front-offset", type: "text", desc: "Front word offset for Card BG mode." },
      { label: "Word BG Offset", var: "--bd-word-bg-front-offset", type: "text", desc: "Front word offset for Word BG mode." },
      { label: "Background Box", var: "--word-background-box", type: "switch-int", desc: "Enable the background box behind the text area." },
      { label: "Image Opacity", var: "--backdrop-opacity", type: "slider", min: "0", max: "1", step: "0.1", desc: "Opacity of the background image." },
      { label: "Image Min Height", var: "--backdrop-background-height", type: "slider", min: "0", max: "500", step: "10", unit: "px", desc: "Minimum height of the background image area." },
      { label: "Text Shadow Color", var: "--bd-text-shadow-color-light", theme: "light", type: "color", desc: "Changes the color of the text shadow." },
      { label: "Text Shadow Color", var: "--bd-text-shadow-color", theme: "dark", type: "color", desc: "Changes the color of the text shadow." },
      { label: "Text Shadow Intensity", var: "--bd-text-shadow-opacity-light", theme: "light", type: "slider", min: "0", max: "1", step: "0.1", desc: "Increases text readability against dark images." },
      { label: "Text Shadow Intensity", var: "--bd-text-shadow-opacity", theme: "dark", type: "slider", min: "0", max: "1", step: "0.1", desc: "Increases text readability against bright images." },

      { type: "header", label: "Fade Effects" },
      { label: "Card BG Fade", var: "--card-background-fade", type: "switch-int", desc: "Applies a bottom fade to the image in Card Background mode." },
      { label: "Card BG Fade Intensity", var: "--card-fade-strength", type: "slider", min: "0", max: "100", step: "5", unit: "%", desc: "Visible percentage of the image." },
      { label: "Word BG Fade", var: "--word-background-fade", type: "switch-int", desc: "Applies a bottom fade to the image in Word Background mode." },
      { label: "Word BG Fade Intensity", var: "--word-fade-strength", type: "slider", min: "0", max: "100", step: "5", unit: "%", desc: "Visible percentage of the image." },

      { type: "header", label: "Front Side Word Alignment" },
      { label: "Manual Front Positioning", var: "--enable-custom-offsets", type: "switch-int", desc: "Enables manual overrides to align the front word/sentence with the back side." },
      { label: "Word BG Word Offset (≤ 1050px)", var: "--bd-word-bg-front-offset-1050", type: "text", desc: "Front word offset for Word BG mode at 1050px max width.", mobileHidden: true },
      { label: "Card BG Word Offset (≤ 1050px)", var: "--bd-card-bg-front-offset-1050", type: "text", desc: "Front word offset for Card BG mode at 1050px max width." },
      { label: "Word BG Word Offset (Mobile)", var: "--bd-word-bg-front-offset-mobile", type: "text", desc: "Front word offset for Word BG mode on mobile devices." }
    ],
    "Picture": [
      { type: "header", label: "General" },
      { label: "Collect Glossary Images", var: "--collect-glossary-images", type: "switch-bool", desc: "Automatically collect glossary images into the picture container." },
      { type: "header", label: "Picture Counter" },
      { label: "Visibility", var: "--picture-counter-visibility", type: "segment", options: [
        { val: "1", label: "Always" },
        { val: "3", label: "More than 1" },
        { val: "2", label: "Hover" },
        { val: "0", label: "Hidden" }
      ], desc: "Show always, only when there are multiple images, only on hover, or never." },
      { label: "Font Size", var: "--picture-counter-size", type: "slider", min: "0.3", max: "1.2", step: "0.05", unit: "rem", desc: "Adjust the counter's font size." },
      { label: "Background Opacity", var: "--picture-counter-bg-opacity", type: "slider", min: "0", max: "1", step: "0.1", desc: "Opacity of the background box." },
      { label: "Shadow Intensity", var: "--picture-counter-shadow-intensity", type: "slider", min: "0", max: "1", step: "0.1", desc: "Adjust the shadow intensity." },
      { type: "header", label: "Dimensions" },
      { label: "Max Picture Height", var: "--picture-height", type: "text", desc: "Maximum picture container height." },
      { label: "Max Picture Height (≤ 624px)", var: "--picture-height-small", type: "text", desc: "Maximum picture container height on small screens." }
    ],
    "Misc Info": [
      { label: "Expand Misc Info", var: "--misc-info-default-expanded", type: "switch-bool", desc: "Show misc info immediately." },
      { label: "Misc Info Position", var: "--misc-info-above", type: "segment", options: [{ val: "true", label: "above" }, { val: "false", label: "Below" }], desc: "Display Misc Info above or below tags and external links." },
      { label: "Bold Misc Info", var: "--bold-misc-info", type: "switch-int", desc: "Make misc info text bold." },
      { label: "Wrapped Misc Info Alignment", var: "--misc-info-alignment", type: "segment", options: [{ val: "left", label: "Left" }, { val: "center", label: "Center" }, { val: "right", label: "Right" }], desc: "Alignment for multi-line misc info." },
      { label: "Misc Info Background", var: "--misc-info-bg-visibility", type: "switch-int", desc: "Show background for misc info." }
    ],
    "NSFW": [
      { label: "Blur NSFW Pictures", var: "--blur-nsfw-picture", type: "switch-bool", desc: "Blur images tagged as NSFW until clicked." },
      { label: "Mute NSFW Audio", var: "--mute-nsfw-audio", type: "switch-bool", desc: "Disable automatic sentence audio playback on NSFW-tagged cards." }
    ],
    "Shortcuts": {
      mobileHidden: true,
      items: [
        { label: "Toggle Settings", var: "--toggle-settings-key", type: "keybind", desc: "Key to open the settings." },
        { label: "Replay Scene", var: "--scene-replay-shortcut-key", type: "keybind", desc: "Key to replay the active scene (only for cards with multiple scenes)." },
        { label: "Toggle Dark Mode", var: "--toggle-custom-dark-mode-key", type: "keybind", desc: "Key to toggle the custom dark mode." },
        { label: "Toggle Lightbox", var: "--toggle-picture-lightbox-key", type: "keybind", desc: "Key to open the image viewer." },
        { label: "Toggle Grid", var: "--toggle-picture-lightbox-grid-key", type: "keybind", desc: "Key to toggle the image grid view." },
        { label: "Toggle Image Visibility", var: "--toggle-image-key", type: "keybind", desc: "key to show or hide the image." },
        { label: "Toggle Image Switch", var: "--toggle-image-switch-key", type: "keybind", isPair: true, desc: "Key to switch between images." },
        { label: "Toggle Scene Switch", var: "--toggle-scene-switch-key", type: "keybind", isPair: true, desc: "Key to switch between scenes." },
        { label: "Toggle Dictionary Switch", var: "--toggle-dictionary-switch-key", type: "keybind", isPair: true, desc: "Key to switch between dictionary entries." }
      ]
    },
    "Theme": [
      { type: "header", label: "General Colors" },
      { label: "Main Text", var: "--text-light", type: "color", theme: "light" },
      { label: "Main Text", var: "--text", type: "color", theme: "dark" },
      { label: "Highlight", var: "--light-highlight", type: "color", theme: "light" },
      { label: "Highlight", var: "--dark-highlight", type: "color", theme: "dark" },
      { label: "Devoiced Mora", var: "--light-devoiced-color", type: "color", theme: "light" },
      { label: "Devoiced Mora", var: "--dark-devoiced-color", type: "color", theme: "dark" },
      { label: "Freq Text", var: "--freq-text-light", type: "color", theme: "light" },
      { label: "Freq Text", var: "--freq-text", type: "color", theme: "dark" },

      { type: "header", label: "Footer" },
      { label: "Tag BG", var: "--tag-bg-light", type: "color", theme: "light" },
      { label: "Tag BG", var: "--tag-bg", type: "color", theme: "dark" },
      { label: "Tag Text", var: "--tag-color-light", type: "color", theme: "light" },
      { label: "Tag Text", var: "--tag-color", type: "color", theme: "dark" },
      { label: "Tag Text Hover ", var: "--tag-color-hover-light", type: "color", theme: "light" },
      { label: "Tag Text Hover", var: "--tag-color-hover", type: "color", theme: "dark" },
      { label: "External Links BG", var: "--external-links-bg-light", type: "color", theme: "light" },
      { label: "External Links BG", var: "--external-links-bg", type: "color", theme: "dark" },

      { type: "header", label: "Misc Info" },
      { label: "Misc Info Text", var: "--misc-info-text-light", type: "color", theme: "light" },
      { label: "Misc Info Text", var: "--misc-info-text", type: "color", theme: "dark" },
      { label: "Misc Info Text Hover", var: "--misc-info-text-hover-light", type: "color", theme: "light" },
      { label: "Misc Info Text Hover", var: "--misc-info-text-hover", type: "color", theme: "dark" },
      { label: "Misc Info BG", var: "--misc-info-bg-light", type: "color", theme: "light" },
      { label: "Misc Info BG", var: "--misc-info-bg", type: "color", theme: "dark" },
      { label: "Misc Info BG Hover", var: "--misc-info-bg-hover-light", type: "color", theme: "light" },
      { label: "Misc Info BG Hover", var: "--misc-info-bg-hover", type: "color", theme: "dark" },

      { type: "header", label: "Controls" },
      { label: "Icons", var: "--svg-color-light", type: "color", theme: "light" },
      { label: "Icons", var: "--svg-color", type: "color", theme: "dark" },
      { label: "Icon Hover", var: "--svg-hover-light", type: "color", theme: "light" },
      { label: "Icon Hover", var: "--svg-hover", type: "color", theme: "dark" },
      { label: "Button BG", var: "--buttons-bg-light", type: "color", theme: "light" },
      { label: "Button BG", var: "--buttons-bg", type: "color", theme: "dark" },
      { label: "Button Hover", var: "--buttons-bg-hover-light", type: "color", theme: "light" },
      { label: "Button Hover", var: "--buttons-bg-hover", type: "color", theme: "dark" },

      { type: "header", label: "Interface" },
      { label: "Global BG", var: "--background-light", type: "color", theme: "light" },
      { label: "Global BG", var: "--background", type: "color", theme: "dark" },
      { label: "Card BG", var: "--card-bg-light", type: "color", theme: "light" },
      { label: "Card BG", var: "--card-bg", type: "color", theme: "dark" },
      { label: "Card Shadow", var: "--card-shadow-light", type: "color", theme: "light" },
      { label: "Card Shadow", var: "--card-shadow", type: "color", theme: "dark" },
      { label: "Lightbox BG", var: "--lightbox-bg-light", type: "color", theme: "light" },
      { label: "Lightbox BG", var: "--lightbox-bg", type: "color", theme: "dark" },
      { label: "Pitch Position BG", var: "--pitch-position-bg-light", type: "color", theme: "light" },
      { label: "Pitch Position BG", var: "--pitch-position-bg", type: "color", theme: "dark" },

      { type: "header", label: "Pitch Accent" },
      { label: "Atamadaka", var: "--pitch-red-light", type: "color", theme: "light" },
      { label: "Atamadaka", var: "--pitch-red", type: "color", theme: "dark" },
      { label: "Heiban", var: "--pitch-blue-light", type: "color", theme: "light" },
      { label: "Heiban", var: "--pitch-blue", type: "color", theme: "dark" },
      { label: "Nakadaka", var: "--pitch-orange-light", type: "color", theme: "light" },
      { label: "Nakadaka", var: "--pitch-orange", type: "color", theme: "dark" },
      { label: "Odaka", var: "--pitch-green-light", type: "color", theme: "light" },
      { label: "Odaka", var: "--pitch-green", type: "color", theme: "dark" },
      { label: "Kifuku", var: "--pitch-purple-light", type: "color", theme: "light" },
      { label: "Kifuku", var: "--pitch-purple", type: "color", theme: "dark" },

      { type: "header", label: "Content Boxes" },
      { label: "Word Box BG", var: "--word-bg-light", type: "color", theme: "light" },
      { label: "Word Box BG", var: "--word-bg", type: "color", theme: "dark" },
      { label: "Picture Box BG", var: "--picture-bg-light", type: "color", theme: "light" },
      { label: "Picture Box BG", var: "--picture-bg", type: "color", theme: "dark" },
      { label: "Notes Box BG", var: "--notes-bg-light", type: "color", theme: "light" },
      { label: "Notes Box BG", var: "--notes-bg", type: "color", theme: "dark" },
      { label: "Definition/Glossary Box BG", var: "--definition-bg-light", type: "color", theme: "light" },
      { label: "Definition/Glossary Box BG", var: "--definition-bg", type: "color", theme: "dark" },
      { label: "Freq List Box BG", var: "--frequency-bg-light", type: "color", theme: "light" },
      { label: "Freq List Box BG", var: "--frequency-bg", type: "color", theme: "dark" }
    ],
    "Advanced": [
      { label: "Custom CSS", var: "user-custom-css", type: "textarea", },

      { type: "header", label: "Auto Advance" },
      { label: "Auto Show Answer", var: "--auto-show-answer", type: "switch-bool", desc: "Automatically show the answer after a delay." },
      { label: "Show Answer Delay", var: "--show-answer-delay", type: "slider", min: "0", max: "15", step: "0.5", unit: "s", desc: "Delay before showing the answer." },
      { label: "Auto Advance", var: "--auto-advance", type: "switch-bool", desc: "Automatically advance to the next card after a delay." },
      { label: "Auto Advance Delay", var: "--auto-advance-delay", type: "slider", min: "0", max: "15", step: "0.5", unit: "s", desc: "Delay before advancing to the next card." },
      {
        label: "Auto Advance Ease", var: "--auto-advance-ease", type: "segment", desc: "The ease button to automatically click.", options: [
          { label: "Again", val: "1" },
          { label: "Hard", val: "2" },
          { label: "Good", val: "3" }
        ]
      },
      { label: "Enable Fade-in", var: "--enable-fade-in", type: "switch-bool", desc: "Adds a smooth fade-in effect when flipping the card." }
    ]
  };

  // CONVERT ANY COLOR TO OKLCH
  // =========================================================================
  function hexToOklch(hex) {
    if (!hex || hex === 'transparent') return 'oklch(10% 0.02 260)';
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    if (c.length !== 6) return 'oklch(10% 0.02 260)';
    const r = parseInt(c.substring(0,2),16)/255;
    const g = parseInt(c.substring(2,4),16)/255;
    const b = parseInt(c.substring(4,6),16)/255;
    const linR = r <= 0.04045 ? r/12.92 : Math.pow((r+0.055)/1.055, 2.4);
    const linG = g <= 0.04045 ? g/12.92 : Math.pow((g+0.055)/1.055, 2.4);
    const linB = b <= 0.04045 ? b/12.92 : Math.pow((b+0.055)/1.055, 2.4);
    const l_ = 0.4122214708*linR + 0.5363325363*linG + 0.0514459929*linB;
    const m_ = 0.2119034982*linR + 0.6806995451*linG + 0.1073969566*linB;
    const s_ = 0.0883024619*linR + 0.2817188376*linG + 0.6299787005*linB;
    const l = Math.cbrt(l_), m = Math.cbrt(m_), s = Math.cbrt(s_);
    const L = 0.2104542553*l + 0.7936177850*m - 0.0040720468*s;
    const a = 1.9779984951*l - 2.4285922050*m + 0.4505937099*s;
    const b2 = 0.0259040371*l + 0.7827717662*m - 0.8086757660*s;
    const C = Math.sqrt(a*a + b2*b2);
    let h = Math.atan2(b2, a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return 'oklch(' + (L*100).toFixed(1) + '% ' + C.toFixed(3) + ' ' + h.toFixed(1) + ')';
  }

  function oklchToHex(oklchStr) {
    if (!oklchStr) return '#0a0510';
    const match = oklchStr.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)/i);
    if (!match) return '#0a0510';
    const L = parseFloat(match[1]) / 100;
    const C = parseFloat(match[2]);
    const H = parseFloat(match[3]) * Math.PI / 180;
    const a = C * Math.cos(H);
    const b = C * Math.sin(H);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
    r = r <= 0.0031308 ? 12.92 * r : 1.055 * Math.pow(r, 1/2.4) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : 1.055 * Math.pow(g, 1/2.4) - 0.055;
    b2 = b2 <= 0.0031308 ? 12.92 * b2 : 1.055 * Math.pow(b2, 1/2.4) - 0.055;
    const clamp = function(v) { return Math.max(0, Math.min(255, Math.round(v * 255))); };
    return '#' + [r, g, b2].map(function(v) { return clamp(v).toString(16).padStart(2, '0'); }).join('');
  }

  function rgbaToOklch(r, g, b, a) {
    const hex = '#' + [r,g,b].map(function(v){ return v.toString(16).padStart(2,'0'); }).join('');
    const oklch = hexToOklch(hex);
    if (a !== undefined && a !== null && parseFloat(a) < 1) {
      return oklch.replace(')', ' / ' + parseFloat(a).toFixed(2) + ')');
    }
    return oklch;
  }

  function getSafeOklchColor(str) {
    if (!str) return 'oklch(10% 0.02 260)';

    str = str.trim();

    if (/^oklch\(/i.test(str)) return str;
    if (/^#[0-9A-F]{3,8}$/i.test(str)) return hexToOklch(str);

    const rgba = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)/i);
    if (rgba) return rgbaToOklch(+rgba[1], +rgba[2], +rgba[3], rgba[4]);

    const triplet = str.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
    if (triplet) return rgbaToOklch(+triplet[1], +triplet[2], +triplet[3]);

    const d = document.createElement("div");
    d.style.color = str;
    d.style.display = "none";
    document.body.appendChild(d);
    const computed = window.getComputedStyle(d).color;
    document.body.removeChild(d);

    if (computed && computed !== str && computed !== 'rgba(0, 0, 0, 0)') {
      return getSafeOklchColor(computed);
    }

    return 'oklch(10% 0.02 260)';
  }

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  function getLiveCustomCss() {
    const liveTag = document.getElementById("denchou-live-custom-css");
    if (liveTag && liveTag.textContent.trim()) return liveTag.textContent.trim();

    const styles = document.querySelectorAll('style');
    for (const s of styles) {
      if (s.textContent.includes('/* CUSTOM CSS START */')) {
        const match = s.textContent.match(/\/\* CUSTOM CSS START \*\/([\s\S]*?)\/\* CUSTOM CSS END \*\//);
        if (match && match[1]) return match[1].trim();
      }
    }
    return null;
  }

  // UPDATE BACKDROP STATE CLASSES
  // =========================================================================
  function updateBackdropState() {
    const doc = document.documentElement;

    let enabled = doc.style.getPropertyValue('--enable-backdrop-layout').trim();
    if (!enabled) enabled = getComputedStyle(doc).getPropertyValue('--enable-backdrop-layout').trim();

    let style = doc.style.getPropertyValue('--backdrop-style').trim();
    if (!style) style = getComputedStyle(doc).getPropertyValue('--backdrop-style').trim();

    document.body.classList.remove('denchou-bd-card', 'denchou-bd-word');

    if (enabled === '1' || enabled === 'true') {
      if (style === '1') {
        document.body.classList.add('denchou-bd-word');
      } else {
        document.body.classList.add('denchou-bd-card');
      }
    }
  }

  // STYLING
  // =========================================================================
  if (!document.getElementById('denchou-styles-injected')) {
    const antiFlashStyle = document.createElement('style');
    antiFlashStyle.id = 'denchou-anti-flash';
    antiFlashStyle.textContent = `
			#denchou-settings-modal {
				display: none !important;
				opacity: 0 !important;
			}
		`;
    document.head.appendChild(antiFlashStyle);

    const link = document.createElement('link');
    link.id = 'denchou-styles-injected';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '_denchou_settings_v0.1.0.css';

    link.onload = function () {
      const temp = document.getElementById('denchou-anti-flash');
      if (temp) temp.remove();
    };

    document.head.appendChild(link);
  }

  // ANKI CONNECT
  // =========================================================================
  async function invokeAnkiConnect(action, params = {}) {
    if (window.IS_MOBILE) return null;

    const response = await fetch(ANKI_CONNECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, version: 6, params }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.result;
  }

  async function getModelName() {
    if (window.IS_MOBILE) return null;

    // Try guiCurrentCard first (works during review)
    try {
      const cardInfo = await invokeAnkiConnect('guiCurrentCard');
      if (cardInfo && cardInfo.modelName) return cardInfo.modelName;
    } catch (_) { /* not in review mode, fall through */ }

    // Fallback: ask user to pick from model list
    try {
      const models = await invokeAnkiConnect('modelNames');
      if (!models || models.length === 0) throw new Error("No note types found.");

      // Auto-select DenChou if found
      const denchou = models.find(m => m.toLowerCase().includes("denchou"));
      if (denchou) return denchou;

      return new Promise((resolve, reject) => {
        const isDark = document.body.classList.contains('nightMode') || document.documentElement.classList.contains('custom-dark-mode');
        const bg = isDark ? 'oklch(23.5% 0.0 89.88)' : 'oklch(96% 0.018 92)';
        const fg = isDark ? 'oklch(91.89% 0.0 89.88)' : 'oklch(32.11% 0.0 89.88)';
        const muted = isDark ? 'oklch(62.68% 0.0 89.88)' : 'oklch(68.3% 0.0 89.88)';
        const border = isDark ? 'oklch(44.95% 0.0 89.88)' : 'oklch(84.52% 0.0 89.88)';
        const hoverBg = isDark ? 'oklch(96% 0.018 92 / 0.08)' : 'oklch(10% 0.02 260 / 0.04)';
        const shadow = '0 25px 50px oklch(10% 0.02 260 / 0.4)';

        const overlay = document.createElement("div");
        overlay.style.cssText = `position:fixed;inset:0;background:oklch(10% 0.02 260 / 0.6);z-index:99999;display:flex;align-items:center;justify-content:center;`;
        const box = document.createElement("div");
        box.style.cssText = `background:${bg};border:1px solid ${border};border-radius:8px;padding:24px;min-width:300px;max-width:400px;color:${fg};font-family:inherit;box-shadow:${shadow};`;
        box.innerHTML = '<div style="font-size:16px;font-weight:600;margin-bottom:12px;">Note Type?</div><div style="font-size:13px;opacity:0.6;margin-bottom:16px;">Select the note type to save styling to:</div>';
        const list = document.createElement("div");
        list.style.cssText = "display:flex;flex-direction:column;gap:6px;max-height:300px;overflow-y:auto;";
        models.forEach(name => {
          const btn = document.createElement("button");
          btn.textContent = name;
          btn.style.cssText = `text-align:left;padding:10px 12px;border:1px solid ${border};border-radius:4px;background:transparent;color:${fg};cursor:pointer;font-size:14px;font-family:inherit;transition:background 0.15s,border-color 0.15s;`;
          btn.onmouseenter = () => { btn.style.background = hoverBg; btn.style.borderColor = muted; };
          btn.onmouseleave = () => { btn.style.background = 'transparent'; btn.style.borderColor = border; };
          btn.onclick = () => { overlay.remove(); resolve(name); };
          list.appendChild(btn);
        });
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.cssText = `margin-top:10px;padding:6px 16px;border:1px solid ${border};border-radius:4px;background:transparent;color:${fg};cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;opacity:0.8;transition:opacity 0.15s,border-color 0.15s;`;
        cancelBtn.onmouseenter = () => { cancelBtn.style.opacity = '1'; cancelBtn.style.borderColor = muted; };
        cancelBtn.onmouseleave = () => { cancelBtn.style.opacity = '0.8'; cancelBtn.style.borderColor = border; };
        cancelBtn.onclick = () => { overlay.remove(); resolve(null); };
        box.appendChild(list);
        box.appendChild(cancelBtn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);
        cancelBtn.focus();

        const onKey = (e) => {
          if (e.key === "Escape") { overlay.remove(); resolve(null); document.removeEventListener("keydown", onKey); }
        };
        document.addEventListener("keydown", onKey);
      });
    } catch (e) {
      throw new Error("Could not determine note type: " + e.message);
    }
  }

  async function saveToAnki() {
    if (window.IS_MOBILE) return;
    const statusBtn = document.getElementById('denchou-save-btn');
    const origText = "Save to Anki";
    statusBtn.innerText = "Processing...";
    statusBtn.disabled = true;

    try {
      const modelName = await getModelName();
      if (!modelName) {
        statusBtn.innerText = origText;
        statusBtn.disabled = false;
        return;
      }

      const styleInfo = await invokeAnkiConnect('modelStyling', { modelName: modelName });
      let modifiedCss = styleInfo.css;
      const originalCss = modifiedCss;

      const liveSettings = getCurrentSettings();
      const items = Object.values(groups).flatMap(g => Array.isArray(g) ? g : g.items);

      items.forEach(item => {
        if (item.type === 'header' || item.type === 'sub-header') return;

        let newVal = liveSettings[item.var];

        if (item.type === 'textarea') {
          let cssVal = newVal || "";

          const startMarker = "/* CUSTOM CSS START */";
          const endMarker = "/* CUSTOM CSS END */";
          const blockRegex = /\/\* CUSTOM CSS START \*\/[\s\S]*?\/\* CUSTOM CSS END \*\//g;
          const newBlock = `${startMarker}\n${cssVal}\n${endMarker}`;

          if (blockRegex.test(modifiedCss)) {
            modifiedCss = modifiedCss.replace(blockRegex, newBlock);
          } else if (cssVal !== "") {
            modifiedCss += "\n\n" + newBlock;
          }
        }
        else {
          if (newVal === null || newVal === undefined) return;

          const safeVar = item.var.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const regex = new RegExp(`(${safeVar}\\s*:\\s*)([^;\\r\\n]+)(;)([ \\t]*)(\\/\\*.*)?`, 'g');

          if (regex.test(modifiedCss)) {
            modifiedCss = modifiedCss.replace(regex, (match, prefix, oldVal, semi, padding, comment) => {
              if (!comment) return `${prefix}${newVal}${semi}${padding}`;

              const diff = newVal.length - oldVal.length;
              let newPadding = padding;

              if (diff > 0) {
                if (padding.length >= diff) newPadding = padding.substring(diff);
                else newPadding = "";
              } else if (diff < 0) {
                newPadding = padding + " ".repeat(Math.abs(diff));
              }

              return `${prefix}${newVal}${semi}${newPadding}${comment}`;
            });
          }
        }
      });

      if (modifiedCss === originalCss) {
        alert("No changes detected.");
        statusBtn.innerText = "No Changes";
        statusBtn.disabled = false;
        setTimeout(() => statusBtn.innerText = origText, 2000);
        return;
      }

      statusBtn.innerText = "Saving...";
      await invokeAnkiConnect('updateModelStyling', {
        model: { name: modelName, css: modifiedCss }
      });

      items.forEach(item => {
        if (item.type === 'header' || item.type === 'sub-header') return;
        localStorage.removeItem("denchou_" + item.var);
      });

      statusBtn.innerText = "Saved!";
      statusBtn.style.background = "oklch(65% 0.19 145)";
      statusBtn.style.borderColor = "oklch(65% 0.19 145)";
      statusBtn.style.color = "oklch(96% 0.018 92)";

      setTimeout(() => {
        statusBtn.innerText = origText;
        statusBtn.disabled = false;
        statusBtn.style.background = "";
        statusBtn.style.color = "";
        statusBtn.style.borderColor = "";
      }, 2500);

    } catch (e) {
      console.error(e);
      alert("Error: " + e.message);
      statusBtn.innerText = "Failed";
      statusBtn.disabled = false;
      setTimeout(() => statusBtn.innerText = origText, 2000);
    }
  }

  // PRESET LOGIC
  // =========================================================================
  let activePreset = null;
  let presetsCache = {};

  async function savePresetsToFile(presets) {
    if (window.IS_MOBILE) return;
    localStorage.setItem('denchou_presets_cache', JSON.stringify(presets));
    const jsonStr = JSON.stringify(presets, null, 2);
    const base64Data = utf8_to_b64(jsonStr);

    await invokeAnkiConnect('storeMediaFile', {
      filename: PRESET_FILENAME,
      data: base64Data
    });
  }

  async function loadPresetsFromFile() {
    let presets = {};
    try {
      const response = await fetch(`${PRESET_FILENAME}?t=${new Date().getTime()}`);
      if (response.ok) {
        presets = await response.json();
        localStorage.setItem('denchou_presets_cache', JSON.stringify(presets));
      }
    } catch (e) { }

    if (!presets || Object.keys(presets).length === 0) {
      const cached = localStorage.getItem('denchou_presets_cache');
      if (cached) {
        try { presets = JSON.parse(cached); }
        catch (e) { console.warn('denchou_presets_cache parse failed, falling back to defaults:', e); presets = {}; }
      }
      if (!presets || Object.keys(presets).length === 0) {
        presets = { "Default": getCurrentSettings(), "_active": "Default" };
        try { await savePresetsToFile(presets); } catch (e) { }
      }
    }
    presetsCache = presets || {};
    return presets;
  }

  async function saveDeckLinksToFile(links) {
    if (window.IS_MOBILE) return;
    localStorage.setItem('denchou_deck_presets_cache', JSON.stringify(links));
    const jsonStr = JSON.stringify(links, null, 2);
    const base64Data = utf8_to_b64(jsonStr);
    await invokeAnkiConnect('storeMediaFile', {
      filename: DECK_PRESETS_FILENAME,
      data: base64Data
    });
  }

  async function loadDeckLinksFromFile() {
    try {
      const response = await fetch(`${DECK_PRESETS_FILENAME}?t=${new Date().getTime()}`);
      if (response.ok) {
        const links = await response.json();
        localStorage.setItem('denchou_deck_presets_cache', JSON.stringify(links));
        return links;
      }
    } catch (e) { }
    const cached = localStorage.getItem('denchou_deck_presets_cache');
    if (cached) {
      try { return JSON.parse(cached); }
      catch (e) { console.warn('denchou_deck_presets_cache parse failed:', e); }
    }
    return {};
  }

  async function renderDeckLinksUI() {
    const container = document.getElementById('denchou-deck-links-container');
    if (!container) return;

    const links = await loadDeckLinksFromFile();
    const meta = document.getElementById('denchou-metadata');
    const currentDeck = meta ? meta.getAttribute('data-deck') : "Unknown Deck";

    let linksHtml = '';
    const deckNames = Object.keys(links).sort();

    if (deckNames.length === 0) {
      linksHtml = '<div class="denchou-deck-links-empty">No decks are currently linked to a preset.</div>';
    } else {
      deckNames.forEach(deck => {
        linksHtml += `
          <div class="denchou-row">
            <div class="denchou-label-group">
              <span class="denchou-label-main">${deck}</span>
              <span class="denchou-label-desc">Linked to: <span class="denchou-deck-link-val">${links[deck]}</span></span>
            </div>
            <button class="denchou-btn danger denchou-btn-sm" onclick="window.denchouRemoveDeckLink('${deck}')">Unlink Deck</button>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div class="denchou-grid-wrapper">
        <div class="denchou-grid-card">
          <div class="denchou-group-header">Current Deck</div>
          <div class="denchou-row">
            <div class="denchou-label-group">
              <span class="denchou-label-main">${currentDeck}</span>
              <span class="denchou-label-desc">Link this deck to the active preset.</span>
            </div>
            <button class="denchou-btn denchou-btn-primary denchou-btn-md" onclick="window.denchouLinkCurrentDeck()">Link Deck</button>
          </div>
        </div>

        <div class="denchou-grid-card">
          <div class="denchou-group-header">Linked Decks</div>
          <div id="denchou-deck-links-list">${linksHtml}</div>
        </div>
      </div>
    `;
  }

  window.denchouLinkCurrentDeck = async function () {
    if (!activePreset) return alert("Please select a preset first.");
    const meta = document.getElementById('denchou-metadata');
    const deckName = meta ? meta.getAttribute('data-deck') : null;
    if (!deckName) return alert("Could not detect deck name.");

    const links = await loadDeckLinksFromFile();
    links[deckName] = activePreset;

    try {
      await saveDeckLinksToFile(links);
      renderDeckLinksUI();
    } catch (e) {
      alert("Error saving deck link: " + e.message);
    }
  };

  window.denchouRemoveDeckLink = async function (deckName) {
    const links = await loadDeckLinksFromFile();
    if (!links[deckName]) return;

    delete links[deckName];
    try {
      await saveDeckLinksToFile(links);
      renderDeckLinksUI();
    } catch (e) {
      alert("Error removing deck link: " + e.message);
    }
  };
  function getCurrentSettings() {
    const settings = {};
    const computedRoot = getComputedStyle(document.documentElement);
    const cardEl = document.querySelector('.card');
    const computedCard = cardEl ? getComputedStyle(cardEl) : null;

    const items = Object.values(groups).flatMap(g => Array.isArray(g) ? g : g.items);
    items.forEach(item => {
      if (item.type === 'header' || item.type === 'sub-header') return;

      let val = null;

      // Try to get value from live UI if modal exists
      const input = document.querySelector(`[data-var="${item.var}"]`);
      if (input) {
        if (input.type === 'checkbox') {
          val = input.checked ? (item.type === 'switch-bool' ? 'true' : '1') : (item.type === 'switch-bool' ? 'false' : '0');
        } else if (item.type === 'slider') {
          const unit = input.getAttribute('data-unit') || '';
          val = input.value + unit;
        } else if (input.classList.contains('denchou-segment-group')) {
          const activeBtn = input.querySelector('.denchou-segment-btn.active');
          if (activeBtn) val = activeBtn.getAttribute('data-val');
        } else {
          val = input.value;
        }
      }

      // Fallback to localStorage
      if (val === null || val === undefined || val === "null") {
        val = localStorage.getItem("denchou_" + item.var);
      }

      // Fallback to active preset if UI and localStorage are missing
      if ((val === null || val === "null") && activePreset && presetsCache[activePreset] && presetsCache[activePreset][item.var] !== undefined) {
        val = presetsCache[activePreset][item.var];
      }

      // Fallback to Computed Card Styles
      if (val === null || val === "null") {
        if (item.var === 'user-custom-css') {
          val = getLiveCustomCss();
        } else {
          val = computedRoot.getPropertyValue(item.var).trim();
          if ((!val || val === '' || val === 'initial') && computedCard) {
            val = computedCard.getPropertyValue(item.var).trim();
          }
        }
      }

      if (val === "null") val = "";

      if (val !== null) {
        if (item.type === 'textarea' || (val !== '' && val !== 'initial')) {
          settings[item.var] = val;
        }
      }
    });
    return settings;
  }

  function applyPreset(settings) {
    const items = Object.values(groups).flatMap(g => Array.isArray(g) ? g : g.items);

    items.forEach(item => {
      if (item.type === 'header' || item.type === 'sub-header') return;
      localStorage.removeItem("denchou_" + item.var);
      document.documentElement.style.removeProperty(item.var);
    });

    for (const [key, value] of Object.entries(settings)) {
      const isValid = items.some(i => i.var === key);
      if (isValid) {
        localStorage.setItem("denchou_" + key, value);
        document.documentElement.style.setProperty(key, value);
      }
    }

    const container = document.querySelector('.denchou-content');
    if (container) {
      items.forEach(item => {
        if (item.type === 'header' || item.type === 'sub-header') return;

        const savedVal = localStorage.getItem("denchou_" + item.var);
        const input = document.querySelector(`[data-var="${item.var}"]`);

        if (input) {
          if (item.type === 'switch-bool' || item.type === 'switch-int') {
            input.checked = (savedVal === 'true' || savedVal === '1');

          } else if (item.type === 'color') {
            input.value = savedVal || "oklch(10% 0.02 260)";
            if (input.previousElementSibling && input.previousElementSibling.type === 'color') {
              input.previousElementSibling.value = oklchToHex(getSafeOklchColor(savedVal || "oklch(10% 0.02 260)"));
            }

          } else if (item.type === 'textarea') {
            input.value = savedVal || "";

          } else if (item.type !== 'segment') {
            if (item.type === 'slider') {
              input.value = parseFloat(savedVal) || 0;
            } else {
              input.value = savedVal || "";
            }
            input.dispatchEvent(new Event('input'));
          }
        }

        if (item.type === 'segment') {
          const btns = document.querySelectorAll(`.denchou-segment-btn[onclick*="${item.var}"]`);
          const clean = (s) => s ? s.toString().toLowerCase().replace(/['"\s]/g, '') : '';

          const resolveVal = (v) => {
            if (!v) return v;
            if (v.startsWith('var(')) {
              const dummy = document.createElement('div');
              dummy.style.setProperty('display', 'none');
              dummy.style.setProperty('width', v);
              document.body.appendChild(dummy);
              const computed = getComputedStyle(dummy).width;
              document.body.removeChild(dummy);
              return computed;
            }
            return v;
          }

          const resolvedSaved = resolveVal(savedVal);

          const btnsArray = Array.from(btns);
          let foundExact = false;

          btnsArray.forEach(btn => {
            const btnVal = btn.getAttribute('data-val');
            if (clean(btnVal) === clean(savedVal)) {
              btn.classList.add('active');
              foundExact = true;
            } else {
              btn.classList.remove('active');
            }
          });

          if (!foundExact) {
            let foundResolved = false;
            btnsArray.forEach(btn => {
              const btnVal = btn.getAttribute('data-val');
              const resolvedBtn = resolveVal(btnVal);
              if (!foundResolved && resolvedBtn && resolvedBtn === resolvedSaved) {
                btn.classList.add('active');
                foundResolved = true;
              } else {
                btn.classList.remove('active');
              }
            });
          }
        }
      });
    }

    triggerUpdates();
  }

  // PRESET UI HANDLERS & CUSTOM SELECT
  // =========================================================================
  async function renderPresetUI() {
    const presets = await loadPresetsFromFile();

    let savedActive = presets["_active"];
    delete presets["_active"];

    const names = Object.keys(presets).sort();

    if (!activePreset) {
      if (savedActive && presets[savedActive]) activePreset = savedActive;
      else if (names.includes("Default")) activePreset = "Default";
      else if (names.length > 0) activePreset = names[0];
    }

    const container = document.getElementById('denchou-custom-select-container');
    if (!container) return;

    let optionsHtml = '';
    names.forEach(name => {
      const isSelected = name === activePreset ? 'selected' : '';
      optionsHtml += `<div class="denchou-option ${isSelected}" onclick="window.denchouSelectPreset('${name}')">${name}</div>`;
    });

    container.innerHTML = `
            <div class="denchou-custom-select" id="denchou-custom-select">
                <div class="denchou-select-trigger" onclick="window.denchouToggleCustomSelect(event)">
                    <span id="denchou-selected-text">${activePreset || "Select..."}</span>
                                <svg class="lucide-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </div>
                <div class="denchou-custom-options">
                    ${optionsHtml}
                </div>
            </div>
        `;
  }

  window.denchouToggleCustomSelect = function (e) {
    e.stopPropagation();
    document.getElementById('denchou-custom-select').classList.toggle('active');
    document.getElementById('denchou-preset-menu').classList.remove('active');
  }

  window.denchouSelectPreset = async function (name) {
    activePreset = name;

    document.getElementById('denchou-selected-text').textContent = name;
    document.getElementById('denchou-custom-select').classList.remove('active');

    const presets = await loadPresetsFromFile();

    if (presets[name]) {
      applyPreset(presets[name]);

      presets["_active"] = name;
      try { await savePresetsToFile(presets); } catch (e) { console.error(e); }

      await renderPresetUI();
    }
  }

  window.denchouToggleMenu = function (e) {
    e.stopPropagation();
    const menu = document.getElementById('denchou-preset-menu');
    menu.classList.toggle('active');
    const select = document.getElementById('denchou-custom-select');
    if (select) select.classList.remove('active');
  };

  window.denchouUpdateCurrentPreset = async function () {
    if (!activePreset) {
      try {
        const tempPresets = await loadPresetsFromFile();
        if (tempPresets && tempPresets["_active"]) {
          activePreset = tempPresets["_active"];
        }
      } catch (e) { }
    }

    if (!activePreset) {
      window.denchouAddPreset();
      return;
    }

    const btn = document.querySelector('.denchou-btn-split-main');
    const origText = btn ? btn.innerText : "Save";

    if (btn) {
      btn.innerText = "Saving...";
      btn.disabled = true;
    }

    const presets = await loadPresetsFromFile();
    const currentActive = presets["_active"] || activePreset;
    delete presets["_active"];

    presets[activePreset] = getCurrentSettings();
    presets["_active"] = currentActive;

    try {
      await savePresetsToFile(presets);

      if (btn) {
        btn.innerText = "Saved!";
        btn.style.background = "oklch(65% 0.19 145)";
        btn.style.borderColor = "oklch(65% 0.19 145)";
        btn.style.color = "oklch(96% 0.018 92)";

        setTimeout(() => {
          btn.innerText = origText;
          btn.disabled = false;
          btn.style.background = "";
          btn.style.borderColor = "";
          btn.style.color = "";
        }, 2000);
      }
    } catch (e) {
      alert("Error saving: " + e.message);
      if (btn) {
        btn.innerText = "Failed";
        setTimeout(() => {
          btn.innerText = origText;
          btn.disabled = false;
        }, 2000);
      }
    }
  };

  // HELPER: CUSTOM PROMPT
  // =========================================================================
  function denchouCustomPrompt(message, defaultValue = "") {
    return new Promise((resolve) => {
      const existing = document.getElementById('denchou-prompt-overlay');
      if (existing) existing.remove();

      const overlay = document.createElement('div');
      overlay.id = 'denchou-prompt-overlay';

      overlay.innerHTML = `
				<div class="denchou-prompt-box">
					<div class="denchou-prompt-header">
						<div class="denchou-prompt-title">${message}</div>
						<span class="denchou-prompt-close">&times;</span>
					</div>

					<input type="text" class="denchou-prompt-input" value="${defaultValue}">

					<div class="denchou-prompt-buttons">
						<button class="denchou-prompt-btn" id="prompt-cancel">Cancel</button>
						<button class="denchou-prompt-btn" id="prompt-ok">Save</button>
					</div>
				</div>
			`;
      document.body.appendChild(overlay);

      requestAnimationFrame(() => overlay.classList.add('active'));

      const input = overlay.querySelector('input');
      const btnOk = overlay.querySelector('#prompt-ok');
      const btnCancel = overlay.querySelector('#prompt-cancel');
      const btnClose = overlay.querySelector('.denchou-prompt-close');

      input.focus();
      input.select();

      const close = (value) => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 200);
        resolve(value);
      };

      btnOk.onclick = () => close(input.value);
      btnCancel.onclick = () => close(null);
      btnClose.onclick = () => close(null);

      input.onkeydown = (e) => {
        if (e.key === 'Enter') close(input.value);
        if (e.key === 'Escape') close(null);
      };
    });
  }

  window.denchouAddPreset = async function () {
    document.getElementById('denchou-preset-menu').classList.remove('active');

    const name = await denchouCustomPrompt("Add Preset");
    if (!name) return;

    const presets = await loadPresetsFromFile();
    delete presets["_active"];

    presets[name] = getCurrentSettings();
    presets["_active"] = name;

    try {
      await savePresetsToFile(presets);
      activePreset = name;
      await renderPresetUI();
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  window.denchouRenamePreset = async function () {
    document.getElementById('denchou-preset-menu').classList.remove('active');

    if (!activePreset) {
      alert("No preset selected to rename.");
      return;
    }

    const newName = await denchouCustomPrompt("Rename Preset", activePreset);
    if (!newName || newName === activePreset) return;

    const presets = await loadPresetsFromFile();
    delete presets["_active"];

    presets[newName] = presets[activePreset];
    delete presets[activePreset];
    presets["_active"] = newName;

    try {
      await savePresetsToFile(presets);
      activePreset = newName;
      await renderPresetUI();
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  window.denchouRemovePreset = async function () {
    document.getElementById('denchou-preset-menu').classList.remove('active');

    if (!activePreset) {
      alert("No preset selected to remove.");
      return;
    }

    const presets = await loadPresetsFromFile();
    delete presets["_active"];
    delete presets[activePreset];

    const names = Object.keys(presets);
    const nextActive = names.length > 0 ? (names.includes("Default") ? "Default" : names[0]) : null;

    if (nextActive) presets["_active"] = nextActive;

    try {
      await savePresetsToFile(presets);
      activePreset = nextActive;
      await renderPresetUI();
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  window.denchouExportTheme = async function () {
    const themeSettings = {};
    const themeVars = groups["Theme"].map(i => i.var);
    const current = getCurrentSettings();

    themeVars.forEach(v => {
      if (current[v] !== undefined) themeSettings[v] = current[v];
    });

    if (current["user-custom-css"]) {
      themeSettings["user-custom-css"] = current["user-custom-css"];
    }

    const jsonStr = JSON.stringify(themeSettings, null, 2);

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'denchou_theme.json',
        types: [{
          description: 'JSON File',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(jsonStr);
      await writable.close();
    } catch (err) {
      if (err.name !== 'AbortError') {
        alert("Error saving theme: " + err.message);
      }
    }
  };

  window.denchouImportTheme = function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = readerEvent => {
        try {
          const content = readerEvent.target.result;
          const themeSettings = JSON.parse(content);
          applyPreset(themeSettings);
          alert("Theme imported and applied successfully.");
        } catch (err) {
          alert("Error importing theme: Invalid JSON file.");
        }
      };
      reader.readAsText(file, 'UTF-8');
    };

    input.click();
  };

  // UI LOGIC
  // =========================================================================
  function triggerUpdates() {
    if (typeof window.denchouUpdateConfig === 'function') {
      window.denchouUpdateConfig(true);
    }

    let customCssVal = localStorage.getItem("denchou_user-custom-css");
    if (customCssVal === null || customCssVal === "null") {
      customCssVal = getLiveCustomCss();
    }
    if (customCssVal === null && activePreset && presetsCache[activePreset] && presetsCache[activePreset]["user-custom-css"] !== undefined) {
      customCssVal = presetsCache[activePreset]["user-custom-css"];
    }
    const safeCss = (customCssVal === null || customCssVal === "null" || customCssVal === undefined) ? "" : customCssVal;

    let styleTag = document.getElementById("denchou-live-custom-css");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "denchou-live-custom-css";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = safeCss;

    if (typeof window.alternativePitchStyle === 'function') window.alternativePitchStyle();
    if (typeof window.dynamicWordSize === 'function') window.dynamicWordSize();
    if (typeof window.toggleDefinition === 'function') window.toggleDefinition();
    if (typeof window.noDuplicateKana === 'function') window.noDuplicateKana();
    if (typeof window.initializeAudioSentenceState === 'function') window.initializeAudioSentenceState();
    if (typeof window.initializeSentenceState === 'function') window.initializeSentenceState();
    if (typeof window.initializeHintState === 'function') window.initializeHintState();
    if (typeof window.dynamicCardHeight === 'function') window.dynamicCardHeight();
    if (typeof window.enableInteractions === 'function') window.enableInteractions();
    if (typeof window.denchouRefreshScenes === 'function') window.denchouRefreshScenes();
    if (typeof window.initPOSHeader === 'function') window.initPOSHeader();

    updateBackdropState();
  }

  function restoreState() {
    const items = Object.values(groups).flatMap(g => Array.isArray(g) ? g : g.items);

    items.forEach(item => {
      if (item.type === 'header' || item.type === 'sub-header') return;

      const savedVal = localStorage.getItem("denchou_" + item.var);

      if (savedVal !== null) {
        document.documentElement.style.setProperty(item.var, savedVal);
      }
    });

    triggerUpdates();
  }

  restoreState();

  function buildMenu() {
    const btn = document.querySelector('.toggle-settings-btn');

    if (btn) {
      btn.onclick = window.denchouOpenSettings;
    }

    if (document.getElementById('denchou-settings-modal')) return;

    let navHtml = '';
    let contentHtml = '';
    let groupIndex = 0;

    const isDark = document.body.classList.contains('nightMode') || document.documentElement.classList.contains('custom-dark-mode');

    for (const [groupName, groupData] of Object.entries(groups)) {
      const items = Array.isArray(groupData) ? groupData : groupData.items;
      const groupMobileHidden = Array.isArray(groupData) ? false : (groupData.mobileHidden || false);

      if (groupMobileHidden && window.IS_MOBILE) {
        continue;
      }

      const isActive = groupIndex === 0 ? 'active' : '';
      const panelId = `panel-${groupIndex}`;

      navHtml += `<div class="denchou-nav-item ${isActive}" onclick="window.switchTab(this, '${panelId}')">${groupName}</div>`;

      let rowsHtml = '';

      const hasHeaders = items.some(i => i.type === 'header');

      if (hasHeaders) {
        rowsHtml += `<div class="denchou-grid-wrapper">`;
        let currentCardHtml = '';

        if (items.length > 0 && items[0].type !== 'header') {
          currentCardHtml = `<div class="denchou-grid-card">`;
        }

        items.forEach(item => {
          if (item.theme && item.theme !== (isDark ? 'dark' : 'light')) {
            return;
          }

          if (item.type === 'header') {
            if (currentCardHtml) {
              currentCardHtml += `</div>`;
              rowsHtml += currentCardHtml;
            }
            const mobileClass = (item.mobileHidden && window.IS_MOBILE) ? ' denchou-mobile-hidden' : '';
            currentCardHtml = `<div class="denchou-grid-card${mobileClass}"><div class="denchou-group-header">${item.label}</div>`;
          } else if (item.type === 'sub-header') {
            const mobileClass = (item.mobileHidden && window.IS_MOBILE) ? ' denchou-mobile-hidden' : '';
            currentCardHtml += `<div class="denchou-sub-header${mobileClass}">${item.label}</div>`;
          } else {
            currentCardHtml += generateControlHtml(item, 'grid-row');
          }
        });

        if (currentCardHtml) {
          currentCardHtml += `</div>`;
          rowsHtml += currentCardHtml;
        }
        rowsHtml += `</div>`;

      } else {
        items.forEach(item => {
          rowsHtml += generateControlHtml(item, 'standard');
        });
      }

      let panelHeader = `<h3>${groupName}</h3>`;
      if (groupName === 'Theme') {
        panelHeader = `
          <div class="denchou-panel-header">
            <h3>${groupName}</h3>
            <a href="https://github.com/BrenoAqua/DenChou/tree/main/themes" target="_blank" class="denchou-btn-browse">
              <svg class="lucide-icon" role="img" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg> Browse Themes
            </a>
          </div>`;
      }

      contentHtml += `<div id="${panelId}" data-group="${groupName}" class="denchou-panel ${isActive}">${panelHeader}${rowsHtml}</div>`;
      groupIndex++;
    }

    // Deck Presets Panel
    const deckLinksPanelId = `panel-${groupIndex}`;
    navHtml += `<div class="denchou-nav-item" onclick="window.switchTab(this, '${deckLinksPanelId}')">Deck Presets</div>`;
    contentHtml += `<div id="${deckLinksPanelId}" data-group="Deck Links" class="denchou-panel">
      <h3>Deck Presets</h3>
      <div id="denchou-deck-links-container"></div>
    </div>`;

    const modal = document.createElement('div');
    modal.id = 'denchou-settings-modal';
    modal.innerHTML = `
            <div class="denchou-dialog">
                <div class="denchou-header">
                    <h2>Preferences</h2>
                    <div class="denchou-header-actions">
                        <!-- Dock Toggle -->
                        <div class="denchou-icon-btn denchou-dock-btn" onclick="window.denchouToggleDock()">
                            <svg class="lucide-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/></svg>
                        </div>
                        <!-- Close Button -->
                        <div class="denchou-icon-btn denchou-close-btn" onclick="window.denchouCloseSettings()">
                            <svg class="lucide-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </div>
										</div>
                </div>
                <div class="denchou-body">
                    <div class="denchou-sidebar">${navHtml}</div>
                    <div class="denchou-content">${contentHtml}</div>
                </div>

                <div class="denchou-footer">
                    <!-- Preset Controls -->
                    <div class="denchou-footer-left">
                        <div id="denchou-custom-select-container"></div>

                        <div class="denchou-split-group">
                            <button class="denchou-btn denchou-btn-split-main" onclick="window.denchouUpdateCurrentPreset()">Save</button>
                            <button class="denchou-btn denchou-btn-split-menu" onclick="window.denchouToggleMenu(event)">
                    <svg class="lucide-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                            </button>
                        </div>

                        <!-- Popup Menu -->
                        <div id="denchou-preset-menu" class="denchou-popup-menu">
                            <div class="denchou-menu-item" onclick="window.denchouAddPreset()">Add Preset</div>
                            <div class="denchou-menu-item" onclick="window.denchouRenamePreset()">Rename Preset</div>
                            <div class="denchou-menu-spacer"></div>
                            <div class="denchou-menu-item" onclick="window.denchouExportTheme()">Share Theme</div>
                            <div class="denchou-menu-item" onclick="window.denchouImportTheme()">Import Theme</div>
                            <div class="denchou-menu-spacer"></div>
                            <div class="denchou-menu-item danger" onclick="window.denchouRemovePreset()">Remove Preset</div>
                        </div>
                    </div>

                    <!-- Global Actions -->
                    <div class="denchou-footer-right">
                        <button class="denchou-btn" onclick="window.denchouReset()">Reset Defaults</button>
                        <button id="denchou-save-btn" class="denchou-btn denchou-btn-primary">Save to Anki</button>
                    </div>
                </div>
            </div>`;
    document.body.appendChild(modal);

    if (!window._denchouSettingsClickInitialized) {
      window.addEventListener('click', (e) => {
        const menu = document.getElementById('denchou-preset-menu');
        const select = document.getElementById('denchou-custom-select');
        const btn = document.querySelector('.denchou-btn-split-menu');

        if (menu && menu.classList.contains('active') && !menu.contains(e.target) && !btn.contains(e.target)) {
          menu.classList.remove('active');
        }
        if (select && select.classList.contains('active') && !select.contains(e.target)) {
          select.classList.remove('active');
        }
      });
      window._denchouSettingsClickInitialized = true;
    }

    document.getElementById('denchou-save-btn').onclick = saveToAnki;

    renderPresetUI();

    // EVENTS
    modal.querySelectorAll('input, textarea').forEach(input => {
      const varName = input.getAttribute('data-var');
      const type = input.getAttribute('data-type');

      if (type === 'keybind') {
        input.addEventListener('click', () => {
          input.value = "Press key...";
          input.classList.add('listening');
        });

        input.addEventListener('keydown', (e) => {
          e.preventDefault();
          e.stopPropagation();

          if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;

          const isPair = input.getAttribute('data-pair') === 'true';
          const parts = [];
          if (e.ctrlKey) parts.push('Ctrl');
          if (e.altKey) parts.push('Alt');
          if (e.shiftKey) parts.push('Shift');
          if (e.metaKey) parts.push('Meta');

          let key = e.key;
          if (key === ' ') key = 'Space';

          if (isPair) {
            if (key === 'ArrowLeft') key = 'Left/Right';
            else if (key === 'ArrowRight') key = 'Left/Right';
            else if (key.length === 1) key = key.toUpperCase();
          } else {
            if (key.length === 1) key = key.toUpperCase();
          }

          const combo = parts.length > 0 ? parts.join('+') + '+' + key : key;

          input.value = combo;
          input.classList.remove('listening');
          input.blur();

          const event = new Event('change');
          input.dispatchEvent(event);
        });

        input.addEventListener('blur', () => {
          if (input.value === "Press key...") {
            const saved = localStorage.getItem("denchou_" + varName);
            input.value = saved || "";
          }
          input.classList.remove('listening');
        });
      }

      if (type === 'color' && input.type === 'color') {
        const textInput = input.nextElementSibling;
        input.addEventListener('input', () => {
          const newHex = input.value;
          const currentVal = textInput.value.trim();
          const r = parseInt(newHex.slice(1, 3), 16);
          const g = parseInt(newHex.slice(3, 5), 16);
          const b = parseInt(newHex.slice(5, 7), 16);
          const rgbaMatch = currentVal.match(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([0-9.]+)\s*\)/i);
          const tripletMatch = currentVal.match(/^\s*\d+\s*,\s*\d+\s*,\s*\d+\s*$/);
          const oklchAlphaMatch = currentVal.match(/^oklch\([^)]+\)\s*\/\s*([0-9.]+)\s*$/i);

          if (oklchAlphaMatch) {
            textInput.value = rgbaToOklch(r, g, b, oklchAlphaMatch[1]);
          } else if (rgbaMatch) {
            const alpha = rgbaMatch[1];
            textInput.value = rgbaToOklch(r, g, b, alpha);
          } else if (tripletMatch) {
            textInput.value = rgbaToOklch(r, g, b);
          } else {
            textInput.value = hexToOklch(newHex);
          }

          textInput.dispatchEvent(new Event('input'));
          textInput.dispatchEvent(new Event('change'));
        });
        return;
      }

      const handler = () => {
        let newVal;
        if (input.type === 'checkbox') {
          newVal = input.checked ? (type === 'switch-bool' ? 'true' : '1') : (type === 'switch-bool' ? 'false' : '0');
        }

        else if (type === 'slider') {
          const unit = input.getAttribute('data-unit') || '';
          newVal = input.value + unit;
          if (input.nextElementSibling) {
            input.nextElementSibling.textContent = newVal;
          }
        }

        else {
          newVal = input.value;
          if (input.previousElementSibling && input.previousElementSibling.type === 'color') {
            const rgbaMatch = newVal.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
            if (rgbaMatch) {
              const r = parseInt(rgbaMatch[1]).toString(16).padStart(2, '0');
              const g = parseInt(rgbaMatch[2]).toString(16).padStart(2, '0');
              const b = parseInt(rgbaMatch[3]).toString(16).padStart(2, '0');
              input.previousElementSibling.value = '#' + r + g + b;
            } else if (/^#[0-9A-F]{6}$/i.test(newVal)) {
              input.previousElementSibling.value = newVal;
            } else if (/^oklch\(/i.test(newVal)) {
              const d = document.createElement('div');
              d.style.color = newVal;
              document.body.appendChild(d);
              const computed = getComputedStyle(d).color;
              document.body.removeChild(d);
              const m = computed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
              if (m) {
                input.previousElementSibling.value = '#' + [+m[1],+m[2],+m[3]].map(v=>v.toString(16).padStart(2,'0')).join('');
              }
            }
          }
        }

        document.documentElement.style.setProperty(varName, newVal);
        localStorage.setItem("denchou_" + varName, newVal);
        if (varName === "--ankidroid-auto-optimize") applyAutoOptimize();
        triggerUpdates();
      };
      input.addEventListener('change', handler);
      if (input.type === 'text' || input.type === 'range' || input.tagName === 'TEXTAREA') {
        input.addEventListener('input', handler);
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.denchouCloseSettings();
      }
    });
  }

  function generateControlHtml(item, rowStyle) {
    const computedRoot = getComputedStyle(document.documentElement);
    const cardEl = document.querySelector('.card');
    const computedCard = cardEl ? getComputedStyle(cardEl) : null;

    let currentVal = localStorage.getItem("denchou_" + item.var);

    if (currentVal === null || currentVal === "null") {
      if (item.var === 'user-custom-css') {
        currentVal = getLiveCustomCss();
      } else {
        currentVal = computedRoot.getPropertyValue(item.var).trim();
        if ((!currentVal || currentVal === '' || currentVal === 'initial') && computedCard) {
          currentVal = computedCard.getPropertyValue(item.var).trim();
        }
      }

      if ((!currentVal || currentVal === '' || currentVal === 'initial') && activePreset && presetsCache[activePreset] && presetsCache[activePreset][item.var] !== undefined) {
        currentVal = presetsCache[activePreset][item.var];
      }
    }

    const clean = (s) => s ? s.toString().toLowerCase().replace(/['"\s]/g, '') : '';
    const resolve = (val) => {
      if (!val || typeof val !== 'string') return val;
      const match = val.match(/var\((--[^)]+)\)/);
      if (match) {
        let res = computedRoot.getPropertyValue(match[1]).trim();
        if ((!res || res === '') && computedCard) {
          res = computedCard.getPropertyValue(match[1]).trim();
        }
        return res || val;
      }
      return val;
    };

    let controlHtml = '';

    if (item.type === 'switch-bool' || item.type === 'switch-int') {
      const isChecked = (currentVal === 'true' || currentVal === '1');
      controlHtml = `
                <label class="denchou-switch">
                    <input type="checkbox" data-var="${item.var}" data-type="${item.type}" ${isChecked ? 'checked' : ''}>
                    <span class="denchou-slider"></span>
                </label>`;
    } else if (item.type === 'segment') {
      const curClean = clean(currentVal);
      const resolvedCur = clean(resolve(currentVal));

      let exactMatchIndex = item.options.findIndex(opt => clean(opt.val) === curClean);
      let resolvedMatchIndex = -1;

      if (exactMatchIndex === -1 && resolvedCur !== '') {
        resolvedMatchIndex = item.options.findIndex(opt => clean(resolve(opt.val)) === resolvedCur);
      }

      const buttons = item.options.map((opt, idx) => {
        const isActive = (exactMatchIndex !== -1) ? (idx === exactMatchIndex) : (idx === resolvedMatchIndex);

        return `
                <div class="denchou-segment-btn ${isActive ? 'active' : ''}"
                     onclick="window.updateSegment(this, '${item.var}', this.getAttribute('data-val'))"
                     data-val='${opt.val}'>
                     ${opt.label}
                </div>
            `}).join('');
      controlHtml = `<div class="denchou-segment-group" data-var="${item.var}">${buttons}</div>`;
    } else if (item.type === 'color') {
      let safeColor = getSafeOklchColor(currentVal);
      controlHtml = `
                <div class="denchou-color-wrapper">
                    <input type="color" class="denchou-color-picker" data-type="color" value="${oklchToHex(safeColor)}">
                    <input type="text" class="denchou-input denchou-color-text" data-var="${item.var}" data-type="${item.type}" value="${currentVal}">
                </div>`;

    } else if (item.type === 'keybind') {
      controlHtml = `<input type="text" class="denchou-input denchou-keybind"
                data-var="${item.var}"
                data-type="keybind"
                data-pair="${item.isPair || false}"
                value="${currentVal}"
                readonly
                style="cursor: pointer; text-align: center; font-family: 'Segoe UI'; font-weight: bold;"
                placeholder="Click to Set">`;

    } else if (item.type === 'slider') {
      let numericVal = parseFloat(currentVal);
      if (isNaN(numericVal)) numericVal = item.min || 0;

      const unit = item.unit || '';

      controlHtml = `
        <div class="denchou-range-wrapper">
            <input type="range" class="denchou-range"
                   data-var="${item.var}"
                   data-type="slider"
                   data-unit="${unit}"
                   min="${item.min}" max="${item.max}" step="${item.step}"
                   value="${numericVal}">
            <span class="denchou-range-value">${numericVal}${unit}</span>
        </div>`;

    } else if (item.type === 'textarea') {
      controlHtml = `
        <textarea class="denchou-input denchou-textarea"
                  data-var="${item.var}"
                  data-type="textarea"
                  spellcheck="false"
                  placeholder="Insert Custom CSS here...">${currentVal || ""}</textarea>`;

    } else {
      controlHtml = `<input type="text" class="denchou-input" data-var="${item.var}" value="${currentVal}">`;
    }

    let className = (item.type === 'textarea' ? 'denchou-row denchou-row-full' : (rowStyle === 'standard' ? 'denchou-row standard' : 'denchou-row'));
    if (item.mobileHidden && window.IS_MOBILE) {
      className += ' denchou-mobile-hidden';
    }

    return `
            <div class="${className}">
                <div class="denchou-label-group">
                    <span class="denchou-label-main">${item.label}</span>
                    ${item.desc ? `<span class="denchou-label-desc">${item.desc}</span>` : ''}
                </div>
                ${controlHtml}
            </div>`;
  }

  // GLOBAL EVENT HANDLERS
  // =========================================================================
  window.switchTab = function (navItem, panelId) {
    document.querySelectorAll('.denchou-nav-item').forEach(el => el.classList.remove('active'));
    navItem.classList.add('active');
    document.querySelectorAll('.denchou-panel').forEach(el => el.classList.remove('active'));
    const panel = document.getElementById(panelId);
    panel.classList.add('active');

    if (panel.getAttribute('data-group') === 'Deck Links') {
      renderDeckLinksUI();
    }
  };

  window.updateSegment = function (btn, varName, val) {
    const group = btn.parentElement;
    group.querySelectorAll('.denchou-segment-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.documentElement.style.setProperty(varName, val);
    localStorage.setItem("denchou_" + varName, val);
    triggerUpdates();
  };

  window.denchouReset = async function () {
    const statusBtn = document.querySelector('.denchou-footer-right button:first-child');
    const origText = statusBtn.innerText;
    statusBtn.innerText = "Restoring...";
    statusBtn.disabled = true;

    try {
      const response = await fetch('_denchou_defaults_v0.1.0.css');
      if (!response.ok) throw new Error("File '_denchou_defaults_v0.1.0.css' not found in media folder.");
      const defaultsCss = await response.text();

      const modelName = await getModelName();
      if (!modelName) {
        statusBtn.innerText = origText;
        statusBtn.disabled = false;
        return;
      }

      const styleInfo = await invokeAnkiConnect('modelStyling', { modelName: modelName });
      let modifiedCss = styleInfo.css;

      const items = Object.values(groups).flatMap(g => Array.isArray(g) ? g : g.items);
      let changesCount = 0;
      const clean = (s) => s ? s.toString().toLowerCase().replace(/['"\s]/g, '') : '';

      items.forEach(item => {
        if (item.type === 'header' || item.type === 'sub-header') return;

        // Custom CSS Handling
        if (item.type === 'textarea') {
          const blockRegex = /\/\* CUSTOM CSS START \*\/[\s\S]*?\/\* CUSTOM CSS END \*\//g;
          if (blockRegex.test(modifiedCss)) {
            modifiedCss = modifiedCss.replace(blockRegex, "/* CUSTOM CSS START */\n/* CUSTOM CSS END */");
            changesCount++;
          }
          return;
        }

        const safeVar = item.var.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const defaultRegex = new RegExp(`${safeVar}\\s*:\\s*([^;\\r\\n]+)`, 'i');
        const match = defaultsCss.match(defaultRegex);

        if (match) {
          const defaultValue = match[1].trim();

          const replaceRegex = new RegExp(`(${safeVar}\\s*:\\s*)([^;\\r\\n]+)(;)([ \\t]*)(\\/\\*.*)?`, 'g');
          if (replaceRegex.test(modifiedCss)) {
            modifiedCss = modifiedCss.replace(replaceRegex, (m, prefix, oldVal, semi, padding, comment) => {
              if (clean(oldVal) !== clean(defaultValue)) {
                changesCount++;
              }

              if (!comment) return `${prefix}${defaultValue}${semi}${padding}`;

              const diff = defaultValue.length - oldVal.length;
              let newPadding = padding;

              if (diff > 0) {
                if (padding.length >= diff) newPadding = padding.substring(diff);
                else newPadding = "";
              } else if (diff < 0) {
                newPadding = padding + " ".repeat(Math.abs(diff));
              }

              return `${prefix}${defaultValue}${semi}${newPadding}${comment}`;
            });
          }
        }
      });

      if (changesCount > 0) {
        await invokeAnkiConnect('updateModelStyling', {
          model: { name: modelName, css: modifiedCss }
        });
      }

      items.forEach(item => {
        if (item.type === 'header' || item.type === 'sub-header') return;

        // Custom CSS UI Reset
        if (item.type === 'textarea') {
          localStorage.removeItem("denchou_" + item.var);
          const input = document.querySelector(`[data-var="${item.var}"]`);
          if (input) {
            input.value = "";
            input.dispatchEvent(new Event('input'));
          }
          return;
        }

        const safeVar = item.var.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const defaultRegex = new RegExp(`${safeVar}\\s*:\\s*([^;\\r\\n]+)`, 'i');
        const match = defaultsCss.match(defaultRegex);

        if (match) {
          const defaultValue = match[1].trim();

          localStorage.setItem("denchou_" + item.var, defaultValue);

          document.documentElement.style.setProperty(item.var, defaultValue);

          if (item.type === 'segment') {
            const btns = document.querySelectorAll(`.denchou-segment-btn[onclick*="${item.var}"]`);
            const btnsArray = Array.from(btns);
            let foundExact = false;

            // Check for exact match
            btnsArray.forEach(btn => {
              const btnVal = btn.getAttribute('data-val');
              if (clean(btnVal) === clean(defaultValue)) {
                btn.classList.add('active');
                foundExact = true;
              } else {
                btn.classList.remove('active');
              }
            });

            // Fallback to resolved match if no exact match found
            if (!foundExact) {
              const resolveVal = (v) => {
                if (!v) return v;
                if (v.startsWith('var(')) {
                  const dummy = document.createElement('div');
                  dummy.style.setProperty('display', 'none');
                  dummy.style.setProperty('width', v);
                  document.body.appendChild(dummy);
                  const computed = getComputedStyle(dummy).width;
                  document.body.removeChild(dummy);
                  return computed;
                }
                return v;
              };

              const resolvedDefault = resolveVal(defaultValue);
              let foundResolved = false;

              btnsArray.forEach(btn => {
                const btnVal = btn.getAttribute('data-val');
                const resolvedBtn = resolveVal(btnVal);
                if (!foundResolved && resolvedBtn && resolvedBtn === resolvedDefault) {
                  btn.classList.add('active');
                  foundResolved = true;
                } else {
                  btn.classList.remove('active');
                }
              });
            }
          } else {
            const input = document.querySelector(`[data-var="${item.var}"]`);
            if (input) {
              if (item.type === 'switch-bool' || item.type === 'switch-int') {
                input.checked = (defaultValue === 'true' || defaultValue === '1');
              } else if (item.type === 'color') {
                input.value = defaultValue;
                if (input.previousElementSibling && input.previousElementSibling.type === 'color') {
                  input.previousElementSibling.value = getSafeOklchColor(defaultValue);
                }
              } else {
                if (item.type === 'slider') {
                  input.value = parseFloat(defaultValue) || 0;
                } else {
                  input.value = defaultValue;
                }
                input.dispatchEvent(new Event('input'));
              }
            }
          }
        }
      });

      triggerUpdates();
      statusBtn.innerText = "Reset Complete!";
      statusBtn.style.background = "oklch(55% 0.2 25)";
      statusBtn.style.borderColor = "oklch(55% 0.2 25)";
      statusBtn.style.color = "oklch(96% 0.018 92)";

      setTimeout(() => {
        statusBtn.innerText = origText;
        statusBtn.disabled = false;
        statusBtn.style.background = "";
        statusBtn.style.borderColor = "";
        statusBtn.style.color = "";
      }, 2000);

    } catch (e) {
      console.error(e);
      alert("Error: " + e.message);
      statusBtn.innerText = "Failed";
      statusBtn.disabled = false;
      setTimeout(() => statusBtn.innerText = origText, 2000);
    }
  };

  window.denchouBuildMenu = buildMenu;

  window.denchouOpenSettings = function () {
    const modal = document.getElementById('denchou-settings-modal');
    if (modal) modal.classList.add('active');
    renderPresetUI();
  };

  window.denchouToggleDock = function () {
    const modal = document.getElementById('denchou-settings-modal');
    const body = document.body;
    modal.classList.toggle('docked');
    body.classList.toggle('denchou-docked-mode');

    updateBackdropState();
  };

  window.denchouCloseSettings = function () {
    const modal = document.getElementById('denchou-settings-modal');

    if (modal) {
      modal.classList.remove('active');
      modal.classList.remove('docked');

      document.body.classList.remove('denchou-docked-mode');

      if (typeof updateBackdropState === 'function') {
        updateBackdropState();
      }

      document.body.style.display = 'none';
      void document.body.offsetHeight;
      document.body.style.display = '';

      if (typeof window.triggerUpdates === 'function') {
        window.triggerUpdates();
      }
    }
  };
  async function init() {
    try { await loadPresetsFromFile(); } catch (e) { console.warn('loadPresetsFromFile failed:', e); }
    try { await loadDeckLinksFromFile(); } catch (e) { console.warn('loadDeckLinksFromFile failed:', e); }

    try {
      const presets = presetsCache;
      let savedActive = presets["_active"];
      if (!activePreset) {
        if (savedActive && presets[savedActive]) activePreset = savedActive;
        else {
          const names = Object.keys(presets).filter(n => n !== "_active").sort();
          if (names.includes("Default")) activePreset = "Default";
          else if (names.length > 0) activePreset = names[0];
        }
      }
    } catch (e) { console.warn('preset selection failed:', e); }

    buildMenu();
    applyAutoOptimize();
  }

  function applyAutoOptimize() {
    try {
      const autoOpt = localStorage.getItem("denchou_--ankidroid-auto-optimize");
      if (autoOpt === "false") {
        document.documentElement.style.setProperty("--ankidroid-lite", "false");
        return;
      }
      const isSmallScreen = window.innerWidth <= 600;
      document.documentElement.style.setProperty("--ankidroid-lite", isSmallScreen ? "true" : "false");
    } catch (e) {}
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyAutoOptimize, 150);
  });

  init();
})();
