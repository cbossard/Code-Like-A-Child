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
 * @fileoverview Helper functions for generating Cucumber for blocks.
 * @author @ceciliaBossard @jpalies
 */
'use strict';

goog.provide('Blockly.Cucumber');

goog.require('Blockly.Generator');


/**
 * Cucumber code generator.
 * @type !Blockly.Generator
 */
Blockly.Cucumber = new Blockly.Generator('Cucumber');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Cucumber.addReservedWords(
  'given,when,then'
);

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Cucumber.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Cucumber.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Cucumber.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Cucumber.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Cucumber.ORDER_ADDITIVE = 4;       // + -
Blockly.Cucumber.ORDER_SHIFT = 5;          // << >>
Blockly.Cucumber.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Cucumber.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Cucumber.ORDER_BITWISE_AND = 8;    // &
Blockly.Cucumber.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Cucumber.ORDER_BITWISE_OR = 10;    // |
Blockly.Cucumber.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Cucumber.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Cucumber.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Cucumber.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Cucumber.ORDER_NONE = 99;          // (...)



/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Cucumber.init = function(workspace) {

};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Cucumber.finish = function(code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  return code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Cucumber.scrubNakedValue = function(line) {
  return line + ';\n';
};

Blockly.Cucumber.scrub_ = function(block, code) {
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
      commentCode += Blockly.Cucumber.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Cucumber.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Cucumber.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Cucumber.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

Blockly.Cucumber.text = function() {
  // Text value.
  var code = this.getFieldValue('TEXT');
  return [code, Blockly.Cucumber.ORDER_ATOMIC];
};

Blockly.Cucumber.math_number = function() {
  // Numeric value.
  var code = this.getFieldValue('NUM');

  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
      Blockly.Cucumber.ORDER_UNARY_PREFIX : Blockly.Cucumber.ORDER_ATOMIC;
  return [code,  Blockly.Cucumber.ORDER_ATOMIC];
};
