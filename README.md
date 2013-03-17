[![Build Status](https://travis-ci.org/tklun/brewpi-node.png?branch=master)](https://travis-ci.org/tklun/brewpi-node)

# BrewPi for Node.JS
This is a Node.JS implementation of [BrewPi](http://brewpi.com/), the Raspberry Pi and Arduino temperature controller for brewing. This implementation is **extremely alpha and incomplete**. Please check out the [official BrewPi repository](https://github.com/BrewPi) for the tried and true approach.

## Why?
* **Speed** - Node is fast. And it's easy on the resources. Both of which are important to consider when running an application on a Raspberry Pi.

* **Event-driven, non-blocking IO** - With BrewPi, the Raspberry Pi and Arduino are continuously communicating with each other. Rather than writing complex, blocking loops in order to manage serial port communication. We can instead listen for data and act on it.

* **Simplicity** - Having a Node option for BrewPi mean that everything from serial port communication to a web front-end can all be written in the same language. Don't feel like spinning up a LAMP stack on your Brew Pi? No problem.

## How to use
Install Node.js on your Raspberry PI! This might take a while as there is currently not a straightforward way to do this.

When inside a project where you want to include the BrewPi package:

```
$ npm install brewpi
```

Import BrewPi package into your project and create a local instance:

```js
var BrewPi = require('brewpi');

var myBrewPi = new BrewPi({
  serialPort: '/dev/ttyACM0'
});
```

Build something!

## API

#### BrewPi

Constructor exposed by `require('brewpi')`.

#### BrewPi()
Creates a new `BrewPi`. Works with and without `new`:

```js
var BrewPi = require('brewpi');

var myBrewPi = new BrewPi({
  serialPort: '/dev/ttyACM0'
});
```

#### BrewPi(opts:Object)
Creates a BrewPi with an optional options object. Current supported option is:
  - `serialPort` - This is the path to the serial port that your Arduino is connected to. Defaults to `'/dev/ttyACM0'`.

### Methods
These methods can be called on a BrewPi instance.

#### BrewPi.start()
Calling `.start()` on your BrewPi instance will make the serial port connection. It will then start polling the Arduino for its control constants and control settings.

#### BrewPi.stop()
Stops the polling of data from the Arduino.

#### BrewPi.getMode()
Gets the BrewPi's current mode.

#### BrewPi.getFridgeTemperatureSetting()
Gets the BrewPi's current fridge temperature from stored settings.

#### BrewPi.getBeerTemperatureSetting()
Gets the BrewPi's current beer temperature setting from stored settings.

#### BrewPi.getControlSettings()
Gets the BrewPi's current control settings from stored settings.

#### BrewPi.getControlConstants()
Gets the BrewPi's current control constants from stored settings.

#### BrewPi.getControlVariables()
Gets the BrewPi's current control variables from stored settings.

#### BrewPi.refreshControlSettings()
Update stored control settings with data from Arduino.

#### BrewPi.refreshControlConstants()
Update stored control constants with data from Arduino.

#### BrewPi.refreshControlVariables()
Update stored control variables with data from Arduino.

#### BrewPi.loadDefaultControlSettings()
Tells Arduino to load default control settings programmed on the Arduino.

#### BrewPi.loadDefaultControlConstants()
Tells Arduino to load default control constants programmed on the Arduino.

#### BrewPi.sendSettings(settingsAsJSON)
Takes a settings object and sends it to the Arduino.

### Events
These events are emitted from a BrewPi instance. You can use these events to attach your own behaviors.

```js
myBrewPi.on('brewPiStart', function() {
	doSomethingWhenBrewPiStarts();
});
```

or with data

```js
myBrewPi.on('newLCDData', function(data) {
	doSomethingWhenLCDDataIsReceived(data);
});
```

#### brewPiStart
Emitted when BrewPi instance is started.

#### brewPiStop
Emitted when BrewPi instance is stopped.

#### newTemperatureData
Emitted when BrewPi receives new temperature data.

#### controlConstantsUpdated
Emitted when control constants are updated.

#### controlSettingsUpdated
Emitted when control settings are updated.

#### controlVariablesUpdated
Emitted when control variables are updated.

## Todo
This is a work in progress. Currently this package can control your BrewPi, but the ability for more advanced (and practical) temperature control is still being developed. The following list is a roadmap of intended functionality.

* Support for beer profiles
* Data logging (either to static files or a database)
* Ability to program an Arduino with a binary file
* Much more...

## Special Thanks
Thanks to [Elco](http://brewpi.com/) for creating the fantastic BrewPi project. He's put a lot of time and money into his BrewPi project, support it if you can.

Also, thanks to [node-serialport](https://github.com/voodootikigod/node-serialport) library for making Node.js serial port development remarkably easy and awesome.
