## CSD 404 Internet of Things Lab 3

**Name:** Prakhar Rathi <br> 
**Roll Number:** 1810110169

For this lab assignment, you will write basic Arduino programs. 


### Questions - Put the circuit diagram, code, and serial monitor output (Q3) after each question

1. Write a sketch using LDR, transistor, and Piezo Buzzer to measure the intensity of the light. If its analog value crosses 600, generate a buzzer alarm for 2 seconds. Send the LDR values to the Serial Monitor also.

<img src="https://i.imgur.com/tOs1gUw.png" height="250px" width = "500px" alt="Markdown Monster icon" style="float: center; margin-right: 10px;" />


``` C
int sensorReading = 0;
int flag = 0;

void setup()
{
  // Set up pins
  pinMode(A0, INPUT);
  Serial.begin(9600);
  pinMode(6, OUTPUT);
}

void loop()
{
  sensorReading = analogRead(A0);
  Serial.println(sensorReading);
  
  if(sensorReading > 600 && flag == 0){
  	tone(6, 100);
    
    // Play for 2 seconds 
    delay(2000);
  	noTone(6);
  	delay(20);
    flag = 1;
  }
  if(sensorReading < 600)
    flag = 0;  
}

```

<img src="https://i.imgur.com/YQTvw2D.png" height="200px" width = "400px" alt="Markdown Monster icon" style="float: center; margin-right: 10px;" /> <br> <br> 

2. Write a sketch using an LED, IR sensor, and IR Remote. On pressing the button “1” LED should light up, and on pressing the button “2”, LED should become off. 



<img src="https://i.imgur.com/f2pT7io.png" height="250px" width = "600px" alt="Markdown Monster icon" style="float: center; margin-right: 10px;" />


Simulation Code below 

```C
#include <IRremote.h>

//Define Pin
int led = 5;
int REC_PIN = 11;

//IR Library stuff
IRrecv irrecv(REC_PIN);
decode_results results;


void setup()
{
  //Set Led Pin
  pinMode(led, OUTPUT);
  
  // Enable serial monitor
  Serial.begin(9600);
  irrecv.enableIRIn(); 
}

void loop() {
  if (irrecv.decode(&results)) {
    unsigned int value = results.value;
    Serial.println(value);
    
    switch (value) {
      case 2295: 
      	digitalWrite(led, HIGH);
      	delay(5);
      	break;
      
      case 34935:
      	digitalWrite(led, LOW);
      	delay(5);
      	break;
      
    }
    
    irrecv.resume(); 
  }
}

```

<img src="https://i.imgur.com/JQ1eeog.png" height="150px" width = "400px" alt="Markdown Monster icon" style="float: center; margin-right: 10px;" /> <br> <br> 


<hr>

3. Write an Arduino sketch using a PIR Sensor, and an LED. In case of a moving object detection the LED should light up. If object become out of the range of the sensor, the LED should become off. Send a message to Serial Monitor in both the cases. 

<img src="https://i.imgur.com/oNtSMQh.png" height="250px" width = "600px" alt="Markdown Monster icon" style="float: center; margin-right: 10px;" />

```C

int sensorState = 0;

void setup()
{
  // Set up pins 
  pinMode(4, INPUT);
  pinMode(2, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  
  // read the state of the sensor
  sensorState = digitalRead(4);
  
  // check if sensor pin is HIGH. if it is, set the LED on.
  if (sensorState == HIGH) {
    digitalWrite(2, HIGH);
    Serial.println("Sensor activated");
    delay(500);
    
  } else {
    digitalWrite(2, LOW);
    Serial.println("Sensor deactivated");
    delay(500);
  }
  
  delay(10);
  
}

```

<img src="https://i.imgur.com/3jrGtLM.png" height="250px" width = "600px" alt="Markdown Monster icon" style="float: center; margin-right: 10px;" />
