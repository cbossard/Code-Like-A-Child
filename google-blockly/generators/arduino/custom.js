Blockly.Arduino.base_delay = function() {
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};


Blockly.Arduino['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  var subString = Blockly.Arduino.valueToCode(block, 'FIND',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var text = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + subString + ')';
  return [code, Blockly.Arduino.ORDER_MEMBER];
};


Blockly.Arduino['BuildIn_LED'] = function(block) {

  var status = block.getFieldValue('STATUS');

  var code = "digitalWrite(LED_BUILTIN, " + status + ");";
  return [code, Blockly.Arduino.ORDER_MEMBER];
};
