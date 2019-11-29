/*
 *  BeeMonitor v0.1 - Alpha - virusz - 2019
 *  ---------------------------------------
 *  Prgogram pentru monitorizare a temperaturii, umiditatii si greutatii dintr-un stup
 *  datele colectate se transmit catre google firebase
 *  
 */
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <FirebaseArduino.h>
#include <ezTime.h>
#include "SparkFun_Si7021_Breakout_Library.h"
#include <Wire.h>
#include <Arduino.h>
#define FIREBASE_HOST ""                //Adresa firebase
#define FIREBASE_AUTH ""       //Autentificare
#define WIFI_SSID ""                                                //Nume SSID
#define WIFI_PASSWORD ""                                      //Parola SSID
#define si7021Addr 0x40
#include <HX711_ADC.h>
#include <EEPROM.h>
int nrStup=1;                                                          //Numarul stupului monitorizat
int rDelay;//=300000;                                                        //Timp raportare (300000ms = 5Minute

int p;

 
 HX711_ADC LoadCell(14, 13);                                            //HX711 (dout pin, sck pin):
 Weather sensor;
 const int eepromAdress = 0;
 long t;
 String input;
 String data;
 int n = 0;



       void setup() {
        delay(rDelay);
                      
                  float calValue;                                        //Valoare de calibrare
                  calValue = 696.0;                                      
          Serial.begin(9600);
          WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
           while (WiFi.status() != WL_CONNECTED) {
            waitForSync();}
            
                                                         
           Timezone myTZ;
           myTZ.setLocation(F("RO"));
           data=myTZ.dateTime(RFC850);
           LoadCell.begin();
      
           long stabilisingtime = 2000;                                  // tare preciscion can be improved by adding a few seconds of stabilising time
           LoadCell.start(stabilisingtime);
         if(LoadCell.getTareTimeoutFlag()) {
//            Serial.println("Tare timeout, check MCU>HX711 wiring and pin designations"); 
                                           }
         else {LoadCell.setCalFactor(calValue);                           //setare valoare calibrare (float)
//            Serial.println("Startup + tare is complete");
              }
      
          Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
          delay(1000);
          rDelay=Firebase.getInt("delayRaport");
          Wire.begin();  
          Wire.beginTransmission(si7021Addr);
          Wire.endTransmission();  
          delay(300);
                       }

         
           void loop() {

                   Timezone myTZ;
                   myTZ.setLocation(F("RO"));
                   data=myTZ.dateTime(RFC850);

  ///   if(Serial.available()){
  ///   input = Serial.readString();
  ///   Serial.print("You typed: " );
  ///   Serial.println(input);

                    LoadCell.update();

                   //get smoothed value from data set
                   if (millis() > t + 250) {
                   float i = LoadCell.getData();
                   //  Serial.print("Load_cell output val: ");
                   //   Serial.println(i);
                   t = millis();}

                     unsigned int datad[2];
                     Wire.beginTransmission(si7021Addr);
                     //Send humidity measurement command
                     Wire.write(0xF5);
                     Wire.endTransmission();
                     delay(500);
                     // Request 2 bytes of data
                     Wire.requestFrom(si7021Addr, 2);
                     // Read 2 bytes of data to get humidity
                     if(Wire.available() == 2)
                    {
                    datad[0] = Wire.read();
                    datad[1] = Wire.read();
                        }
 
          // Convert the data
          float humidity  = ((datad[0] * 256.0) + datad[1]);
          humidity = ((125 * humidity) / 65536.0) - 6;
          Wire.beginTransmission(si7021Addr);
          // Send temperature measurement command
          Wire.write(0xF3);
          Wire.endTransmission();
          delay(500);
 
          // Request 2 bytes of data
          Wire.requestFrom(si7021Addr, 2);
 
          // Read 2 bytes of data for temperature
          if(Wire.available() == 2)
           {
          datad[0] = Wire.read();
          datad[1] = Wire.read();
           }
 
          // Convert the data
          float temp  = ((datad[0] * 256.0) + datad[1]);
          float celsTemp = ((175.72 * temp) / 65536.0) - 46.85;
          float fahrTemp = celsTemp * 1.8 + 32;


   
   
   Firebase.pushString("Stupul"+String(nrStup),data+",Grade:"+celsTemp+",Umiditate:"+String(humidity));
   Firebase.setString("TempStup"+String(nrStup), String(celsTemp));
   Firebase.setString("UmiditateStup"+String(nrStup), String(humidity));
   Firebase.setString("GreutateStup"+String(nrStup), String(LoadCell.getData()));
   //rDelay=Firebase.getInt("delayRaport");
   Firebase.setString("int",String(rDelay));
   delay(rDelay);
  
   
       
   // handle error
   if (Firebase.failed()) {
      ESP.restart();
      return; }


  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
     HTTPClient http;  //Declare an object of class HTTPClient
     http.begin("http://iot.robofun.ro/api/v1/senzor/qne1a9057e9eubvp6sp4slrffr/input?value="+String(celsTemp));  //Specify request destination
     int httptemp = http.GET();
     delay(1000);
     http.begin("http://iot.robofun.ro/api/v1/senzor/e5mtkjvi5vipniodegika2dnqj/input?value="+int(humidity));
     int httpumd = http.GET();                                                                 //Send the request
     delay(1000);
     http.begin("http://iot.robofun.ro/api/v1/senzor/im43aqh4ot2b7opv6tflur5165/input?value="+String(LoadCell.getData()));
     int httpgreutate = http.GET();                                                                  //Send the request
     delay(1000);
     

 
    http.end(); 

     
      setup();
}

           }






  
  



  
 
