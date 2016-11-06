'use strict';

goog.provide('Blockly.Blocks.texts');

goog.require('Blockly.Blocks');

Blockly.Blocks['base_delay'] = {
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour(120);
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField("Attendre")
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};

Blockly.Blocks['BuiltIn_LED'] = {
  init: function() {
    this.setColour(0);

    this.appendDummyInput()
            .appendField('Statut LED intégrée :')
            .appendField(new Blockly.FieldDropdown([
                           ['HIGH', 'HIGH'],
                           ['LOW', 'LOW']
                         ]),
                         'STATUS');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
