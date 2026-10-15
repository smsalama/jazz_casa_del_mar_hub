# Screen: Admin list management (dining, pools, activities, offers, gallery, FAQ, attractions, room features, rooms)

- Stories: US-34, US-33
- Requirements: FR-36
- Acceptance criteria: the AC lines of those stories in `docs/stories.md`
- Prototype: (table and dialog patterns)
- Admin shell and rules: `admin-shell.md`

## Purpose

Add, edit, delete and reorder items in each list. Rooms stay at six.

## Layout

### 375 px

- List of item cards with name, completeness chip, Edit, Move up, Move down; "Add item" button at the top (hidden for Rooms).

### 768 px

- Same, wider cards.

### 1440 px

- Table: name, completeness, order controls, Edit, Delete.

## Components

- Data table or list
- Move up and Move down buttons
- Drag handle (pointer users, optional)
- Dialog (delete)
- Warning alert (below minimum)
- Chips

## Content

- Rooms list: six rows, no Add item, no Delete; header note "The six room types are fixed. You can edit their text and photos."
- Below minimum warning: "This list has fewer items than the page expects (minimum 8). Visitors will still see it." No blocking.
- Delete dialog: title "Delete Executive Suite?", text "This removes it from the site in all four languages. You cannot undo this.", buttons "Delete Executive Suite" (danger) and "Keep it".
- Item editor reuses the four language cells.

## States

- Loading: Skeleton rows.
- Empty: "This list has no items yet." with an Add item button (not for Rooms).
- Error: "We could not save the new order. Try again." order reverts.
- Success: "Order saved." "Item added." "Item deleted." in a status region.

## Interactions

- Move up and Move down buttons are the keyboard and screen reader way to reorder (AC-47.6); drag is optional for pointer users and follows the finger 1:1 with a flick spring on drop; focus stays on the moved item and the move is announced ("Executive Suite moved to position 2 of 6").
- Add item opens the item editor with empty cells.

## Accessibility

- Buttons name the item ("Move Executive Suite up"); first Move up and last Move down are disabled with aria-disabled; delete dialog traps focus and returns it to the row.
- One h1; heading levels in order; landmarks from frame.md; focus visible (3 px ring); all targets at least 44 by 44 px; text at least 4.5 to 1; no colour only meaning; images have alt text in the page language (decorative art has empty alt); text reflows at 320 px and at 200 percent zoom.
