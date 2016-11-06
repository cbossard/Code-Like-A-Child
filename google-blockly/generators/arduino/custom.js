/*
 * Pour ajouter des includes :
      Blockly.Arduino.definitions_['define_xxx'] = '#include <xxx.h>\n';
 * Pour ajouuter des définitions de variables (ex Servo) :
      Blockly.Arduino.definitions_['var_servo' + index] = 'Servo servo_' + index + ';\n';
* Pour ajouter des instructions dans la fonction setup() (ex avec un Servo)
      Blockly.Arduino.setups_['setup_servo_' + index] = 'servo_' + index + '.attach(' + index + ');\n';
*/


Blockly.Arduino.base_delay = function() {
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino['BuiltIn_LED'] = function(block) {
  var status = block.getFieldValue('STATUS');

  var code = "digitalWrite(LED_BUILTIN, " + status + ");\n";
  return [code, Blockly.Arduino.ORDER_MEMBER];
};
