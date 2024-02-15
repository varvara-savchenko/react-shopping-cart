# Purchase Flow

As a user
I want to be able to add items to my cart and proceed to checkout

    Given the user is using a <desktop> or <responsive> device

    When the user visits the website
    Then product items are visible
    And the cart is empty

    When the user adds a random product item to the cart
    Then the product description inside the cart tab is correct
    And the product price inside the cart tab is correct

    When the user proceeds to checkout
    Then the user should be alerted with the correct subtotal message
