/**
 * Codec for SC-10-232 device : compatible with TTN, ChirpStack v4 and v3, etc...
 * Release Date : 13 February 2024
 * Update  Date : 04 November 2024
 */

// Version Control
var VERSION_CONTROL = {
    CODEC : {VERSION: "1.0.0", NAME: "codecVersion"},
    DEVICE: {MODEL : "SC-10-232", NAME: "genericModel"},
    PRODUCT: {CODE : "P1002016", NAME: "productCode"},
    MANUFACTURER: {COMPANY : "YOBIIQ B.V.", NAME: "manufacturer"},
}

// Configuration constants for device basic info and current settings
var CONFIG_INFO = {
    FPORT    : 50,
    CHANNEL  : parseInt("0xFF", 16),
    TYPES    : {
        "0x05" : {SIZE : 2, NAME : "hardwareVersion", DIGIT: false},
        "0x04" : {SIZE : 2, NAME : "firmwareVersion", DIGIT: false},
        "0x03" : {SIZE : 4, NAME : "deviceSerialNumber"},
        "0x01" : {SIZE : 0, NAME : "manufacturer"}, // size to be determinated
        "0x02" : {SIZE : 0, NAME : "deviceModel"},  // size to be determinated
        "0x07" : {SIZE : 1, NAME : "batteryPercentage"},
        "0x08" : {SIZE : 1, NAME : "batteryVoltage", RESOLUTION: 0.1},
        "0x11" : {SIZE : 1, NAME : "deviceClass",
            VALUES     : {
                "0x00" : "Class A",
                "0x01" : "Class B",
                "0x02" : "Class C",
            },
        },
        "0x06" : {SIZE : 1, NAME : "powerEvent",
            VALUES     : {
                "0x00" : "AC Power Off",
                "0x01" : "AC Power On",
            },
        }
    },
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}


