class IO {
    constructor(name, type, id) {
        this.name = name;
        this.type = type;
        this.id = id;
    }
}

class Connection {
    constructor(type, id, io, port) {
        this.type = type;
        this.id = id;
        this.io = io;
        this.port = port;
    }
}

class ConnectionsWithTiming {
    constructor(travelTime, connectionTiming) {
        this.travelTime = travelTime;
        this.connectionTiming = connectionTiming;
    }
}

class LUT {
    constructor(id) {
        this.id = id;
        this.connections = [];
    }
}

class FlipFlop {
    constructor(id) {
        this.id = id;
        this.connections = [];
    }
}

function getLUTFromString(luts, element) {
    let newLutId = parseInt(element.id);
    let newConnection = { type: element.io, id: element.port }; // Ensure both type and id are included
    // Check if a LUT with the same id already exists
    let existingLut = luts.find(lut => lut.id === newLutId);

    if (existingLut) {
        // If the LUT exists, check if the connection already exists in its connections array
        let connectionExists = existingLut.connections.some(conn => 
            conn.type === newConnection.type && 
            conn.id === newConnection.id
        );

        // Add the connection only if it doesn't already exist
        if (!connectionExists) {
            existingLut.connections.push(newConnection);
        }
    } else {
        // If the LUT doesn't exist, create a new one and add the connection
        let newLut = { id: newLutId, connections: [newConnection] };
        console.log(newLut)
        luts.push(newLut);
    }
}

function getFlipFlopFromString(flipFlops, element) {
    let newFlipFlopId = parseInt(element.port);
    let newConnection = { type: element.io, id: element.id }; // Ensure both type and id are included

    // Check if a FlipFlop with the same id already exists
    let existingFlipFlop = flipFlops.find(flipflop => flipflop.id === newFlipFlopId);

    if (existingFlipFlop) {
        // If the FlipFlop exists, check if the connection already exists in its connections array
        let connectionExists = existingFlipFlop.connections.some(conn => 
            conn.type === newConnection.type && 
            conn.id === newConnection.id
        );

        // Add the connection only if it doesn't already exist
        if (!connectionExists) {
            existingFlipFlop.connections.push(newConnection);
        }
    } else {
        // If the FlipFlop doesn't exist, create a new one and add the connection
        let newFlipFlop = { id: newFlipFlopId, connections: [newConnection] };
        flipFlops.push(newFlipFlop);
    }
}

function getIOFromString(ios, element) {
    let newIO = new IO(element.type, element.io, element.id);

    // Check if the IO already exists
    let exists = ios.some(io => 
        io.name === newIO.name && 
        io.type === newIO.type && 
        io.id === newIO.id
    );

    // Add the IO only if it doesn't already exist
    if (!exists) {
        ios.push(newIO);
    }
}

function getConnectionsFromString(element) {
    let elementFinal = new Connection();
    if (element.startsWith("D")) {
        elementFinal.type = "userInput";
        elementFinal.id = "0";
        elementFinal.io = "output";
        elementFinal.port = "0";
    } else if (element.startsWith("Q")) {
        elementFinal.type = "userOutput";
        elementFinal.id = "0";
        elementFinal.io = "input";
        elementFinal.port = "0";
    } else if (element.startsWith("clk")) {
        elementFinal.type = "Clock";
        elementFinal.id = "0";
        elementFinal.io = "output";
        elementFinal.port = "0";
    } else if (element.startsWith("async")) {
        elementFinal.type = "Async_reset";
        elementFinal.id = "0";
        elementFinal.io = "output";
        elementFinal.port = "0";
    } else if (element.startsWith("latch_")) {
        elementFinal.type = "DFF";
        elementFinal.id = "0";
        if (element[7] === '$') {
            elementFinal.port = element.substring(14, 15);
            if (element[22] === 'i') {
                elementFinal.io = "input";
            } else if (element[22] === 'o') {
                elementFinal.io = "output";
            } else {
                elementFinal.io = "clock"
            }
        } else {
            elementFinal.port = "0";
            if (element[8] === 'i') {
                elementFinal.io = "input";
            } else if (element[8] === 'o') {
                elementFinal.io = "output";
            } else {
                elementFinal.io = "clock";
            }
        }
    } else if (element.startsWith("lut")) {
        if (element[6] === 'a') {
            elementFinal.type = "lut";
            let id = "";
            let i = 38;
            while (i < element.length && /\d/.test(element[i])) {
                id += element[i];
                i++;
            }
            elementFinal.id = id;
            if (element[i + 1] === 'i') {
                elementFinal.io = "input";
                elementFinal.port = element[i + 9];
            } else {
                elementFinal.io = "output";
                elementFinal.port = element[i + 10];
            }
        } else {
            elementFinal.type = "lut-gnd";
            elementFinal.io = "output";
            elementFinal.id = "0";
            elementFinal.port = "0";
        }
    }
    return elementFinal;
}

