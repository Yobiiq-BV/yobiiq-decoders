/**
 * Codec for Axioma heat meters : compatible with TTN, ChirpStack v4 and v3, etc...
 * Release Date : 26 August 2024
 * Update  Date : 26 August 2024
 */

// Configuration constants for device
var CONFIG_BASIC_HEATING = {
    LENGTH    : 41,
    ORDER : [
        {INDEX: 0, SIZE : 4, NAME : "timestamp"},
        {INDEX: 4, SIZE : 1, NAME : "statusCode"},
        {INDEX: 37, SIZE : 4, NAME : "periodBetweenMeasurement"},
    ],
    MEASUREMENT_TOTAL : 4,
    MEASUREMENT_INDEX : 5,
    MEASUREMENT_TIMESTAMP: true, // to be calculated for each measurement
    MEASUREMENT : [
        {SIZE : 4, NAME : "energyForHeating", RESOLUTION: 0.001},
        {SIZE : 4, NAME : "volume", RESOLUTION: 0.001},
    ],
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

var CONFIG_BASIC_COOLING = {
    LENGTH    : 45,
    ORDER : [
        {INDEX: 0, SIZE : 4, NAME : "timestamp"},
        {INDEX: 4, SIZE : 1, NAME : "statusCode"},
        {INDEX: 41, SIZE : 4, NAME : "periodBetweenMeasurement"},
    ],
    MEASUREMENT_TOTAL : 3,
    MEASUREMENT_INDEX : 5,
    MEASUREMENT_TIMESTAMP: true, // to be calculated for each measurement
    MEASUREMENT : [
        {SIZE : 4, NAME : "energyForHeating", RESOLUTION: 0.001},
        {SIZE : 4, NAME : "energyForCooling", RESOLUTION: 0.001},
        {SIZE : 4, NAME : "volume", RESOLUTION: 0.001},
    ],
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

var CONFIG_BASIC_LT_HEATING_COOLING = {
    LENGTH    : 35,
    DATALOGGER_TIMESTAMP: true, // same as Timestamp
    ORDER : [
        {INDEX: 0, SIZE : 4, NAME : "timestamp"},
        {INDEX: 4, SIZE : 1, NAME : "statusCode"},
        {INDEX: 5, SIZE : 4, NAME : "energyForHeating", RESOLUTION: 0.001},
        {INDEX: 9, SIZE : 4, NAME : "energyForCooling", RESOLUTION: 0.001},
        {INDEX: 13, SIZE : 4, NAME : "volume", RESOLUTION: 0.001},
        {INDEX: 17, SIZE : 3, NAME : "power", RESOLUTION: 0.1},
        {INDEX: 20, SIZE : 3, NAME : "flow", RESOLUTION: 0.001},
        {INDEX: 23, SIZE : 2, NAME : "temperatureT1", RESOLUTION: 0.01, SIGNED: true},
        {INDEX: 25, SIZE : 2, NAME : "temperatureT2", RESOLUTION: 0.01, SIGNED: true},
        {INDEX: 27, SIZE : 4, NAME : "workingTimeWithoutError"},
        {INDEX: 31, SIZE : 4, NAME : "periodBetweenMeasurement"},
    ],
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

var CONFIG_BASIC_LT_HEATING = {
    LENGTH    : 31,
    DATALOGGER_TIMESTAMP: true, // same as Timestamp
    ORDER : [
        {INDEX: 0, SIZE : 4, NAME : "timestamp"},
        {INDEX: 4, SIZE : 1, NAME : "statusCode"},
        {INDEX: 5, SIZE : 4, NAME : "energyForHeating", RESOLUTION: 0.001},
        {INDEX: 9, SIZE : 4, NAME : "volume", RESOLUTION: 0.001},
        {INDEX: 13, SIZE : 3, NAME : "power", RESOLUTION: 0.1},
        {INDEX: 16, SIZE : 3, NAME : "flow", RESOLUTION: 0.001},
        {INDEX: 19, SIZE : 2, NAME : "temperatureT1", RESOLUTION: 0.01, SIGNED: true},
        {INDEX: 21, SIZE : 2, NAME : "temperatureT2", RESOLUTION: 0.01, SIGNED: true},
        {INDEX: 23, SIZE : 4, NAME : "workingTimeWithoutError"},
        {INDEX: 27, SIZE : 4, NAME : "periodBetweenMeasurement"},
    ],
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

var CONFIG_NORDIC_HEATING = {
    LENGTH    : 48,
    ORDER : [
        {INDEX: 0, SIZE : 4, NAME : "timestamp"},
    ],
    MEASUREMENT_TOTAL : 2,
    MEASUREMENT_INDEX : 4,
    MEASUREMENT : [
        {SIZE : 4, NAME : "dataloggerTimestamp"},
        {SIZE : 4, NAME : "energyForHeating", RESOLUTION: 0.001},
        {SIZE : 4, NAME : "volume", RESOLUTION: 0.001},
        {SIZE : 3, NAME : "power", RESOLUTION: 0.001},
        {SIZE : 3, NAME : "flow", RESOLUTION: 0.001},
        {SIZE : 2, NAME : "temperatureT1", RESOLUTION: 0.01, SIGNED: true},
        {SIZE : 2, NAME : "temperatureT2", RESOLUTION: 0.01, SIGNED: true},
    ],
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

var CONFIG_NORDIC_HEATING_COOLING = {
    LENGTH    : 30,
    ORDER : [
        {INDEX: 0, SIZE : 4, NAME : "timestamp"},
        {INDEX: 4, SIZE : 4, NAME : "dataloggerTimestamp"},
        {INDEX: 8, SIZE : 4, NAME : "energyForHeating", RESOLUTION: 0.001},
        {INDEX: 12, SIZE : 4, NAME : "energyForCooling", RESOLUTION: 0.001},
        {INDEX: 16, SIZE : 4, NAME : "volume", RESOLUTION: 0.001},
        {INDEX: 20, SIZE : 3, NAME : "power", RESOLUTION: 0.001},
        {INDEX: 23, SIZE : 3, NAME : "flow", RESOLUTION: 0.001},
        {INDEX: 26, SIZE : 2, NAME : "temperatureT1", RESOLUTION: 0.01, SIGNED: true},
        {INDEX: 28, SIZE : 2, NAME : "temperatureT2", RESOLUTION: 0.01, SIGNED: true},
    ],
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

function decodeDeviceDataWithoutListOfMeasurements(bytes, config)
{
    var decoded = {};
    try
    {
        for(var i=0; i<config.ORDER.length; i=i+1)
        {
            var info = config.ORDER[i];
            // Decoding
            var value = 0;
            value = getValueFromBytesLittleEndianFormat(bytes, info.INDEX, info.SIZE);
        
            if(info.SIGNED)
            {
                value = getSignedIntegerFromInteger(value, info.SIZE);
            }
            if(info.RESOLUTION)
            {
                value = value * info.RESOLUTION;
                value = parseFloat(value.toFixed(3));
            }
            if(info.UNIT)
            {
                decoded[info.NAME] = {};
                decoded[info.NAME]["data"] = value;
                decoded[info.NAME]["unit"] = info["UNIT"];
            }else
            {
                decoded[info.NAME] = value;
            }
        }
        if(config.DATALOGGER_TIMESTAMP)
        {
            decoded.dataloggerTimestamp = decoded.timestamp - 
                (decoded.timestamp % decoded.periodBetweenMeasurement);
        }
    }catch(error)
    {
        decoded[config.ERROR_NAME] = error.message;
    }
    return decoded;
}

function decodeDeviceDataWithListOfMeasurements(bytes, config)
{
    var decoded = {};
    var index = config.MEASUREMENT_INDEX;;
    try
    {
        for(var i=0; i<config.ORDER.length; i=i+1)
        {
            var info = config.ORDER[i];
            var value = 0;
            value = getValueFromBytesLittleEndianFormat(bytes, info.INDEX, info.SIZE);
        
            if(info.SIGNED)
            {
                value = getSignedIntegerFromInteger(value, info.SIZE);
            }
            if(info.RESOLUTION)
            {
                value = value * info.RESOLUTION;
                value = parseFloat(value.toFixed(2));
            }
            if(info.UNIT)
            {
                decoded[info.NAME] = {};
                decoded[info.NAME]["data"] = value;
                decoded[info.NAME]["unit"] = info["UNIT"];
            }else
            {
                decoded[info.NAME] = value;
            }
        }
        decoded.listOfMeasurements = [];
        for(var j=0; j<config.MEASUREMENT_TOTAL; j=j+1)
        {
            var measurements = {};
            if(config.MEASUREMENT_TIMESTAMP)
            {
                measurements.dataloggerTimestamp = decoded.timestamp - 
                    (decoded.timestamp % decoded.periodBetweenMeasurement) - 
                    j*decoded.periodBetweenMeasurement;
            }
            for(var k=0; k<config.MEASUREMENT.length; k=k+1)
            {
                var info = config.MEASUREMENT[k];
                var value = 0;
                value = getValueFromBytesLittleEndianFormat(bytes, index, info.SIZE);
            
                if(info.SIGNED)
                {
                    value = getSignedIntegerFromInteger(value, info.SIZE);
                }
                if(info.RESOLUTION)
                {
                    value = value * info.RESOLUTION;
                    value = parseFloat(value.toFixed(3));
                }
                if(info.UNIT)
                {
                    measurements[info.NAME] = {};
                    measurements[info.NAME]["data"] = value;
                    measurements[info.NAME]["unit"] = info["UNIT"];
                }else
                {
                    measurements[info.NAME] = value;
                }
                index = index + info.SIZE;
            }
            decoded.listOfMeasurements.push(measurements);
        }
    }catch(error)
    {
        decoded[config.ERROR_NAME] = error.message;
    }
    return decoded;
}

/**  Helper functions  **/

function getStringFromBytesBigEndianFormat(bytes, index, size)
{
    var value = "";
    for(var i=0; i<size; i=i+1)
    {
        value = value + String.fromCharCode(bytes[index+i]);
    }
    return value;
}

function getStringFromBytesLittleEndianFormat(bytes, index, size)
{
    var value = "";
    for(var i=(size - 1); i>=0; i=i-1)
    {
        value = value + String.fromCharCode(bytes[index+i]);
    }
    return value;
}

function getValueFromBytesBigEndianFormat(bytes, index, size)
{
    var value = 0;
    for(var i=0; i<(size-1); i=i+1)
    {
        value = (value | bytes[index+i]) << 8; 
    }
    value = value | bytes[index+size-1];
    return (value >>> 0); // to unsigned
}

function getValueFromBytesLittleEndianFormat(bytes, index, size)
{
    var value = 0;
    for(var i=(size-1); i>0; i=i-1)
    {
        value = (value | bytes[index+i]) << 8; 
    }
    value = value | bytes[index];
    return (value >>> 0); // to unsigned
}

function getDigitStringArrayNoFormat(bytes, index, size)
{
  var hexString = []
  for(var i=0; i<size; i=i+1)
  {
    hexString.push(bytes[index+i].toString(16));
  }
  return hexString;
}

function getDigitStringArrayEvenFormat(bytes, index, size)
{
  var hexString = []
  for(var i=0; i<size; i=i+1)
  {
    hexString.push(bytes[index+i].toString(16));
  }
  return hexString.map(toEvenHEX);
}

function toEvenHEX(hex)
{
  if(hex.length == 1)
  {
    return "0"+hex;
  }
  return hex;
}


function getSignedIntegerFromInteger(integer, size) 
{
    var signMask = 1 << (size * 8 - 1);
    var dataMask = (1 << (size * 8 - 1)) - 1;
    if(integer & signMask) 
    {
        return -(~integer & dataMask) - 1;
    }else 
    {
        return integer & dataMask;
    }
}


/************************************************************************************************************/

// Decode decodes an array of bytes into an object. (ChirpStack v3)
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes, variables) 
{
    var decoded = {};
    if(fPort == 0)
    {
        decoded = {mac: "MAC command received", fPort: fPort};
    }else if(bytes.length == CONFIG_BASIC_HEATING.LENGTH)
    {
        decoded = decodeDeviceDataWithListOfMeasurements(bytes, CONFIG_BASIC_HEATING);
    }else if(bytes.length == CONFIG_BASIC_COOLING.LENGTH)
    {
        decoded = decodeDeviceDataWithListOfMeasurements(bytes, CONFIG_BASIC_COOLING);
    }else if(bytes.length == CONFIG_BASIC_LT_HEATING_COOLING.LENGTH)
    {
        decoded = decodeDeviceDataWithoutListOfMeasurements(bytes, CONFIG_BASIC_LT_HEATING_COOLING);
    }else if(bytes.length == CONFIG_BASIC_LT_HEATING.LENGTH)
    {
        decoded = decodeDeviceDataWithoutListOfMeasurements(bytes, CONFIG_BASIC_LT_HEATING);
    }else if(bytes.length == CONFIG_NORDIC_HEATING.LENGTH)
    {
        decoded = decodeDeviceDataWithListOfMeasurements(bytes, CONFIG_NORDIC_HEATING);
    }else if(bytes.length == CONFIG_NORDIC_HEATING_COOLING.LENGTH)
    {
        decoded = decodeDeviceDataWithoutListOfMeasurements(bytes, CONFIG_NORDIC_HEATING_COOLING);
    }else
    {
        decoded = {error: "unknown payload"};
    }
    return decoded;
}

// Decode uplink function. (ChirpStack v4 , TTN)
//
// Input is an object with the following fields:
// - bytes = Byte array containing the uplink payload, e.g. [255, 230, 255, 0]
// - fPort = Uplink fPort.
// - variables = Object containing the configured device variables.
//
// Output must be an object with the following fields:
// - data = Object representing the decoded payload.
function decodeUplink(input) {
    return {
        data: Decode(input.fPort, input.bytes, input.variables)
    };
}

/************************************************************************************************************/

// Encode encodes the given object into an array of bytes. (ChirpStack v3)
//  - fPort contains the LoRaWAN fPort number
//  - obj is an object, e.g. {"temperature": 22.5}
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an array of bytes, e.g. [225, 230, 255, 0]
function Encode(fPort, obj, variables) {
    return [];
}

// Encode downlink function. (ChirpStack v4 , TTN)
//
// Input is an object with the following fields:
// - data = Object representing the payload that must be encoded.
// - variables = Object containing the configured device variables.
//
// Output must be an object with the following fields:
// - bytes = Byte array containing the downlink payload.
function encodeDownlink(input) {
    return {
        bytes: Encode(null, input.data, input.variables)
    };
}




