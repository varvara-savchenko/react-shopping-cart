# Cart tab Component

As a user
I want to be able to interact with the cart functionality

## Scenario: Test cart tab empty state

    Given the user is using a <desktop> or <responsive> device

    When the user opens the cart tab
    Then the cart should be empty
    And the empty message should be visible
    And the total price in the cart should be $0.00

    When the user proceeds to checkout
    Then an alert message should inform the user to add some products in the cart

    When user clicks on "X" button to close cart tab
    Then cart should not be visible anymore

## Scenario: Test interaction with items quantity inside cart tab

    Given the user is using a <desktop> or <responsive> device

    When the user adds a product to the cart
    Then the product should be presented inside the cart tab
    And the quantity of items in the cart should be updated to 1
    And the decrement button for the product should be disabled

    When the user increases the quantity of the product
    Then the quantity of items in the cart should be updated accordingly

    When the user decreases the quantity of the product
    Then the quantity of items in the cart should be updated accordingly

    When the user removes the product from the cart
    Then the product should be removed from the cart
    And the cart should be empty
    And the empty message should be visible
