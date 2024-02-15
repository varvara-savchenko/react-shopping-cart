# Sorting by size

As a user
I want to be able to sort product items by size

    Given the user is using a <desktop> or <responsive> device

    When the user visits the website
    Then the sizes labels should be visible
    And each size label should have a gray background color

    When the user clicks on the first size label
    Then the number of product items should decrease
    And the clicked size label should change its background color to black
    And the background color of other size labels should remain unchanged

    When the user checks information about item size in the cart tab
    Then item size matches user's selection
