## Bugs

- preselected size doesn't match size info inside cart tab
  - example: when I sort product items by XS and add it to cart, it will have S size
  - expected: it should have XS size according to sorting condition
- all items are removed from cart after refresh
  - expected: items should stay in cart

## UX improvements

- product card is missing informatiom about sizes, so it's impossible to verify that items are sorted correctly unless user opens cart tab and get informatiom about size from there
- "Clear all" button in cart would improve user experience, so they don't need to remove each item manually
- improve scrolling experience on responsive viewports (if you set viewport to tablet size on desktop, it will scroll both elements: cart tab and main product page)
