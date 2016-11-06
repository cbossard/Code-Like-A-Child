#include <NewPing.h>
#include <Servo.h>

// Définition des LEDs
int ledRedPin = 9;    // LED connected to digital pin 9
int ledYellowPin = 8;    // LED connected to digital pin 8
int ledGreenPin = 7;    // LED connected to digital pin 7

// Définition du Servo
Servo monServo;

// Définition du PIN du capteur de mouvement
int inputPin = 2;

int posiMoteur = 0;
int val = 0;

void setup() {

  // Initialisation du capteur de mouvement comme entrée
  pinMode(inputPin, INPUT);

  // Initialisation des LEDs comme sorties
  pinMode(ledGreenPin, OUTPUT);
  pinMode(ledYellowPin, OUTPUT);
  pinMode(ledRedPin, OUTPUT);
  
  // Initialisation du servo
  monServo.attach(4);
}

void loop() {


  // Faire bouger le bras du servo
 for(posiMoteur = 0; posiMoteur <= 90; posiMoteur += 1) // Va faire 90 boucles en  
        {      
      // incrémentant posiMoteur
          monServo.write( posiMoteur);               
         delay(15); 

      }  

  // Lire l'état du capteur de mouvement
  val = digitalRead(inputPin);


  if(val == HIGH){

    // Allumer LED verte et éteindre LED rouge
    digitalWrite(ledGreenPin, HIGH);
    digitalWrite(ledRedPin, LOW);

     
  }else{
    digitalWrite(ledGreenPin, LOW);
    digitalWrite(ledRedPin, HIGH);

  }
 

}


