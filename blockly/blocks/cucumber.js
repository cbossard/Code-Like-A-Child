'use strict';

goog.provide('Blockly.Blocks.cucumber');

goog.require('Blockly.Blocks');

Blockly.Blocks['init_variable'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("a variable set to");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['increment_variable'] = {
  init: function() {
    this.appendValueInput("Increment")
        .setCheck("Number")
        .appendField("I increment the variable by");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['should_contain'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("the variable should contain");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['scenario'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("SCENARIO :");
    this.appendValueInput("GIVEN")
        .setCheck(null)
        .appendField("Given");
    this.appendValueInput("WHEN")
        .setCheck(null)
        .appendField("When");
    this.appendValueInput("THEN")
        .setCheck(null)
        .appendField("Then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['feature'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("FEATURE :");
    this.appendValueInput("As a")
        .setCheck("String")
        .appendField("As a");
    this.appendValueInput("I want")
        .setCheck("String")
        .appendField("I want");
    this.appendValueInput("In order to")
        .setCheck("String")
        .appendField("In order to");
    this.appendStatementInput("Scenarios")
        .setCheck(null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
