'use strict';

goog.provide('Blockly.Cucumber.blocks');

goog.require('Blockly.Cucumber');


Blockly.Cucumber.scenario = function() {
  var value_name = Blockly.Cucumber.valueToCode(this, 'NAME', Blockly.Cucumber.ORDER_ATOMIC);
  var value_given = Blockly.Cucumber.valueToCode(this, 'GIVEN', Blockly.Cucumber.ORDER_ATOMIC);
  var value_when = Blockly.Cucumber.valueToCode(this, 'WHEN', Blockly.Cucumber.ORDER_ATOMIC);
  var value_then = Blockly.Cucumber.valueToCode(this, 'THEN', Blockly.Cucumber.ORDER_ATOMIC);
  var code = '  Scenario : ' + value_name + '\n';
  code += '    Given '+value_given + '\n';
  code += '    When '+value_when + '\n';
  code += '    Then '+value_then + '\n';
  return code;
};

Blockly.Cucumber['feature'] = function(block) {
  var value_name = Blockly.Cucumber.valueToCode(block, 'NAME', Blockly.Cucumber.ORDER_ATOMIC);
  var value_as_a = Blockly.Cucumber.valueToCode(block, 'As a', Blockly.Cucumber.ORDER_ATOMIC);
  var value_i_want = Blockly.Cucumber.valueToCode(block, 'I want', Blockly.Cucumber.ORDER_ATOMIC);
  var value_in_order_to = Blockly.Cucumber.valueToCode(block, 'In order to', Blockly.Cucumber.ORDER_ATOMIC);
  var statements_scenarios = Blockly.Cucumber.statementToCode(block, 'Scenarios');

  var code = 'Feature : ' + value_name + '\n';
  code += '  As a '+value_as_a + '\n';
  code += '  I want '+value_i_want + '\n';
  code += '  In order to '+value_in_order_to + '\n\n';
  code += statements_scenarios;

  return code;
};

Blockly.Cucumber['init_variable'] = function(block) {
  var value_name = Blockly.Cucumber.valueToCode(block, 'NAME', Blockly.Cucumber.ORDER_ATOMIC);

  var code = 'a variable set to '+value_name;

  return [code, Blockly.Cucumber.ORDER_ATOMIC];
};

Blockly.Cucumber['increment_variable'] = function(block) {
  var value_increment = Blockly.Cucumber.valueToCode(block, 'Increment', Blockly.Cucumber.ORDER_ATOMIC);

  var code = 'I increment the variable by '+value_increment;

  return [code, Blockly.Cucumber.ORDER_ATOMIC];
};

Blockly.Cucumber['should_contain'] = function(block) {
  var value_name = Blockly.Cucumber.valueToCode(block, 'NAME', Blockly.Cucumber.ORDER_ATOMIC);

  var code = 'the variable should contain '+value_name;

  return [code, Blockly.Cucumber.ORDER_ATOMIC];
};
