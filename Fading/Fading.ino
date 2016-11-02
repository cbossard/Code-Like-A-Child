/*
 Fading

 This example shows how to fade an LED using the analogWrite() function.

 The circuit:
 * LED attached from digital pin 9 to ground.

 Created 1 Nov 2008
 By David A. Mellis
 modified 30 Aug 2011
 By Tom Igoe

 http://www.arduino.cc/en/Tutorial/Fading

 This example code is in the public domain.

 */
#include <NewPing.h>
#include <Servo.h>

int ledRedPin = 9;    // LED connected to digital pin 9
int ledYellowPin = 8;    // LED connected to digital pin 9
int ledGreenPin = 7;    // LED connected to digital pin 9


Servo monServo;
int posiMoteur = 0;

int inputPin = 2;
int val = 0;

void setup() {
  // Initialisation du capteur de mouvement comme d'une entrée
  pinMode(inputPin, INPUT);
  monServo.attach(4);
}

void loop() {


    for(posiMoteur = 0; posiMoteur <= 90; posiMoteur += 1) // Va faire 90 boucles en  
        {      
      // incrémentant posiMoteur
          monServo.write( posiMoteur);               
         delay(15); 

      }  

  val = digitalRead(inputPin);

  if(val == HIGH){
       lightLED(ledYellowPin);
      lightLED(ledRedPin);
     
  }else{
    lightLED(ledGreenPin);
  }
 
 
}


void lightLED(int pin)
{
  // fade in from min to max in increments of 5 points:
  for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
    // sets the value (range from 0 to 255):
    analogWrite(pin, fadeValue);
    // wait for 30 milliseconds to see the dimming effect
    delay(30);
  }

  // fade out from max to min in increments of 5 points:
  for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
    // sets the value (range from 0 to 255):
    analogWrite(pin, fadeValue);
    // wait for 30 milliseconds to see the dimming effect
    delay(30);
  }
  
}


