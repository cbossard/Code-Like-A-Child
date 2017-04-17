'use strict';

goog.provide('Blockly.CucumberJS.blocks');

goog.require('Blockly.CucumberJS');


Blockly.CucumberJS.scenario = function() {
  var value_name = Blockly.CucumberJS.valueToCode(this, 'NAME', Blockly.CucumberJS.ORDER_ATOMIC);
  var value_given = Blockly.CucumberJS.valueToCode(this, 'GIVEN', Blockly.CucumberJS.ORDER_ATOMIC);
  var value_when = Blockly.CucumberJS.valueToCode(this, 'WHEN', Blockly.CucumberJS.ORDER_ATOMIC);
  var value_then = Blockly.CucumberJS.valueToCode(this, 'THEN', Blockly.CucumberJS.ORDER_ATOMIC);
  var code = value_given + '\n';
  code += value_when + '\n';
  code += value_then + '\n';
  return code;
};

Blockly.CucumberJS['feature'] = function(block) {
  // var value_name = Blockly.CucumberJS.valueToCode(block, 'NAME', Blockly.CucumberJS.ORDER_ATOMIC);
  // var value_as_a = Blockly.CucumberJS.valueToCode(block, 'As a', Blockly.CucumberJS.ORDER_ATOMIC);
  // var value_i_want = Blockly.CucumberJS.valueToCode(block, 'I want', Blockly.CucumberJS.ORDER_ATOMIC);
  // var value_in_order_to = Blockly.CucumberJS.valueToCode(block, 'In order to', Blockly.CucumberJS.ORDER_ATOMIC);
  var statements_scenarios = Blockly.CucumberJS.statementToCode(block, 'Scenarios');

  // var code = 'Feature : ' + value_name + '\n';
  // code += '  As a '+value_as_a + '\n';
  // code += '  I want '+value_i_want + '\n';
  // code += '  In order to '+value_in_order_to + '\n\n';
  // code += statements_scenarios;

  return statements_scenarios;
};

Blockly.CucumberJS['init_variable'] = function(block) {
  var value_name = Blockly.CucumberJS.valueToCode(block, 'NAME', Blockly.CucumberJS.ORDER_ATOMIC);

  var code =  ' CustomWorld.prototype.variable = 0;\n';
  code+=      ' CustomWorld.prototype.setTo = function(number) {\n';
  code+=      '   this.variable = parseInt(number);\n';
  code+=      ' };\n';

  code+=      ' Given(/^a variable set to ('+value_name+')$/, function(number) {\n';
  code+=      '   this.setTo(number);\n';
  code+=      ' });\n';

  return [code, Blockly.CucumberJS.ORDER_ATOMIC];
};

Blockly.CucumberJS['increment_variable'] = function(block) {
  var value_increment = Blockly.CucumberJS.valueToCode(block, 'Increment', Blockly.CucumberJS.ORDER_ATOMIC);

  var code =  '  CustomWorld.prototype.incrementBy = function(number) {\n';
  code +=     '   this.variable += parseInt(number);\n';
  code +=     '  };\n';

  code +=     '  When(/^I increment the variable by ('+value_increment+')$/, function(number) {\n';
  code +=     '   this.incrementBy(number);\n';
  code +=     '  });\n';

  return [code, Blockly.CucumberJS.ORDER_ATOMIC];
};

Blockly.CucumberJS['should_contain'] = function(block) {
  var value_name = Blockly.CucumberJS.valueToCode(block, 'NAME', Blockly.CucumberJS.ORDER_ATOMIC);

  var code =  '  Then(/^the variable should contain ('+value_name+')$/, function(number) {\n';
  code +=     '   if (this.variable != parseInt(number))\n';
  code +=     '    throw new Error(\'Variable should contain \' + number +\n';
  code +=     '      \' but it contains \' + this.variable + \'.\');\n';
  code +=     '  });\n';

  return [code, Blockly.CucumberJS.ORDER_ATOMIC];
};
