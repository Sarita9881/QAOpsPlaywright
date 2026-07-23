Feature: Ecommerce Validations

@Regression
  Scenario Outline: Placing the order2
  Given Login to Ecommerce2 application with wrong cred "<username>" and "<password>"
  Then Verify Error message is displyed
  Examples:
      | username| password |
      | Value 1  | Value 2  |
      |anshika1@gmail.com|Iamking@000|