// Configuration constants for device periodic data
 var CONFIG_PERIODIC = {
    CHANNEL  : parseInt("0xDD", 16),
    DEVICE_TIMESTAMP_TYPE: parseInt("0xFE"),
    DATALOGGER_TIMESTAMP_TYPE: parseInt("0xFD"),
    TIMESTAMP_DATA_SIZE: 4,
    FPORT_MIN : 1,
    FPORT_MAX : 10,
    MEASUREMENT_LIST_NAME: "listOfMeasurements",
	MODBUS_DATA_POINT_LENGTH : 9,
    MODBUS_CHANNEL_DATA_TYPE_OFFSET: 200,
    MODBUS_CHANNEL_DATA_TYPE_TOTAL: 50,
    MODBUS_CHANNEL_DATA_TYPES:{
       DATA_TYPE_COILS               : 0,
       DATA_TYPE_DISCRETE            : 1,
       DATA_TYPE_INPUT_16            : 2,
       DATA_TYPE_HOLDING_16          : 3,
       DATA_TYPE_HOLDING_32          : 4,
       DATA_TYPE_HOLDING_FLOAT       : 5,
       DATA_TYPE_INPUT_32            : 6,
       DATA_TYPE_INPUT_FLOAT         : 7,
       DATA_TYPE_INPUT_32_UPPER_16   : 8,
       DATA_TYPE_INPUT_32_LOWER_16   : 9,
       DATA_TYPE_HOLDING_32_UPPER_16 : 10,
       DATA_TYPE_HOLDING_32_LOWER_16 : 11,
    },
    MODBUS_BYTE_ORDERS:{
       BYTE_ORDER_ABCD : 0,
       BYTE_ORDER_CDBA : 1,
       BYTE_ORDER_BADC : 2,
       BYTE_ORDER_DCBA : 3
    },
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

// Configuration constants for alarm packet
var CONFIG_ALARM = {
    FPORT : 11,
    CHANNEL : parseInt("0xAA", 16),
    MODBUS_CHANNEL_ALARM_TYPE_MIN: 200,
    MODBUS_CHANNEL_ALARM_TYPE_MAX: 249,
    MODBUS_CHANNEL_ALARM_NAME_GENERIC: "alarmChannel",
    MODBUS_CHANNEL_ALARM_VALUES: {
        "0x00": "normal",
        "0x01": "generic exception",
        "0x02": "crc checking failure",
        "0x03": "response size error",
        "0x04": "illegal slave id",
        "0x05": "response timeout",
        "0x81": "illegal function code",
        "0x82": "illegal modbus address",
        "0x83": "illegal write value",
        "0x84": "slave device failure",
        "0x85": "write operation failure",
    },
    TYPES : {
        "0xFE" : {SIZE: 4, NAME : "deviceTimestamp"},
        "0x00" : {SIZE: 1, NAME : "internalTemperatureAlarm",
            VALUES     : {
                "0x00" : "normal",
                "0x01" : "alarm",
            },
        },
        "0x01" : {SIZE: 1, NAME : "lorawanWatchdogAlarm",
            VALUES     : {
                "0x00" : "normal",
                "0x01" : "alarm",
            },
        },
        "0x02" : {SIZE: 1, NAME : "serialWatchdogAlarm",
            VALUES     : {
                "0x00" : "normal",
                "0x01" : "alarm",
            },
        }
    },
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

// Configuration constants for parameters reading
var CONFIG_PARAMETER = {
    FPORT : 100,
    CHANNEL : parseInt("0xFF", 16),
    TYPES : {
        "0x12": {NAME: "adr", SIZE: 1, VALUES: {"0x00" : "disabled", "0x01" : "enabled",}},
        "0x13": {NAME: "sf", SIZE: 1, VALUES: {
                "0x00" : "SF12BW125",
                "0x01" : "SF11BW125",
                "0x02" : "SF10BW125",
                "0x03" : "SF9BW125",
                "0x04" : "SF8BW125",
                "0x05" : "SF7BW125",
                "0x06" : "SF7BW250",
            }
        },
        "0x14": {NAME : "lorawanWatchdogFunction", SIZE: 1, VALUES: {"0x00" : "disabled", "0x01" : "enabled",}},
        "0x15": {NAME : "lorawanWatchdogTimeout", SIZE: 2},
        "0x16": {NAME : "lorawanWatchdogAlarm", SIZE: 1, VALUES: {"0x00" : "normal", "0x01" : "alarm",}},
        "0x17": {NAME : "serialWatchdogFunction", SIZE: 1, VALUES: {"0x00" : "disabled", "0x01" : "enabled",}},
        "0x18": {NAME : "serialWatchdogTimeout", SIZE: 2},
        "0x18": {NAME : "serialWatchdogAlarm", SIZE: 1, VALUES: {"0x00" : "normal", "0x01" : "alarm",}},
        "0x69": {NAME : "internalCircuitTemperatureAlarm", SIZE: 1, VALUES: {"0x00" : "normal", "0x01" : "alarm",}},
        "0x70": {NAME : "internalCircuitTemperatureNumberOfAlarms", SIZE: 4},
        "0x71": {NAME : "internalCircuitTemperature", SIZE: 2, RESOLUTION: 0.01, SIGNED: true},
        "0x72": {NAME : "internalCircuitHumidity", SIZE: 1},
    },
    WARNING_NAME   : "warning",
    ERROR_NAME     : "error",
    INFO_NAME      : "info"
}

function decodeBasicInformation(bytes)
{
    var LENGTH = bytes.length;
    var decoded = {};
    var index = 0;
    var channel = 0;
    var type = "";
    var size = 0;
    if(LENGTH == 1)
    {
        if(bytes[0] == 0)
        {
            decoded[CONFIG_INFO.INFO_NAME] = "Downlink command succeeded";

        } else if(bytes[0] == 1)
        {
            decoded[CONFIG_INFO.WARNING_NAME] = "Downlink command failed";
        }
        return decoded;
    }
    try
    {
        while(index < LENGTH)
        {
            channel = bytes[index];
            index = index + 1;
            // Channel checking
            if(channel != CONFIG_INFO.CHANNEL)
            {
                continue;
            }
            // Type of basic information
            type = "0x" + toEvenHEX(bytes[index].toString(16).toUpperCase());
            index = index + 1;
            var info = CONFIG_INFO.TYPES[type];
            size = info.SIZE;
            // Decoding
            var value = 0;
            if(info.DIGIT || info.DIGIT == false)
            {
                if(info.DIGIT == false)
                {
                    // Decode into "V" + DIGIT STRING + "." DIGIT STRING format
                    value = getDigitStringArrayNoFormat(bytes, index, size);
                    value = "V" + value[0] + "." + value[1];
                }else
                {
                    // Decode into DIGIT STRING format
                    value = getDigitStringArrayEvenFormat(bytes, index, size);
                    value = value.toString().toUpperCase();
                }

            }
            else if(info.VALUES)
            {
                // Decode into STRING (VALUES specified in CONFIG_INFO)
                value = "0x" + toEvenHEX(bytes[index].toString(16).toUpperCase());
                value = info.VALUES[value];
            }else
            {
                if(size == 0)
                {
                    size = getSizeBasedOnChannel(bytes, index, channel);
                    // Decode into STRING format
                    value = getStringFromBytesBigEndianFormat(bytes, index, size);
                    
                }else
                {
                    // Decode into DECIMAL format
                    value = getValueFromBytesBigEndianFormat(bytes, index, size);
                }
            }
            if(info.RESOLUTION)
            {
                value = value * info.RESOLUTION;
                value = parseFloat(value.toFixed(2));
            }
            decoded[info.NAME] = value;
            index = index + size;
        }
    }catch(error)
    {
        decoded[CONFIG_INFO.ERROR_NAME] = error.message;
    }

    return decoded;
}

function decodeDeviceData(bytes)
{
    var LENGTH = bytes.length;
    var decoded = {};
    var index = 0;
    var channel = 0;
    var type = "";
    var deviceTimestamp = 0;
    if(LENGTH == 1)
    {
        if(bytes[0] == 0)
        {
            decoded[CONFIG_PERIODIC.INFO_NAME] = "Downlink command succeeded";

        } else if(bytes[0] == 1)
        {
            decoded[CONFIG_PERIODIC.WARNING_NAME] = "Downlink command failed";
        }
        return decoded;
    }
    try
    {
		channel = bytes[index];
		index = index + 1;
		type = bytes[index];
		index = index + 1;
		if(channel == CONFIG_PERIODIC.CHANNEL && type == CONFIG_PERIODIC.DEVICE_TIMESTAMP_TYPE)
		{
			// Decode device timestamp
            deviceTimestamp = getValueFromBytesBigEndianFormat(bytes, index, CONFIG_PERIODIC.TIMESTAMP_DATA_SIZE);
			decoded.DeviceTimestamp = deviceTimestamp;
			index = index + CONFIG_PERIODIC.TIMESTAMP_DATA_SIZE;
		}
        decoded[CONFIG_PERIODIC.MEASUREMENT_LIST_NAME] = [];
        while(index < LENGTH)
        {
			var measurement = decodeMeasurement(bytes, index, deviceTimestamp);
			decoded[CONFIG_PERIODIC.MEASUREMENT_LIST_NAME].push(measurement);
			index = index + CONFIG_PERIODIC.MODBUS_DATA_POINT_LENGTH;
        }
    }catch(error)
    {
        decoded[CONFIG_PERIODIC.ERROR_NAME] = error.message;
    }

    return decoded;
}

function decodeAlarmPacket(bytes)
{
    var LENGTH = bytes.length;
    var decoded = {};
    var index = 0;
    var channel = 0;
    var type = "";
    var size = 0;
    if(LENGTH == 1)
    {
        if(bytes[0] == 0)
        {
            decoded[CONFIG_ALARM.INFO_NAME] = "Downlink command succeeded";

        } else if(bytes[0] == 1)
        {
            decoded[CONFIG_ALARM.WARNING_NAME] = "Downlink command failed";
        }
        return decoded;
    }
    try
    {
        while(index < LENGTH)
        {
            channel = bytes[index];
            index = index + 1;
            // Channel checking
            if(channel != CONFIG_ALARM.CHANNEL)
            {
                continue;
            }
            // Type of alarm
            type = "0x" + toEvenHEX(bytes[index].toString(16).toUpperCase());
            index = index + 1;
            var info = CONFIG_ALARM.TYPES[type] ? CONFIG_ALARM.TYPES[type] : null;
            if(info == null)
            {
                var modbusChannelId = parseInt(type, 16);
                if(modbusChannelId >= CONFIG_ALARM.MODBUS_CHANNEL_ALARM_TYPE_MIN && 
                    modbusChannelId <= CONFIG_ALARM.MODBUS_CHANNEL_ALARM_TYPE_MAX)
                {
                    info = {NAME: CONFIG_ALARM.MODBUS_CHANNEL_ALARM_NAME_GENERIC +
                            (modbusChannelId + 1 - CONFIG_ALARM.MODBUS_CHANNEL_ALARM_TYPE_MIN),
                            SIZE: 1, VALUES: CONFIG_ALARM.MODBUS_CHANNEL_ALARM_VALUES};
                }else
                {
                    continue;
                }
            }
            size = info.SIZE ? info.SIZE : 0;
            if(size == 0)
            {
                continue;
            }
            // Decoding
            var value = getValueFromBytesBigEndianFormat(bytes, index, size);
            if(info.VALUES)
            {
                value = "0x" + toEvenHEX(value.toString(16).toUpperCase());
                value = info.VALUES[value];
            }
            decoded[info.NAME] = value;
            index = index + size;
        }
    }catch(error)
    {
        decoded[CONFIG_ALARM.ERROR_NAME] = error.message;
    }

    return decoded;
}

function decodeParameters(bytes)
{
    var LENGTH = bytes.length;
    var decoded = {};
    var index = 0;
    var channel = 0;
    var type = "";
    var size = 0;
    if(LENGTH == 1)
    {
        if(bytes[0] == 0)
        {
            decoded[CONFIG_PARAMETER.INFO_NAME] = "Downlink command succeeded";

        } else if(bytes[0] == 1)
        {
            decoded[CONFIG_PARAMETER.WARNING_NAME] = "Downlink command failed";
        }
        return decoded;
    }
    try
    {
        while(index < LENGTH)
        {
            channel = bytes[index];
            index = index + 1;
            // Channel checking
            if(channel != CONFIG_PARAMETER.CHANNEL)
            {
                continue;
            }
            // Type of parameter
            type = "0x" + toEvenHEX(bytes[index].toString(16).toUpperCase());
            index = index + 1;
            var info = CONFIG_PARAMETER.TYPES[type] ? CONFIG_PARAMETER.TYPES[type] : null;
            if(info == null)
            {
                continue;
            }
            size = info.SIZE ? info.SIZE : 0;
            if(size == 0)
            {
                continue;
            }
            // Decoding
            var value = getValueFromBytesBigEndianFormat(bytes, index, size);
            if(info.SIGNED)
            {
                value = getSignedIntegerFromInteger(value, size);
            }
            if(info.VALUES)
            {
                value = "0x" + toEvenHEX(value.toString(16).toUpperCase());
                value = info.VALUES[value];
            }
            if(info.RESOLUTION)
            {
                value = value * info.RESOLUTION;
                value = parseFloat(value.toFixed(2));
            }
            decoded[info.NAME] = value;
            index = index + size;
        }
    }catch(error)
    {
        decoded[CONFIG_PARAMETER.ERROR_NAME] = error.message;
    }

    return decoded;
}


function decodeMeasurement(bytes, baseIndex, deviceTimestamp)
{
	var decoded = {
    };
	var index = baseIndex;
	try 
	{
		var channel = bytes[index];
		index = index + 1;
		if(channel < CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPE_OFFSET || 
           channel >= CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPE_OFFSET + 
                        CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPE_TOTAL)
		{
			decoded[CONFIG_PERIODIC.WARNING_NAME]  = "Unknown channel";
            return decoded;
		}
        decoded.channelId = channel - CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPE_OFFSET + 1;
        var type = bytes[index];
        index = index + 1;
        decoded.channelDataType = type;
        var dataInfo = getValueFromBytesBigEndianFormat(bytes, index, 3);
        index = index + 3;
        decoded.channelByteOrder = dataInfo & 0x03; // Bit index [1:0]
        var numberOfDataBytes = (dataInfo >> 2) & 0x03;  // Bit index [3:2]
        // 0 ==> 4 bytes; 1 ==> 1 byte; 2 ==> 2 bytes; 3 ==> 3 bytes
        numberOfDataBytes = numberOfDataBytes ? numberOfDataBytes : 4;
        dataInfo = dataInfo >> 4;
        decoded.channelLoggerTimestamp = deviceTimestamp - dataInfo;
        decoded.channelBytes = [];
        for(var i=0; i<numberOfDataBytes; i=i+1)
        {
            decoded.channelBytes.push(bytes[index]);
            index = index + 1;
        }
        var channelBytesBigEndian = [];
        switch (decoded.channelByteOrder) {
            case CONFIG_PERIODIC.MODBUS_BYTE_ORDERS.BYTE_ORDER_ABCD:
            {
                for(var i=0; i<numberOfDataBytes; i=i+1)
                {
                    channelBytesBigEndian.push(decoded.channelBytes[i]);
                }
                break;
            }
            case CONFIG_PERIODIC.MODBUS_BYTE_ORDERS.BYTE_ORDER_DCBA:
            {
                for(var i=0; i<numberOfDataBytes; i=i+1)
                {
                    channelBytesBigEndian.push(decoded.channelBytes[numberOfDataBytes-1-i]);
                }
                break;
            }
            default:
            {
                for(var i=0; i<numberOfDataBytes; i=i+1)
                {
                    channelBytesBigEndian.push(decoded.channelBytes[i]);
                }
                break;
            }
        }
        // TODO
        switch(type) {
            case CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPES.DATA_TYPE_COILS:
            {

                break;
            }
            case CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPES.DATA_TYPE_DISCRETE:
            {
                break;
            }
            case CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPES.DATA_TYPE_HOLDING_FLOAT:
            {
                decoded.channelDecodedValue = getFloatValueFromBytesBigEndianFormat(channelBytesBigEndian);
                break;
            }
            case CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPES.DATA_TYPE_HOLDING_32:
            {
                decoded.channelDecodedValue = getValueFromBytesBigEndianFormat(channelBytesBigEndian, 0, numberOfDataBytes);
                break;
            }
            case CONFIG_PERIODIC.MODBUS_CHANNEL_DATA_TYPES.DATA_TYPE_INPUT_32:
            {
                decoded.channelDecodedValue = getValueFromBytesBigEndianFormat(channelBytesBigEndian, 0, numberOfDataBytes);
                break;
            }
            default:
            {
                decoded[CONFIG_PERIODIC.WARNING_NAME]  = "Unknown data type";
                return decoded;
            }
        }
	}catch(error)
    {
        decoded[CONFIG_PERIODIC.ERROR_NAME] = error.message;
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

function getSizeBasedOnChannel(bytes, index, channel)
{
    var size = 0;
    while(index + size < bytes.length && bytes[index + size] != channel)
    {
        size = size + 1;
    }
    return size;
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

function getFloatValueFromBytesLittleEndianFormat(bytes) {
    var exponent = ((bytes[3] & 0xFF) << 1) | ((bytes[2] & 0x80) >> 7);
    var mantissa = ((bytes[2] & 0x7F) << 16) | (bytes[1] << 8) | bytes[0];

    if (exponent === 0 && mantissa === 0) {
        return 0.0;
    }

    var sign = bytes[3] & 0x80 ? -1 : 1;

    // Calculate the float value
    var floatValue = sign * Math.pow(2, exponent - 127) * (1 + mantissa / Math.pow(2, 23));
    return parseFloat(floatValue.toFixed(3));
}

function getFloatValueFromBytesBigEndianFormat(bytes)
{
    var exponent = ((bytes[0] & 0x7F) << 1) | ((bytes[1] & 0x80) >> 7);
    var mantissa = ((bytes[1] & 0x7F) << 16) | (bytes[2] << 8) | bytes[3];

    if (exponent === 0 && mantissa === 0) {
        return 0.0;
    }

    var sign = bytes[0] & 0x80 ? -1 : 1;

    // Calculate the float value
    var floatValue = sign * Math.pow(2, exponent - 127) * (1 + mantissa / Math.pow(2, 23));
    return parseFloat(floatValue.toFixed(3));
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
    }else if(fPort == CONFIG_INFO.FPORT)
    {
        decoded = decodeBasicInformation(bytes);
    }else if(fPort >= CONFIG_PERIODIC.FPORT_MIN && fPort <= CONFIG_PERIODIC.FPORT_MAX)
    {
        decoded = decodeDeviceData(bytes);
    }else if(fPort == CONFIG_ALARM.FPORT)
    {
        decoded = decodeAlarmPacket(bytes);
    }else if(fPort == CONFIG_PARAMETER.FPORT)
    {
        decoded = decodeParameters(bytes);
    }else
    {
        decoded = {error: "Incorrect fPort", fPort : fPort};
    }
    decoded[VERSION_CONTROL.CODEC.NAME] = VERSION_CONTROL.CODEC.VERSION;
    decoded[VERSION_CONTROL.DEVICE.NAME] = VERSION_CONTROL.DEVICE.MODEL;
    decoded[VERSION_CONTROL.PRODUCT.NAME] = VERSION_CONTROL.PRODUCT.CODE;
    decoded[VERSION_CONTROL.MANUFACTURER.NAME] = VERSION_CONTROL.MANUFACTURER.COMPANY;
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
    try
    {
        if(obj[CONFIG_DOWNLINK.TYPE] == CONFIG_DOWNLINK.CONFIG)
        {
            return encodeDeviceConfiguration(obj[CONFIG_DOWNLINK.CONFIG], variables);
        }
        else if(obj[CONFIG_DOWNLINK.TYPE] == CONFIG_DOWNLINK.PERIODIC)
        {
            return encodeUplinkConfiguration(obj[CONFIG_DOWNLINK.PERIODIC], variables);
        }
        else if(obj[CONFIG_DOWNLINK.TYPE] == CONFIG_DOWNLINK.READING)
        {
            return encodeParamtersReading(obj[CONFIG_DOWNLINK.READING], variables);
        }
    }catch(error)
    {

    }
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


/************************************************************************************************************/

// Constants for downlink type
var CONFIG_DOWNLINK = {
    TYPE    : "Type",
    CONFIG  : "Config",
    PERIODIC: "Periodic",
    READING : "Reading",
    MODBUS  : "Modbus"
}

// Constants for device configuration 
var CONFIG_DEVICE = {
    FPORT : 50,
    REGISTER_CHANNEL : parseInt("0xFF", 16),
    PERIODIC_CHANNEL : parseInt("0xFF", 16),
    MODBUS_CHANNEL : parseInt("0xFF", 16),
    READING_TYPE : parseInt("0xCC", 16),
    DATA_MAX_SIZE : 9,
    REGISTERS : {
        "rebootDevice": {TYPE: parseInt("0x0A", 16), SIZE: 1, MIN: 1, MAX: 1, RIGHT:"WRITE_ONLY",},
        "restart": {TYPE: parseInt("0x0B", 16), SIZE: 1, MIN: 1, MAX: 1, RIGHT:"WRITE_ONLY",},
        "adr": {TYPE: parseInt("0x12", 16), SIZE: 1, MIN: 0, MAX: 1,},
        "sf": {TYPE: parseInt("0x13", 16), SIZE: 1, MIN: 0, MAX: 6,},
        "lorawanWatchdogFunction": {TYPE: parseInt("0x14", 16), SIZE: 1, MIN: 0, MAX: 1,},
        "lorawanWatchdogTimeout": {TYPE : parseInt("0x15", 16), SIZE: 2, MIN: 1, MAX: 65535,},
        "lorawanWatchdogAlarm": {TYPE: parseInt("0x16", 16), RIGHT:"READ_ONLY"},
        "serialWatchdogFunction": {TYPE: parseInt("0x17", 16), SIZE: 1, MIN: 0, MAX: 1,},
        "serialWatchdogTimeout": {TYPE : parseInt("0x18", 16), SIZE: 2, MIN: 1, MAX: 65535,},
        "serialWatchdogAlarm": {TYPE: parseInt("0x19", 16), RIGHT:"READ_ONLY"},
        "internalCircuitTemperatureAlarm": {TYPE: parseInt("0x69", 16), RIGHT:"READ_ONLY"},
        "internalCircuitTemperatureNumberOfAlarms": {TYPE: parseInt("0x70", 16), RIGHT:"READ_ONLY"},
        "internalCircuitTemperature": {TYPE: parseInt("0x71", 16), RIGHT:"READ_ONLY"},
        "internalCircuitHumidity": {TYPE: parseInt("0x72", 16), RIGHT:"READ_ONLY"},
    }
}

function encodeDeviceConfiguration(obj, variables)
{
    var encoded = [];
    var index = 0;
    var config = {};
    var param = "";
    var value = 0;
    try
    {
        for(var i=0; i<obj.length; i=i+1)
        {
            param = obj[i]["Param"];
            value = obj[i]["Value"];
            var config = CONFIG_DEVICE.REGISTERS[param];
            if(config.RIGHT && config.RIGHT === "READ_ONLY")
            {
                return [];  // error
            }        
            if(value >= config.MIN && value <= config.MAX)
            {
                encoded[index] = CONFIG_DEVICE.REGISTER_CHANNEL;
                index = index + 1;
                encoded[index] = config.TYPE;
                index = index + 1;
                if(config.SIZE == 2)
                {
                    value = parseInt(value.toFixed(0));
                    encoded[index] = (value >> 8) & 0xFF;
                    index = index + 1;
                    encoded[index] = value & 0xFF;
                    index = index + 1;
                }else
                {
                    encoded[index] = value;
                    index = index + 1;
                }
            }else
            {
                // Error
                return [];
            }
        }
    }catch(error)
    {
        // Error
        return [];
    }
    return encoded;
}

function encodeUplinkConfiguration(obj, variables)
{
    var encoded = []
    var index = 0;
    var firstType = parseInt("0x14", 16);
    var field = ["UplinkInterval", "Mode", "Status", "Registers"];
    var fieldIndex = 0;
    var isFieldPresent = false;
    var value = 0;
    var registers = [];
    var register = "";
    try 
    {
        // Encode UplinkInterval, Mode, Status
        for(fieldIndex=0; fieldIndex<3; fieldIndex=fieldIndex+1)
        {
            isFieldPresent = false;
            if(field[fieldIndex] in obj)
            {
                isFieldPresent = true;
            }
            if(!isFieldPresent)
            {
                return [];  // error
            }
            value = obj[field[fieldIndex]];
            if((fieldIndex < 1 && value >= 1 && value <= 255) || 
                (fieldIndex >= 1 && value >= 0 && value <= 1))
            {
                encoded[index] = CONFIG_DEVICE.PERIODIC_CHANNEL;
                index = index + 1;
                encoded[index] = firstType + fieldIndex;
                index = index + 1;
                encoded[index] = value;
                index = index + 1;
            }else
            {
                // Error
                return [];
            }
        }
        // Encode registers
        isFieldPresent = false;
        if(field[fieldIndex] in obj)
        {
            isFieldPresent = true;
        }
        if(!isFieldPresent)
        {
            return [];  // error
        }
        registers = obj[field[fieldIndex]];
        if(registers.length < 1 || registers.length > CONFIG_DEVICE.DATA_MAX_SIZE)
        {
            return [];  // Error
        }
        encoded[index] = CONFIG_DEVICE.PERIODIC_CHANNEL;
        index = index + 1;
        encoded[index] = firstType + fieldIndex;
        index = index + 1;
        var savedIndex = index;
        var config = {};
        for(var i=0; i<registers.length; i=i+1)
        {
            register = registers[i];
            config = CONFIG_DEVICE.REGISTERS[register];
            if(value in CONFIG_DEVICE.REGISTERS)
            {
                encoded[index] =  config.TYPE;
                index = index + 1;
            }
        }
        if(savedIndex == index)
        {
            return [];  // error (registers not supported)
        }
    }catch(error)
    {
        // Error
        return [];
    }
    return encoded;
}

function encodeParamtersReading(obj, variables)
{
    var encoded = [];
    var index = 0;
    var config = {};
    var param = "";
    try
    {
        if(obj.length > CONFIG_DEVICE.DATA_MAX_SIZE)
        {
            return []; // error
        }
        encoded[index] = CONFIG_DEVICE.REGISTER_CHANNEL;
        index = index + 1;
        encoded[index] = CONFIG_DEVICE.READING_TYPE;
        index = index + 1;
        for(var i=0; i<obj.length; i=i+1)
        {
            param = obj[i];
            var config = CONFIG_DEVICE.REGISTERS[param];
            if(config.RIGHT && config.RIGHT === "WRITE_ONLY")
            {
                return [];  // error
            }
            encoded[index] = config.TYPE;
            index = index + 1;
        }
    }catch(error)
    {
        // Error
        return [];
    }
    return encoded;
}




