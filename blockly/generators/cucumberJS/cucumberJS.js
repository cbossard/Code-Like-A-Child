/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating CucumberJS for blocks.
 * @author @ceciliaBossard @jpalies
 */
'use strict';

goog.provide('Blockly.CucumberJS');

goog.require('Blockly.Generator');


/**
 * CucumberJS code generator.
 * @type !Blockly.Generator
 */
Blockly.CucumberJS = new Blockly.Generator('CucumberJS');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.CucumberJS.addReservedWords(
  'given,when,then'
);

/**
 * Order of operation ENUMs.
 *
 */
Blockly.CucumberJS.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.CucumberJS.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.CucumberJS.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.CucumberJS.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.CucumberJS.ORDER_ADDITIVE = 4;       // + -
Blockly.CucumberJS.ORDER_SHIFT = 5;          // << >>
Blockly.CucumberJS.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.CucumberJS.ORDER_EQUALITY = 7;       // == != === !==
Blockly.CucumberJS.ORDER_BITWISE_AND = 8;    // &
Blockly.CucumberJS.ORDER_BITWISE_XOR = 9;    // ^
Blockly.CucumberJS.ORDER_BITWISE_OR = 10;    // |
Blockly.CucumberJS.ORDER_LOGICAL_AND = 11;   // &&
Blockly.CucumberJS.ORDER_LOGICAL_OR = 12;    // ||
Blockly.CucumberJS.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.CucumberJS.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.CucumberJS.ORDER_NONE = 99;          // (...)



/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.CucumberJS.init = function(workspace) {

};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.CucumberJS.finish = function(code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');

  var surround = 'Cucumber.defineSupportCode(function(context) {\n';
  surround += '  var setWorldConstructor = context.setWorldConstructor;\n';
  surround += '  var Given = context.Given\n';
  surround += '  var When = context.When\n';
  surround += '  var Then = context.Then\n';
  surround += '  var CustomWorld = function() {};\n';

  surround += code;

  surround += '  setWorldConstructor(CustomWorld);\n';
  surround += '})';
  return surround;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.CucumberJS.scrubNakedValue = function(line) {
  return line + ';\n';
};

Blockly.CucumberJS.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.CucumberJS.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.CucumberJS.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.CucumberJS.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.CucumberJS.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

Blockly.CucumberJS.text = function() {
  // Text value.
  var code = this.getFieldValue('TEXT');
  return [code, Blockly.CucumberJS.ORDER_ATOMIC];
};

Blockly.CucumberJS.math_number = function() {
  // Numeric value.
  var code = this.getFieldValue('NUM');

  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
      Blockly.CucumberJS.ORDER_UNARY_PREFIX : Blockly.CucumberJS.ORDER_ATOMIC;
  return [code,  Blockly.CucumberJS.ORDER_ATOMIC];
};