function getDefinitions(fileContent, elementConnections) {
    const lines = fileContent.split('\n');
    let found = false;
    let module = "";

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        let pos = line.indexOf("_to");
        let lineEnd = line.indexOf(")");
        if (pos !== -1) {
            found = true;
            let after_to = line.substring(pos + 4);
            let before_to = line.substring(26, pos);
            let timing = 0;
            if (i + 3 < lines.length) {
                let timingLine = lines[i + 3].trim();
                let timingPos = timingLine.indexOf("IOPATH");
                let timingEnd = timingLine.indexOf(":");
                timing = parseFloat(timingLine.substring(timingPos + 23, timingEnd));
            }
            let connectionToAdd = {
                first: getConnectionsFromString(before_to),
                second: getConnectionsFromString(after_to)
            };
            let finalConnection = new ConnectionsWithTiming(timing, connectionToAdd);
            elementConnections.push(finalConnection);
        }
    }
}

function writeDeclarationsToJson(luts, flipFlops, ios, elementConnections) {
    let jsonOutput = {
        LUTs: luts.map(lut => ({
            id: lut.id,
            connections: lut.connections.map(conn => ({
                type: conn.type,
                id: conn.id
            }))
        })),
        FlipFlops: flipFlops.map(flipflop => ({
            id: flipflop.id,
            connections: flipflop.connections.map(conn => ({
                type: conn.type,
                id: conn.id
            }))
        })),
        IOs: ios.map(io => ({
            name: io.name,
            type: io.type,
            id: io.id
        })),
        Connections: elementConnections.map(conn => ({
            Input: {
                type: conn.connectionTiming.first.type,
                id: conn.connectionTiming.first.id,
                io: conn.connectionTiming.first.io,
                port: conn.connectionTiming.first.port
            },
            Output: {
                type: conn.connectionTiming.second.type,
                id: conn.connectionTiming.second.id,
                io: conn.connectionTiming.second.io,
                port: conn.connectionTiming.second.port
            },
            Timing: conn.travelTime
        }))
    };

    return JSON.stringify(jsonOutput, null, 2);
}

// Main function to handle file upload and processing
document.getElementById('sdfFileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            const luts = [];
            const flipFlops = [];
            const ios = [];
            const elementConnections = [];

            getDefinitions(fileContent, elementConnections);

            for (let elements of elementConnections) {
                if (["userInput", "userOutput", "Clock", "Async_reset"].includes(elements.connectionTiming.first.type)) {
                    getIOFromString(ios, elements.connectionTiming.first);
                } else if (elements.connectionTiming.first.type === "DFF") {
                    getFlipFlopFromString(flipFlops, elements.connectionTiming.first);
                } else if (["lut", "lut-gnd"].includes(elements.connectionTiming.first.type)) {
                    getLUTFromString(luts, elements.connectionTiming.first);
                }

                if (["userInput", "userOutput", "Clock", "Async_reset"].includes(elements.connectionTiming.second.type)) {
                    getIOFromString(ios, elements.connectionTiming.second);
                } else if (elements.connectionTiming.second.type === "DFF") {
                    getFlipFlopFromString(flipFlops, elements.connectionTiming.second);
                } else if (["lut", "lut-gnd"].includes(elements.connectionTiming.second.type)) {
                    getLUTFromString(luts, elements.connectionTiming.second);
                }
            }
            const jsonOutput = writeDeclarationsToJson(luts, flipFlops, ios, elementConnections);
            const blob = new Blob([jsonOutput], { type: 'application/json' });
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'declarations.json';
            downloadLink.style.display = 'block';
        };
        reader.readAsText(file);
    }
});